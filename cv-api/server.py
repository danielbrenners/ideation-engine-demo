from flask import Flask, url_for, send_from_directory, request, jsonify, Response
import logging, os
from werkzeug import secure_filename
import io
import os
import numpy as np
import argparse
import time
import cv2
import imutils
from flask_cors import CORS
from autocorrect import spell
from difflib import SequenceMatcher
import itertools
from scipy.spatial import distance as dist
from pprint import pprint
import json
import gensim

# for getting image
from PIL import Image
import StringIO
import re
from sklearn.manifold import TSNE

app = Flask(__name__)
CORS(app)

# utils for saving images to disk
file_handler = logging.FileHandler('server.log')
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)
PROJECT_HOME = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = '{}/uploads/'.format(PROJECT_HOME)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# colors  (opencv uses BGR format !!!)
WHITE = [255, 255, 255]

YELLOW_DARK = np.array([73, 229, 219], dtype = "uint8")
YELLOW_LIGHT = np.array([154, 249, 243], dtype = "uint8")
YELLOW = np.mean( np.array([YELLOW_DARK, YELLOW_LIGHT]), axis=0)

PINK_DARK = np.array([83, 49, 149], dtype = "uint16")
PINK_LIGHT = np.array([132, 83, 231], dtype = "uint16")
PINK = np.mean( np.array([PINK_DARK, PINK_LIGHT]), axis=0)

GREEN_DARK = np.array([86, 171, 157], dtype = "uint16")
GREEN_LIGHT = np.array([140, 220, 220], dtype = "uint16")
GREEN = np.mean( np.array([GREEN_DARK, GREEN_LIGHT]), axis=0)

BLUE_DARK = np.array([160, 160, 70], dtype = "uint16")
BLUE_LIGHT = np.array([255, 220, 125], dtype = "uint16")
BLUE = np.mean( np.array([BLUE_DARK, BLUE_LIGHT]), axis=0)

ORANGE_DARK = np.array([70, 150, 220], dtype = "uint16")
ORANGE_LIGHT = np.array([110, 190, 255], dtype = "uint16")
ORANGE = np.mean( np.array([ORANGE_DARK, ORANGE_LIGHT]), axis=0)

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

# Instantiates a client
client = vision.ImageAnnotatorClient()

"""# Load Google's pre-trained Word2Vec model. (~2 mins)
print("Loading model... may take 1-2 minutes")
model = gensim.models.KeyedVectors.load_word2vec_format('./models/GoogleNews-vectors-negative300.bin', binary=True)
# If you're finished training a model (i.e. no more updates, only querying),
# then switch to the gensim.models.KeyedVectors instance in wv
# to trim unneeded model memory = use much less RAM.
print("Removing unneeded model memory")
word2vec = model.wv
del model
print("Testing model. Vectorizing 'computer'")
# get word vector
word2vec.wv['computer']
print("Ready!")"""

def detect_text(path_to_image):
    # grab the client
    client = vision.ImageAnnotatorClient()
    # grab the file to analyze
    with io.open(path_to_image, 'rb') as image_file:
        content = image_file.read()
    image = types.Image(content=content)
    # call api to extract text
    response = client.text_detection(image=image)
    texts = response.text_annotations
    if (texts):
        return texts
    else:
        return None

def sanitize_text(text):
    # lower case and remove newline characters
    text = text.lower().replace('\n',' ')
    #spellchecked = spell(text)
    return text

def removeDuplicates(results, threshold):
    for index, item in enumerate(itertools.combinations(results, 2)):
        if SequenceMatcher(None, item[0]['text'], item[1]['text']).ratio() > threshold:
            results.pop( results.index(item[0]))
    return results

def create_new_folder(local_dir):
    newpath = local_dir
    if not os.path.exists(newpath):
        os.makedirs(newpath)
    return newpath

def determine_color(contours, image):
    for contour in contours:
        # extract the contoured part of the image
        contoured_area = image[contour["y"] : contour["y"] + contour["h"], contour["x"] : contour["x"] + contour["w"]]
        # calculate average color of the area
        mean = cv2.mean(contoured_area)
        # initialize the minimum distance found thus far
        minDist = np.inf
        # store values of colors with associated names
        colors = [
            {"bgr" : YELLOW, "name": "yellow"},
            {"bgr" : PINK, "name": "pink"},
            {"bgr" : GREEN, "name": "green"},
            {"bgr" : BLUE, "name": "blue"},
            {"bgr" : ORANGE, "name": "orange"}
        ]
        # default color is yellow
        current_color_name = 'yellow'
        # loop over the known L*a*b* color values
        for color in colors:
            # compute the distance between the current
            # color value and the mean of the image
            d = dist.euclidean(color['bgr'], mean[:3])

            # if the distance is smaller than the current distance,
            # then update the bookkeeping variable
            if d < minDist:
                current_color_name = color['name']
                minDist = d
        # set minimally distant color to attribute of contour
        contour["color"] = current_color_name
    # return the contours
    return contours

def find_contours(image):
    # blur the binary image for contouring
    # blurring is a hyper parameter to prevent text from creating
    # false contours, but also might blue post-its together
    image_blurred = cv2.GaussianBlur(image, (53, 53), 0)
    # determine which pixels fall within the color boundaries
    orange_mask = cv2.inRange(image_blurred, ORANGE_DARK, ORANGE_LIGHT)
    pink_mask = cv2.inRange(image_blurred, PINK_DARK, PINK_LIGHT)
    blue_mask = cv2.inRange(image_blurred, BLUE_DARK, BLUE_LIGHT)
    green_mask = cv2.inRange(image_blurred, GREEN_DARK, GREEN_LIGHT)
    yellow_mask = cv2.inRange(image_blurred, YELLOW_LIGHT, YELLOW_LIGHT)
    # combing all into the color mask
    color_mask = orange_mask + pink_mask + blue_mask + green_mask + yellow_mask
    # find contours in the image
    _, regions, hierarchy = cv2.findContours(color_mask.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    # store valid contours that contain post-its
    valid_contours = []
    # check to see if any contours were found
    if len(regions) > 0:
        # save the areas of the contours, and save the largest area
        areas = [cv2.contourArea(region) for region in regions]
        max_area = max(areas)

        for contour in regions:
            # only use contours within 40% of max contour
            if cv2.contourArea(contour) / max_area > .5:
                # compute the (rotated) bounding box around contour
                # rect = np.int32(cv2.boxPoints(cv2.minAreaRect(contour)))
                (x, y, w, h) = cv2.boundingRect(contour)
                valid_contours.append({"x": x, "y": y, "w": w, "h": h})
                # DEBUG drawing
                # rect = np.int32(cv2.boxPoints(cv2.minAreaRect(contour)))
                # cv2.drawContours(image, [rect], -1, (255, 0, 0), 2)
                # TODO: rotate the image based on the rotated
                # rect and extract that
                # TODO: maybe something around hierarchy?
                # hierarchy[0][index][2]
    return valid_contours

def associate_text_with_contours(contours, text_detected):
    for contour in contours:
        for text in text_detected[1:]:  #skip the TOTAL text object
            # find top left vertex
            minimum_x = min([text.bounding_poly.vertices[i].x for i in range(0,4)])
            minimum_y = min([text.bounding_poly.vertices[i].y for i in range(0,4)])
            #print("min x is " + str(minimum_x))
            #print("min y is " + str(minimum_y))
            if minimum_x > contour["x"] and minimum_x < contour["x"] + contour["w"] and minimum_y > contour["y"] and minimum_y < contour["y"] + contour["h"]:
                #print("inside")
                if "text" in contour:
                    contour["text"].append(text.description)
                else:
                    contour["text"] = [text.description]
    # create new array only with contours that have text
    text_validated_contours = []
    for contour in contours:
        if "text" in contour:
            # combine list of strings into a sentence for each contour
            # and sanitize it (lowercase or run through spell check)
            contour["text"] = sanitize_text(' '.join(contour["text"]))
            text_validated_contours.append(contour)
    return text_validated_contours

def addCardVectors(cards):
    card_vectors = []
    cards_with_vectors = []

    for card in cards:
        word_vectors = []
        for word in cards[card]['text'].split(" "):
            if (word):
                #print(word)
                alpha_word = re.sub(r'[^a-zA-Z ]', '', word).split()[0].lower()
                try:
                    word_vector = word2vec.wv[alpha_word]
                    word_vectors.append(word_vector)
                except:
                    print(alpha_word + " not in vocabulary")
        # find average of word_vectors
        if word_vectors:
            card_vector = np.mean(word_vectors, axis=0)
            card_vectors.append(card_vector)
            cards_with_vectors.append(card)


    card_vectors_embedded = TSNE(perplexity=40, n_components=2, init='pca', n_iter=2500, random_state=23).fit_transform(card_vectors)
    # now have card ids and vectors in two lists, each correspond
    # to the same order
    for card in cards:
        if card in cards_with_vectors:
            cards[card]['vector'] = {}
            cards[card]['vector']['x'] = card_vectors_embedded[cards_with_vectors.index(card)][0].astype(float)
            cards[card]['vector']['y'] = card_vectors_embedded[cards_with_vectors.index(card)][1].astype(float)

    return cards

@app.route('/cv_postit/', methods = ['POST'])
def api_root():
    print(request)
    app.logger.info(PROJECT_HOME)
    if request.method == 'POST' and request.files['image']:
        # grab the image from the request object posted
        image = request.files['image']
        # read image file string data
        filestr = image.read()
        # convert string data to numpy array
        npimg = np.fromstring(filestr, np.uint8)
        # convert numpy array to image
        image = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
        # find post it note contours in image
        contours = find_contours(image)
        # save temporarily to disk
        cv2.imwrite('./images/image_to_cloud.jpg', image)
        # extract text from the image
        text_detected = detect_text('./images/image_to_cloud.jpg')
        # determine which text goes with which contour
        contours_with_text = associate_text_with_contours(contours, text_detected)
        # determine color of each contour
        contours_with_text_and_color = determine_color(contours_with_text, image)
        # remove duplicates
        contours_no_duplicates = removeDuplicates(contours_with_text_and_color, .8)
        # sort the results by the y value to preserve
        # the order on the board
        sorted_contours = sorted(contours_no_duplicates, key=lambda k: k['y'])
        # DEBUG: visualizing the rects
        # NOTE: draw contours in find_contours()
        # image = imutils.resize(image, width=500)
        # cv2.imshow("Board", image)
        # cv2.waitKey(0)
        response = { 'results' : sorted_contours }
        return jsonify(response), 201
    else:
        # TODO: better fail response
        return 201


@app.route('/user_data/', methods = ['POST', 'GET'])
def save_user_data():
    print("User Data Received")
    app.logger.info(PROJECT_HOME)
    if request.method == 'POST':
        with open('./user_data/user_data.json', 'w') as outfile:
            json.dump(request.get_json(), outfile)

        response = { 'results' : "success" }
        return jsonify(response), 201
    elif request.method == 'GET':
        data = json.load(open('./user_data/user_data.json'))
        return jsonify(data), 201
    else:
        return 404



@app.route('/synthesize_cards/', methods = ['POST'])
def synthesize_cards():
    print("Synthesizing Cards")
    app.logger.info(PROJECT_HOME)
    if request.method == 'POST':
        userData = request.get_json()
        currentProject = userData["userData"]["currentProject"]
        currentBoard = userData["userData"]["currentBoard"]
        cards = userData["userData"]["projects"][currentProject]["boards"][currentBoard]["cards"]
        # add card vectors to the cards object
        cards = addCardVectors(cards)
        # add the cards object to the user data to send back
        userData["userData"]["projects"][currentProject]["boards"][currentBoard]["cards"] = cards
        response = { 'results' : userData }
        return jsonify(response), 201
    else:
        return 404



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
     #app.run(debug=True)



























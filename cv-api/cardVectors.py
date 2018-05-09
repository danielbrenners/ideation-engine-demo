import numpy as np
import gensim
import re
from sklearn.manifold import TSNE


# Load Google's pre-trained Word2Vec model. (~2 mins)
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
print(word2vec.wv['computer'])
print("Ready!")

cards = {u'c3': {u'text': u'small'}, u'c2': { u'text': u'small'}, u'c1': {u'text': u'fruit'}, u'c0': {u'text': u'edible'}}
card_vectors = []
cards_with_vectors = []

for card in cards:
    word_vectors = []
    for word in cards[card]['text'].split(" "):
        if(word):
            print(word)
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
card_vectors_embedded = TSNE(n_components=2).fit_transform(card_vectors)
card_vectors_embedded = TSNE(n_components=2, random_state=0).fit_transform([ word2vec.wv['delicious'], word2vec.wv['delectable'], word2vec.wv['flavorful'], word2vec.wv['appetizing'], word2vec.wv['tasty'], word2vec.wv['juicy_flavorful'], word2vec.wv['yummy'], word2vec.wv['crunchy_salty'] ])
print(card_vectors_embedded)
print(word2vec.wv['delicious'] == word2vec.wv['delicious'])
# now have card ids and vectors in two lists, each correspond
# to the same order
for card in cards:
    if card in cards_with_vectors:
        cards[card]['vector'] = {}
        cards[card]['vector']['x'] = card_vectors_embedded[cards_with_vectors.index(card)][0].astype(float)
        cards[card]['vector']['y'] = card_vectors_embedded[cards_with_vectors.index(card)][1].astype(float)

for card in cards_with_vectors:
    print(cards[card]['text'])

print(card_vectors_embedded)




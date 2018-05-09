// CV API
export const flaskAPI = {
  cv_url: "http://0.0.0.0:5000/cv_postit/",
  board_images_url: "http://0.0.0.0:5000/board_images/",
  user_data_url: "http://0.0.0.0:5000/user_data/"
};

export const gridShape = {
  maxBoardHeight: 50,
  maxNumBoards: 6,
  gridCols: 6
};

// Colors
export const color = {
  white: "#ffffff",
  black: "#000000",
  orange: "#f9ad49",
  pink: "#fa51af",
  blue: "#2aace1",
  green: "#e7ef5f",
  yellow: "#fed84b"
};

// Typography
export const type = {
  tera: "84px",
  giga: "62px",
  mega: "48px",
  alpha: "38px",
  beta: "26px",
  gamma: "20px",
  delta: "16px",
  epsilon: "14px",
  zeta: "12px",

  fontRegular: "normal",
  fontBold: "bold",
  fontMono: "open-sans, sans-serif",
  fontSans: "lato, sans-serif",

  bodySize: "18px",
  bodyWeight: "normal"
};

// Layout
export const layout = {
  gutter: "20px",
  maxWidth: "1100px",
  textAreaFooterHeight: "35px",
  deleteCardButtonHeight: "25px",
  deleteCardButtonWidth: "25px"
};

// Breakpoints
export const breakpoint = {
  large: "@media screen and (min-width: 1100px)",
  medium: "@media screen and (min-width: 800px)",
  small: "@media screen and (min-width: 600px)"
};

const constants = {
  color,
  type,
  layout,
  breakpoint
};

export default constants;

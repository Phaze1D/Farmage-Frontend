import {
  pink900,purple900,deepPurple900,indigo900,blue900,
  lightBlue900,cyan900,pink800,purple800,deepPurple800,
  indigo800,blue800,lightBlue800,cyan800,pink700,purple700,
  deepPurple700,indigo700,blue700,lightBlue700,
  cyan700,pink600,purple600,deepPurple600,indigo600,
  blue600,lightBlue600,cyan600
} from 'material-ui/styles/colors';

const randomImageColor = () => {
    const array = [
      pink900,
      purple900,
      deepPurple900,
      indigo900,
      blue900,
      lightBlue900,
      cyan900
    ];
    return array[ Math.floor( Math.random() * array.length ) ];
  };

const alphaImageColor = (alpha) => {
  alpha = alpha.toUpperCase()
  switch (alpha) {
    case 'A':
      return pink900;
    case 'B':
      return purple900;
    case 'C':
      return deepPurple900;
    case 'D':
      return indigo900;
    case 'E':
      return blue900;
    case 'F':
      return lightBlue900;
    case 'G':
      return cyan900;
    case 'H':
      return pink800;
    case 'I':
      return purple800;
    case 'J':
      return deepPurple800;
    case 'K':
      return indigo800;
    case 'L':
      return blue800;
    case 'M':
      return lightBlue800;
    case 'N':
      return cyan800;
    case 'O':
      return pink700;
    case 'P':
      return purple700;
    case 'Q':
      return deepPurple700;
    case 'R':
      return indigo700;
    case 'S':
      return blue700;
    case 'T':
      return lightBlue700;
    case 'U':
      return cyan700;
    case 'V':
      return pink600;
    case 'W':
      return purple600;
    case 'X':
      return deepPurple600;
    case 'Y':
      return indigo600;
    case 'Z':
      return blue600;

    default:

  }
}

module.exports.randomImageColor = randomImageColor
module.exports.alphaImageColor = alphaImageColor;

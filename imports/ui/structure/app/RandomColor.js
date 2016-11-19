import {
  pink900,
  purple900,
  deepPurple900,
  indigo900,
  blue900,
  lightBlue900,
  cyan900
} from 'material-ui/styles/colors';

let randomImageColor = function () {
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

module.exports = randomImageColor;

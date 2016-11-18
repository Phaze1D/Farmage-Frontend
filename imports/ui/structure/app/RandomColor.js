import {
  pink900,
  purple900,
  deepPurple800,
  indigo800,
  blue900,
  lightBlue900,
  cyan900,
  teal900,
  green900,
  lightGreen900
} from 'material-ui/styles/colors';

let randomImageColor = function () {
    const array = [
      pink900,
      purple900,
      deepPurple800,
      indigo800,
      blue900,
      lightBlue900,
      cyan900,
      teal900,
      green900,
      lightGreen900
    ];
    return array[ Math.floor( Math.random() * array.length ) ];
  };

module.exports = randomImageColor;

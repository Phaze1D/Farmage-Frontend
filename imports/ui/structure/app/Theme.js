import {
  orangeA400, cyan900,
  blueA400, cyan500,
  greenA400, orange500, orange700,
  grey100, grey300, grey400, grey500, grey700,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  palette: {
    primary1Color: orange500,
    primary2Color: orange700,
    primary3Color: grey400,
    accent1Color: blueA400,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.15),
    pickerHeaderColor: orange500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    disabledTextColor: fade(darkBlack, 0.15),
  },
  textField: {
    hintColor: fade(darkBlack, 0.4),
    floatingLabelColor: fade(darkBlack, 0.4)
  },
  toggle: {
    thumbOnColor: blueA400,
    trackOnColor: fade(blueA400, 0.5),
    trackRequiredColor: fade(blueA400, 0.5),
  },
  paper: {
    zDepth: 3
  },
  checkbox: {
    boxColor: grey700,
    checkedColor: blueA400,
    requiredColor: blueA400,
  },
  radioButton: {
    borderColor: grey700,
    checkedColor: blueA400,
    requiredColor: blueA400,
  },
};

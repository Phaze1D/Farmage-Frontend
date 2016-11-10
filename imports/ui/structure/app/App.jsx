import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Theme from '../Theme.js'

const mtheme = getMuiTheme(Theme);


export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={mtheme}>
          {this.props.children}
        </MuiThemeProvider>
      </div>
    );
  }

}

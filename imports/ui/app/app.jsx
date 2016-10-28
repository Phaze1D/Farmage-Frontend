import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          {this.props.children}
        </MuiThemeProvider>
      </div>
    );
  }

}

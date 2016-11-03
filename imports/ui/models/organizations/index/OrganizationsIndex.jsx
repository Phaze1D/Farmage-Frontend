import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import OrganizationsNew from '../new/OrganizationsNew';


export default class OrganizationsIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {ropen: false};
    this.toggleRight = this.toggleRight.bind(this);
  }

  toggleRight() {
    this.setState( (prevState, props) => ({ropen: !prevState.ropen}) );
  }


  render(){
    return(
      <div>
        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <OrganizationsNew/>
        </RightDrawer>

        <FloatingActionButton onTouchTap={this.toggleRight} className="fab">
          <ContentAdd className="icon"/>
        </FloatingActionButton>

      </div>

    )
  }
}

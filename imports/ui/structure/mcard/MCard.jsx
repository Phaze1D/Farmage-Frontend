import React from 'react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling'
import classnames from 'classnames';

import transitions from 'material-ui/styles/transitions';
import propTypes from 'material-ui/utils/propTypes';
import Paper from 'material-ui/Paper';



export default class MCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {optionsShown: false}
  }

  render(){
    const classes = classnames('mcard', this.props.className)
    return(
      <div className={classes}>
        <IconMenu
          open={this.state.optionsShown}
          className='card-option-root'
          animation={MPopoverAnimation}
          onRequestChange={(open) => this.setState({optionsShown: open})}
          iconButtonElement={<IconButton className='card-options'><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>


          <MenuItem primaryText="Expand" leftIcon={<FullScreen />} />
          <MenuItem primaryText="Edit" leftIcon={<ImageEdit />} />
          <Divider />
          <MenuItem primaryText="Delete" leftIcon={<ActionDelete />} />
        </IconMenu>

        <AutoLockScrolling lock={this.state.optionsShown}/>

        {this.props.children}
      </div>
    )
  }
}



function getStyles(props, context, state) {
  const {targetOrigin} = props;
  const {open} = state;
  const {muiTheme} = context;
  const horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

  return {
    root: {
      opacity: open ? 1 : 0,
      transform: open ? 'translate(-5px, 5px) scale(1, 1)' : 'translate(-5px, 5px) scale(0, 0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      position: 'fixed',
      zIndex: muiTheme.zIndex.popover,
      transition: open ? transitions.easeOut('350ms', ['transform', 'opacity']) : transitions.easeOut('350ms', ['opacity']),
      maxHeight: '100%',
    },
    horizontal: {
      maxHeight: '100%',
      overflowY: 'auto',
      transform: open ? 'scaleX(1)' : 'scaleX(0)',
      opacity: open ? 1 : 0,
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      transition: open ? transitions.easeOut('350ms', ['transform', 'opacity']) : transitions.easeOut('350ms', ['opacity']),
    },
    vertical: {
      opacity: open ? 1 : 0,
      transform: open ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      transition: open ? transitions.easeOut('500ms', ['transform', 'opacity']) : transitions.easeOut('350ms', ['opacity']),
    },
  };
}

class MPopoverAnimation extends React.Component {
  constructor(props){
    super(props)
    this.defaultProps = {
      style: {},
      zDepth: 3,
    };
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.setState({open: true}); // eslint-disable-line react/no-did-mount-set-state
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    });
  }

  render() {
    const {
      className,
      style,
      zDepth,
    } = this.props;

    const {prepareStyles} = this.props.context.muiTheme;
    const styles = getStyles(this.props, this.props.context, this.state);

    return (
      <Paper
        style={Object.assign(styles.root, style)}
        zDepth={2}
        className={className}
      >
        <div style={prepareStyles(styles.horizontal)}>
          <div style={prepareStyles(styles.vertical)}>
            {this.props.children}
          </div>
        </div>
      </Paper>
    );
  }
}

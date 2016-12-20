import React from 'react';

import transitions from 'material-ui/styles/transitions';
import propTypes from 'material-ui/utils/propTypes';
import Paper from 'material-ui/Paper';



export default class MPopoverAnimation extends React.Component {
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
    this.setState({open: true});
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

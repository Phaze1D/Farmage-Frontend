import React from 'react';
import TextField from 'material-ui/TextField';
import Big from 'big.js';
Big.DP = 10


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class BatchSelected extends React.Component{
  constructor(props){
    super(props);
    this.state = {available: this.props.dbatch.batch.amount}

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.handleChange(null, `${this.props.dbatch.quantityTaken}`)
  }

  handleChange(event, newAmount){
    newAmount = newAmount.length > 0 ? newAmount : 0
    const avi = Big(this.props.dbatch.batch.amount).minus(newAmount)
    this.setState({available: avi.toString()})
    this.props.onRequestChange(event)
  }

  render(){
    const batch = this.props.dbatch.batch
    const identifier = batch.identifier ? batch.identifier : batch._id

    return (
      <div className='yield-section'>
        <div className='yield-info'>
          <span>Identifier</span>
          {identifier}
        </div>

        <div className='yield-info'>
          <span>Created Date</span>
          {new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(batch.createdAt)}
        </div>

        <div className='yield-info'>
          <span>Expires At</span>
          {new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(batch.expiresAt)}
        </div>

        <div className='yield-info'>
          <span>Available</span>
          {this.state.available}
        </div>

        <TextField
            name="amount_taken"
            type="number"
            className={`input-row ${this.props.productID}`}
            hintText=""
            floatingLabelText="Take"
            onChange={this.handleChange}
            defaultValue={this.props.dbatch.quantityTaken}
            fullWidth={true}/>
      </div>
    )

  }
}

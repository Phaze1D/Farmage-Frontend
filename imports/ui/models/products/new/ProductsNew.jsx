import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import SelectorButton from '../../../structure/selector_button/SelectorButton';
import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import MTextField from '../../../structure/textfield/MTextField';
import ResourceProductItem from '../../resources/selector_items/ResourceProductItem'
import randomImageColor from '../../../structure/app/RandomColor.js';





export default class ProductsNew extends React.Component{
  constructor(props){
    super(props);
    this.backgroundColor = randomImageColor()
    this.state = {total_price: ''}
    this.handleTotalPriceChange = this.handleTotalPriceChange.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleTotalPriceChange(){
    uv = this.unitPriceTF.input.value;
    rv = this.taxRateTF.input.value;

    uv = uv.length > 0 ? uv : 0.00;
    rv = rv.length > 0 ? rv/100 : 0.00;
    tp = uv * (1 + rv)
    this.setState({total_price: tp.toFixed(2)});
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
  }

  render(){
    return(
      <MainPanel classes='container-fluid'header={
          <FormActionBar onClear={this.handleOnClose}/>
        }>

        <div className='row'>

          <div className='col-xs-12 col-flex'>
            <IconButton className='avatar-button'>
              <ImageCameraAlt />
            </IconButton>


            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
                floatingLabelText="Product Name"
                fullWidth={true}/>

          </div>
        </div>

        <div className='row'>
          <div className='col-xs-7 sm-p-right'>
            <TextField
                name="size"
                type="text"
                className=""
                hintText=""
                floatingLabelText="Size"
                fullWidth={true}/>
          </div>

          <div className='col-xs-5 sm-p-left'>
            <TextField
                name="sku"
                type="text"
                className=""
                hintText=""
                floatingLabelText="SKU"
                fullWidth={true}/>
          </div>
        </div>


        <div className='row row-flex'>
          <div className='col-xs-4 sm-p-right'>
            <MTextField
                name="unit_price"
                type="number"
                className=""
                hintText=""
                floatingLabelText="Unit Price"
                mref={(input) => this.unitPriceTF = input}
                onChange={this.handleTotalPriceChange}
                fullWidth={true}
                prefix="$"
                prefixSide="left"/>
          </div>

          <div className='col-xs-4 sm-p-left sm-p-right'>
            <MTextField
                name="tax_rate"
                type="number"
                className=""
                hintText=""
                floatingLabelText="Tax Rate"
                mref={(input) => this.taxRateTF = input}
                onChange={this.handleTotalPriceChange}
                fullWidth={true}
                prefix="%"
                prefixSide="right"/>
          </div>

          <div className='col-xs-4 sm-p-left'>
            <MTextField
                name="tprice"
                type="number"
                className=""
                hintText=""
                value={this.state.total_price}
                disabled={true}
                floatingLabelText="Total Price"
                fullWidth={true}
                prefix="$"
                prefixSide="left"/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <TextArea
              name="description"
              type="text"
              className=""
              floatingLabelText="Description"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resources" highlight={true}/>
          </div>
        </div>

        <ResourceProductItem backgroundColor={this.backgroundColor}/>

        <ResourceProductItem backgroundColor={this.backgroundColor}/>

        <ResourceProductItem backgroundColor={this.backgroundColor}/>


      </MainPanel>
    )
  }
}

import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MainPanel from '../../../structure/main_panel/MainPanel';
import ContactInfo from '../../contact_info/ContactInfo';
import TextArea from '../../../structure/textarea/TextArea';


const focusColor ={
  color: orangeA200,
  borderColor: orangeA200
};

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ProductsNew extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <MainPanel classes='container-fluid'>
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
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>

          <div className='col-xs-5 sm-p-left'>
            <TextField
                name="sku"
                type="text"
                className=""
                hintText=""
                floatingLabelText="SKU"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>
        </div>


        <div className='row'>
          <div className='col-xs-4 sm-p-right'>
            <TextField
                name="unit_price"
                type="number"
                className=""
                hintText=""
                floatingLabelText="Unit Price"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>

          <div className='col-xs-4 sm-p-left'>
            <TextField
                name="tax_rate"
                type="number"
                className=""
                hintText=""
                floatingLabelText="Tax Rate"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>

          <div className='col-xs-4 sm-p-left'>
            <TextField
                name="tprice"
                type="number"
                className=""
                hintText=""
                disabled={true}
                floatingLabelText="Total Price"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>
        </div>



        <div className='row'>
          <div className='col-xs-12'>
            <TextArea
              name="description"
              type="text"
              className=""
              floatingLabelText="Description"
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>


        

      </MainPanel>
    )
  }
}

import React from 'react'
import Chart from 'chart.js'
import moment from 'moment'
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import {fade} from 'material-ui/utils/colorManipulator';
import MenuItem from 'material-ui/MenuItem';
import randomColor from 'randomcolor';
import {
  green700, tealA700, pinkA700, indigoA700, yellowA700,
  cyanA700, purpleA700, greenA700
} from 'material-ui/styles/colors'


import {factoryProduct} from '../faker/factoryProduct';
import {factorySell, factoryDetails} from '../../sells/faker/factorySell';

import faker from 'faker'



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class TopProductsGraph extends React.Component{
  constructor(props){
    super(props)
    this.state = {bvalue: 0}


    this.details = []
    let productIndex = {}
    this.products = []

    for(let i = 0; i < 20; i++){
      this.details = this.details.concat(factoryDetails(true));
    }

    for (let i = 0; i < this.details.length; i++) {
      var detail = this.details[i]
      var prodIndex = productIndex[detail.productID]
      if(prodIndex){
        var prod = this.products[prodIndex]
        prod.quantity += detail.quantity
        prod.subTotal += (detail.quantity * detail.unitPrice) * ( 1 + (detail.taxRate/100));

      }else{
        this.products.push(
          {
            productName: detail.productName,
            quantity: detail.quantity,
            subTotal: (detail.quantity * detail.unitPrice) * ( 1 + (detail.taxRate/100))
          }
        )
        productIndex[detail.productID] = this.products.length - 1
      }
    }

    this.products.sort((a, b) => {
      return  (b.quantity - a.quantity)
    });


    this.yData = []
    this.xData = []

    for (var i = 0; i < 5; i++) {
      this.yData.push(this.products[i].quantity)
      this.xData.push(this.products[i].productName)
    }



  }

  componentDidUpdate(prevProps, prevState) {
    let ctx = document.getElementById("productChart");
    let colors = randomColor({
                   luminosity: 'bright',
                   format: 'rgb',
                   count: this.xData.length
                });
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.xData,
          datasets: [
                  {
                      borderWidth: 1,
                      backgroundColor: colors.map((color) => {return fade(color, 0.75)}),
                      hoverBackgroundColor: colors,
                      data: this.yData,
                  }
              ]
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                displayColors: false,
                callbacks: {
                  title: function(tooltipItems, data) {
            				var title = '';
            				var labels = data.labels;
            				var labelCount = labels ? labels.length : 0;

            				if (tooltipItems.length > 0) {
            					var item = tooltipItems[0];
          						title = labels[item.index];
            				}

            				return title
            			},
                  label: (tooltipItem, data) => {
            				return "Total Purchesed: " + data.datasets[0].data[tooltipItem.index]
                  }
                }
            },
        }
    });
  }


  render(){

    return(
      <div className='report-card'>
        <div className='report-top'>
          <div className='report-title'>
            Top 5 Products
          </div>

        </div>

        <div className='report-mid'>

          <SelectField
            className='s-field'
            floatingLabelText="With Batch"
            autoWidth={true}
            value={this.state.bvalue}
            onChange={(event, index, value) => {this.setState({bvalue: value})}}>
            <MenuItem value={0} primaryText="All" />
            <MenuItem value={1} primaryText="Yes" />
            <MenuItem value={2} primaryText="No" />
          </SelectField>

          <div className='s-field'></div>

          <DatePicker
            className='s-field'
            name="created_from"
            floatingLabelText="From"
            fullWidth={true}
            formatDate={new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format} />

          <DatePicker
            className='s-field'
            name="created_from"
            floatingLabelText="To"
            fullWidth={true}
            formatDate={new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format} />


        </div>

        <div className='graph-div'>
          <canvas id="productChart"></canvas>
        </div>

        <div className='report-bottom'>
          <div className='section'>

            <div className='total-div' style={{backgroundColor: cyanA700}}>
              <span>
                Favorite Product
              </span>
              {this.products[0].productName}
            </div>

          </div>

          <div className='section'>

            <div className='total-div' style={{backgroundColor: purpleA700}}>
              <span>
                Total Spent On Favorite
              </span>
              ${this.products[0].subTotal.toFixed(2)}
            </div>

          </div>

        </div>

      </div>
    )
  }
}


/*
Product Graph
  x-axis = product Name
  y-axis = quantity

Top 5 Products

Conditions
  time Range
*/

import React from 'react'
import Chart from 'chart.js'
import moment from 'moment'
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';

import MenuItem from 'material-ui/MenuItem';
import {cyanA700, purpleA700, greenA700} from 'material-ui/styles/colors'


import {factoryProduct} from '../faker/factoryProduct';
import {factorySell} from '../../sells/faker/factorySell';

import faker from 'faker'



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ProductsGraph extends React.Component{
  constructor(props){
    super(props)
    this.state = {dvalue: 0, pvalue: 0, svalue: 0}


    this.sells = []

    for(let i = 0; i < 20; i++){
      this.sells.push(factorySell());
    }

    this.sells.sort((a, b) => {
      return  a.createdAt - b.createdAt;
    });

    this.yData = []
    this.xData = []


  }

  componentDidUpdate(prevProps, prevState) {
    let ctx = document.getElementById("productChart");
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
                  {
                      borderWidth: 2,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      data: [65, 59, 80, 81, 56, 55, 40],
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
            				return data.datasets[0].data[tooltipItem.index]
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

          <div className='s-field'></div>

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
              0
            </div>

          </div>

          <div className='section'>

            <div className='total-div' style={{backgroundColor: purpleA700}}>
              <span>
                Most Recent Product
              </span>
              0
            </div>

          </div>

          <div className='section'>

            <div className='total-div' style={{backgroundColor: greenA700}}>
              <span>
                Average Pre Monthly
              </span>
              0
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

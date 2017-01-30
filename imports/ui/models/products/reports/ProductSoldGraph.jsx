import React from 'react'
import Chart from 'chart.js'
import moment from 'moment'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {cyanA700, purpleA700, greenA700} from 'material-ui/styles/colors'


import {factorySell} from '../../sells/faker/factorySell';
import {factoryProduct} from '../faker/factoryProduct';
import faker from 'faker'



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ProductSoldGraph extends React.Component{
  constructor(props){
    super(props)
    this.state = {dvalue: 0, pvalue: 0, svalue: 0}


    this.product = factoryProduct()

    this.testStatus = ['All']
    for (let i = 0; i < 5; i++) {
      this.testStatus.push(faker.random.word())
    }

    this.productSells = []

    for(let i = 0; i < 20; i++){
      let sell = factorySell();
      this.productSells.push({
        createdAt: sell.createdAt,
        paidAt: sell.paidAt,
        status: sell.status,
        productID: sell.details[0].productID,
        productName: sell.details[0].productName,
        quantity: sell.details[0].quantity,
        subTotal: (sell.details[0].quantity* sell.details[0].unitPrice) * (1 + (sell.details[0].taxRate/100)),
      });
    }

    this.productSells.sort((a, b) => {
      return  a.createdAt - b.createdAt;
    });

    this.yData = []
    this.xData = []
    this.total = 0;
    this.totalUnits = 0;
    this.bestMonth = {
      amount: 0,
      month: ''
    };

    this.yData.push(0)
    this.xData.push(moment(this.productSells[0].createdAt.toISOString()).startOf('month').toISOString())



    let di = 0;


    for (var i = 0; i < this.productSells.length; i++) {
      this.total += this.productSells[i].subTotal;
      this.totalUnits += this.productSells[i].quantity;


      if(moment(this.productSells[i].createdAt.toISOString()).isSame(this.xData[di], 'month') ){
        this.yData[di] += this.productSells[i].quantity

      }else{

        let nxMonth = moment(this.xData[di]).add(1, 'month')

        while ( !nxMonth.isSame(this.productSells[i].createdAt.toISOString(), 'month') ) {
          di++;
          this.xData.push(nxMonth.toISOString())
          this.yData.push(0)
          nxMonth = moment(this.xData[di]).add(1, 'month')
        }

        di++;
        this.xData.push(moment(this.productSells[i].createdAt.toISOString()).startOf('month').toISOString())
        this.yData.push(this.productSells[i].quantity)

      }
    }

    this.bestMonth.amount = this.yData[0]
    this.bestMonth.month = this.xData[0]
    for (var i = 0; i < this.yData.length; i++) {
      if(this.yData[i] >= this.bestMonth.amount){
        this.bestMonth.amount = this.yData[i];
        this.bestMonth.month = this.xData[i];
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let ctx = document.getElementById("productChart");
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.xData,
          datasets: [
                  {
                      cubicInterpolationMode: 'monotone',
                      borderWidth: 2,
                      fill: false,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 2,
                      pointHitRadius: 10,
                      data: this.yData,
                  }
              ]
        },
        options: {
            maintainAspectRatio: false,
            legend:{
              display: false
            },
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

            				return moment(title).format('MMMM YYYY')
            			},
                  label: (tooltipItem, data) => {

            				return `${tooltipItem.yLabel}`;
                  }
                }
            },
            scales: {
              yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Units Sold'
                  },
                  ticks: {
                      beginAtZero:true,
                  },
              }],

              xAxes: [{
                  ticks: {
                      maxRotation: 0,
                      callback: function(value, index, values) {
                        return moment(value).format('MMM YY');
                      }
                  },

              }]
            }
        }
    });
  }


  render(){

    const statusArray = this.testStatus.map((status, index) =>
      <MenuItem key={index} value={index} primaryText={status} />
    )

    return(
      <div className='report-card'>
        <div className='report-top'>
          <div className='report-title'>
            Sold Pre Month
          </div>

        </div>

        <div className='report-mid'>

          <SelectField
            className='s-field'
            floatingLabelText="Paid"
            autoWidth={true}
            value={this.state.pvalue}
            onChange={(event, index, value) => {this.setState({pvalue: value})}}>
            <MenuItem value={0} primaryText="All" />
            <MenuItem value={1} primaryText="Yes" />
            <MenuItem value={2} primaryText="No" />
          </SelectField>

          <SelectField
            className='s-field'
            floatingLabelText="By Sell Status"
            autoWidth={true}
            value={this.state.svalue}
            onChange={(event, index, value) => {this.setState({svalue: value})}}>
            {statusArray}
          </SelectField>

          <SelectField
            className='s-field'
            autoWidth={true}
            id='range'
            floatingLabelText="Range"
            value={this.state.dvalue}
            onChange={(event, index, value) => {this.setState({dvalue: value})}}>
            <MenuItem value={0} primaryText="Last 3 Months" />
            <MenuItem value={1} primaryText="Last 6 Months" />
            <MenuItem value={2} primaryText="Last Year" />
            <MenuItem value={3} primaryText="Last 3 Years" />
            <MenuItem value={4} primaryText="Last 6 Years" />
            <MenuItem value={5} primaryText="All" />
          </SelectField>

        </div>

        <div className='graph-div' style={{padding: '16px'}}>
          <canvas id="productChart"></canvas>
        </div>

        <div className='report-bottom'>
          <div className='section'>

            <div className='total-div' style={{backgroundColor: cyanA700}}>
              <span>
                Total Units Sold
              </span>
              {this.totalUnits}
            </div>

          </div>

          <div className='section'>

            <div className='total-div' style={{backgroundColor: greenA700}}>
              <span>
                Average Units Sold
              </span>
              {(this.totalUnits/this.yData.length).toFixed(1)}
            </div>

          </div>



          <div className='section'>

            <div className='total-div' style={{backgroundColor: purpleA700}}>
              <span>
                Total Revenue
              </span>
              ${this.total.toFixed(2)}
            </div>

          </div>



        </div>

      </div>
    )
  }
}

import React from 'react'
import Chart from 'chart.js'
import moment from 'moment'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {cyanA700, purpleA700, greenA700} from 'material-ui/styles/colors'


import {factoryMovement} from '../../movements/faker/factoryMovement';
import {factoryResource} from '../faker/factoryResource';
import faker from 'faker'



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ResourceProducedGraph extends React.Component{
  constructor(props){
    super(props)
    this.state = {dvalue: 0, svalue: 0}


    this.resource = factoryResource()

    this.movements = []

    for(let i = 0; i < 200; i++){
      let m = factoryMovement();

      m.amount = (!m.productive && m.amount > 0) ? m.amount * -1 : m.amount

      this.movements.push(m)
    }

    this.movements.sort((a, b) => {
      return  a.createdAt - b.createdAt;
    });

    this.yData = []
    this.xData = []
    this.loses = 0;
    this.totalUnits = 0;


    this.yData.push(0)
    this.xData.push(moment(this.movements[0].createdAt.toISOString()).startOf('month').toISOString())


    let di = 0;

    for (var i = 0; i < this.movements.length; i++) {

      if(this.movements[i].productive && this.movements[i].amount > 0){

        this.totalUnits += this.movements[i].amount;

        if(moment(this.movements[i].createdAt.toISOString()).isSame(this.xData[di], 'month') ){
          this.yData[di] += this.movements[i].amount

        }else{

          let nxMonth = moment(this.xData[di]).add(1, 'month')

          while ( !nxMonth.isSame(this.movements[i].createdAt.toISOString(), 'month') ) {
            di++;
            this.xData.push(nxMonth.toISOString())
            this.yData.push(0)
            nxMonth = moment(this.xData[di]).add(1, 'month')
          }

          di++;
          this.xData.push(moment(this.movements[i].createdAt.toISOString()).startOf('month').toISOString())
          this.yData.push(this.movements[i].amount)
        }

      }

      if(!this.movements[i].productive){
        this.loses += this.movements[i].amount;
      }


    }


  }

  componentDidUpdate(prevProps, prevState) {
    let ctx = document.getElementById("resourceProductChart");
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.xData,
          datasets: [
                  {
                      cubicInterpolationMode: 'monotone',
                      borderWidth: 2,
                      fill: true,
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

            				return `${tooltipItem.yLabel} ${this.resource.measurementUnit}`;
                  }
                }
            },
            scales: {
              yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Units Produced'
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



    return(
      <div className='report-card'>
        <div className='report-top'>
          <div className='report-title'>
            Monthly Production
          </div>

        </div>

        <div className='report-mid'>

          <SelectField
            className='s-field'
            floatingLabelText="With Loses"
            autoWidth={true}
            value={this.state.svalue}
            onChange={(event, index, value) => {this.setState({svalue: value})}}>
            <MenuItem value={0} primaryText="Yes" />
            <MenuItem value={1} primaryText="No" />

          </SelectField>

          <div className='s-field'></div>

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
          <canvas id="resourceProductChart"></canvas>
        </div>

        <div className='report-bottom'>
          <div className='section'>

            <div className='total-div' style={{backgroundColor: cyanA700}}>
              <span>
                Total Units Produced
              </span>
              {this.totalUnits}
            </div>

          </div>

          <div className='section'>

            <div className='total-div' style={{backgroundColor: greenA700}}>
              <span>
                Average Units Produced
              </span>
              {(this.totalUnits/this.yData.length).toFixed(1)}
            </div>

          </div>



          <div className='section'>

            <div className='total-div' style={{backgroundColor: purpleA700}}>
              <span>
                Total Units Lost
              </span>
              {this.loses.toFixed(0)}
            </div>

          </div>



        </div>

      </div>
    )
  }
}

import React from 'react'
import Chart from 'chart.js'
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment'


import {factorySell} from '../faker/factorySell';



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class SellsGraph extends React.Component{
  constructor(props){
    super(props)

    this.sells = []

    for(let i = 0; i < 20; i++){
      this.sells.push(factorySell());
    }


    this.sells.sort((a, b) => {
      return  a.createdAt - b.createdAt;
    });

    this.dx = []
    this.dy = []

    this.dx.push(0)
    this.dy.push(moment(this.sells[0].createdAt).startOf('month').toString())

    let di = 0;


    for (var i = 0; i < this.sells.length; i++) {


      if(moment(this.sells[i].createdAt).isSame(this.dy[di], 'month') ){
        this.dx[di] += this.sells[i].totalPrice

      }else{

        let nxMonth = moment(this.dy[di]).add(1, 'month')

        while ( !nxMonth.isSame(this.sells[i].createdAt, 'month') ) {
          di++;
          this.dy.push(nxMonth.toString())
          this.dx.push(0)
          nxMonth = moment(this.dy[di]).add(1, 'month')
        }

        di++;
        this.dy.push(moment(this.sells[i].createdAt).startOf('month').toString())
        this.dx.push(this.sells[i].totalPrice)

      }

    }


    console.log(this.dy);
    console.log(this.dx);
  }

  componentDidUpdate(prevProps, prevState) {
    let ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.dy,
          datasets: [
                  {
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderWidth: 1,
                      data: this.dx,
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
            				return '$' + tooltipItem.yLabel.toFixed(2);
                  }
                }
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      callback: function(value, index, values) {
                        return '$' + value.toFixed(2);
                      }
                  },
              }],

              xAxes: [{
                  type: 'time',
                  time: {
                    unit: 'month',
                    displayFormats: {
                      'millisecond': 'MMM YY',
                      'second': 'MMM YY',
                      'minute': 'MMM YY',
                      'hour': 'MMM YY',
                      'day': 'MMM YY',
                      'week': 'MMM YY',
                      'month': 'MMM YY',
                      'quarter': 'MMM YY',
                      'year': 'MMM YY',
                    },
                  },
                  ticks: {
                      maxRotation: 0,
                  },

              }]


            }
        }
    });

  }

  render(){



    return(
      <div className='report-card'>
        <div className='report-title'>Customer Sells Pre Month</div>

          <div className='graph-div'>
            <canvas id="myChart"></canvas>
          </div>





      </div>
    )
  }
}


// <DatePicker
//   className='range-date'
//   name="created_to"
//   hintText="From"
//   fullWidth={true}
//   formatDate={new DateTimeFormat('en-US', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   }).format} />
//
//   <DatePicker
//     className='range-date'
//     name="created_to"
//     hintText="To"
//     fullWidth={true}
//     formatDate={new DateTimeFormat('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     }).format} />


/*
Sells Graph
  x-axis = time
  y-axis = total price

Sum of Total Spent

Conditions
  isPaid
  status
  time Range
*/

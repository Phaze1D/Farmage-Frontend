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
      return  b.createdAt - a.createdAt;
    });

    this.byM = {}

    for (var i = 0; i < this.sells.length; i++) {
      let month = moment(this.sells[i].createdAt).format('MMM YY')
      if(this.byM[month]){
        this.byM[month] += this.sells[i].totalPrice
      }else{
        this.byM[month] = this.sells[i].totalPrice
      }

    }

    this.dy = []
    this.dx = []
    for (var key in this.byM) {
      if (this.byM.hasOwnProperty(key)) {
        this.dx.push(key)
        this.dy.push(this.byM[key])
      }
    }

    console.log(this.dy);
    console.log(this.dx);
  }

  componentDidUpdate(prevProps, prevState) {
    let ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.dx,
          datasets: [
                  {
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderWidth: 1,
                      data: this.dy,
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

            				return title
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
        <div className='report-title'>Sells Report</div>

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

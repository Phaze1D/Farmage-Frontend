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


import {factoryYield} from '../../yields/faker/factoryYield';
import {factoryResource} from '../../resources/faker/factoryResource';


import faker from 'faker'



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class TopSectorResource extends React.Component{
  constructor(props){
    super(props)
    this.state = {bvalue: 0}

    this.resource = factoryResource();
    this.yields = [] // THIS SHOULD BE MOVEMENTS
    this.total = 0;
    let sectorIndex = {}
    this.sectors = []

    for(let i = 0; i < 50; i++){
      this.yields = this.yields.concat(factoryYield());
    }

    for (let i = 0; i < this.yields.length; i++) {
      var _yield = this.yields[i]
      var sectIndex = sectorIndex[_yield.unit._id]
      if(sectIndex){
        var sect = this.sectors[sectIndex]
        sect.amount += _yield.amount

      }else{
        this.sectors.push(
          {
            sectorName: _yield.unit.name,
            amount: _yield.amount,
          }
        )
        sectorIndex[_yield.unit._id] = this.sectors.length - 1
      }
    }

    this.sectors.sort((a, b) => {
      return  (b.amount - a.amount)
    });


    this.yData = []
    this.xData = []

    for (var i = 0; i < 20; i++) {
      this.total += Number(this.sectors[i].amount)
      this.yData.push(this.sectors[i].amount)
      this.xData.push(this.sectors[i].sectorName)
    }



  }

  componentDidUpdate(prevProps, prevState) {
    let ctx = document.getElementById("topSectorsChart");
    let colors = randomColor({
                   luminosity: 'bright',
                   format: 'rgb',
                   count: this.xData.length
                });
    let myChart = new Chart(ctx, {
        type: 'bar',
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
            				return `${data.datasets[0].data[tooltipItem.index]} ${this.resource.measurementUnit}`
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
            Production Pre Sector
          </div>

        </div>

        <div className='report-mid'>

          <SelectField
            className='s-field'
            floatingLabelText="With Loses"
            autoWidth={true}
            value={this.state.bvalue}
            onChange={(event, index, value) => {this.setState({bvalue: value})}}>
            <MenuItem value={0} primaryText="Yes" />
            <MenuItem value={1} primaryText="No" />
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
          <canvas id="topSectorsChart"></canvas>
        </div>

        <div className='report-bottom'>
          <div className='section'>

            <div className='total-div' style={{backgroundColor: cyanA700}}>
              <span>
                Top Sector
              </span>
              {this.sectors[0].sectorName}
            </div>

          </div>

          <div className='section'>

            <div className='total-div' style={{backgroundColor: purpleA700}}>
              <span>
                Total Units Produced
              </span>
              {this.total.toFixed(8)}
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
  y-axis = amount

Top 5 Products

Conditions
  time Range
*/

import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import {randomImageColor, alphaImageColor} from '../../../structure/app/RandomColor.js';


import classnames from 'classnames';

export default class ResourceCard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {
      name,
      measurementUnit,
      imageUrl,
      totalAmount,
      ...others
    } = this.props;

    const title = `${name}`;
    let char = '';

    if(!imageUrl){
      char = title.toUpperCase().charAt(0);
    }

    const iStyle = {
      backgroundImage: "url('" + imageUrl + "')",
      backgroundColor: alphaImageColor(char)
    }

    return(
      <MCard>

        <div className='testr'>

          <div className='testir' style={iStyle}>
            {char}
          </div>

          <div className='testin'>

            <div className='card-top resource-top' style={{border: 'none'}}>
              <CardTitle className='card-title' title={title} subtitle={`${measurementUnit}`}/>
            </div>

            <div className='cresource-info'>
              <div className='total'>
                {totalAmount}
                <span></span>
              </div>

              <div className='ins'>
                In Stock
              </div>
            </div>


            <CardActions className='card-actions'>
              <FlatButton className='action' label='Yields' />
              <FlatButton className='action' label='Products' />
            </CardActions>

          </div>

        </div>

      </MCard>

    )
  }
}

// export default class ResourceCard extends React.Component{
//   constructor(props){
//     super(props);
//   }
//
//   render(){
//     const {
//       name,
//       measurementUnit,
//       imageUrl,
//       totalAmount,
//       ...others
//     } = this.props;
//
//     const title = `${name}`;
//     const char = title.toUpperCase().charAt(0);
//
//     return(
//       <MCard>
//
//         <div className='card-top resource-top' style={{border: 'none'}}>
//           <MAvatar className='card-avatar'
//             style={{marginRight: '15px', padding: '1px 0 0 1px'}}
//             size={56} cha={char} src={imageUrl}/>
//           <CardTitle className='card-title' title={title} subtitle={measurementUnit}/>
//         </div>
//
//         <div className='cresource-info'>
//           <div className='total'>
//             {totalAmount}
//             <span>{measurementUnit}</span>
//           </div>
//
//           <div className='ins'>
//             In Stock
//           </div>
//         </div>
//
//
//         <CardActions className='card-actions'>
//           <FlatButton className='action' label='Yields' />
//           <FlatButton className='action' label='Products' />
//         </CardActions>
//
//       </MCard>
//
//     )
//   }
// }

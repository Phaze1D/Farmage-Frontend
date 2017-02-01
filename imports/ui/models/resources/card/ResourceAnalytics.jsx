
import React from 'react'
import MFade from '../../../structure/mfade/MFade';
import ResourceProducedGraph from '../reports/ResourceProducedGraph';
import ResourcePackagedGraph from '../reports/ResourcePackagedGraph';
import TopSectorResource from '../../units/reports/TopSectorResource';






export default class ResourceAnalytics extends React.Component{
  constructor(props){
    super(props);

  }


  render(){

    return(
      <div className='mtab-content'>
        <MFade time={1000}>
          <div>
            <TopSectorResource/>
            <ResourceProducedGraph/>
          </div>
        </MFade>
      </div>
    )
  }
}

// Units that produced the mosted

// <ResourcePackagedGraph/>

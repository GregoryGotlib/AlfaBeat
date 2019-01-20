import React, { Component } from 'react';
import cheakInput from '../../utilities/checkInput';
import redStar from '../../images/redStar.png';
import yellowStar from '../../images/yellowStar.png';
import greenStar from '../../images/greenStar.png';

export default class ProfileCarInfo extends Component {

  ratingHandler = (value) =>{
    var limiter=parseInt(value);
    const stars=[];
    var starIcon;
    if(limiter<3)
      starIcon = redStar;
    else if(limiter < 5 && limiter > 2)
      starIcon = yellowStar;
    else 
      starIcon = greenStar;
       
    for(var index=0;index<limiter;index++){
      stars.push(<img src={starIcon} style={{width:'25px'}}></img>);
    }
    return stars;
  }

  render() {
    const carinfo = this.props.carInfo;
    const currentRide=<span style={{color:'rgb(0, 204, 0)'}}>Still own it</span>
    const gone=<span style={{color:'rgb(255, 0, 0)'}}>Gone</span>
    const carInfoDesp = carinfo.map(data =>(
        <li style={{color:'rgb(0, 51, 204)'}} key={data._id} className="list-group-item">
            <p><strong style={{color:'black'}}>Brand: </strong>{data.brand}</p>
            <p><strong style={{color:'black'}}>Model: </strong>{data.model}</p>
            <p><strong style={{color:'black'}}>Year of manufacture: </strong>{data.year}</p>
            <p><strong style={{color:'black'}}>Transmission: </strong>{data.gearBox}</p>
            <p><strong style={{color:'black'}}>Time of ownership: </strong>{data.timeOfOwnerShip}</p>
            <p><strong style={{color:'black'}}>Reliability rating: </strong>{this.ratingHandler(data.rating)}</p>
            {data.current ? (
            <p><strong style={{color:'black'}}>Status: </strong>{currentRide}</p>
            ) : <p><strong style={{color:'black'}}>Status: </strong>{gone}</p>}
        </li>
    ))

    return (
    <div class="row">
        <div class="col-md-12">
        <h3 class="text-center text-info">Vehicle fleet History</h3>
          <div class="card card-body bg-light mb-3">
            <p class="lead">{carInfoDesp}
            </p>
          </div>
        </div>
    </div>

    )
  }
}

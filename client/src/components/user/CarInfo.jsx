import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteCarInfo } from '../../actions/profile';
import propTypes from 'prop-types';

class CarInfo extends Component {

   

    deleteCarInfoHandler = (carID)=>{
        console.log(carID);
        this.props.deleteCarInfo(carID);
    }

  render() {
      const stillOwnIt=<div style={{color:'red'}}>Still own it</div>
      const carInfo = this.props.carInfo.map(data=>(
          <tr key={data._id}>
            <td>{data.brand}</td>
            <td>{data.model}</td>
            <td>{data.year}</td>
            <td>{data.gearBox}</td>
            <td>{data.timeOfOwnerShip}</td>
            <td>{data.rating}/5</td>
            <td>{data.current ? stillOwnIt: 'Gone'} </td>
            <td><button onClick={() => this.deleteCarInfoHandler(data._id)} className="btn btn-danger">Delete</button></td>
          </tr>
      ))
    return (
      <div>
        <h3 className="mb-4">Your vehicle  History Details</h3>
        <div className="table">
            <div className="thead">
                <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year of manufacture</th>
                    <th>Transmission</th>
                    <th>Time of ownership</th>
                    <th>Reliability Rating</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                <tbody>
                    {carInfo}
                </tbody>
            </div>
        </div>
      </div>
    )
  }
}

CarInfo.propTypes = {
    deleteCarInfo: propTypes.func.isRequired
};

export default connect(null,{deleteCarInfo})(CarInfo);
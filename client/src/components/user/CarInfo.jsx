import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteCarInfo } from '../../actions/profile';
import propTypes from 'prop-types';
import '../../style/Dashboard.css';

class CarInfo extends Component {

   

    deleteCarInfoHandler = (carID)=>{
        console.log(carID);
        this.props.deleteCarInfo(carID);
    }

  render() {
      const stillOwnIt=<div style={{color:'red'}}>Still own it</div>
      const carInfo = this.props.carInfo.map((data,index)=>(
          <tr key={data._id}>
            <td>{index + 1}</td>
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
      <div className='info-table-container'>
        <p id='history-p' className="mb-4">Ownership  history details</p>
        <table  id='info-table' className="table table-hover">
            <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year of manufacture</th>
                    <th>Transmission</th>
                    <th>Time of ownership</th>
                    <th>Reliability</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {carInfo}
            </tbody>
        </table>
      </div>
    )
  }
}

CarInfo.propTypes = {
    deleteCarInfo: propTypes.func.isRequired
};

export default connect(null,{deleteCarInfo})(CarInfo);
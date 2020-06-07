import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createCarInfo } from '../../actions/profile';
import propTypes from 'prop-types';
import classnames from 'classnames';
import '../../style/CreateCarInfo.css';

class CreateCarInfo extends Component {
constructor(props){
        super(props);
    }

state = {
    errors:{},
    model:'',
    timeOfOwnerShip:'',
    personalReview:'',
    year:'',
    rating:'',
    gearBox:'',
    current:false,
    disabled:false
}

componentWillReceiveProps(nextProps){
    if(nextProps.errors){
        this.setState({errors:nextProps.errors})
    }
}

modelHandler = (event) =>{
    this.setState({model:event.target.value});
}

yearHandler = (event) =>{
    this.setState({year:event.target.value});
}

gearBoxHandler = (event) =>{
    this.setState({gearBox:event.target.value});
}

personalReviewHandler = (event) =>{
    this.setState({personalReview:event.target.value});
}

timeOfOwnerShipHandler = (event) =>{
    this.setState({timeOfOwnerShip:event.target.value});
}

ratingHandler = (event) =>{
    this.setState({rating:event.target.value});
}

onCheck = (event) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
}

onSubmit = (event) =>{
    event.preventDefault();
    const newCarInfo = {
      model:this.state.model,
      year:this.state.year,
      personalReview:this.state.personalReview,
      timeOfOwnerShip:this.state.timeOfOwnerShip,
      gearBox:this.state.gearBox,
      current:this.state.current,
      rating:this.state.rating
    }
 
    this.props.createCarInfo(newCarInfo, this.props.history);
}

  render(){
      const errors = this.state.errors;
      const options = [
        {label:'Select Your Alfa Romeo model', value:0},
        {label:'145',value:'145'},
        {label:'146',value:'146'},
        {label:'147',value:'147'},
        {label:'156',value:'156'},
        {label:'159',value:'159'},
        {label:'164',value:'164'},
        {label:'166',value:'166'},
        {label:'33',value:'33'},
        {label:'4C',value:'4C'},
        {label:'75',value:'75'},
        {label:'90',value:'90'},
        {label:'GT',value:'GT'},
        {label:'GTV',value:'GTV'},
        {label:'Brera',value:'Brera'},
        {label:'Giulia',value:'Giulia'},
        {label:'Giulietta',value:'Giulietta'},
        {label:'Mito',value:'Mito'},
        {label:'Sud',value:'Sud'},
        {label:'Spider',value:'Spider'},
        {label:'Sprint',value:'Sprint'},
    ];

      const options2 = [
          {label:'Select Time Of Ownership' , value:'* Select Time Of Ownership'},
          {label:'Less Then 1 year',value:'Less Then 1 year'},
          {label:'1 year',value:'1 year'},
          {label:'2 years',value:'2 years'},
          {label:'3 years',value:'3 years'},
          {label:'4 years',value:'4 years'},
          {label:'5 years',value:'5 years'},
          {label:'6 years',value:'6 years'},
          {label:'More then 6 years',value:'More then 6 years'},
    ];

    const options3 = [
        {label:'Select Your Alfa Birthday' , value:'* Select Your Alfa Birthday'},
        {label:'Before 1971',value:'Before 1971'},
        {label:'1972',value:'1972'},
        {label:'1973',value:'1973'},
        {label:'1974',value:'1974'},
        {label:'1975',value:'1975'},
        {label:'1976',value:'1976'},
        {label:'1977',value:'1977'},
        {label:'1978',value:'1978'},
        {label:'1979',value:'1979'},
        {label:'1980',value:'1980'},
        {label:'1981',value:'1981'},
        {label:'1982',value:'1982'},
        {label:'1983',value:'1983'},
        {label:'1984',value:'1984'},
        {label:'1985',value:'1985'},
        {label:'1986',value:'1986'},
        {label:'1987',value:'1987'},
        {label:'1988',value:'1988'},
        {label:'1989',value:'1989'},
        {label:'1990',value:'1990'},
        {label:'1991',value:'1991'},
        {label:'1992',value:'1992'},
        {label:'1993',value:'1993'},
        {label:'1994',value:'1994'},
        {label:'1995',value:'1995'},
        {label:'1996',value:'1996'},
        {label:'1997',value:'1997'},
        {label:'1998',value:'1998'},
        {label:'1999',value:'1999'},
        {label:'2000',value:'2000'},
        {label:'2001',value:'2001'},
        {label:'2002',value:'2002'},
        {label:'2003',value:'2003'},
        {label:'2004',value:'2004'},
        {label:'2005',value:'2005'},
        {label:'2006',value:'2006'},
        {label:'2007',value:'2007'},
        {label:'2008',value:'2008'},
        {label:'2009',value:'2009'},
        {label:'2010',value:'2010'},
        {label:'2011',value:'2011'},
        {label:'2012',value:'2012'},
        {label:'2013',value:'2013'},
        {label:'2014',value:'2014'},
        {label:'2015',value:'2015'},
        {label:'2016',value:'2016'},
        {label:'2017',value:'2017'},
        {label:'2018',value:'2018'},
        {label:'2019',value:'2019'},
    ];

    const options4 = [
        {label:'Select Transmission' , value:'* Select Transmission'},
        {label:'Manual',value:'Manual'},
        {label:'Selespeed ',value:'Selespeed'},
        {label:'TCT',value:'TCT'},
        {label:'Automatic',value:'Automatic'},
    ];

    const options5 = [
        {label:'Rate How Reliable Is Your Alfa' , value:'* Rate How Reliable Is Your Alfa'},
        {label:'1',value:'1'},
        {label:'2',value:'2'},
        {label:'3',value:'3'},
        {label:'4',value:'4'},
        {label:'5',value:'5'},
    ];

    


      const optionSelector = options.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ));

      const optionSelector2 = options2.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ));

      const optionSelector3 = options3.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ));

      const optionSelector4 = options4.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ));

      const optionSelector5 = options5.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ));
      
    return (
    <div className='create-info-form-container'>
    <div className="card shadow p-3 bg-white rounded">
      <div className="createCarInfo">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto"> 
                    <div className="display-4 text-center">Add vehicle  information</div>
                    <p className="lead text-center">Add your current Alfa Romeo model information</p>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <select
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.model})}
                                placeholder="Alfa Romeo Model"
                                name="model"
                                value={this.state.model}
                                onChange={this.modelHandler}
                            >
                            {optionSelector}
                            </select>
                            <small className="form-text text-muted">* Choose your Alfa Romeo model</small>
                            {errors.model && <div className="invalid-feedback">{errors.model}</div>}
                        </div>

                        <div className="form-group">
                            <select
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.year})}
                                placeholder="Model Year"
                                name="year"
                                value={this.state.year}
                                onChange={this.yearHandler}
                            >
                            {optionSelector3}
                            </select>
                            <small className="form-text text-muted">* Year of manufacture?</small>
                            {errors.year && <div className="invalid-feedback">{errors.year}</div>}
                        </div>

                        <div className="form-group">
                            <select
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.gearBox})}
                                placeholder="gearBox"
                                name="gearBox"
                                value={this.state.gearBox}
                                onChange={this.gearBoxHandler}
                            >
                            {optionSelector4}
                            </select>
                            <small className="form-text text-muted">* What transmission it have?</small>
                            {errors.gearBox && <div className="invalid-feedback">{errors.gearBox}</div>}
                        </div>

                        <div className="form-group">
                            <select
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.timeOfOwnerShip})}
                                placeholder="Time Of Ownership"
                                name="timeOfOwnerShip"
                                value={this.state.timeOfOwnerShip}
                                onChange={this.timeOfOwnerShipHandler}
                            >
                            {optionSelector2}
                            </select>
                            <small className="form-text text-muted">* How much time do you own this vehicle ?</small>
                            {errors.timeOfOwnerShip && <div className="invalid-feedback">{errors.timeOfOwnerShip}</div>}
                        </div>

                        <div className="form-group">
                            <select
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.rating})}
                                placeholder="Rating"
                                name="rating"
                                value={this.state.rating}
                                onChange={this.ratingHandler}
                            >
                            {optionSelector5}
                            </select>
                            <small className="form-text text-muted">* How reliable is your vehicle ?</small>
                            {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
                        </div>

                        <div className="form-check mb-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="current"
                                value={this.state.current}
                                checked={this.state.current}
                                onChange={this.onCheck}
                                id="current"
                            />
                            <label htmlFor="current" className="form-check-label">
                                Still own it</label>
                        </div>

                        <div className="form-group">
                            <textarea
                                className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.personalReview})}
                                placeholder="Personal Review"
                                name="personalReview"
                                value={this.state.personalReview}
                                onChange={this.personalReviewHandler}
                            />
                            <small className="form-text text-muted">* Write a brief review about your experiences with owning this vehicle </small>
                            {errors.personalReview && <div className="invalid-feedback">{errors.personalReview}</div>}
                        </div>
                        <div className='buttons-container'>
                            <input type="submit" className="btn btn-success"/>
                            <a href="/dashboard" className="btn btn-danger">Go Back</a>
                        </div>
                    </form>
                </div>   
            </div>
        </div>
      </div>
      </div>
      </div>
    )
  }
}

CreateCarInfo.propTypes = {
    profile: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,
    createCarInfo: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile:state.profile,
    errors:state.errors
});

export default connect(mapStateToProps,{createCarInfo})(withRouter(CreateCarInfo));
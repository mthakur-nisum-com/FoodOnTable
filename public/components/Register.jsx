import React,{Component} from 'react';
import actions from '../js/Actions/Actions';
import { connect }  from 'react-redux';
import Actions from '../js/Actions/Actions';
import constants from '../js/constants/constants';
 let _this;
 class Register extends Component {
 	constructor(){
 		super();
 		_this=this;
 		/*this.setState({
 			profileObj:null
 		})*/
 	}
 	userValues(){
 		_this.state.registrationObj[this] =_this.refs[this].value;
 	}
 	handleClick(){
 		if(this.state.registrationObj){
 			this.props.dispatch({data:this.state.registrationObj,url:constants.registrationObj.url,requestType:constants.registrationObj.requestType,actionType:constants.registrationObj.actionType});
 			console.log(this.props)
 		}
 	}
 	render(){
 		return(
 			<section className="col-lg-offset-3 col-md-offset-3 content-section">
				<form className="col-lg-8 col-md-8 col-sm-12">
					<div className="row form-group">
						<label htmlFor="firstName">First Name:</label>
						<input type="text" id="firstName" className="form-control"  onChange={this.userValues.bind('firstName')} ref="firstName"/>
					</div>
					<div className="row form-group">
						<label htmlFor="lastName">Last Name:</label>
						<input type="text" id="lastName" className="form-control"  onChange={this.userValues.bind('lastName')} ref="lastName"/>
					</div>
					<div className="row form-group">
						<label htmlFor="emailId">Email:</label>
						<input type="email" id="emailId" className="form-control"  onChange={this.userValues.bind('emailId')} ref="emailId"/>
					</div>
					<div className="row form-group">
						<label htmlFor="password">Password:</label>
						<input type="password" id="password" className="form-control"  onChange={this.userValues.bind('password')} ref="password"/>
					</div>
					<div className="row form-group">
						<label htmlFor="confirmPassword">Confirm Password:</label>
						<input type="password" id="confirmPassword" className="form-control"  onChange={this.userValues.bind('confirmPassword')} ref="confirmPassword"/>
					</div>
					<div className="row form-group">
						<label htmlFor="phoneNumber">Phone No.</label>
						<input type="text" id="phoneNumber" className="form-control"  onChange={this.userValues.bind('phoneNumber')} ref="phoneNumber"/>
					</div>
					<div className="row form-group">
						<label htmlFor="address">Communication Address:</label>
						<textarea type="text" id="address" className="form-control"  onChange={this.userValues.bind('address')} ref="address"></textarea>
					</div>
					<div className="row form-group">
						<button className="btn btn-primary pull-right" onClick={this.handleClick.bind(this)} type="button">submit</button>
					</div>
				</form>
 			</section>

 		)
 	}
 	componentDidMount(){
 		this.setState({
 			registrationObj:{}
 		})
 		if(this.props.errorObj) {
 			console.log('hello')
 		}
 	}

 }
 const mapStateToProps= function (state){
	return {
		loginDetails:state.loginDetails,
		errorObj:state.errorObj,
		isRegisStrationSuccessFull:state.isRegisStrationSuccessFull,
	}
}
const matchPropsToDisptach = (dispatch)=>{
	return {
		dispatch:function(userObj){
			Actions.handleServiceRequest(dispatch,userObj);
		}
	}
}
 export default connect(mapStateToProps,matchPropsToDisptach)(Register);

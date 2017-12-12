import React,{Component} from 'react';
import { connect }  from 'react-redux';
import Actions from '../js/Actions/Actions';
import constants from '../js/constants/constants';
let _this;
class profile extends Component {

	constructor(){
		super();
		_this=this;
	}
	userValues(){
		if(!(Object.keys(_this.state.profileObj).length > 0 && _this.state.profileObj.constructor === Object)){
			_this.state.profileObj = _this.props.profileInformation;
		}
		_this.state.profileObj[this] =_this.refs[this].value;
	}
	handleClick(){
		this.props.dispatch({data:this.state.profileObj,actionType:constants.updateProfileObj.actionType,url:constants.updateProfileObj.url,requestType:constants.updateProfileObj.requestType})
	}
	render(){
		return(
			<section className="col-lg-offset-3 col-md-offset-3 content-section">
				<form className="col-lg-8 col-md-8 col-sm-12">
					<div className="row form-group">
						<label htmlFor="firstName">First Name:</label>
						<input type="text" id="firstName" className="form-control"  onChange={this.userValues.bind('firstName')} ref="firstName" value={this.props.profileInformation?this.props.profileInformation.firstName:null}/>
					</div>
					<div className="row form-group">
						<label htmlFor="lastName">Last Name:</label>
						<input type="text" id="lastName" className="form-control"  onChange={this.userValues.bind('lastName')} ref="lastName" value={this.props.profileInformation?this.props.profileInformation.lastName:null}/>
					</div>
					<div className="row form-group">
						<label htmlFor="emailId">Email:</label>
						<input type="email" id="emailId" className="form-control"  onChange={this.userValues.bind('emailId')} ref="emailId" value={this.props.profileInformation?this.props.profileInformation.userEmail:null}/>
					</div>
					<div className="row form-group">
						<label htmlFor="password">Password:</label>
						<input type="password" id="password" className="form-control"  onChange={this.userValues.bind('password')} ref="password" value={this.props.profileInformation?this.props.profileInformation.password:null}/>
					</div>
					<div className="row form-group">
						<label htmlFor="confirmPassword">Confirm Password:</label>
						<input type="password" id="confirmPassword" className="form-control"  onChange={this.userValues.bind('confirmPassword')} ref="confirmPassword" value={this.props.profileInformation?this.props.profileInformation.password:null}/>
					</div>
					<div className="row form-group">
						<label htmlFor="userPhoneNumber">Phone No.</label>
						<input type="text" id="userPhoneNumber" className="form-control"  onChange={this.userValues.bind('userPhoneNumber')} ref="userPhoneNumber" value={this.props.profileInformation?this.props.profileInformation.userPhoneNumber:null}/>
					</div>
					<div className="row form-group">
						<label htmlFor="address">Communication Address:</label>
						<textarea type="text" id="address" className="form-control"  onChange={this.userValues.bind('address')} ref="address" value={this.props.profileInformation?this.props.profileInformation.address:null}></textarea>
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
			profileObj:{}
		})
		this.props.dispatch({actionType:constants.profileObj.actionType,url:constants.profileObj.url,requestType:constants.profileObj.requestType});
		
	}
}
const mapStateToProps= function (state){
	return {
		userObj:state.userObj,
		profileInformation:state.userObj
	}
}
const matchPropsToDispatch = (dispatch)=>{
	return {
		dispatch:function(userObj){
			Actions.handleServiceRequest(dispatch,userObj);
		}
	}
}
export default connect(mapStateToProps,matchPropsToDispatch)(profile)
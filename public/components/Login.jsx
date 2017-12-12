import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { connect }  from 'react-redux';
import styles from '../css/login.css';
import linkState from 'react-link-state';
import Actions from '../js/Actions/Actions';
import constants from '../js/constants/constants';
let _this;
class Login extends Component {
	constructor(){
		super();
		this.state={
			loginObj:{
				userName:null,
				password:null
			}
		}
		_this=this;
	}
	userValues(){
		_this.state.loginObj[this] = _this.refs[this].value?_this.refs[this].value:null;
	}
	handleClick(){
		_this.props.dispatch({data:this.state.loginObj,url:constants.loginConfig.url,requestType:constants.loginConfig.requestType,actionType:constants.loginConfig.actionType});
		
	}
	render(){
		return(
			<section className="col-lg-offset-4 col-md-offset-4 content-section">
				<div className="col-lg-6 col-md-6 col-sm-9">
					<div className="row " id="login-Container">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<form>
								<div className="row form-group">
									<label htmlFor="userName">User Name:</label>
									<input type="text" id="userName" className="form-control" placeholder="Email or Phone Number"  onChange={this.userValues.bind('userName')} ref="userName"/>
								</div>
								<div className="row form-group">
									<label htmlFor="password">Password:</label>
									<input type="password" id="password" className="form-control" placeholder="password"  onChange={this.userValues.bind('password')} ref="password"/>
								</div>
								<div className="row form-group">
									<div className="col-md-8 col-sm-8">
										<p className="row">New here?<a href="#/profile"> Click here</a> to register.</p> 
									</div>
									<div className="col-md-4 col-sm-4">
										<input type="button" className="btn btn-primary pull-right" value="Get In" onClick={this.handleClick.bind(this)}/>
									</div>
									
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		)
	}
	componentDidMount(){
		/*console.log(this);*/
	}
}
const matchPropsToState = function (state){
	return {
		loginDetails:state.loginDetails,
		errorObj:state.errorObj,
		loginStatus:state.loginStatus,
	}

}
const matchPropsToDispatch = (dispatch)=>{
	return {
		dispatch:(userObj)=>{
			Actions.handleServiceRequest(dispatch,userObj)
		}
	}
}
export default connect(matchPropsToState,matchPropsToDispatch)(Login)
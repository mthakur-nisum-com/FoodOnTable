import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { connect }  from 'react-redux';
import styles from '../css/login.css';
import linkState from 'react-link-state';
import Actions from '../js/Actions/Actions';
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
		console.log(Actions)
		var result =_this.props.dispatch(Actions.validations(this.state.loginObj));
		if(_this.props.errorList.length) {
			console.log('hello')
		}
		
	}
	render(){
		return(
			<section className="col-lg-offset-4 col-md-offset-4 ">
				<div className="col-lg-6 col-md-6 col-sm-9">
					<div className="row " id="login-Container">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<form>
								<div className="row form-group">
									<label htmlFor="userName">User Name:</label>
									<input type="text" id="userName" className="form-control" placeholder="email.. or phone number.."  onChange={this.userValues.bind('userName')} ref="userName"/>
								</div>
								<div className="row form-group">
									<label htmlFor="password">Password:</label>
									<input type="password" id="password" className="form-control" placeholder="password"  onChange={this.userValues.bind('password')} ref="password"/>
								</div>
								<div className="row form-group">
									<input type="button" className="btn btn-primary pull-right" value="Get In" onClick={this.handleClick.bind(this)}/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		)
	}
	componentDidMount(){
		console.log(this);
	}
}
const mapStateToProps= function (state){
	return {
		loginDetails:state.loginDetails,
		errorList:state.errorList
	}
}
export default connect(mapStateToProps)(Login)
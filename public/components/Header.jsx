import React,{Component} from 'react';
import BootStrapJs from 'bootstrap/js/src/collapse';
import { connect } from 'react-redux';
import actions from '../js/Actions/Actions';
import constants from '../js/constants/constants';
class HeaderComponent extends Component {
	handleLogout(){
		this.props.dispatch({username:this.props.userId,userEmail:this.props.userEmail,actionType:constants.logOutObj.actionType,url:constants.logOutObj.url,requestType:constants.logOutObj.requestType})
	}
	render(){
		return (
			<header className="row header-section">
				
				<section className="pull-left">
					<a href="#" className="logo_section" title="Food at Table" alt="Food at Table">Food at Table</a>
				</section>
				<section className="pull-right">
					<nav className="navbar navbar-expand-lg navbar-light bg-light app-header">
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
						      <li className="nav-item active">
						       <a href="#/home">Home</a>
						      </li>
						      <li className="nav-item">
						        <a href="#/profile">profile</a>
						      </li>
						      <li className="nav-item">
						        <a href="#/myPage">myPage</a>
						      </li>
						      <li className={this.props.userObj?'collapse':'nav-item'}>
						        <a href="#/login">login</a>
						      </li>
						      <li className={this.props.userObj?'nav-item':'collapse'}>
						        <a href="javascript:void(0);" onClick={this.handleLogout.bind(this)}>logout</a>
						      </li>
						      <li className={this.props.userObj?'collapse':'nav-item'} >
						        <a href="#/register">register</a>
						      </li>
						    </ul>
						 </div>
					</nav>
				</section>
			</header>
		)
		
	}
	componentDidMount(){
		console.log(this.props)
	}
}
const mapStateToProps= (state)=>{
	return {
		userObj:state.userObj
	}
}
const matchPropsToDispatch = (dispatch)=>{
	return {
		dispatch:function(userObj){
			actions.handleServiceRequest(dispatch,userObj);
		}
	}
}
export default connect(mapStateToProps,matchPropsToDispatch)(HeaderComponent)
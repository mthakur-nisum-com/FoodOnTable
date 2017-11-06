import React,{Component} from 'react';
import BootStrapJs from 'bootstrap/js/src/collapse';
import { connect }            from 'react-redux';
class HeaderComponent extends Component {
	render(){
		return (
			<header className="row header-section">
				
				<section className="pull-left">
					logo section
				</section>
				<section className="pull-right">
					<nav className="navbar navbar-expand-lg navbar-light bg-light app-header">
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					   	 	<span className="navbar-toggler-icon"></span>
					  	</button>
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
						      <li className="nav-item">
						        <a href="#/login">login</a>
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
const mapStateToProps= function (state){
	return {
		userDetails:state.userDetails
	}
}
export default connect(mapStateToProps)(HeaderComponent)
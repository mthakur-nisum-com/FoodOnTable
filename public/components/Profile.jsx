import React,{Component} from 'react';
import { connect }  from 'react-redux';
class profile extends Component {
	render(){
		return(
			<section className="col-lg-offset-3 col-md-offset-3">
				<form>
					<form>
						<div className="row form-group">
							<label htmlFor="firstName">First Name:</label>
							<input type="text" id="firstName" className="form-control" placeholder="email.. or phone number.."  onChange={this.userValues.bind('userName')} ref="userName"/>
						</div>
						<div className="row form-group">
							<label htmlFor="password">Password:</label>
							<input type="password" id="password" className="form-control" placeholder="password"  onChange={this.userValues.bind('password')} ref="password"/>
						</div>
						<div className="row form-group">
							<input type="button" className="btn btn-primary pull-right" value="Get In" onClick={this.handleClick.bind(this)}/>
						</div>
					</form>
				</form>
			</section>
		)

	}
	componentDidMount(){
		console.log(this.props)
	}
}
const mapStateToProps= function (state){
	return {
		profileInformation:state.profileInformation
	}
}
export default connect(mapStateToProps)(profile)
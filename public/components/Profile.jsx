import React,{Component} from 'react';
import { connect }  from 'react-redux';
class profile extends Component {
	render(){
		return(
			<section>
				profile view
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
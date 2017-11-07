import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import AppRouter  from './Router.jsx';

 class MainComponent extends Component {
	render(){
		return(
			<div className="container-fluid" id="main-Container">
				<AppRouter />
			</div>
		)
	}
}
module.exports = {
	renderComponent:function(elem){
		ReactDOM.render(<MainComponent/>,document.getElementById(elem));
	},
	loadGoogleMap:function(elem){
		if(elem){
			console.log(elem)
		}
	}
}
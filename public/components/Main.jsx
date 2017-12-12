import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import AppRouter  from './Router.jsx';
import { Provider,connect } from 'react-redux';
import { createStore,applyMiddleware  } from 'redux';
import reducer from '../js/Reducer/reducer';
const store = createStore(reducer);
 class MainComponent extends Component {
	render(){
		return(
			<div className="container-fluid" id="main-Container">
					<AppRouter />
					{this.props.showLoader}
			</div>
		)
	}
	componentDidMount(){
		console.log(this)
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
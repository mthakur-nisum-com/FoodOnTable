import React,{Component} from 'react';
import loaderStyles from '../css/loader.css';

export default class LoaderComponent extends Component{
	render(){
		return(
			<div className="loader">
			    <span className="ball"></span>
			    <span className="ball2"></span>
			    <ul>
			        <li></li><li></li><li></li><li></li><li></li>
			    </ul>
			</div>
		)
	}
}
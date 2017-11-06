import React,{Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
export default class Layout extends  Component {
	constructor(){
		super();
		console.log(this)
	}
	render(){
		return(
			<div className="col-md-12 col-lg-12 col-sm-12">
				<Header/>
					{this.props.children}
				<Footer/>
			</div>
		)
		
	}
	componentDidMount(){
		if(window.location.hash === '#/'){
			window.location.href="#/home";
		}
	}
}
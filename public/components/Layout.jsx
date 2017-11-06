import React,{Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from '../css/main.css';

export default class Layout extends  Component {
	constructor(){
		super();
		//console.log(this)
	}
	render(){
		return(
			<main>
				<Header/>
					{this.props.children}
				<Footer/>
			</main>
		)
		
	}
	componentDidMount(){
		if(window.location.hash === '#/'){
			window.location.href="#/home";
		}
		//console.log(this)
	}
}

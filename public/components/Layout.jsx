import React,{Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from '../css/main.css';
import { Provider,connect } from 'react-redux';
import Loader from './Loader.jsx';
 class Layout extends  Component {
	constructor(){
		super();
		//console.log(this)
	}
	render(){
		return(
			<div className="row">
				<main className="container">
					<Header/>
						{this.props.children}
					<Footer/>
					<div className={this.props.showLoader?'loader-container':'collapse'}>
						<Loader/>
					</div>
				</main>
				
			</div>

		)
		
	}
	componentDidMount(){
		console.log(this)
	}
}
const matchStateToProps=(state)=>{
	return {
		showLoader:state.showLoader
	}
}
export default connect(matchStateToProps)(Layout)



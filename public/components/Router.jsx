import React,{Component} from 'react';
import { HashRouter as Router, Route,browserHistory } from 'react-router-dom'; 
import {Content} from './Content.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import MyPage from './myPage.jsx';
import Login from './Login.jsx';
import Layout from './Layout.jsx';
import $ from 'jquery';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../js/Reducer/reducer';
const store = createStore(reducer,{friendList:[]});
export default class AppRouter extends Component {
	render(){
		return(
			<div className="col-lg-12 col-md-12 col-sm-12">
				<Provider store={store}>
					<Layout>
						<Router name="FoodonTable" history={browserHistory}>
							<section className="row">
								<Route path="/" component={Content} />
								<Route path="/home" component={Home} />
								<Route path="/login" component={Login} />
								<Route path="/profile" component={Profile} />
								<Route path="/myPage" component={MyPage} />
							</section>
						</Router>
					</Layout>
				</Provider>
			</div>
		)

	}
}
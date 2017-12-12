import React,{Component} from 'react';
import { HashRouter as Router, Route,browserHistory } from 'react-router-dom'; 
import Content from './Content.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import MyPage from './myPage.jsx';
import Login from './Login.jsx';
import Layout from './Layout.jsx';
import Register from './Register.jsx';
import {render} from 'react-dom';
import $ from 'jquery';
import { createStore,applyMiddleware  } from 'redux';
import { Provider,connect } from 'react-redux';
import reducer from '../js/Reducer/reducer';
import thunk from 'redux-thunk';
const store = createStore(reducer,applyMiddleware(thunk));
export default class AppRouter extends Component {
	render(){
		return(
			<div className="col-lg-12 col-md-12 col-sm-12">
				<Provider store={store}>
					<Layout>
						<Router name="FoodonTable" history={browserHistory}>
							<section className="row">
								<Route exact path="/" component={Content} />
								<Route exact path="/home" component={Home} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/profile" component={Profile} />
								<Route exact path="/myPage" component={MyPage} />
								<Route exact path="/register" component={Register} />
							</section>
						</Router>
					</Layout>
				</Provider>
			</div>
		)

	}
}

store.subscribe(()=>{
	/*if(store.getState().isRegisStrationSuccessFull || window.localStorage.getItem('user_token') !== "undefined" ||  window.localStorage.getItem('user_token') !== "null") {
		window.location.href='#/profile';
	}*/
})
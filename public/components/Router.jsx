import React from 'react';
import { HashRouter as Router, Route,browserHistory } from 'react-router-dom'; 
import {Content} from './Content.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import MyPage from './myPage.jsx';
import Login from './Login.jsx';
import Layout from './Layout.jsx';
export default class AppRouter extends React.Component {
	render(){
		return(
			<div className="row">
				<Layout>
					<Router name="FoodonTable" history={browserHistory}>
						<div className="col-md-12 col-sm-12">
							<Route path="/" component={Content}/>
							<Route path="/home" component={Home}/>
							<Route path="/login" component={Login}/>
							<Route path="/profile" component={Profile}/>
							<Route path="/myPage" component={MyPage}/>
						</div>
					</Router>
				</Layout>
			</div>
		)

	}
}
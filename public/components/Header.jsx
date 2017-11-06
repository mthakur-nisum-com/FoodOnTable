import React from 'react';

export default class HeaderComponent extends  React.Component {
	render(){
		return (
			<div className="row">
				<nav className="nav">
					<a href="#">Home</a>
					<a href="#/profile">profile</a>
					<a href="#/myPage">myPage</a>
					<a href="#/login">login</a>

				</nav>
			</div>
		)
		
	}
}
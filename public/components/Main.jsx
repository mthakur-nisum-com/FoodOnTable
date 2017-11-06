import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter  from './Router.jsx';
export default class MainComponent extends React.Component {
	render(){
		return(
			<div>
				<AppRouter />
			</div>
		)
	}
}
ReactDOM.render(<MainComponent/>,document.getElementById('root'));
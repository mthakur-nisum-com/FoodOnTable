import React from 'react';
import {render} from 'react-dom';
export default class MainComponent extends React.Component {
	render(){
		return(
			<div>hello world</div>
		)
	}
}
render(<MainComponent/>,document.getElementById('root'));
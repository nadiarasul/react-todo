var React = require('react');
var ReactDOM = require('react-dom');


let App = React.createClass({
	render(){
		return (<h1>Hello There</h1>);
	} 
});


ReactDOM.render(<App/>, document.getElementById('app'));




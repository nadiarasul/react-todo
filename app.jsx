// include the react module in our file so we can reference it's methods. 
// because it was listed as a dependency in our package.json file, when we run npm install these libraries are added to our node modules folder. 
var React = require('react');
var ReactDOM = require('react-dom');

// this creates our first react component. All you need to make it go is to write a render function that renders some JSX. 
let App = React.createClass({
	render(){
		return (<h1>Hello There</h1>);
	} 
});

// to put it on the page, this function takes 2 params: the component as well as the DOM element to append it to. 
ReactDOM.render(<App/>, document.getElementById('app'));





/*
PSEUDOCODE FOR OUR REACT TO DO LIST
1. look over the code we have so far. 
2. add an initial state to the app component that returns an ARRAY of toDos. 
3. move the UL to it's own component called ToDoList. this component will have a prop which is equal to the toDoList from our app state.
4. We want to be able to grab data from the form on submit, so let's add a method called addItem that uses the 'ref' attribute to get the value of what the user typed in. let's start by console logging the value. 
5. We also want to check to see if the user didn't enter anything, and only do something if an actual value was entered. 
6. IF an actual value was entered, we want to update our application state to include this new item. We can do this using this.setState()
7. Let's check if all of this is working by going into react dev tools and seeing if state is being updated, and seeing if the data is being passed down as a prop to our ToDoList component. 
8. On to the ToDoList. We have an array of to dos that we want to display on the page - so let's map through it and return a ToDo which can be another component! We can call our map method on the array right inside our JSX with {}
9. when mapping through an array in react, we need to add a key property with a unique value so that react can distinguish between components. let's also pass the value (string) as a prop so that we can populate the text of each to do item.
10. Working on our ToDo component, let's grab the value out of the props and have it display the actual to do item we want to display. 
11. Finally, lets add some UX by having an onClick method that calls a markAsDone method that will switch out our font awesome icon for the checked one. 

(if we're running out of time, here's the code to go in that method - we're doing the toggle class with vanilla JS here!)
var checkbox = ReactDOM.findDOMNode(this).children[0];
		if(checkbox.classList.contains('fa-circle-thin')){
			checkbox.classList.remove('fa-circle-thin');
			checkbox.classList.add('fa-check-circle');
		} else{
			checkbox.classList.remove('fa-check-circle');
			checkbox.classList.add('fa-circle-thin');
		}

*/


// include the react module in our file so we can reference it's methods. 
// because it was listed as a dependency in our package.json file, when we run npm install these libraries are added to our node modules folder. 
var React = require('react');
var ReactDOM = require('react-dom');


// this creates our first react component. All you need to make it go is to write a render function that renders some JSX. 
var App = React.createClass({
	render: function(){
		//notice how there are some differences between html and jsx - here, we have to use className instead of class for example. also there MUST be a top level parent element. 
		return (
			<div action="" className="app">
				<form onSubmit={this.addItem}>
					<h1><i className="fa fa-hand-peace-o" aria-hidden="true"></i> Do</h1>
					<input type="text" placeholder="Add a new to do..." ref="item"/>
				</form>
				<ul>
					<li>
						<i className="fa fa-circle-thin" aria-hidden="true"></i>
						a to do item
					</li>
				</ul>
			</div>
			);
	} 
});




// to put it on the page, this function takes 2 params: the component as well as the DOM element to append it to. 


ReactDOM.render(<App/>, document.getElementById('app'));




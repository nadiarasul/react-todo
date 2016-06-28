
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
var AutosizeInput = require('react-input-autosize');

//Firebase
var Rebase = require('re-base');
var base = Rebase.createClass('https://react-todo-3adce.firebaseio.com/');

// this creates our first react component. All you need to make it go is to write a render function that renders some JSX. 
var App = React.createClass({
	getInitialState: function(){
		return{
			toDos:[],
			name: 'enter name',
			editName: false
		}
	},
	componentDidMount : function() {
	    base.syncState('toDos', {
	      context : this,
	      state : 'toDos',
	      asArray: true
    	});

    	var localStorageRef = localStorage.getItem(this.props.toDos);

    	if(localStorageRef){
    	  this.setState({
    	    toDos: JSON.parse(localStorageRef)
    	  });
    	}

	},
	componentWillUpdate: function(nextProps, nextState){
		localStorage.setItem(this.props.toDos, JSON.stringify(nextState.toDos));
	},
	addItem:function(e){
		e.preventDefault();
		console.log(this.refs.item.value);
		var item = this.refs.item.value;
		ReactDOM.findDOMNode(this.refs.item).value = "";
		if (item != ''){
			this.setState({
				toDos: this.state.toDos.concat([item])
			})
		}

	},
	updateInputValue (input, event) {
		var newState = {};
		newState[input] = event.target.value;
		this.setState(newState);
	}, 
	updateName:function(e){
		if(e.which === 13) {
			this.setState({
				editName: false
			});
		}
	},
	showUpdate: function() {
		this.setState({
			editName: true
		});
	},
	render: function(){
		//notice how there are some differences between html and jsx - here, we have to use className instead of class for example. also there MUST be a top level parent element. 
		var displayName = (
			<span onDoubleClick={this.showUpdate}>{this.state.name}</span>
		);
		if(this.state.editName) {
			displayName = (
				<AutosizeInput
					value={this.state.name}
					onChange={this.updateInputValue.bind(this, 'name')}
					onKeyPress={this.updateName}
					style={{padding: 5 }}
					inputStyle={{ background: 'transparent', border: 0, borderBottom: '3px solid #FFF', padding:'0 15px', outline: 'none', color: '#FFF'}}
					ref="username"
				/>
			);
		}
		return (
			<div action="" className="app">
			<h1>Welcome  {displayName}!</h1>
				<form onSubmit={this.addItem}>
					<h1><i className="fa fa-hand-peace-o" aria-hidden="true"></i> To Do</h1>
					<input type="text" placeholder="Add a new to do..." ref="item"/>
				</form>
				<ToDoList toDos={this.state.toDos} />
			</div>
			);
	} 
});
var ToDoList =  React.createClass({
	renderToDos: function(item, index){
		return <ToDo key={index} toDoItem = {item}/>

	},
	render: function(){
		return (
			<ul>
				{this.props.toDos.map(this.renderToDos)}
			</ul>
		)
	}
});

var ToDo = React.createClass({
	onClick : function(){
		var checkbox = ReactDOM.findDOMNode(this).children[0];
			if(checkbox.classList.contains('fa-circle-thin')){
				checkbox.classList.remove('fa-circle-thin');
				checkbox.classList.add('fa-check-circle');
			} else{
				checkbox.classList.remove('fa-check-circle');
				checkbox.classList.add('fa-circle-thin');
			}
	},		
	render: function(){
		return (
			<li>
				<i onClick={this.onClick} className="fa fa-circle-thin" aria-hidden="true"></i>
				{this.props.toDoItem}
				<i className="fa fa-times" aria-hidden="true"></i>	
			</li>
			)
	}
});



// to put it on the page, this function takes 2 params: the component as well as the DOM element to append it to. 


ReactDOM.render(<App/>, document.getElementById('app'));




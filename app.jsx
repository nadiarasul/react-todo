
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

*/


// include the react module in our file so we can reference it's methods. 
// because it was listed as a dependency in our package.json file, when we run npm install these libraries are added to our node modules folder. 
var React = require('react');
var ReactDOM = require('react-dom');
var AutosizeInput = require('react-input-autosize');

var ReactFireMixin = require('reactfire');

var Catalyst = require('react-catalyst');

// this creates our first react component. All you need to make it go is to write a render function that renders some JSX. 

var App = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      items: [],
      text: '',
      name: 'enter name',
      editName: false,
    };
  },
  // componentWillUpdate(nextProps, nextState) {
  //   localStorage.setItem('name', JSON.stringify(nextState.name));
  // },

  componentWillMount: function() {
    var firebaseRef = firebase.database().ref('todoApp/items');;
    this.bindAsArray(firebaseRef.limitToLast(25), 'items');

    var localStorageRef = localStorage.getItem('name');

    if(localStorageRef) {
      // update our component state to reflect what is in localStorage
      this.setState({
        name : localStorageRef
      });
    }
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  removeItem: function(key) {
    var firebaseRef = firebase.database().ref('todoApp/items');;
    firebaseRef.child(key).remove();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.text && this.state.text.trim().length !== 0) {
      this.firebaseRefs['items'].push({
        text: this.state.text
      });
      this.setState({
        text: ''
      });
    }
  },
  updateInputValue (input, event) {
  	var newState = {};
  	newState[input] = event.target.value;
  	this.setState(newState);
  }, 
  updateName:function(e){
  	if(e.which === 13) {
      localStorage.setItem('name',this.state.name);
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
  render: function() {
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
  			/>
  		);
  	}
    return (
      <div className="app">
      	<h1>Welcome {displayName}!</h1>
        <form onSubmit={ this.handleSubmit }>
        <h1><i className="fa fa-hand-peace-o" aria-hidden="true"></i> To Do</h1>
          <input onChange={ this.onChange } value={ this.state.text } />
        </form>
        <TodoList items={ this.state.items } removeItem={ this.removeItem } />
      </div>
    );
  }
});

var TodoList = React.createClass({	
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <li key={index} >
          { item.text }
          <span onClick={ _this.props.removeItem.bind(null, item['.key']) }
                style={{ color: 'red', marginLeft: '10px' }}>
            x
          </span>
        </li>
      );
    };
    return <ul>{ this.props.items.map(createItem) }</ul>;
  }
});

ReactDOM.render(<App />, document.getElementById('app'));





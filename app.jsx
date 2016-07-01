// Include the react module in our file so we can reference it's methods. 
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

  componentWillMount: function() {
    var firebaseRef = firebase.database().ref('todoApp/items');;
    this.bindAsArray(firebaseRef.limitToLast(20), 'items');

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
  		<span className="username" onClick={this.showUpdate} onTouchStart={this.showUpdate}>{this.state.name}</span>
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
      	<h1 className="welcome">Welcome, {displayName}!</h1>
        <div className="content">
          <form onSubmit={ this.handleSubmit }>
           <h1><i className="fa fa-star" aria-hidden="true"></i> What do you need to do today?</h1>
            <input onChange={ this.onChange } value={ this.state.text } />
          </form>
          <TodoList items={ this.state.items } removeItem={ this.removeItem } />
        </div>
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
                className="delete">
            x
          </span>
        </li>
      );
    };
    return <ul>{ this.props.items.map(createItem) }</ul>;
  }
});

ReactDOM.render(<App />, document.getElementById('app'));





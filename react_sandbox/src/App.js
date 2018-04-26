import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, {StyleRoot} from 'radium';

import ValidationComponent from './Assignment/ValidationComponent/ValidationComponent';
import Char from './Assignment/Char/Char';

class App extends Component {
	state = {
		persons: [
			{
				name: 'Zoli'
				, age: 27
				, id: 1
			},
			{
				name: 'Márti'
				, age: 24
				, id: 2
			},
			{
				name: 'foo'
				, age: 18
				, id: 3
			}
		],
		showPersons: true,
		userInput: ''
	};

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex]
		};

		person.name = event.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState({persons: persons});
	};

	deletePersonHandler = (personIndex) => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({persons: persons});
	};

	togglePersonsHandler = () => {
		this.setState({showPersons: !this.state.showPersons})
	};

	inputChangedHandler = (event) => {
		const userInput = event.target.value;

		this.setState({userInput: userInput});
	};

	deleteCharHandler = (index) => {
		const text = this.state.userInput.split('');
		text.splice(index, 1);
		const updatedText = text.join('');
		this.setState({userInput: updatedText});
	};

	render() {
		const style = {
			backgroundColor: 'green',
			color: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer',
			':hover': {
				backgroundColor: 'lightgreen',
				color: 'black'
			}
		};

		let persons = null;

		if(this.state.showPersons){
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return <Person name={person.name} age={person.age} key={person.id} click={() => this.deletePersonHandler(index)} changed={(event) => this.nameChangedHandler(event, person.id)} />
					})}
				</div>
			);
			
			style.backgroundColor = 'red';
			style[':hover'] = {
				backgroundColor: 'salmon',
				color: 'black'
			};
		}

		const classes = [];
		if(this.state.persons.length <= 2){
			classes.push('red');
		}
		if(this.state.persons.length <= 1){
			classes.push('bold');
		}

		const charList = this.state.userInput.split('').map((ch, index) => {
			return <Char character={ch} key={index} clicked={() => this.deleteCharHandler(index)} />
		});

		return (
			<StyleRoot>
				<div className="App">
					<h1>Hello</h1>
					<p className={classes.join(' ')}>This is working!</p>
					<button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
					{persons}

					<hr />
					<input type="text" onChange={this.inputChangedHandler} value={this.state.userInput} />
					<p>{this.state.userInput}</p>
					<ValidationComponent inputLength={this.state.userInput.length} />

					{charList}
				</div>
			</StyleRoot>
		);
	}
}

export default Radium(App);

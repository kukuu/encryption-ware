import React from 'react';
//Using Higher Order Components
//Create a Higher order component
const HOC = (InnerComponent) => class extends React.Component {

	// Create a constuctor and set context on super() with default states
	constructor(){
		super();
		this.state {count:0}
	},

	update(){
		this.setState({count: this.state.count + 1})
	}

	// Add some life cycle methods
	componentWillMount() {
		console.log('Wil Mount')
	},


	render(){
		//return (<InnerComponent />) 
		// The above won't work after passing the HOC to the components. Need to use the spread operator to extend the props and
		//actions and states

		return (
			<InnerComponent  
				{...this.props}
				{...this.state} 
				update = {this.update.bind(this)}
			/>
		) 
	}
}

class App extends React.Component {


	// Add some life cycle methods
	componentWillMount() {
		console.log('Label wil Mount')
	},

	//Render a Button and Label Components
	//Changed <Label></Label> to <LabelHOC></LabelHOC>
	render(){
		return (
			<div>
				<Button></Button> 
				<hr />
				<LabelHOC></LabelHOC>
			</div>

		)
	}
}

//Stateless
//Using the HOC on the const Button component. 
//This is wrapped into the HOC as an argument since it is is constant and stateless

//const Button = (props) => <button>{props.children}</button> 
const Button = HOC((props) => <button onClick = {props.update}>{props.children} - {props.count}</button>) 

class Label extends React.Component {

	// Add some life cycle methods
	componentWillMount() {
		console.log('Label wil Mount')
	},

	render() {
		return(
			<label onMouseMove = {this.props.update}>{this.props.children} - {this.props.count}</label
		)
	}
}

// For the label, we create a new component and as its value we inject the component as an argument of the HOC

const LabelHOC = HOC(label);


export default App;
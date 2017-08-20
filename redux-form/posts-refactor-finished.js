//Author Alexander Adu-Sarkodie
//TODO: Refactor form with HOC and lodash, and listoption methods
	//Create a config object of types, mapping the controllers
	// create an object dependencies for the types
	//Use redux Form Helper methods to pass object types and drill down to leaf nodes

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';


// values will be string
//const FIELDS = ['title','categories','content']
//the FIELDS configuraion will have TYPES (title,categories,content) related to the fields in the form
//The TYPES will be the names in the fields
//Each TYPE is an object with key/value pairs

const FIELDS = {

	title: {
		type: 'input',
		label: 'Title for post'
	},

	categories: {
		type: 'input',
		label: 'Enter some categories for this post'
	},

	content: {
		type: 'textarea',
		label: 'Post Contents'
	}

};

//Buiding a Blog Post
class PostsNew extends Component {

	onSubmit(props) {
		alert('Post Submitted');//test
	}

	//create a function to build re-usable dynamic template for the view content area of the form
	//the 2 signatures are a type (fieldConfig- maps on to each FIELDS config type object) and field in it's context

	renderField(fieldConfig, field) {

		//We call on redux-form fieldHelber object.This will help with stepping through error with each field instance
		const fieldHelper = this.props.fields[field];

		//return the dynamic view template. This is a high order component
		return(
			<div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : '' }`}>
				<label>{fieldConfig.label}</label>
				<fieldConfig.type type="text" className="form-control"  {...fieldHelper} />
				<div className="text-help">
					{fieldHelper.touched ? fieldHelper.error : ''}
				</div>	
			</div>
		)
	}


	render(){
		const { fields: { handleSubmit } = this.props; //field lables and action(s). Stateless. title, categories and content have been removed

		//form with interpolation
		return (
			<form onSubmit={handleSubmit(props => this.onSubmit(props))} >
				<h3>Create A New post</h3>

				<!--Replace with reference to HOC (renderField):: Use _.map()-->
					{_.map(FIELDS, this.renderField.bind(this))}

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn-danger">Cancel</Link>
			</form>
		);
	}
}

//Validating fuuction
function validate(values) {
	const errors {};

	//Use lodash. each function to loop throughthe configuration object with TYPES
	_.each(FIELDS,(type, field)) => {

		//check the array of fields on each instance signature (values)
		if(!values[field]) {
			errors[field] = `Enter a ${field}`
		}
	}

	return errors;
}


//Migrating to global scope
export default reduxForm({
	form: 'PostsNews',
	//Enter the magic of lodash to inject the fields array
	fields: _.keys(FIELDS),
	validate
})(PostsNews);

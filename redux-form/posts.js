//Author Alexander Adu-Sarkodie
//TODO: Refactor form with HOC and loadash, and listoption methods
	//Create a config object of types, mapping the controllers
	// create an object dependencies for the types
	//Use redux Form Helper methods to pass object types and drill down to leaf nodes
import react, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

//Buiding a Blog Post
class PostsNew extends Component {

	onSubmit(props) {
		alert('Post Submitted');//test
	}

	render(){
		const { fields: { title, category, content}, handleSubmit} = this.props; //field lables and action(s). Stateless.

		//form with interpolation
		return (
			<form onSubmit={handleSubmit(props => this.onSubmit(props))} >
				<h3>Create A New post</h3>
				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : '' }`}>
					<label>Title</label>
					<input type="text" className="form-control"  {...title} />
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : '' }`}>
					<label>Categories</label>
					<input type="text" className="form-control"  {...categories} />
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : '' }`}>
					<label>Content</label>
					<input type="text" className="form-control"  {...content} />
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn-danger">Cancel</Link>
			</form>
		);
	}
}

//Validating fuunction
function validate(values) {
	const errors {};

	if(!values.title) {
		errors.title = 'Enter title';
	}

	if(!values.categories) {
		errors.categories = 'Enter categories';
	}

	if(!values.content) {
		errors.content = 'Enter content';
	}

	return errors;
}


//Migrating to global scope
export default reduxForm({
	form: 'PostsNews',
	fields: ['title', 'categories', 'content'],
	validate
})(PostsNews);

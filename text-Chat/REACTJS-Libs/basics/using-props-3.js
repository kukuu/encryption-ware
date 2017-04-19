/*PROPS

When we use our defined components, we can add attributes called props. 
These attributes are available in our component as this.props 
and can be used in our render method to render dynamic data:*/


var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Hello, {this.props.name}!</h1>
        );
    }
});

ReactDOM.render(<MyComponent name="Handsome" />, document.getEleme
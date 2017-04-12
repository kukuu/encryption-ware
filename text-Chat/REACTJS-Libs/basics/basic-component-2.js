/*COMPONENTS

When using the ReactDOM’s render method above, our first
 argument is the component we want to render, 
 and the second is the DOM node it should mount to. We 
 can use the createClass method to create custom component classes. 
 It takes an object of specifications as it’s argument. Lets create one below:*/


var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Hello, world!</h1>
        );
    }
});

After creating a class we can render it to our document like so:*/


ReactDOM.render(
    <MyComponent/>,
    document.getElementById('myDiv')
);
Cool, huh?
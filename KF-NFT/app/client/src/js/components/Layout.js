import React from "react";
import Body from "./Body";
import Form from './Form';

class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="container custom-body">
          <h1 className="card-heading">Kingfisher</h1>
          <h3>INTELLIGENT NETWORK SECURITY</h3>
        <Body />
        <Form />
      </div>
    );
  }
}
/*
 * Main Layout Class(Template) to accomodate whole page  
*/
export default Layout;

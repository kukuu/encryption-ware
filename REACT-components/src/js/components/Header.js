import React from "react";

class Header extends React.Component {
  render() {
    const welcomMessage = "Cyber Threat Forensic Tool";
    return (
      <header>
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">{welcomMessage}</a>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

/*
 * To accomodate header  
*/
export default Header;

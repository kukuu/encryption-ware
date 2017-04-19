import React from "react";

class Dashboard extends React.Component {
    render() {
        return (
            <div className="container custom-body">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 className="card-heading">Kingfisher</h1>
                        <h3>INTELLIGENT NETWORK SECURITY</h3>
                        <div class="well text-center">
                            <h5><strong> AUTHENTICATION CODE</strong></h5>
                            <p>Enter the six digit code provided by your 2FA device</p>
                            <form>
                                <input class="number-box" type="text" />
                                <input class="number-box" type="text" />
                                <input class="number-box" type="text" />
                                <input class="number-box" type="text" />
                                <input class="number-box" type="text" />
                                <input class="number-box" type="text" />
                                <p> </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;

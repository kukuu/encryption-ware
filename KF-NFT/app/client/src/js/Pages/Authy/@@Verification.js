import React from "react";

class Verificaion extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

            //to be extended with numerical input validation

            // email: '',
            // password: '',
            loading: false,
            numberOfTime: 1,
            errors: {}
        };
    }

    _onChange(e) {
        var localState = {};
        localState[e.target.name] = $.trim(e.target.value);
        this.setState(localState);
    }

    _formGroupClass(field) {
        var className = "form-group ";
        if (field) {
            className += " has-error";
        }
        return className;
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    _handleSubmit(e) {
        e.preventDefault();
        var errors = this._validate();
        if (Object.keys(errors).length !== 0) {
            this.setState({
                errors: errors
            });
            return;
        }

        var xhr = this._create();
        xhr.done(this._onSuccess.bind(this))
            .fail(this._onError.bind(this))
            .always(this.hideLoading.bind(this))
    }

    _validate() {

         //to be extended with numerical validation
         
        // var errors = {};
        // if (this.state.email === "") {
        //     errors.email = "Email is required";
        // }
        // if (this.state.password === "") {
        //     errors.password = "Password is required";
        // }
        return errors;
    }

    _create() {
        return $.ajax({
            url: 'http://localhost:3000/auth/login/',
            type: 'POST',
            data: {
                email: this.state.email,
                password: this.state.password
            },
            beforeSend: function () {
                this.setState({ loading: true });
            }.bind(this)
        })
    }


    _onSuccess(data) {
        if (data) {
            if (data.success) {
                this.setState({
                    errors: {}
                });

                console.log('83483838838',this.state);

                //hashHistory.push('/dashboard');
                hashHistory.push('/verified');
            }
        }
    }

    _onError(data) {
        if (!data.responseJSON.success) {
            let onErrors = {};
            onErrors.summary = data.responseJSON.message;
            this.setState({
                errors: onErrors
            });
        }
    }

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
                            
                                <div className="row">
                                    <div class="col-md-5 col-md-offset-3">
                                        {this.state.errors.summary && <p className="error-summary">{this.state.errors.summary}</p>}
                                    </div>
                                </div>

                                <input class="number-box" name="token-number" type="text" />
                                <input class="number-box" name="token-number" type="text" />
                                <input class="number-box" name="token-number" type="text" />
                                <input class="number-box" name="token-number" type="text" />
                                <input class="number-box" name="token-number" type="text" />
                                <input class="number-box" name="token-number" type="text" />
                                <p> </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Verificaion;








import React from "react";
import ReactDom from "react-dom";
//let ReactDom = require('react-dom');

class BMICalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bmi:0,
            height: 0,
            weight: 0
        }
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    renderBmiMessage() {
        if (this.state.height > 2.72) {
           window.alert('The tallest person ever recorded was Robert Wadlow (1918 - 1940) who was 2.72m tall. Is the patient in front of you REALLY taller than him?')
        return
        }
        if (this.state.weight > 635 ) {
            window.alert('The heaviest person documented was Jon Brower Minnoch who at his heaviest weighed 635kg, it used to take 13 members of nursing staff to turn him for linen changes. Is your patient REALLY heavier than him?? ')
        return
        }

        else if (this.state.bmi > 0 && this.state.bmi <= 18) {
            return(
                <div>
                    <span>BMI:</span> {this.state.bmi}
                    <br />
                    <p>Patient is: Underweight</p>
                </div>
                )
        } 

        else if (this.state.bmi > 18 && this.state.bmi <= 25) {
            return(                
                <div>
                <span>BMI:</span> {this.state.bmi}
                <br />
                <p>Patient is: Healthy</p>
                </div>
                )
        } 

        else if (this.state.bmi > 25 && this.state.bmi <= 30) {
            return(                
                <div>
                <span>BMI:</span> {this.state.bmi}
                <br />
                <p>Patient is: Overweight</p>
                </div>
                )
        } 

        else if (this.state.bmi > 30) {
            return(
                <div>
                <span>BMI:</span> {this.state.bmi}
                <br />
                <p>Patient is: Obese</p>
                </div>
                )
        }
        else if( isNaN(this.state.bmi) || this.state.bmi == 0) {
            if (isNaN(this.state.weight)) {

            }
            return (<p>Please check input</p>)
        }

    }
    handleClick() {
    var weight = this.state.weight;
    var height = this.state.height;
    this.setState({bmi: Math.round(weight / height / height * 10) / 10});
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});

    }
    render() {
        return (
        <div id="container">
            <div id="title-container">
                <span>BMI Calculator</span>
            </div>
            <form onSubmit={this.onFormSubmit}>
                <p className="text">Enter weight in kg:</p>
                <input type="text" value={this.state.weight} onChange={this.onChange} />
                <br />
                <p className="text">Enter height in meters:</p>
                <input type="text" value={this.state.height} onChange={this.onChange} />
                <br />
                <button type="button" onClick={this.handleClick}>BMI</button> <br/>
                <div id="output">
                {this.renderBmiMessage()}
                </div>
            </form>
        </div>
        )
    }
}
/*
* BMI component
*/
export default BMICalculator;

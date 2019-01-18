import React, { Component } from 'react';
import './button.scss';


class Button extends Component{

    state={
        number: 0
    }

    handleBtnAdd = () => {
        this.setState({number: this.state.number +1 })
    }
    handleBtnSubtract = () => {
        this.setState({number: this.state.number -1})
    }

    render(){
        return(
            <div className="main_container">
                <h1>{this.state.number}</h1>
                <button onClick={this.handleBtnAdd}>Add One</button>
                <button onClick={this.handleBtnSubtract}>Subtract One</button>
            </div>

        )
    }
}

export default Button;
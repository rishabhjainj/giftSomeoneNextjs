import React, { Component } from 'react'
import copy from "copy-to-clipboard";

export class CopyBoard extends Component {
    constructor() {
        super();
        this.state = {
            textToCopy: "Copy to Clipboard Demo!",

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.Copytext = this.Copytext.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            textToCopy: e.target.value,
        });
    }

    Copytext() {
        copy(this.state.textToCopy);

    }

    render() {
        const { textToCopy, btnText } = this.state;
        return ( 
            <div className = "container" >
                <div class = "row" className = "Copyhdr" >
                    <div class = "col-sm-12 btn btn-info" >
                        Copy to Clipboard Demo
                    </div>  
                </div >
                <div className = "Copytxt" >
                    <textarea className = "form-control" placeholder = "Enter Text"
                    onChange = { this.handleInputChange }/> 
                    <br />
                    <br />
                <button className = "btn btn-info" onClick = { this.Copytext } >
                    Copy to Clipboard 
                </button>  
                </ div >
            </div>  
        );
    }
}

export default CopyBoard
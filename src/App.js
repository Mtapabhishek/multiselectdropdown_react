import React, { Component } from "react";
import Dropdown from "./Dropdown";
import "./Dropdown.css";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: "Office Bengaluru 1",
                    value: "office1",
                    selected: false
                },
                {
                    id: 2,
                    name: "Office Bengaluru 2",
                    value: "office2",
                    selected: false
                },
                {
                    id: 3,
                    name: "Office_With_Space_And_Special",
                    value: "office3",
                    selected: false
                },
                {
                    id: 4,
                    name: "TestOffice 1",
                    value: "office4",
                    selected: false
                },
            ],
           
            
        };
    }
    render() {
        return (
            <div className="App">
                <Dropdown placeholder={'Select Options'} items={this.state.data}/> 
            </div>
        )
    }
}

export default App;
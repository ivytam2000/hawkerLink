import React from "react";
import ReactDOM from 'react-dom';

class Welcome extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        storeName: null,
        location: null,
        language: null,
      };
    }
    
    clickHandler(s, loc, lang){
        this.setState({
            storeName: s,
            location: loc,
            language: lang

        })
    }

    

    render() { 
    return <p> The store name is {this.props.storeName}. 
    The location is {this.props.location}. 
    The language spoken is {this.props.language}. </p>
    ; 
            }
}

export default Welcome;
import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import '../App.css';
import InfoText from "./InfoText";

class HawkerSearchBar extends React.Component {

  constructor(props, func) {
    super(props);
    this.state = {
      location: null,
      language: null,
      storeNameResult: null,
      locationResult: null,
      languageResult: null
    };
  }

  renderText() {
    return <InfoText location={this.state.locationResult} storeName={this.state.storeNameResult} language={this.state.languageResult} />
  }

  handleLocInputChange = (e) => {
    this.setState({ location: e.target.value });
  }

  handleLangInputChange = (e) => {
    this.setState({ language: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault(); // prevents browser refresh
    var data = this.props.searchHawker(this.state.location, this.state.language);

    data.then((result) => {
      if (Array.isArray(result) && result.length) {
        this.setState({ locationResult: result[0].location });
        this.setState({ storeNameResult: result[0].storeName });
        this.setState({ languageResult: result[0].language });
      } else {
        this.setState({ locationResult: 'not found' });
        this.setState({ storeNameResult: 'not found' });
        this.setState({ languageResult: 'not found' });
      }
    });
  }

  render() {
    return (
      <div>

        <div className="search-bar">
          <form className="subject-form" onSubmit={this.handleSubmit}>
            <TextField
              label="Location"
              type="text"
              name="Location"
              value={this.location}
              onChange={this.handleLocInputChange}
            />
            <TextField
              label="Language"
              type="text"
              name="Language"
              value={this.language}
              onChange={this.handleLangInputChange}
            />
            <Button type="submit" onClick={this.handleSubmit}>Search</Button>
          </form>
        </div>

        <div className="search-results">
          {this.renderText()}
        </div>

      </div>
    );
  }
}

export default HawkerSearchBar;
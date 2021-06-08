import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import './HawkerSearchBar.css'
import { InfoCard } from "./InfoCard";
import { Multiselect } from "multiselect-react-dropdown";

class HawkerSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      language: null,
      storeNameResult: null,
      locationResult: null,
      languageResult: null,
      locationoptions: [
        { Location: "North", id: 1 },
        { Location: "East", id: 2 },
        { Location: "West", id: 3 },
        { Location: "South", id: 4 },
        { Location: "Central", id: 5 },
      ],
      options: [
        { Language: "English", id: 1 },
        { Language: "Mandarin", id: 2 },
        { Language: "Hokkien", id: 3 },
        { Language: "Teochew", id: 4 },
        { Language: "Malay", id: 5 },
        { Language: "Tamil", id: 6 },
      ],
      languages: [],
      locations: []
    };
  }

  onSelectLocation = (selectedList, selectedItem) => {
    this.setState((state) => {
      state.locations = selectedList.map((loc) => loc.Location);
      console.log(state.locations);
    });
  }

  onSelectLanguage = (selectedList, selectedItem) => {
    this.setState((state) => {
      state.languages = selectedList.map((lang) => lang.Language);
      console.log(state.languages);
    });
  };

  handleLocInputChange = (e) => {
    this.setState({ location: e.target.value });
  };

  handleLangInputChange = (e) => {
    this.setState({ language: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevents browser refresh
    var data = this.props.searchHawker(
      this.state.location,
      this.state.language
    );

    data.then((result) => {
      if (Array.isArray(result) && result.length) {
        this.setState({ locationResult: result[0].location });
        this.setState({ storeNameResult: result[0].storeName });
        this.setState({ languageResult: result[0].language });
      } else {
        this.setState({ locationResult: "not found" });
        this.setState({ storeNameResult: "not found" });
        this.setState({ languageResult: "not found" });
      }
    });
  };

  render() {
    return (
      <div>
        <div className="search-bar">

          <div className="region">
               <p className="region-text"> Select a Region </p>
          </div>

          <div className="language">
               <p> Select a Language </p>
          </div>
          
            <div className="location-search">
              <Multiselect
                options={this.state.locationoptions}
                onSelect={this.onSelectLocation}
                onRemove={this.onSelectLocation}
                displayValue="Location"
              />
            </div>
            <div className="language-search">
        
              <Multiselect
                options={this.state.options}
                onSelect={this.onSelectLanguage}
                onRemove={this.onSelectLanguage}
                displayValue="Language"
              />
            </div>
          
            <form className="subject-form" onSubmit={this.handleSubmit}>
            <Button type="submit" style={{background: 'gray', color: 'white'}} onClick={this.handleSubmit}>
              Search
            </Button>
          </form>
        </div>

      </div>
    );
  }
}

export default HawkerSearchBar;

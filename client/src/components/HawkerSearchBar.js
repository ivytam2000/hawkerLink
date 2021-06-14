import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import './HawkerSearchBar.css'
import { InfoCard } from "./InfoCard";
import { Multiselect } from "multiselect-react-dropdown";
import { HawkerSearchResults } from "./HawkerSearchResults";

class HawkerSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      selectedLanguages:[],
      locations: [],
      data:[]
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
      state.selectedLanguages = selectedList;
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
      this.state.locations,
      this.state.languages
    );

    data.then((result) => {
      if (Array.isArray(result) && result.length) {
        this.setState({ data: result});
        // console.log(this.state.data);
      }
      // else {
      //   this.setState({ locationResult: "not found" });
      //   this.setState({ storeNameResult: "not found" });
      //   this.setState({ languageResult: "not found" });
      // }
    });

  };

  render() {
    return (
      <div>
        <div className="search-bar">

          <div className="region">
            <p className="region-text"> Select a region and language(s) you can speak to find hawkers that you can help! </p>
          </div>
          
          <div className="location-search">
            <Multiselect
              options={this.state.locationoptions}
              onSelect={this.onSelectLocation}
              onRemove={this.onSelectLocation}
              showCheckbox={true}
              displayValue="Location"
              placeholder="Region(s)"
              closeOnSelect={false}
            />
          </div>

          <div className="language-search">
            <Multiselect
              options={this.state.options}
              onSelect={this.onSelectLanguage}
              onRemove={this.onSelectLanguage}
              showCheckbox={true}
              displayValue="Language"
              placeholder="Language(s)"
              closeOnSelect={false}
            />
          </div>
          
          <form className="submit" onSubmit={this.handleSubmit}>
            <Button className="submit" type="submit" style={{background: 'gray', color: 'white'}} onClick={this.handleSubmit}>
              Search
            </Button>
          </form>
        </div>

        <HawkerSearchResults data={this.state.data} selectedLanguages = {this.state.selectedLanguages}userLanguages={this.state.languages}/>

      </div>
    );
  }
}

export default HawkerSearchBar;

import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";

class LanguageSearchBar extends React.Component {
  constructor(props, func) {
    super(props);
    this.state = {
      options: [
        { Language: "English", id: 1 },
        { Language: "Mandarin", id: 2 },
        { Language: "Hokkien", id: 3 },
        { Language: "Teochew", id: 4 },
        { Language: "Malay", id: 5 },
        { Language: "Tamil", id: 6 },
      ],
      languages: [],
    };
  }

  onSelect = (selectedList, selectedItem) => {
    this.setState((state) => {
      state.languages = selectedList.map((lang) => lang.Language);
      console.log(state.languages);
    });
  };

  render() {
    return (
      <div style={{ width: "90%", justifyContent: "center", display: "flex" }}>
        <div className="LanguageSearchBar">
          <Multiselect
            options={this.state.options}
            onSelect={this.onSelect}
            onRemove={this.onSelect}
            displayValue="Language"
          />
        </div>
      </div>
    );
  }
}

export default LanguageSearchBar;

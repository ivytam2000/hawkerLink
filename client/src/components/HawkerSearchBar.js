import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import './HawkerSearchBar.css'
import { InfoCard } from "./InfoCard";
import { Multiselect } from "multiselect-react-dropdown";
import { HawkerSearchResults } from "./HawkerSearchResults";
import { SearchHawker } from "../services/SearchHawker";

const LOCATION_CACHE ="LOCATION_CACHE"
const LANGUAGE_CACHE= "LANGUAGE_CACHE"
const HAWKER_CACHE= "HAWKER_CACHE"
export function HawkerSearchBar(){
 
  const locOptions = [
    { Location: "North", id: 1 },
    { Location: "East", id: 2 },
    { Location: "West", id: 3 },
    { Location: "South", id: 4 },
    { Location: "Central", id: 5 },
  ]

  const langOptions= [
    { Language: "English", id: 1 },
    { Language: "Mandarin", id: 2 },
    { Language: "Hokkien", id: 3 },
    { Language: "Teochew", id: 4 },
    { Language: "Malay", id: 5 },
    { Language: "Tamil", id: 6 },
  ]


  const [languageOptions] = useState(langOptions);
  const [locationOptions] = useState(locOptions);

  // fields

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const[data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(()=>{
    const storageLocation = JSON.parse(localStorage.getItem(LOCATION_CACHE))
    if(storageLocation){
      setSelectedLocations(storageLocation);
    }
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCATION_CACHE, JSON.stringify(selectedLocations))
  }, [selectedLocations])

  useEffect(()=>{
    const storageLanguages = JSON.parse(localStorage.getItem(LANGUAGE_CACHE))
    if(storageLanguages){
      setSelectedLanguages(storageLanguages);
    }
  }, [])

  useEffect(() =>{
    localStorage.setItem(LANGUAGE_CACHE, JSON.stringify(selectedLanguages))
  }, [selectedLanguages])

  useEffect(()=>{
    const storageData= JSON.parse(localStorage.getItem(HAWKER_CACHE))
    if(storageData){
      setData(storageData);
    }
  }, [])

  useEffect(() =>{
    localStorage.setItem(HAWKER_CACHE, JSON.stringify(data))
  }, [data])


  function onSelectLocation(selectedList, selectedItem){
      setSelectedLocations(selectedList)
      setLocations(selectedList.map((loc) => loc.Location))
  }

  function onSelectLanguage(selectedList, selectedItem){
      setSelectedLanguages(selectedList);
      setLanguages(selectedList.map((lang) => lang.Language));
      console.log(languages);
  }



  function handleSubmit(e){
    e.preventDefault(); // prevents browser refresh
    var searchData = SearchHawker(
      locations,
      languages
    );

    searchData.then((result) => {
      if (Array.isArray(result) && result.length) {
        setData(result)
        // console.log(this.state.data);
      }
      });

  }

    return (
      <div>
        <div className="search-bar">

          <div className="region">
            <p className="region-text"> Select a region and language(s) you can speak to find hawkers that you can help! </p>
          </div>
          
          <div className="location-search">
            <Multiselect
              options={locationOptions}
              onSelect={onSelectLocation}
              onRemove={onSelectLocation}
              showCheckbox={true}
              displayValue="Location"
              placeholder="Region(s)"
              closeOnSelect={false}
              selectedValues={selectedLocations}
            />
          </div>

          <div className="language-search">
            <Multiselect
              options={languageOptions}
              onSelect={onSelectLanguage}
              onRemove={onSelectLanguage}
              showCheckbox={true}
              displayValue="Language"
              placeholder="Language(s)"
              closeOnSelect={false}
              selectedValues={selectedLanguages}
            />
          </div>
          
          <form className="submit" onSubmit={handleSubmit}>
            <Button className="submit" type="submit" style={{background: 'gray', color: 'white'}} onClick={handleSubmit}>
              Search
            </Button>
          </form>
        </div>

        <HawkerSearchResults data={data} selectedLanguages = {selectedLanguages} userLanguages={languages}/>

      </div>
    );

}





import "./App.css";
import React, { useState, useEffect } from 'react';
import InfoBox from "./components/InfoBox";
import { Card, CardContent, Typography,FormControl, Select, MenuItem } from "@material-ui/core";
import Map from "./components/Map";
import Table from "./components/Table"
import {sortData, printStat} from "./utilities/util";
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css";
function App() {
  const [countries, setCountries] = useState([{}]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746 ,lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
      useEffect(() => {
        
          fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
              setCountryInfo(data);
            });
      }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries =  data.map((country) => {
            return { name: country.country, value: country.countryInfo.iso2 };
          });
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
          console.log(tableData);
        });
        
    };
    getCountriesData();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
    console.log(countryInfo);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem value={country.value}> {country.name} </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" onClick={(onclicked)=>setCasesType("cases")} cases={printStat(countryInfo.todayCases)} total={printStat(countryInfo.cases)}></InfoBox>
          <InfoBox title="Recovered" onClick={(onclicked)=>setCasesType("recovered")} cases={printStat(countryInfo.todayRecovered)} total={printStat(countryInfo.recovered)}></InfoBox>
          <InfoBox title="Deaths" onClick={(onclicked)=>setCasesType("deaths")} cases={printStat(countryInfo.todayDeaths)} total={printStat(countryInfo.deaths)}></InfoBox>
        </div>
        <div className="app__map">
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}></Map>
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h2>Live Cases by Country</h2>
         
          <Table countries={tableData}></Table>

          <h2>Worldwide cases</h2>
          <LineGraph></LineGraph>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

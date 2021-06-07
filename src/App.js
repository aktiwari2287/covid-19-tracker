import "./App.css";
import React, { useState, useEffect } from 'react';
import InfoBox from "./components/InfoBox";
import { Card, CardContent, Typography,FormControl, Select, MenuItem } from "@material-ui/core";
import Map from "./components/Map";
import Table from "./components/Table"
import {sortData} from "./utilities/util";
import LineGraph from './components/LineGraph'
function App() {
  const [countries, setCountries] = useState([{}]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}></InfoBox>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></InfoBox>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
        </div>
        <div className="app__map">
          <Map></Map>
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

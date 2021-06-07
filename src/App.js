import "./App.css";
import React, { useState, useEffect } from 'react';
import InfoBox from "./components/InfoBox";
import { Card, CardContent, Typography,FormControl, Select, MenuItem } from "@material-ui/core";
import Map from "./components/Map";
function App() {
  const [countries, setCountries] = useState([{}]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState([]);

      useEffect(() => {
        
          fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
              setCountryInfo(data);
            });
      }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      const countries = await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          return data.map((country) => {
            return { name: country.country, value: country.countryInfo.iso2 };
          });
        });
      setCountries(countries);
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
          <h3>Live Cases by Country</h3>
          <h3>Worldwide cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

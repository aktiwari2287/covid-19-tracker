import React, { useState, useEffect } from 'react';
import './Header.css';
import {FormControl, Select, MenuItem} from "@material-ui/core";
function Header() {
        const [countries, setCountries]  = useState([{}]);
        const [country, setCountry]  = useState('Worldwide');
        useEffect(() => {
            const getCountriesData = async ()=> {
                const countries = await fetch("https://disease.sh/v3/covid-19/countries"). then(response => response.json()).then(data => {
                    return data.map(country => {
                        return {name: country.country, value: country.countryInfo.iso2}
                    })
                });
                setCountries(countries);
            }
            getCountriesData();
        }, [])
        const onCountryChange = (event) => {
            const countryCode = event.target.value;
            setCountry(countryCode);
        }
    return (
        <div>
           <FormControl>
                <Select variant="outlined" value={country} onChange={onCountryChange}>
                    <MenuItem value="Worldwide" >Worldwide</MenuItem>
                   {
                       countries.map(country => {
                           return <MenuItem value={country.value}> {country.name} </MenuItem>;
                       })
                   }
                </Select>
           </FormControl>
        </div>
    )
}

export default Header

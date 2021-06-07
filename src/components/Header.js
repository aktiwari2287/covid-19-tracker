import React, { useState, useEffect } from 'react';
import './Header.css';
import {FormControl, Select, MenuItem} from "@material-ui/core";
function Header() {
        const [countries, setCountries]  = useState([{}]);
        const [country, setCountry]  = useState('Worldwide');
        const [countryInfo, setCountryInfo] = useState([]);
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
        const onCountryChange = async (event) => {
            const countryCode = event.target.value;
            setCountry(countryCode);
            const url = countryCode === 'Worldwide' 
                    ? 'https://disease.sh/v3/covid-19/all'
                    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
            
            await fetch(url).then(response => response.json())
                            .then(data => {
                                setCountry(countryCode);
                                setCountryInfo(data);
                            });
            console.log(countryInfo);                
                    
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

import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Typography } from "@mui/material";
import { getCities, getWalkers } from "../apiManager";

export const WalkerList = () => {
    const [walkers, setWalkers] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(""); // Track the selected city

    useEffect(() => {
        // Fetch the list of walkers when the component mounts
        getWalkers()
            .then((data) => setWalkers(data))
            .catch((error) => {
                console.error("Error fetching walkers:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch the list of walkers when the component mounts
        getCities()
            .then((data) => setCities(data))
            .catch((error) => {
                console.error("Error fetching cities:", error);
            });
    }, []);




    return (
        <div>
            <Typography variant="h4" gutterBottom>
                List of Walkers
            </Typography>

            {/* City selection dropdown */}
            <FormControl
                variant="outlined"
                sx={{ m: 1, minWidth: 200 }}
            //sx === style; m === margin; minWidth是必须的,否则过小;
            >

                <InputLabel>Select a City</InputLabel>

                <Select
                    label="Select a City"
                    value={selectedCity}
                    // Handle city selection change
                    onChange={(event) => {
                        setSelectedCity(event.target.value)
                    }}
                >

                    <MenuItem value="">All Cities</MenuItem>
                    {cities.map((city) => (
                        <MenuItem key={city.id} value={city.name}>
                            {city.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Paper elevation={3} sx={{ mx: 'auto', my: 1, maxWidth: 500 }}>
                {/* sx= style; mx 水平; my 竖直; mx: 'auto' 居中; 好像不能同时指定四个margin  */}
                <List>
                    {walkers
                        //filter out selected city
                        .filter((walker) => !selectedCity || walker.cities.some((city) => city.name === selectedCity)
                        )
                        // If no city is selected (!selectedCity evaluates to true), we display all walkers.
                        //实际walker.cities是一个包含id和name的objects的array, 所以用.some()
                        //原来是walker.cities.includes(selectedCity)
                        //这是假设walker.cities是一个只包括city names的array
                        // Otherwise, we only display walkers whose cities property includes the selected city.
                        .map((walker) => (
                            <ListItem key={walker.id}
                            >
                                <ListItemText
                                    primary={walker.name}

                                />
                                <div>
                                    <strong>Cities: </strong>
                                    {walker.cities.map((city) => (
                                        <span key={city.id}>{city.name}; </span>
                                    ))}
                                </div>
                            </ListItem>
                        ))}
                </List>
            </Paper>
        </div>
    );
}
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

            <Paper elevation={3}>
                <List>
                    {walkers
                    //filter out selected city
                    .filter((walker) => !selectedCity || walker.cities.includes(selectedCity))
                    // If no city is selected (!selectedCity evaluates to true), we display all walkers. Otherwise, we only display walkers whose cities property includes the selected city.
                    .map((walker) => (
                        <ListItem key={walker.id}>
                            <ListItemText
                                primary={walker.name}
                                style={{ textAlign: "center" }} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
}
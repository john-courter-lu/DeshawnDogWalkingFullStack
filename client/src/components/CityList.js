import React, { useEffect, useState } from "react";
import { Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { addCity, getCities } from "../apiManager";

export const CityList = () => {
    const [cities, setCities] = useState([]);
    const [newCityName, setNewCityName] = useState("");

    useEffect(() => {
        // Fetch the list of cities when the component mounts
        getCities()
            .then(setCities)
            .catch((error) => {
                console.error("Error fetching cities:", error);
            });
    }, []);

    // feature: add a city 
    const handleAddCity = async () => {
        // Create a new city object with the entered name
        const newCity = {
            name: newCityName,
        };

        // Call the API function to add the city
        await addCity(newCity)
            .then((createdCity) => {
                // Update the list of cities with the newly created city
                setCities([...cities, createdCity]);
                //Syntax: It is a JavaScript array spread syntax. It creates a new array that contains all the elements from the existing cities array followed by the createdCity object. In other words, it combines the existing cities with the newly created city into a single array.

                // Clear the input field
                setNewCityName("");
            })
            .catch((error) => {
                console.error("Error adding city:", error);
            });
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                List of Cities
            </Typography>
            <Paper elevation={3}>
                <List>
                    {cities.map((city) => (
                        <ListItem key={city.id}>
                            <ListItemText
                                primary={city.name}
                                style={{
                                    textAlign: "center",
                                    // Center the text horizontally
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <div style={{ margin: '1rem auto', display: "flex", justifyContent: "center" }}>
                <TextField
                    label="Add a city"
                    variant="outlined"
                    value={newCityName}
                    //保证输入时即时显示输入的名字;同时,每次newCityName清零后,框里显示空白;
                    onChange={(e) => setNewCityName(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: 'auto 0.5rem' }}
                    onClick={handleAddCity}

                >
                    Add
                </Button>
            </div>

        </div>
    );

}
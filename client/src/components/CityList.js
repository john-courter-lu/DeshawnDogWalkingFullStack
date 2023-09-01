import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { getCities } from "../apiManager";

export const CityList = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        // Fetch the list of cities when the component mounts
        getCities()
            .then(setCities)
            .catch((error) => {
                console.error("Error fetching cities:", error);
            });
    }, []);

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
        </div>
    );

}
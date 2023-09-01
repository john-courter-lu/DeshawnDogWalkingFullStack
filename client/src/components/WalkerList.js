import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { getWalkers } from "../apiManager";

export const WalkerList = () => {
    const [walkers, setWalkers] = useState([]);

    useEffect(() => {
        // Fetch the list of walkers when the component mounts
        getWalkers()
            .then((data) => setWalkers(data))
            .catch((error) => {
                console.error("Error fetching walkers:", error);
            });
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                List of Walkers
            </Typography>
            <Paper elevation={3}>
                <List>
                    {walkers.map((walker) => (
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
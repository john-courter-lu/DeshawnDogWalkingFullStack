import { Link } from "react-router-dom";
import { deleteDog, getDogs, getGreeting } from "../apiManager";
import { useEffect, useState } from "react";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Button } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  const [dogs, setDogs] = useState([])

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getDogs()
      .then(setDogs)
      .catch(() => {
        console.log("API not connected");
      });
  }, [])

  const handleRemoveClick = async (dogId) => {
    try {
      await deleteDog(dogId);
      // Update the dogs state to remove the deleted dog
      // 这是亮点. 不需要重新fetch, 而是通过setDogs来不断重写dogs这个数组
      setDogs(dogs.filter(dog => dog.id !== dogId));
    } catch (error) {
      console.error("Error deleting dog:", error);
    }
  };

  return (<>
    <p>{greeting.message}</p>
    <h2>List of Dogs</h2>
    <Container className="dogs">
      <Grid container spacing={{ xs: 2, md: 3 }} >
        {
          dogs.map(dog => {
            return (

              <Grid item xs={6} sm={3} md={2} className="dog" key={`dog--${dog.id} `}>
                <Item>
                  <Paper elevation={4}>
                    <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>

                    <Button
                      onClick={() => handleRemoveClick(dog.id)}
                      variant="outlined"
                      color="secondary"
                      size="small"
                    >
                      Remove
                    </Button>

                  </Paper>
                </Item>
              </Grid >

            )
          })
        }
      </Grid>
    </Container>
    <h2>Add a dog?</h2>
    <Button variant="outlined"><Link to={`/add-a-dog`}>Add Dog</Link></Button>
  </>)
}

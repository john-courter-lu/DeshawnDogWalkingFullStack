import Link from '@mui/material/Link';
import { deleteDog, getDogs, getGreeting } from "../apiManager";
import { useEffect, useState } from "react";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Button, Typography } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0,0,1,0),
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

    <Typography component="h1" variant="subtitle2" gutterBottom >
      {greeting.message}
    </Typography>

    <Typography component="h2" variant="h4" m={2}>
      List of Dogs
    </Typography>

    <Container className="dogs">
      <Grid container spacing={{ xs: 3, md: 2 }} >
        {
          dogs.map(dog => {
            return (

              <Grid item xs={6} sm={4} md={3} lg={2} xl={2} className="dog" key={`dog--${dog.id} `}>
                <Item>
                  

                    <img
                      className="dog-img-in-grid"
                      src="https://upload.wikimedia.org/wikipedia/commons/archive/4/43/20140729055057%21Cute_dog.jpg"
                      alt={`dog picture for dog ${dog.id} `}
                    />

                    <Link
                      href={`/dogs/${dog.id}`}
                      underline="hover"
                      component="h3"
                      variant="h6"
                    >
                      {dog.name}
                    </Link>

                    <Button
                      onClick={() => handleRemoveClick(dog.id)}
                      variant="outlined"
                      color="secondary"
                      size="small"
                      sx={{ display: "flex", mx: "auto", my: 0.5 }}
                    >
                      Remove
                    </Button>

                 
                </Item>
              </Grid >

            )
          })
        }
      </Grid>
    </Container>

    <Typography component="h2" variant="h4" m={2}>
      Add A Dog?
    </Typography>

    <Button variant="outlined">
      <Link href={`/add-a-dog`} underline="none">
        Add Dog
      </Link></Button>

  </>)
}

/* 
Material Design's responsive UI is based on a 12-column grid layout. 
It uses CSS's Flexible Box module for high flexibility.

Each breakpoint (a key) matches with a fixed screen width (a value):

xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px

Paper 外面的 Item 是可以省略的, 只是创造了 Paper 外围的margin

<img>在Material UI中没有style

<Link>是和React同名的, 但是用法不同, 需要href而不是to, 同时可以直接指定underline的格式;
其他Typography的Props都可以用
如align='center' | 'inherit' | 'justify' | 'left' | 'right'

variant 是格式
component是html tag

styled 是可以把Item都一起修改成Paper的. 同时padding是用spacing()指定的.
关于styled的我可以再看看.

现在我主要还是 goal-oriented 我想要完成的目标是什么?
我想练习一下视频里提到的功能,
可能更好的List是在WalkerList里面

m={2}
sx={{ display: "flex", mx: "auto", my: 0.5 }}
发现: 
等于号=后面总是要有大括号;
等于号=内的数字不再需要大括号;
所有的css中的value都要用''

*/
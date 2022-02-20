import logo from "../images/logo-home.png";
import * as React from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return(
    <main style={{minHeight: "93vh"}}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item style={{minHeight: "93vh"}}>
          <div class="pt-24 grid grid-cols-2 h-full">
            <div >
              <img src={logo}  />
            </div>
            <div>
              <div class="text-white text-giant pt-14 font-sans font-medium">
                <div>book</div><div>it</div>
              </div>
              <div class="text-white text-5xl pt-2 font-mono leading-9">
                <div>a book</div><div>recommendation</div><div>app.</div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item style={{minHeight: "93vh"}}>
          <div class="pt-52 flex items-center justify-center align-middle">
            <Card variant="outlined" sx={{ width: "75%" }}>
              <div class="pl-8">
                <CardContent>
                  <Typography sx={{ fontSize: 20, paddingTop: 2 }} color="text.secondary" gutterBottom>
                    About
                  </Typography>
                  <div class="text-bold text-3xl">
                    book•it
                  </div>
                  <Typography sx={{ fontSize: 20, mb: 1.5 }} color="text.secondary">
                    noun
                  </Typography>
                  <div class="font-mono text-2xl">
                    a book recommendation web application that allows users to create their own recommendations, search through others' recommendations, and add books to a reading list.
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </Carousel.Item>
        <Carousel.Item style={{minHeight: "93vh"}}>
        <div class="pt-52 flex items-center justify-center align-middle">
          <div class="grid grid-cols-2">
            <div class="pr-4">
              <Card variant="outlined">
                <CardContent>
                  <div class="font-mono pt-8 text-3xl text-center">Ready to discover new reads?</div>
                  <div class="font-mono pt-8 text-2xl text-center">Create a bookit account now!</div>
                  <div class="pt-24 text-center">
                    <Button variant="contained" size="large">Create an Account</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div class="pl-4">
              <Card variant="outlined">
                <CardContent>
                <div class="font-mono pt-8 text-3xl text-center">Already have an account?</div>
                <div class="font-mono pt-8 text-2xl text-center">Login here!</div>
                <div class="pt-24 text-center">
                  <Button variant="contained" size="large">Login</Button>
                </div>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </main>
  )
}

export default LandingPage;

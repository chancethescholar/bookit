import logo from "../images/logo-home.png";
import * as React from 'react';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({history}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if(userInfo) {
      navigate("/myrecommendations");
    }
  }, [navigate]);

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return(
    <main class="bg-black" style={{minHeight: "93vh"}}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {/*title page*/}
        <Carousel.Item style={{minHeight: "93vh"}}>
          <div class="pt-24 grid grid-cols-2 h-full">
            <div >
              <img src={logo} alt="Logo" class="sm:w-30"/>
            </div>
            <div>
              <div class="text-white pt-14 font-sans font-medium lg:text-giant md:text-6xl">
                <div>book</div><div>it</div>
              </div>
              <div class="text-white pt-2 font-mono leading-9 lg:text-5xl md:text-2xl">
                <div>a book</div><div>recommendation</div><div>app.</div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        {/*about page*/}
        <Carousel.Item style={{minHeight: "93vh"}} id="about">
          <div class="lg:pt-52 sm:pt-36 flex items-center justify-center align-middle">
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
        {/*signup and login page*/}
        <Carousel.Item style={{minHeight: "93vh"}}>
        <div class="lg:pt-52 sm:pt-36 flex items-center justify-center align-middle">
          <div class="grid grid-cols-2">
            <div class="pr-4">
              <Card variant="outlined">
                <CardContent>
                  <div class="font-mono pt-8 text-3xl text-center">Ready to discover new reads?</div>
                  <div class="font-mono pt-8 text-2xl text-center">Create a bookit account now!</div>
                  <div class="pt-24 text-center">
                    <a href="/signup">
                      <Button variant="contained" size="large">Create an Account</Button>
                    </a>
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
                  <a href="/login">
                    <Button variant="contained" size="large">Login</Button>
                  </a>
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

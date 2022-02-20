import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainScreen from "../components/MainScreen";
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Chip from '@mui/material/Chip';
import image from '../images/no-image.png';
import axios from 'axios';

const MyRecommendations = () => {
const [recommendations, setRecommendations] = useState([]);

  const deleteHandler = (id) =>
  {
    if(window.confirm("Are you sure you want to delete this recommendation?"))
    {

    }
  };

  const fetchRecommendations = async() => {
    const { data } = await axios.get("/api/recommendations");
    setRecommendations(data);
  }

  console.log(recommendations);

  useEffect(() => {
    fetchRecommendations();
  }, [])

  return (
    <MainScreen title="My Recommendations">
      <div class="pb-4">
        <Link to='createRecommendation' style={{ textDecoration: 'none' }}>
          <Button variant="contained" size="large" endIcon={<AddRoundedIcon />}>
            New
          </Button>
        </Link>
      </div>
      <div class="grid xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
      {
        recommendations.map(recommendation => (
          <div class="pb-4">
            <Card sx={{ maxWidth: 345 }} key={recommendation._id}>
              <CardHeader
                title={recommendation.title}
                subheader={recommendation.author}
              />
              <CardMedia
                component="img"
                height="194"
                image={image}
                alt={recommendation.title}
              />
              <CardContent>
              <div class="pb-4">
              {
                recommendation.genres.map(genre => (
                  <Chip key=<React.Fragment>{recommendation._id}{genre}</React.Fragment> variant="outlined" color="primary" label={genre}/>
                  ))
              }
              </div>
                <Typography paragraph>{recommendation.review}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {recommendation.rating}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton href={`/recommendation/${recommendation._id}`} aria-label="edit">
                  <EditRoundedIcon />
                </IconButton>
                <IconButton onClick={() => deleteHandler(recommendation._id)} aria-label="delete">
                  <DeleteRoundedIcon />
                </IconButton>
                <div class="text-xs pl-12">Created {recommendation.createdOn}</div>
              </CardActions>
            </Card>
          </div>
        ))
      }
      </div>
    </MainScreen>
  )
}

export default MyRecommendations;

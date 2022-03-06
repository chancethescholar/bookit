import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MainScreen from "../components/MainScreen";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
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
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Rating from '@mui/material/Rating';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useNavigate } from "react-router-dom";
import image from '../images/no-image.png';
import { useDispatch, useSelector} from "react-redux";
import { deleteRecommendationAction, listAllRecommendations } from "../actions/recommendationsActions";

const BrowseRecommendations = ({ search }) => {
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#0010eb',
    },
    '& .MuiRating-iconHover': {
      color: '#333fef',
    },
  });

  const dispatch = useDispatch();

  const recommendationListAll = useSelector((state) => state.recommendationListAll);
  const { loading, recommendations, error } = recommendationListAll;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

    //console.log(recommendations);
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(listAllRecommendations());
      if(!userInfo)
        navigate("/");
    }, [dispatch, navigate, userInfo])

    const deleteHandler = (id) =>
    {
      if(window.confirm("Are you sure you want to delete this recommendation?"))
      {
        dispatch(deleteRecommendationAction(id));
      }
    };

    return (
      <MainScreen title={"Browse Recommendations"}>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
        {loading &&
          <LoadingButton loading variant="outlined">
            Loading
          </LoadingButton>
        }
        {error &&
        <div className="text-red-600 text-xl pl-2">
          <span className="pr-2"><ErrorOutlineIcon color="error"/></span>
          {error}
        </div>
        }

        {recommendations
          ?.reverse()
          .filter((filteredRecommendation) =>
            filteredRecommendation.title.toLowerCase().includes(search.toLowerCase()) || filteredRecommendation.author.toLowerCase().includes(search.toLowerCase())
          )
          .map((recommendation) => (
            <div className="pb-4">
              <Card sx={{ maxWidth: 345 }} key={recommendation._id}>
                <CardHeader
                  title={recommendation.title}
                  subheader={recommendation.author}
                  avatar={
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt="userpic" src={recommendation.userPic} />
                    </IconButton>
                  }
                />
                {recommendation.image !== "no image" &&
                  <CardMedia
                    component="img"
                    height="194"
                    image={recommendation.image}
                    alt={recommendation.title}
                  />
                }
                <CardContent key={recommendation._id} >
                <div className="pb-4">
                {
                  recommendation.genres.map(genre => (
                    <Chip key={recommendation._id + genre} variant="outlined" color="primary" label={genre} />
                    ))
                }
                </div>
                  <Typography paragraph className="px-2">{recommendation.review}</Typography>
                  <StyledRating
                    name="rating"
                    defaultValue={recommendation.rating}
                    getLabelText={(value) => `${value} Book${value !== 1 ? 's' : ''}`}
                    precision={0.5}
                    icon={<FavoriteRoundedIcon fontSize="large" />}
                    emptyIcon={<FavoriteBorderRoundedIcon fontSize="large" />}
                    className="pl-1"
                    readOnly
                  />
                </CardContent>
                  <CardActions disableSpacing>
                  {userInfo._id === recommendation.user ?
                    <div>
                    <IconButton href={`/recommendation/${recommendation._id}`} aria-label="edit">
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteHandler(recommendation._id)} aria-label="delete">
                      <DeleteRoundedIcon />
                    </IconButton>
                    <span className="text-xs pl-24">Created {recommendation.createdAt.substring(0, 10)}</span>
                    </div>
                  :
                  <div className="text-xs pl-44">Created {recommendation.createdAt.substring(0, 10)}</div>

                }
                  </CardActions>
              </Card>
            </div>
          ))
        }
        </div>
      </MainScreen>
    )
}

export default BrowseRecommendations;

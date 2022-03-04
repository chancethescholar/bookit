import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
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
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Rating from '@mui/material/Rating';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useNavigate } from "react-router-dom";
import image from '../images/no-image.png';
import { useDispatch, useSelector} from "react-redux";
import { listRecommendations, deleteRecommendationAction } from "../actions/recommendationsActions";

const MyRecommendations = ({ search }) => {
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  const dispatch = useDispatch();

  const recommendationList = useSelector((state) => state.recommendationList);
  const { loading, recommendations, error } = recommendationList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const recommendationCreate = useSelector((state) => state.recommendationCreate);
  const { success: successCreate } = recommendationCreate;

  const recommendationUpdate = useSelector((state) => state.recommendationUpdate);
  const { success: successUpdate } = recommendationUpdate;

  const recommendationDelete = useSelector((state) => state.recommendationDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = recommendationDelete;

    const deleteHandler = (id) =>
    {
      if(window.confirm("Are you sure you want to delete this recommendation?"))
      {
        dispatch(deleteRecommendationAction(id));
      }
    };

    //console.log(recommendations);
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(listRecommendations());
      if(!userInfo)
        navigate("/");
    }, [dispatch, successCreate, successUpdate, successDelete, navigate, userInfo])

    return (
      <MainScreen title={`${userInfo.username}'s Recommendations`}>
        <div className="pb-4">
          <Link to='/createrecommendation' style={{ textDecoration: 'none' }}>
            <Button variant="contained" size="large" endIcon={<AddRoundedIcon />}>
              New
            </Button>
          </Link>
        </div>
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
        {errorDelete &&
        <div className="text-red-600 text-lg pl-2">
          <span className="pr-2"><ErrorOutlineIcon color="error"/></span>
          {errorDelete}
        </div>
        }
        {loadingDelete &&
          <LoadingButton loading variant="outlined">
            Loading
          </LoadingButton>
        }
        {recommendations
          ?.reverse()
          .filter((filteredRecommendation) =>
            filteredRecommendation.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((recommendation) => (
            <div className="pb-4">
              <Card sx={{ maxWidth: 345 }} key={recommendation._id}>
                <CardHeader
                  title={recommendation.title}
                  subheader={recommendation.author}
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
                  <IconButton href={`/recommendation/${recommendation._id}`} aria-label="edit">
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteHandler(recommendation._id)} aria-label="delete">
                    <DeleteRoundedIcon />
                  </IconButton>
                  <div className="text-xs pl-24">Created {recommendation.createdAt.substring(0, 10)}</div>
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

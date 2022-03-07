import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from "../components/MainScreen";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Rating from '@mui/material/Rating';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import noImage from '../images/no-image.png';
import { useDispatch, useSelector} from "react-redux";
import { createRecommendationAction } from '../actions/recommendationsActions';

const CreateRecommendation = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState("");
  const [genreType, setGenreType] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);
  const [pic, setPic] = useState("no image");
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recommendationCreate = useSelector((state) => state.recommendationCreate);
  const { loading, error, recommendation } = recommendationCreate;

  console.log(recommendation);

  const genreTypes = [
  'Action/Adventure',
  'African American Literature',
  'Biographies/Autobiographies',
  'Classics',
  'Children',
  'Cookbooks',
  'Fantasy',
  'Fiction',
  'Historical',
  'Horror',
  'Mystery',
  'Non Fiction',
  'Poetry',
  'Romance',
  'Sci-Fi',
  'Self-Help',
  'Short Story',
  'Thriller',
  'True Crime',
  'Other'
];

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenreType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    setGenres(event.target.value);
  };

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#0010eb',
    },
    '& .MuiRating-iconHover': {
      color: '#333fef',
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createRecommendationAction(title, author, genres, review, rating, pic));
    navigate('/myrecommendations');
  }

  const postDetails = (pics) => {
    setPicMessage(null);

    if(pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'bookit');
      data.append('cloud_name', 'ddn6ap5nl')
      fetch("https://api.cloudinary.com/v1_1/ddn6ap5nl/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        })
    }

    else {
      return setPicMessage("Image must be a jpeg or png.");
    }

  }

  return(
    <MainScreen title="New Recommendation">
      <form onSubmit={submitHandler}>
        <div>
          <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
            <TextField fullWidth
              id="title"
              label="Book Title"
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
            <TextField fullWidth
              id="author"
              label="Author"
              variant="outlined"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '100%'}}>
            <InputLabel id="demo-multiple-chip-label">Genre(s)</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={genreType}
              onChange={handleGenreChange}
              input={<OutlinedInput id="select-multiple-chip" label="Genre(s)" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} variant="outlined" color="primary"/>
                  ))}
                </Box>
              )}
            >
              {genreTypes.map((genre) => (
                <MenuItem
                  key={genre}
                  value={genre}
                >
                  <Checkbox checked={genreType.indexOf(genre) > -1} />
                  <ListItemText primary={genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
            <TextField
              id="outlined-textarea"
              label="Review"
              placeholder="Type your review here"
              rows={4}
              onChange={(e) => setReview(e.target.value)}
              multiline
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
            <Typography className="pl-2" component="legend">Rating</Typography>
            <StyledRating
              name="rating"
              defaultValue={3}
              getLabelText={(value) => `${value} Book${value !== 1 ? 's' : ''}`}
              precision={1}
              icon={<FavoriteRoundedIcon fontSize="large" />}
              emptyIcon={<FavoriteBorderRoundedIcon fontSize="large" />}
              className="pl-1"
              onChange={(e) => setRating(e.target.value)}
            />
          </FormControl>
        </div>
        {picMessage &&
        <div class="text-red-600 text-lg pl-2">
          <span class="pr-2"><ErrorOutlineIcon color="error"/></span>
          {picMessage}
        </div>
        }
        <div>
          <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
            <Typography className="pl-2" component="legend">Upload image of book</Typography>
            <label>
              <input className="pl-2 pt-2" type="file" name="image" onChange={(e) => postDetails(e.target.files[0])}/>
            </label>
          </FormControl>
        </div>
        <div className="pl-2 pt-8">
          <Link to="/myrecommendations" style={{ textDecoration: 'none'}}>
            <span class="pr-6">
              <Button variant="text">Cancel</Button>
            </span>
          </Link>

            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              color="primary"
            >
              Create
            </LoadingButton>
        </div>
      </form>
    </MainScreen>
  )
}

export default CreateRecommendation;

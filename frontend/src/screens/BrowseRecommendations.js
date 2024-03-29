import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Chip from "@mui/material/Chip";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import Rating from "@mui/material/Rating";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecommendationAction,
  listAllRecommendations,
} from "../actions/recommendationsActions";
import {
  listBookmarks,
  createBookmarkAction,
  deleteBookmarkAction,
} from "../actions/bookmarksActions";
import unbookmarkedImg from "../images/unbookmarked.png";
import bookmarkedImg from "../images/bookmarked.png";

const BrowseRecommendations = ({ search }) => {
  const genreTypes = [
    "Action/Adventure",
    "African American Literature",
    "Biographies/Autobiographies",
    "Classics",
    "Children",
    "Cookbooks",
    "Fantasy",
    "Fiction",
    "Historical",
    "Horror",
    "Mystery",
    "Non Fiction",
    "Poetry",
    "Romance",
    "Sci-Fi",
    "Self-Help",
    "Short Story",
    "Thriller",
    "True Crime",
    "Other",
  ];

  const ratingNumbers = [1, 2, 3, 4, 5];

  const sortTypes = [
    "None",
    "Newest to Oldest",
    "Oldest to Newest",
    "Title (A to Z)",
    "Title (Z to A)",
    "Rating (high to low)",
    "Rating (low to high)",
  ];

  const [genres, setGenres] = useState(genreTypes);
  const [genreType, setGenreType] = useState([]);
  const [ratings, setRatings] = useState(ratingNumbers);
  const [ratingNumber, setRatingNumber] = useState([]);
  const [sortType, setSortType] = useState([]);

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenreType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    setGenres(event.target.value);

    if (event.target.value.length === 0) setGenres(genreTypes);
  };

  const handleRatingChange = (event) => {
    const {
      target: { value },
    } = event;
    setRatingNumber(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    setRatings(event.target.value);

    if (event.target.value.length === 0) setRatings(ratingNumbers);
  };

  const handleSortChange = (event) => {
    const {
      target: { value },
    } = event;
    setSortType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    if (event.target.value === "None") {
      recommendations = recommendations.sort(function (a, b) {
        return a.createdAt.localeCompare(b.createdAt);
      });
    }

    if (event.target.value === "Newest to Oldest") {
      recommendations = recommendations.sort(function (a, b) {
        return a.createdAt.localeCompare(b.createdAt);
      });
    }

    if (event.target.value === "Oldest to Newest") {
      recommendations = recommendations.sort(function (a, b) {
        return b.createdAt.localeCompare(a.createdAt);
      });
    }

    if (event.target.value === "Title (A to Z)") {
      recommendations = recommendations.sort(function (a, b) {
        return b.title.localeCompare(a.title);
      });
    }

    if (event.target.value === "Title (Z to A)") {
      recommendations = recommendations.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    }

    if (event.target.value === "Rating (high to low)") {
      recommendations = recommendations.sort(
        ({ rating: a }, { rating: b }) => a - b
      );
    }

    if (event.target.value === "Rating (low to high)") {
      recommendations = recommendations.sort(
        ({ rating: a }, { rating: b }) => b - a
      );
    }
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#0010eb",
    },
    "& .MuiRating-iconHover": {
      color: "#333fef",
    },
  });

  const dispatch = useDispatch();

  const recommendationListAll = useSelector(
    (state) => state.recommendationListAll
  );
  const { loading, recommendations, error } = recommendationListAll;

  const recommendationDelete = useSelector(
    (state) => state.recommendationDelete
  );

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = recommendationDelete;

  const bookmarkList = useSelector((state) => state.bookmarkList);
  const { bookmarksLoading, bookmarks, bookmarksError } = bookmarkList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //console.log(recommendations);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listAllRecommendations());
    dispatch(listBookmarks());
    if (!userInfo) navigate("/");
  }, [dispatch, successDelete, navigate, userInfo]);

  const deleteHandler = (id) => {
    if (
      window.confirm("Are you sure you want to delete this recommendation?")
    ) {
      dispatch(deleteRecommendationAction(id));
      window.location.reload(true);
    }
  };

  const unbookmarkHandler = (recId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this recommendation from your bookmarks?"
      )
    ) {
      dispatch(deleteBookmarkAction(recId));
      window.location.reload(true);
    }
  };

  const bookmarkHandler = (
    id,
    title,
    author,
    genres,
    review,
    rating,
    image
  ) => {
    dispatch(
      createBookmarkAction(id, title, author, genres, review, rating, image)
    );
    window.location.reload(true);
  };

  return (
    <MainScreen title={"Browse Recommendations"}>
      <div className="pb-4">
        <Link to="/createrecommendation" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddRoundedIcon />}
          >
            New
          </Button>
        </Link>
      </div>
      <div className="pb-4 flex grid grid-cols-8">
        <div className="pt-3">
          <FilterAltRoundedIcon />
          <span className="pl-2">Filter by</span>
        </div>
        <div className="col-span-2">
          <FormControl sx={{ m: 1, width: "100%" }} size="small">
            <InputLabel id="demo-multiple-chip-label">Genre</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={genreType}
              onChange={handleGenreChange}
              input={<OutlinedInput id="select-multiple-chip" label="Genre" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              )}
            >
              {genreTypes.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  <Checkbox checked={genreType.indexOf(genre) > -1} />
                  <ListItemText primary={genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-span-1 pl-4">
          <FormControl sx={{ m: 1, width: "100%" }} size="small">
            <InputLabel id="demo-multiple-chip-label">Rating</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={ratingNumber}
              onChange={handleRatingChange}
              input={<OutlinedInput id="select-multiple" label="Rating" />}
              renderValue={(selected) => selected.join(", ").concat(" hearts")}
            >
              {ratingNumbers.reverse().map((rating) => (
                <MenuItem key={rating} value={rating}>
                  <Checkbox checked={ratingNumber.indexOf(rating) > -1} />
                  <StyledRating
                    name="rating"
                    defaultValue={rating}
                    getLabelText={(value) =>
                      `${value} Book${value !== 1 ? "s" : ""}`
                    }
                    precision={1}
                    icon={<FavoriteRoundedIcon fontSize="large" />}
                    emptyIcon={<FavoriteBorderRoundedIcon fontSize="large" />}
                    className="pl-1"
                    readOnly
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="pt-3 pl-4">
          <SortRoundedIcon />
          <span className="pl-2">Sort by</span>
        </div>
        <div className="col-span-2">
          <FormControl sx={{ m: 1, width: "100%" }} size="small">
            <Select
              value={sortType}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {sortTypes.map((sort) => (
                <MenuItem key={sort} value={sort}>
                  <ListItemText primary={sort} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
        {loading && (
          <LoadingButton loading variant="outlined">
            Loading
          </LoadingButton>
        )}
        {error && (
          <div className="text-red-600 text-xl pl-2">
            <span className="pr-2">
              <ErrorOutlineIcon color="error" />
            </span>
            {error}
          </div>
        )}
        {errorDelete && (
          <div className="text-red-600 text-lg pl-2">
            <span className="pr-2">
              <ErrorOutlineIcon color="error" />
            </span>
            {errorDelete}
          </div>
        )}
        {loadingDelete && (
          <LoadingButton loading variant="outlined">
            Loading
          </LoadingButton>
        )}

        {recommendations
          ?.reverse()
          .filter(
            (filteredRecommendation) =>
              filteredRecommendation.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              filteredRecommendation.author
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .filter((filterRecGenre) =>
            filterRecGenre.genres.some((recs) => genres.includes(recs))
          )
          .filter((filterRecRating) => ratings.includes(filterRecRating.rating))
          .length > 0 ? (
          recommendations
            ?.filter(
              (filteredRecommendation) =>
                filteredRecommendation.title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                filteredRecommendation.author
                  .toLowerCase()
                  .includes(search.toLowerCase())
            )
            .filter((filterRecGenre) =>
              filterRecGenre.genres.some((recs) => genres.includes(recs))
            )
            .filter((filterRecRating) =>
              ratings.includes(filterRecRating.rating)
            )
            .map((recommendation) => (
              <div className="pb-4 pt-4">
                <Card sx={{ maxWidth: 345 }} key={recommendation._id}>
                  <CardHeader
                    title={recommendation.title}
                    subheader={recommendation.author}
                    avatar={
                      <>
                        {userInfo.username === recommendation.userName ? (
                          <Tooltip
                            title={`More recommendations from ${recommendation.userName}`}
                          >
                            <IconButton
                              sx={{ p: 0 }}
                              href="/myrecommendations"
                              aria-label="edit"
                            >
                              <Avatar
                                alt={recommendation.userName}
                                src={recommendation.userPic}
                              />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={`More recommendations from ${recommendation.userName}`}
                          >
                            <IconButton
                              sx={{ p: 0 }}
                              href={`/recommendations/view/${recommendation.userName}`}
                              aria-label="edit"
                            >
                              <Avatar
                                alt={recommendation.userName}
                                src={recommendation.userPic}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    }
                    action={
                      <>
                        {bookmarks?.some(
                          (bookmark) => bookmark.recId === recommendation._id
                        ) && (
                          <Tooltip title="remove bookmark from this recommendation">
                            <IconButton size="small">
                              <img
                                src={bookmarkedImg}
                                style={{ width: 50, height: 40 }}
                                onClick={() =>
                                  unbookmarkHandler(recommendation._id)
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        )}

                        {!bookmarks?.some(
                          (bookmark) => bookmark.recId === recommendation._id
                        ) && (
                          <Tooltip title="bookmark this recommendation">
                            <IconButton size="small">
                              <img
                                src={unbookmarkedImg}
                                style={{ width: 50, height: 40 }}
                                onClick={() =>
                                  bookmarkHandler(
                                    recommendation._id,
                                    recommendation.title,
                                    recommendation.author,
                                    recommendation.genres,
                                    recommendation.review,
                                    recommendation.rating,
                                    recommendation.image
                                  )
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    }
                  />

                  {recommendation.image !== "no image" && (
                    <CardMedia
                      component="img"
                      height="194"
                      image={recommendation.image}
                      alt={recommendation.title}
                    />
                  )}
                  <CardContent key={recommendation._id}>
                    <div className="pb-4">
                      {recommendation.genres.map((genre) => (
                        <Chip
                          key={recommendation._id + genre}
                          variant="outlined"
                          color="primary"
                          label={genre}
                        />
                      ))}
                    </div>
                    <Typography paragraph className="px-2">
                      {recommendation.review}
                    </Typography>
                    <StyledRating
                      name="rating"
                      defaultValue={recommendation.rating}
                      getLabelText={(value) =>
                        `${value} Book${value !== 1 ? "s" : ""}`
                      }
                      precision={1}
                      icon={<FavoriteRoundedIcon fontSize="large" />}
                      emptyIcon={<FavoriteBorderRoundedIcon fontSize="large" />}
                      className="pl-1"
                      readOnly
                    />
                  </CardContent>
                  <CardActions disableSpacing>
                    {userInfo._id === recommendation.user ? (
                      <div>
                        <IconButton
                          href={`/recommendation/${recommendation._id}`}
                          aria-label="edit"
                        >
                          <EditRoundedIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteHandler(recommendation._id)}
                          aria-label="delete"
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                        <span className="text-xs pl-24">
                          Created {recommendation.createdAt.substring(0, 10)}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs pl-44">
                        Created {recommendation.createdAt.substring(0, 10)}
                      </div>
                    )}
                  </CardActions>
                </Card>
              </div>
            ))
        ) : (
          <div className="pt-4 text-2xl text-center justify-center flex grid col-span-6">
            No recommendations found matching that criteria.
          </div>
        )}
      </div>
    </MainScreen>
  );
};

export default BrowseRecommendations;

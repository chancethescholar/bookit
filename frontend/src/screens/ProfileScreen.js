import * as React from 'react';
import MainScreen from "../components/MainScreen";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import ImageListItem from '@mui/material/ImageListItem';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "../actions/userActions";

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const [values, setValues] = useState({
    amount: '',
    password: '',
    confirmPassword: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChangePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeConfirmPassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setConfirmPassword(event.target.value);
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateProfile({username, email, password, confirmPassword, pic}));
  };

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

  useEffect(() => {
    if(!userInfo) {
      navigate("/");
    }
    else {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo])
  return (
    <MainScreen title="Edit Profile">
      <div>
        <div className='profileContainer grid grid-rows-1'>
          <div className='grid grid-cols-6'>
            <div className="col-span-3">
            <form onSubmit={submitHandler}>
              {success &&
              <div class="text-red-600 text-lg pl-2 pb-8">
                <span class="pr-2 text-green-500">Profile Saved!</span>
                {success}
              </div>
              }
              <div>
                <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
                  <TextField fullWidth
                    id="username"
                    value={username}
                    label="Username"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
                  <TextField fullWidth
                    id="email"
                    value={email}
                    label="Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                  <OutlinedInput
                      id="password"
                      fullWidth
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChangePassword('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                      id="confirmPassword"
                      fullWidth
                      type={values.showConfirmPassword ? 'text' : 'password'}
                      value={values.confirmPassword}
                      onChange={handleChangeConfirmPassword('confirmPassword')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
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
                      <Typography className="pl-2" component="legend">Upload profile picture</Typography>
                      <label>
                        <input className="pl-2 pt-2" type="file" name="image" onChange={(e) => postDetails(e.target.files[0])}/>
                      </label>
                    </FormControl>
                  </div>
                <div>
                  {error &&
                  <FormHelperText class="text-red-600 text-xs pl-2">
                    <span class="pr-2"><ErrorOutlineIcon color="error"/></span>
                    {error}
                  </FormHelperText>}
                </div>
                <div className="pl-2 pt-8">
                  <Link to="/myrecommendations" style={{ textDecoration: 'none'}}>
                    <span class="pr-6">
                      <Button variant="text">Leave</Button>
                    </span>
                  </Link>

                    <LoadingButton
                      type="submit"
                      loading={loading}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </LoadingButton>
                </div>
              </form>
            </div>
            <div className="flex col-span-3 justify-center pl-36">
                <ImageListItem>
                  <Avatar alt={userInfo.username} src={userInfo.pic}  sx={{ width: 400, height: 400, fontSize: '300px'}}/>
                </ImageListItem>
            </div>
          </div>
        </div>
      </div>
    </MainScreen>
  )
};

export default ProfileScreen;

import * as React from 'react';
import { useState, useEffect } from 'react';
import MainScreen from "../components/MainScreen";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { signup } from "../actions/userActions";
import { userSignupReducer } from "../reducers/userReducers";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState(null);

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSignup = useSelector((state) => state.userSignup);
  const { loading, error, userInfo } = userSignup;

  useEffect(() => {
    if(userInfo) {
      navigate("/myrecommendations");
  }
}, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(signup(username, email, password, confirmPassword));
  };

  return(
    <MainScreen title="Signup">
      <form onSubmit={submitHandler}>
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
                  type={values.showConfirmPassword ? 'text' : 'confirmPassword'}
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
          <div>
            {error &&
            <FormHelperText class="text-red-600 text-xs pl-2">
              <span class="pr-2"><ErrorOutlineIcon color="error"/></span>
              {error}
            </FormHelperText>}
          </div>
          <div class="pl-2 pt-4">
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              color="primary"
            >
              Signup
            </LoadingButton>
          </div>
        </form>
      <div class="pl-2 pt-4 tx-sm">
        Already have an account? Login <a href="/login"><span class="text-cobalt">here</span></a>.
      </div>
    </MainScreen>
  )
}

export default SignupScreen;

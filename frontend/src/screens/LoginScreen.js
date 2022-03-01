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
import { useDispatch, useSelector} from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/myrecommendations")
    }
  }, [navigate, userInfo]);

  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
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

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return(
    <MainScreen title="Login">
      <form onSubmit={submitHandler}>
        <div>
        <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
          <TextField fullWidth
            id="useroremail"
            value={email}
            label="Username or Email"
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
                onChange={handleChange('password')}
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
              Login
            </LoadingButton>
          </div>
        </form>
      <div class="pl-2 pt-4 tx-sm">
        Don't have an account? Sign up <a href="/signup"><span class="text-cobalt">here</span></a>.
      </div>
    </MainScreen>
  )
}

export default LoginScreen;

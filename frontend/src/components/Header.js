import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  return (
    <AppBar position="static" className="bg-white">
      <Container maxWidth="3xl">
        <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="info"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: 'block',
            }}
          >
          <Link to='/' style={{ textDecoration: 'none' }}>
            <MenuItem key='Home' onClick={handleCloseNavMenu}>
              <div class="text-black hover:text-cobalt">Home</div>
            </MenuItem>
          </Link>
                {userInfo &&
                <Link to='/myrecommendations' style={{ textDecoration: 'none' }}>
                  <MenuItem key='My Recommendations' onClick={handleCloseNavMenu}>
                    <div class="text-black hover:text-cobalt">My Recommendations</div>
                  </MenuItem>
                </Link>
              }
            </Menu>
          </Box>
          
          {!userInfo &&
            <Link to="/signup" style={{ textDecoration: 'none'}}>
              <div class="pr-8">
                <Button variant="text">Signup</Button>
              </div>
            </Link>
          }
          {!userInfo &&
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="outlined">Login</Button>
            </Link>
          }
          {userInfo &&
          <Box sx={{ flexGrow: 0 }} class="pl-8">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo.username} src={userInfo.pic} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={logoutHandler}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        }
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header;

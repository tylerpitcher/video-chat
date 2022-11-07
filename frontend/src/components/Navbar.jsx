import { styled, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, FormControlLabel, Switch } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../features/user';


const StyledBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
}));

function Navbar() {
  const { setUser, changeMode, darkMode } = useUserStore();
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef(null);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <StyledBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: 1, borderColor: 'divider' }} elevation={0}>
      <Toolbar>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Typography variant='h6' color='primary' noWrap component='div' sx={{ ml: 2 }}>
            ROOM
          </Typography>
        </Link>
        <IconButton sx={{ marginLeft: 'auto' }} onClick={(e) => { ref.current = e.target; setOpenMenu(true); }}>
          <AccountCircle fontSize='large'/>
        </IconButton>
        <Menu
          open={openMenu}
          onClose={() => { setOpenMenu(false); ref.current = null }}
          anchorEl={ref.current}
        >
          <MenuItem divider>
            <FormControlLabel control={<Switch checked={darkMode} onChange={changeMode}/>} label='Dark Mode' />
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledBar>
  );
}

export default Navbar;
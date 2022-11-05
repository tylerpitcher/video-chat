import { Grid, TextField, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import StyledForm from '../components/StyledForm';
import useUserStore from '../features/user';

function Login() {
  const { user, loading, setUser, setLoading } = useUserStore();

  const navigate = useNavigate();

  const [formData, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    setData(data => ({
      ...data,
      [target.name]: target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await axios.post('/api/user/login', formData).catch((error) => {
      
    });

    if (response?.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <Grid justifyContent='center' alignContent='center' style={{ width: '100vw', height: '100vh' }} container>
      <Grid item>
        <StyledForm title='Login' avatar={<PersonIcon fontSize='large'/>} handleSubmit={handleSubmit}>
          <Stack spacing={3} p={4}>
            <TextField label='Email' name='email' variant='standard' type='email' onChange={handleChange} disabled={loading}></TextField>
            <TextField label='Password' name='password' variant='standard' type='password' onChange={handleChange} disabled={loading}></TextField>
            <LoadingButton
              startIcon={<LockOpenIcon/>}
              size='large'
              onClick={handleSubmit}
              variant='contained'
              type='submit'
              loading={loading}
            >
              Login
            </LoadingButton>
          </Stack>
        </StyledForm>
      </Grid>
    </Grid>
  );
}

export default Login;
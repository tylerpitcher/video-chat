import { CardContent, CardHeader, Divider, Grid, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { StyledCard } from '../components/StyledCard';
import useUserStore from '../features/user';
import Navbar from '../components/Navbar';
import RoomsList from '../components/RoomsList';

function Home() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <>
      <Navbar/>
      <Grid justifyContent='center' alignContent='center' style={{ width: '100vw', height: '100vh' }} container>
        <Grid item>
          <Toolbar/>
          <StyledCard elevation={0}>
            <CardHeader
              title={<Typography color='primary' variant='h4'>Rooms</Typography>}
              subheader='Here are your rooms'
            />
            <Divider/>
            <CardContent sx={{ height: '70%', overflowY: 'scroll' }}>
              <RoomsList/>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
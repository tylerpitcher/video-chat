import { Grid, Fab, Toolbar, Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { handleCallRequest, handleNewUser, handleUserLeft } from '../features/call';
import useUserStore from '../features/user';
import Video from '../components/Video';
import Navbar from '../components/Navbar';

const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

function Room() {
  const { user } = useUserStore();

  const { roomId } = useParams();
  const navigate = useNavigate();

  const [myMedia, setMyMedia] = useState({});
  const [media, setMedia] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    axios.get(`/api/room/${roomId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).catch((error) => {
      navigate('/');
    });

    var myStream;
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then((stream) => {
      myStream = stream;
      setMyMedia({
        stream,
        video: <Video key={user.username} name={user.username} stream={stream} me/>,
      });

      socket.emit('join', roomId, user.token);
      socket.on('leave', (username) => handleUserLeft(username, setMedia));
      socket.on('newUser', (newUser) => handleNewUser(socket, stream, user, newUser, setMedia));
      socket.on('call', (callerData) => handleCallRequest(socket, stream, callerData, setMedia));
    });

    return () => {
      myStream?.getTracks().forEach((track) => track.stop());
      socket.disconnect();
    }
  }, [user, roomId, navigate]);

  return (
    <>
      <Navbar/>
      <Toolbar/>
      <Grid container sx={{ width: 1 }} rowSpacing={0}>
        <Grid item xs={4}>
          {myMedia.video}
        </Grid>
        {Object.values(media).map((m, i) => (
          <Grid item key={i} xs={4}>
            {m}
          </Grid>
        ))}
        <Tooltip title='Leave'>
          <Fab color='primary' aria-label='add' onClick={() => navigate('/')} sx={{ position: 'fixed', right: '5vmin', bottom: '5vmin' }}>
              <ExitToAppIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </>
  );
}

export default Room;
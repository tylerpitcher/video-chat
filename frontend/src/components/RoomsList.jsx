import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../features/user';
import axios from 'axios';

function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    axios.get('/api/room', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((response) => setRooms(response?.data));
  }, [user]);

  return (
    <List sx={{ width: 1 }}>
      {rooms.map((room) => (
        <ListItem 
          key={room._id} 
          disablePadding
        >
          <ListItemButton onClick={() => navigate('/room/' + room._id)}>
            <ListItemAvatar>
              <Avatar/>
            </ListItemAvatar>
            <ListItemText primary={room.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default RoomsList;
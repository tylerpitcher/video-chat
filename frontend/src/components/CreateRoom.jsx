import { LoadingButton } from '@mui/lab';
import { Modal, Box, Stack, TextField, Autocomplete, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import useUserStore from '../features/user';
import StyledForm from './StyledForm';
import axios from 'axios';

function CreateRoom({ handleClose }) {
  const { user, loading, setLoading } = useUserStore();
  const [users, setUsers] = useState([]);
  const [formData, setData] = useState({
    name: '',
    memberNames: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true);
    axios.post('/api/room', formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!user) return;

    axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${user?.token}`
      },
    }).then((response) => {
      setUsers(response?.data);
    });
  }, [user]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Modal
      open
      disableAutoFocus	
      disableEnforceFocus
    >
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <StyledForm title='Create Room' handleSubmit={handleSubmit}>
          <Stack spacing={3} p={4}>
            <TextField 
              disabled={loading}
              label='Room Name' 
              name='name' 
              variant='outlined' 
              type='text' 
              onChange={({ target }) => setData((data) => ({
                ...data,
                name: target.value,
              }))}
            />
            <Autocomplete
              disabled={loading}
              multiple
              options={users}
              onChange={(_, memberNames) => setData((data) => ({
                ...data,
                memberNames,
              }))}
              renderInput={
                (params) => (
                  <TextField
                    label='Members'
                    {...params}
                  />
                )
              }
            />
            <LoadingButton
              size='large'
              variant='contained'
              type='submit'
              loading={loading}
            >
              Create
            </LoadingButton>
            <Button
              size='large'
              variant='outlined'
              onClick={handleClose}
            >
              Close
            </Button>
          </Stack>
        </StyledForm>
      </Box>
    </Modal>
  );
}

export default CreateRoom;
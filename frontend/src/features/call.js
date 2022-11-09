import Video from '../components/Video';
import Peer from 'simple-peer';

function handleUserLeft(username, setMedia) {
  setMedia((prev) => Object.entries(prev).reduce((final, [key, value]) => {
    if (key !== username) return { ...final, [key]: value };
    return final;
  }, {}));
}

function handleNewUser(socket, stream, user, newUser, setMedia) {
  const peer = new Peer({ initiator: true, trickle: false, stream: stream });
  if (newUser.username == user.username) return;

  peer.on('signal', (data) => {
    socket.emit('call', { to: newUser.id, signalData: data, username: user.username });
  });

  peer.on('stream', (stream) => {
    setMedia(videos => ({
      ...videos,
      [newUser.username]: <Video key={newUser.username} name={newUser.username} stream={stream}/>,
    }));
  });

  socket.on('yes', signal => {
    peer.signal(signal);
  });
}

function handleCallRequest(socket, stream, callerData, setMedia) {
  const peer = new Peer({ initiator: false, trickle: false, stream: stream });

  peer.on('signal', (data) => {
    socket.emit('yes', { signal: data, to: callerData.from });
  });

  peer.on('stream', stream => {
    setMedia(videos => ({
      ...videos,
      [callerData.username]: <Video key={callerData.username} name={callerData.username} stream={stream}/>,
    }));
  });

  peer.signal(callerData.signal);
}

export { handleUserLeft, handleNewUser, handleCallRequest };
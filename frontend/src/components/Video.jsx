import { useRef, useEffect } from 'react';
import { Tooltip } from '@mui/material';

function Video({ stream, me, name}) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = stream;
  }, []);

  return (
    <Tooltip title={name}>
      <video playsInline ref={ref} muted={me} autoPlay style={{ width: '100%', ...(me && {transform: 'rotateY(180deg)'}), display: 'table-row' }} />
    </Tooltip>
  )
}

export default Video;
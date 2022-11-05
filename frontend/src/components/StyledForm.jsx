import { CardContent, Divider } from '@mui/material';
import { StyledCard, StyledCardHeader } from './StyledCard';

function StyledForm({ title, avatar, handleSubmit, children }) {
  return (
    <StyledCard>
      <StyledCardHeader title={title} avatar={avatar}/>
      <Divider/>
      <CardContent>
        <form onSubmit={handleSubmit}>
          { children }
        </form>
      </CardContent>
    </StyledCard>
  );
}

export default StyledForm;
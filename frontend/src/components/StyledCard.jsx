import { Card, CardHeader, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  width: '30vw',
  height: '65vh',
  minWidth: '300px',
  minHeight: '400px',
  overflow: 'scroll',
  [theme.breakpoints.down('sm')]: {
    border: 'none',
    width: '100vw',
    height: '100vh',
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiCardHeader-title': {
    fontSize: '1.25rem',
  },
}));

export { StyledCard, StyledCardHeader };
import { Fab, styled } from '@mui/material';

export const RightBottomFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  backgroundColor: theme.palette.grey[500],
  color: theme.palette.grey[900],
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[500],
    shadow: theme.shadows[12],
  },
}));

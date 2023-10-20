'use client';
import { FC } from 'react';
import { AppBar, List } from '@mui/material';
import MenuItem from './MenuItem';
import menu from './menu';

const Sidebar: FC = () => {
  return (
    <AppBar
      component="aside"
      sx={{
        bgcolor: 'grey.A100',
        height: '100%',
        width: 240,
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
          // backgroundColor: 'rgba(0,0,0,.1)',
          backgroundColor: 'secondary.light',
          outline: '1px solid slategrey',
        },
      }}
    >
      <List component="nav" sx={{ padding: 0 }}>
        {menu.map((item) => (
          <MenuItem item={item} key={`${item.link} ${item.title}`} />
        ))}
      </List>
    </AppBar>
  );
};

export default Sidebar;

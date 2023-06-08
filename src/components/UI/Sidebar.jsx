import React from "react";
import { Drawer, Box, List,ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AttractionsIcon from '@mui/icons-material/Attractions';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const Sidebar = () => {
  return (
    <Drawer anchor="left" open={true} hideBackdrop={true} style={{width:250}}>
      <Box sx={{ width: 250, height: "100vh", backgroundColor: 'secondary.main' }}>
        <Box sx={{
          padding: '20px'
        }}>
          <h4>Menu</h4>
          <List>
            <ListItemButton>
              <ListItemIcon><EngineeringIcon/></ListItemIcon>
              <ListItemText>Employees</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><EmojiPeopleIcon/></ListItemIcon>
              <ListItemText>Customers</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><AttractionsIcon/></ListItemIcon>
              <ListItemText>Games</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><LoyaltyIcon/></ListItemIcon>
              <ListItemText>Sales</ListItemText>
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

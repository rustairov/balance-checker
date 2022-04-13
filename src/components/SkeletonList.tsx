import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

const SkeletonList = () => (
    <List>
        {[...Array(3)].map((n, i) => (
            <ListItem key={i}>
                <ListItemAvatar>
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                    primary={<Skeleton animation="wave" height={20} width="30%" />}
                    secondary={<Skeleton animation="wave" height={20} width="15%" />}
                />
            </ListItem>
        ))}
    </List>
);

export default SkeletonList;

import React from 'react';
import { ethers } from 'ethers';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import { IToken } from '../types';

interface IProps {
    tokens: IToken[]
}

const TokensList = ({ tokens }: IProps) => (
    <List>
        {tokens.map((token, i) => (
            <ListItem key={i}>
                <ListItemAvatar>
                    <Avatar src={token.logo} />
                </ListItemAvatar>
                <ListItemText
                    primary={`${ethers.utils.formatUnits(token.balance.toString(), token.decimals)} ${token.symbol}`}
                    secondary={`$${token.balanceUsd.toFixed(2)}`}
                />
            </ListItem>
        ))}
    </List>
);

export default TokensList;

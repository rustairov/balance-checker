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
        {tokens.map((token) => (
            <ListItem key={token.coingeckoId}>
                <ListItemAvatar>
                    <Avatar src={token.logoURI} />
                </ListItemAvatar>
                <ListItemText
                    primary={`${ethers.utils.formatUnits(token.balance, token.decimals)} ${token.symbol}`}
                    secondary={`$${
                        Number(
                            ethers.utils.formatUnits(
                                // @ts-ignore
                                token.balance.mul(Math.round(token.price)),
                                token.decimals
                            )
                        ).toFixed(2)
                    }`}
                />
            </ListItem>
        ))}
    </List>
);

export default TokensList;

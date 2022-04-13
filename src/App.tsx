import React, { useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useMetamask } from 'use-metamask';
import { ethers } from 'ethers';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TokensList from './components/TokensList';
import SkeletonList from './components/SkeletonList';
import { IToken, IChain } from './types';
import Skeleton from "@mui/material/Skeleton";

const API = process.env.REACT_APP_API;

const App = () => {
    const [ tokens, setTokens ] = useState<IToken[]>([]);
    const [ chains, setChains ] = useState<IChain>({});
    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const { connect, metaState } = useMetamask();
    const { account, isConnected } = metaState;
    const chainId = metaState.chain.id;
    const address = account[0];

    const connectMetamask = useCallback(async () => {
        await connect(ethers.providers.Web3Provider, 'any');
    }, []);

    const getChains = useCallback(async () => {
        const { data } = await axios.get(`${API}/v1/chains`);
        const object = {};

        for (const chain of data) {
            // @ts-ignore
            object[chain.id] = chain.name
        }

        setChains(object);
    }, []);

    const getBalances = useCallback(async () => {
        setIsLoaded(false);

        const { data } = await axios.get(`${API}/v1/ethlike/tokens_balances/${address}`, {
            params: {
                chains: chainId,
                without_zero_balances: true
            }
        });

        setTokens(data.balances[chainId] ?? [])
        setIsLoaded(true);
    }, [address, chainId]);

    useEffect(() => {
        if (!isConnected) {
            connectMetamask().catch(console.error);
        }
    }, [isConnected, connectMetamask]);

    useEffect(() => {
        if (address && chainId) {
            getBalances().catch(console.error);
        }
    }, [address, chainId, getBalances]);

    useEffect(() => {
        getChains().catch(console.error);
    }, [getChains]);

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Grid>
                    {(chains[chainId])
                        ? <Typography variant="h4">{`Balance ${chains[chainId]} network`}</Typography>
                        : <Skeleton animation="wave" />
                    }
                    {(isLoaded)
                        ? (
                            (tokens.length)
                                ? <TokensList tokens={tokens} />
                                : <Typography>Empty</Typography>
                        ) : <SkeletonList />
                    }
                </Grid>
            </Box>
        </Container>
    );
};

export default App;

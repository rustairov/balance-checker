import React, {useEffect, useState} from 'react';
import {useMetamask} from 'use-metamask';
import {ethers} from 'ethers';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TokensList from './components/TokensList';
import SkeletonList from './components/SkeletonList';
import {IToken} from './types';
import balanceABI from './abi/balance.json';
import chains from './chains.json';

const App = () => {
    const [ tokens, setTokens ] = useState<IToken[]>([]);
    const { connect, metaState } = useMetamask();
    const { account, isConnected, web3: provider } = metaState;
    const chainId = metaState.chain.id;
    // @ts-ignore
    const chain = chains[chainId];
    const address = account[0];

    useEffect(() => {
        const connectMetamask = async () => {
            await connect(ethers.providers.Web3Provider, 'any');
        };

        if (!isConnected) {
            connectMetamask().catch(console.error);
        }
    }, [isConnected, connect]);

    useEffect(() => {
        const getBalances = async () => {
            const tokensRes = await fetch(chain.tokensURI);
            const contracts = await tokensRes.json();
            const tokens = [{
                ...chain,
                balance: await provider.getBalance(address)
            }];

            for (const data of contracts) {
                const contract = new ethers.Contract(data.address, balanceABI, provider);
                const balance = await contract.balanceOf(address);

                if (!balance.eq(0)) {
                    tokens.push({
                        ...data,
                        balance
                    });
                }
            }

            const pricesRes = await fetch('https://api.coingecko.com/api/v3/simple/price?' + new URLSearchParams({
                ids: tokens.map((token) => token.coingeckoId).toString(),
                vs_currencies: 'usd',
            }));
            const prices = await pricesRes.json();

            for (const token of tokens) {
                token.price = prices[token.coingeckoId].usd;
            }

            setTokens(tokens);
        };

        if (address && chain) {
            setTokens([]);
            getBalances().catch(console.error);
        }
    }, [address, chain, provider]);

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Grid>
                    <Typography variant="h3">Balance</Typography>
                    {(tokens.length)
                        ? <TokensList tokens={tokens} />
                        : <SkeletonList />
                    }
                </Grid>
            </Box>
        </Container>
    );
};

export default App;

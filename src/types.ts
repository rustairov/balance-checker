import { BigNumberish } from 'ethers';

export interface IContract {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    chainId: string;
    logoURI: string;
    coingeckoId: string;
    listedIn: string[];
}

export interface IToken extends IContract {
    tokensURI?: string;
    balance: BigNumberish;
    price: number;
}

export interface IToken {
    address: string;
    name: string;
    symbol: string;
    logo: string;
    decimals: number,
    balance: number,
    balanceUsd: number,
    priceUsd: number
}

export interface IChain {
    [id: string]: string
}

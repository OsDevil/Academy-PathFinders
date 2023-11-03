import axios from 'axios';

export interface LongShortRatio {
    symbol: string;
    longShortRatio: number;
    longAccount: number;
    shortAccount: number;
    timestamp: number;
}

export const fetchLongShortRatios = async (
    symbol: string,
    period: string,
    limit: number = 500,
    startTime?: number,
    endTime?: number,
): Promise<LongShortRatio[]> => {

    const response = await axios.get('https://fapi.binance.com/futures/data/globalLongShortAccountRatio', {
        params: {
            symbol,
            period,
            limit,
            startTime,
            endTime,
        },
    });

    const data = response.data;

    return data.map((item: any) => {
        return {
            symbol: item.symbol,
            longShortRatio: parseFloat(item.longShortRatio),
            longAccount: parseFloat(item.longAccount),
            shortAccount: parseFloat(item.shortAccount),
            timestamp: item.timestamp,
        };
    });
};

// Add this interface to the existing ones
export interface SymbolInfo {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
}

export const fetchAllSymbols = async (): Promise<SymbolInfo[]> => {
    const response = await axios.get('https://fapi.binance.com/fapi/v1/exchangeInfo');
    const data = response.data;
    return data.symbols.map((item: any) => {
        return {
            symbol: item.symbol,
            baseAsset: item.baseAsset,
            quoteAsset: item.quoteAsset,
        };
    });
};

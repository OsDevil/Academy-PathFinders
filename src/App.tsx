import React, { useState, useEffect, lazy, Suspense } from 'react';
import {Container, Segment, Search, Dimmer, Loader, Icon} from 'semantic-ui-react';
import { fetchAllSymbols, SymbolInfo } from './binance-api';
import './App.css';

const LongShortRatioChart = lazy(() => import('./LongShortRatioChart'));

const App: React.FC = () => {
    const [symbols, setSymbols] = useState<SymbolInfo[]>([]);
    const [displayedSymbols, setDisplayedSymbols] = useState<SymbolInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        const fetchSymbols = async () => {
            const fetchedSymbols = await fetchAllSymbols();
            setSymbols(fetchedSymbols.sort((a, b) => a.symbol.localeCompare(b.symbol)));
            setDisplayedSymbols(fetchedSymbols);
        };

        fetchSymbols();
    }, []);

    const handleSearchChange = (e: React.SyntheticEvent, data: any) => {
        setLoading(true);
        setValue(data.value);
        setDisplayedSymbols(symbols.filter((symbol) =>
            symbol.symbol.toLowerCase().includes(data.value.toLowerCase())
        ));
        setLoading(false);
    };

    return (
        <Container>
            <img className="profile-picture" src="/CryptoRatioInsights/profile_picture.jpg" alt="Profile" />
            <h1>Crypto long short ratio screener</h1>
            <Segment style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Search
                        loading={loading}
                        onSearchChange={handleSearchChange}
                        results={displayedSymbols.map((symbol, index) => ({
                            key: `${symbol.baseAsset}-${symbol.quoteAsset}-${index}`,
                            title: `${symbol.baseAsset} / ${symbol.quoteAsset}`,
                        }))}
                        value={value}
                        placeholder="Search for a pair..."
                    />
                    <a href="https://twitter.com/Celliottiste" target="_blank" rel="noopener noreferrer">
                        <Icon className={"twitter-icon"} name="twitter" size="large" />
                    </a>
            </Segment>


            {displayedSymbols.map((symbol, index) => (
                    <Suspense fallback={<Dimmer active><Loader /></Dimmer>}>
                        <LongShortRatioChart symbol={symbol.symbol} />
                    </Suspense>
            ))}
        </Container>
    );
};

export default App;
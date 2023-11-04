import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchLongShortRatios, LongShortRatio } from './binance-api';
import {Loader, Segment, Button, Icon, Message} from 'semantic-ui-react';
import * as htmlToImage from 'html-to-image';

interface LongShortRatioChartProps {
    symbol: string;
}

const LongShortRatioChart: React.FC<LongShortRatioChartProps> = ({ symbol }) => {
    const [data, setData] = useState<LongShortRatio[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const chartContainerRef = useRef(null);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const longShortRatios = await fetchLongShortRatios(symbol, '5m');
            setData(longShortRatios);
            setLoading(false);
        };
        fetchData();
        const interval = setInterval(fetchData, 5 * 60000); // Update every minute
        return () => clearInterval(interval);
    }, [symbol]);

    const displayFloatingMessage = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000); // Change this value to adjust the duration of the message
    };

    const handleAnimationEnd = () => {
        setLoading(false);
    };

    const strokeColor = () => {
        if (data.length === 0) return 'gray';
        const lastValue = data[data.length - 1].longShortRatio;
        return lastValue > 1 ? 'green' : 'red';
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const filter = (node: HTMLElement) => {
        // Show the Twitter handle
        if (node.classList?.contains("twitter-handle")) {
            node.style.display = "flex";
        }

        // Exclude the 'chart-buttons' class
        const exclusionClasses = ['chart-buttons'];
        return !exclusionClasses.some((classname) => node.classList?.contains(classname));
    };

    const shareImage = async () => {
        if (!chartContainerRef.current) return;

        const container = chartContainerRef.current as HTMLDivElement;

        try {
            const dataUrl = await htmlToImage.toPng(container, { cacheBust: true, filter: filter });

            const dataUrlBlob = await fetch(dataUrl).then((res) => res.blob());

            if (navigator.share) {
                const file = new File([dataUrlBlob], `${symbol}.png`, {
                    type: dataUrlBlob.type,
                });

                try {
                    await navigator.share({
                        title: `${symbol} Long Short Ratio Chart`,
                        files: [file],
                    });
                } catch (err) {
                    console.error("Sharing failed", err);
                    alert("Sharing failed");
                }
            } else {
                console.error("Web Share API not supported");
                alert("Web Share API not supported");
            }
        } catch (err) {
            console.error("Failed to generate image", err);
        }
    };

    const exportAsPicture = async (share: boolean) => {
        if (!chartContainerRef.current) return;

        const container = chartContainerRef.current as HTMLDivElement;

        try {
            const dataUrl = await htmlToImage.toPng(container, { cacheBust: true, filter : filter });

            // Hide the Twitter handle again
            const twitterHandle = container.querySelector(".twitter-handle");
            if (twitterHandle) {
                (twitterHandle as HTMLElement).style.display = "flex";
            }


            if (share) {
                if (navigator.share) {
                    const dataUrlBlob = await fetch(dataUrl).then((res) => res.blob());

                    const file = new File([dataUrlBlob], `${symbol}.png`, {
                        type: dataUrlBlob.type,
                    });

                    try {
                        await navigator.share({
                            title: `${symbol} Long Short Ratio Chart`,
                            files: [file],
                        });
                    } catch (err) {
                        console.error("Sharing failed", err);
                        alert("Sharing failed");
                    }
                } else {
                    console.error("Web Share API not supported");
                    alert("Web Share API not supported");
                }

            } else {
                try {
                    const dataUrlBlob = await fetch(dataUrl).then((res) => res.blob());
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            [dataUrlBlob.type]: dataUrlBlob,
                        }),
                    ]);
                    displayFloatingMessage();
                } catch (error) {
                    console.error('Failed to copy image to clipboard', error);
                    alert('Failed to copy image to clipboard');
                }
            }
        } catch (err) {
            console.error('Failed to generate image', err);
        }
    };

    return (
        <>
        <div ref={chartContainerRef} style={{marginBottom:20}}>
            <Segment>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{symbol}</h3>
                    <div className={'chart-buttons'}>
                        <Button icon="copy" onClick={() => exportAsPicture(false)} />
                        <Button icon="share" onClick={() => exportAsPicture(true)} />
                    </div>
                </div>
                {loading || data.length === 0 ? (
                    <Loader active inline="centered" size="small">
                        Loading data...
                    </Loader>
                ) : (
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={formatDate}
                                angle={-45}
                                textAnchor="end"
                            />
                            <YAxis />
                            <Tooltip />
                            <Line
                                name={''}
                                type="monotone"
                                dataKey="longShortRatio"
                                stroke={strokeColor()}
                                dot={false}
                                onTransitionEnd={handleAnimationEnd}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                <div className="twitter-handle" style={{marginTop:20, display: "flex", justifyContent: "flex-end" }}>
                    <a href="https://twitter.com/Celliottiste" target="_blank" rel="noopener noreferrer">
                        <Icon className={"twitter-icon"} name="twitter" size="large" />
                    </a>
                    <span style={{ color: 'darkgreen' }}>@Celliottiste</span>
                </div>
            </Segment>
        </div>
            <Message
                positive
                floating
                attached={false}
                hidden={!showMessage}
                onDismiss={() => setShowMessage(false)}
                header="Success!"
                content="Image copied to clipboard."
                style={{
                    transition: 'opacity 1s ease-in, bottom 1s ease-in',
                    position: 'fixed',
                    left: '50%',
                    bottom: showMessage ? '50%' : '45%',
                    transform: 'translateX(-50%)',
                }}
            />
        </>
    );
};

export default LongShortRatioChart;
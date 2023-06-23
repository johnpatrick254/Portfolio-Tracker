import { useEffect, useState } from 'react';
import { LineChart } from './Linechart';
import axios from "axios"


const Asset = ({ title, stocksAmount, startDate, percentage }) => {
    const [chartData, setChartData] = useState([]);
    const [percentageGrowth, setpercentageGrowth] = useState(0);
    const [beginBalnce, setBeginBalance] = useState(0)
    const [firstLoad, setFirstLoad] = useState(true)
    const [currentBalance, setCurrentBalance] = useState(0)

    function convertTimestampToDate(timestamp) {
        let date = new Date(timestamp);

        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);

        // Return the date in the desired format
        return year + '-' + month + '-' + day;
    }


    useEffect(() => {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',

        }
        axios.request({
            method: 'GET',
            url: `https://api.polygon.io/v2/aggs/ticker/${title}/range/1/day/2021-08-09/${startDate}?apiKey=JlEDrWV0zabFFbJeEv044L8DwPgfjfI0`,
            headers: headers
        }).then(res => {
            setChartData(() => {
                const newData = res.data.results.map((e) => {
                    const { c: close, o: open, t: time } = e
                    return {
                        date: convertTimestampToDate(time),
                        open: open,
                        close: close
                    }
                })
                return newData
            })

        })
            try {
                
        axios.request({
            method: 'GET',
            url: `https://api.polygon.io/v2/aggs/ticker/${title}/range/1/day/${startDate}/${startDate}?apiKey=qeSdCi_Iu1pTFRn4Pa4HjsKbClLDRj_S`,
            headers: headers
        }).then(res => {
            if(res.data.results[0]){
                const { c: closingPrice, ...data } = res.data.results[0]
                let balance = +closingPrice * +stocksAmount
                if (firstLoad) {
                    setBeginBalance(balance);
                    console.log("first run")
                }
                setFirstLoad(false)
                setCurrentBalance(balance);
            
                let change = (((+currentBalance) - (+beginBalnce))/+beginBalnce)*100;
                if(currentBalance === 0) change=0;
               setpercentageGrowth(change.toFixed(2));
    
                console.log(change,beginBalnce, currentBalance)
    
            }
        
        })
            } catch (error) {
                console.log(error)
            }
    }, [startDate])

    return (
        <li className={'showen'}>
            <div className='top'>
                <h2>{title}</h2>
                <span className={percentageGrowth >= 0 ? 'green' : 'red'}>
                    {percentageGrowth >= 0 ? `+${percentageGrowth}` : `${percentageGrowth}`}%
                </span>
            </div>

            <div className='content'>
                <div className='info'>
                    <p>
                        <span className='title'>percentage</span>
                        <span className='data'>%{percentage}</span>
                    </p>
                    <p>
                        <span className='title'>stocks amount</span>
                        <span className='data'>{stocksAmount}</span>
                    </p>
                    <p>
                        <span className='title'>begin balance</span>
                        <span className='data'>${beginBalnce}</span>
                    </p>
                    <p>
                        <span className='title'>Current balance</span>
                        <span className='data'>${currentBalance}</span>
                    </p>
                </div>
                <article className='chart'>
                    <LineChart stock={chartData} title={title} />
                </article>
            </div>
        </li>
    )
}

export default Asset
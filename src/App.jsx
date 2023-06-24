import './App.css'
import { Navbar } from './components/Navbar'
import { linedata } from "./linedata"
import { piedata } from "./piedata"
import { LineChart } from "./components/Linechart"
import { PieChart } from "./components/Piechart"
import Asset from './components/Asset'
import Stocks from './components/Stocks'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

function App() {
  const buttRef = useRef(null);
  const [portfolio, setPortFolio] = useState([
    {
      "title": "AAPL",
      "value": 250,
      "date": "2023-06-04",
      "totals": 100,
      "shares": "1.34"
    },
    {
      "title": "MFST",
      "value": 250,
      "date": "2023-06-04",
      "totals": 100,
      "shares": "0.75"
    },
    {
      "title": "TSLA",
      "value": 250,
      "date": "2023-06-04",
      "totals": 100,
      "shares": "0.97"
    },
    {
      "title": "AMD",
      "value": 250,
      "date": "2023-06-04",
      "totals": 100,
      "shares": "2.27"
    }
  ])
  const [pie_data, setPieData] = useState(piedata)
  const [startDate, setStartDate] = useState('2023-06-22')
  const [percentageGrowth, setpercentageGrowth] = useState(0);
  const [beginBalnce, setBeginBalance] = useState(null)
  const [firstLoad, setFirstLoad] = useState(true)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [isloading, setIsLoading] = useState(false)


  const fetchStocks = async (startDate) => {

    const data = await axios.request({
      method: 'get',
      url: `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${startDate}?adjusted=true&apiKey=JlEDrWV0zabFFbJeEv044L8DwPgfjfI0`,

    }).then(res => res.data.results).catch(e => {
      alert("API LIMIT REACHED, refresh and wait for a minute");
      setIsLoading(false);
      console.log(e)
    })
    let amd_pr;
    let apl_pr;
    let tsl_pr;
    let msf_pr;
    data.map(ticker => {
      switch (ticker.T) {
        case 'AAPL':
          apl_pr = (portfolio[0].shares * ticker.c)
          console.log(apl_pr)
          break;
        case 'MSFT':
          msf_pr = (portfolio[1].shares * ticker.c)
          console.log(msf_pr)
          break;
        case 'TSLA':
          tsl_pr = (portfolio[2].shares * ticker.c)
          console.log(tsl_pr)
          break;
        case 'AMD':
          amd_pr = (portfolio[3].shares * ticker.c)
          console.log(amd_pr)
          break;

        default:
          break;
      }

    })
    let tt = await (amd_pr + apl_pr + tsl_pr + msf_pr).toFixed(2);
    setCurrentBalance(tt);

    let change = (((+currentBalance) - (+beginBalnce)) / +beginBalnce) * 100;
    setpercentageGrowth(change.toFixed(2))


    let amd_g = (((+amd_pr / tt) * 100)) - portfolio[0].percent;
    let apl_g = (((+apl_pr / tt) * 100)) - portfolio[1].percent;
    let tsl_g = (((+tsl_pr / tt) * 100)) - portfolio[2].percent;
    let msf_g = (((+msf_pr / tt) * 100)) - portfolio[3].percent;


    let amd = `AMD: USD${amd_pr.toFixed(2)} / ${amd_g > 0 ? `+ ${+amd_g.toFixed()}` : amd_g.toFixed()}%`;
    let apl = `AAPL: USD${apl_pr.toFixed(2)} / ${apl_g > 0 ? `+ ${apl_g.toFixed()}` : apl_g.toFixed()}%`;
    let tsl = `TSLA: USD${tsl_pr.toFixed(2)} / ${tsl_g > 0 ? `+ ${tsl_g.toFixed()}` : tsl_g.toFixed()}%`;
    let msf = `MSFT: USD${msf_pr.toFixed(2)} / ${msf_g > 0 ? `+ ${msf_g.toFixed()}` : msf_g.toFixed()}%`;


    let adjPortfolio = {
      [amd]: amd_pr,
      [apl]: apl_pr,
      [msf]: msf_pr,
      [tsl]: tsl_pr
    }
    setPieData(adjPortfolio);
    setIsLoading(false);
    
  }
  
  useEffect(() => {
    
    try {
      
      if (!firstLoad) {
        fetchStocks(startDate);
        
      }
      setIsLoading(false);

    } catch (err) {
      alert("API LIMIT REACHED, refresh and wait for a minute");
      setIsLoading(false);
      console.log(err);
    }

  }, [startDate])

  return (
    <>
      <Navbar />
      <Stocks ref={buttRef} loading={isloading} ref_Function={() => {
        setIsLoading(true);
        let data = buttRef.current.handleSubmit();
        setPortFolio(data);
        setStartDate(data[0].date)
        if (firstLoad) {
          setBeginBalance(data[0].totals)
        }
        setFirstLoad(false)
        setCurrentBalance(data[0].totals)
      }} />
      <div className='Portfolio-status'>
        <p>
          <span className='title'>Initial Balance</span>
          <span className='data'>${beginBalnce}</span>
        </p>
        <p>
          <span className='title'>Current balance</span>
          <span className='data'>${currentBalance}</span>
        </p>
        <p>
          <span className='title'>Growth</span>
          <span className={`data ${currentBalance - beginBalnce > 0 ? 'green' : 'red'}`}>
            {currentBalance - beginBalnce > 0 ?
              `+${(currentBalance - beginBalnce.toFixed(2))} USD`
              :
              `${(currentBalance - beginBalnce).toFixed(2)} USD`
            }
          </span>
        </p>
      </div>

      <PieChart piData={pie_data} />

    </>
  )
}

export default App


import './App.css'
import { Navbar } from './components/Navbar'
import { linedata } from "./linedata"
import { piedata } from "./piedata"
import { LineChart } from "./components/Linechart"
import { PieChart } from "./components/Piechart"
import Asset from './components/Asset'
import Stocks  from './components/Stocks'
import { useRef } from 'react'

function App() {
  const buttRef = useRef(null);

  return (
    <>
     <Navbar/>
     <Stocks ref={buttRef} ref_Function={()=>{buttRef.current.handleSubmit()}}/>
     <PieChart piData={piedata}/>
      
    </>
  )
}

export default App


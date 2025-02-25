import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Wallet from "./pages/ERC20Wallet"
import Data from "./pages/NFTData"
import Account from "./components/account"
function App() {
  return (
    <>
    <Account/>
    {/* <BrowserRouter>
    <Route path="/" element= {<Home/>}/>
    <Route path="/wallet" element= {<Wallet/>}/>
    <Route path="/data" element= {<Data/>}/>
    </BrowserRouter> */}
    </>
  )
}

export default App

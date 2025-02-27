// // import Account from "./components/account"
// import { useState } from "react"
// // import { Modal } from "./components/modal"
// // import { hashMessage, Hex, keccak256, stringToHex, toHex } from "viem"
// import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
// import {Hex, isAddressEqual, recoverMessageAddress, toHex} from "viem"
import UsdcTransfers from "./components/trade"
import Data from "./pages/NFTData"
function App() {


//   // const [key, setKey] = useState("")
//   // const eip191Encode = () => {
//   //   const prefix = `\x19Ethereum Signed Message:\n${message.length}`
//   //   const prefixedMessage = prefix + message
//   //    setKey(keccak256(stringToHex(prefixedMessage)))
//   // }

//   const message = "Hello, World!"
//   // const messageHash = hashMessage(message)
//   const [privateKey, setPrivateKey] = useState("")
//   const [sign, setSign] = useState("")
//   const [address, setAddress] = useState("")
//   const [readdr, setReaddr] = useState("")
//   const handleAccount = async () => {


//     const newKey = generatePrivateKey();
//     setPrivateKey(newKey)

//     const account = privateKeyToAccount(newKey)
//     setAddress(account.address)
//     const signature = await account.signMessage({ message })

//     setSign(signature)
//   }

//   const handleRecover = async () => {
//     const recoverAdress = await recoverMessageAddress({
//       message: message,
//       signature: sign as Hex
//     })
//     setReaddr(recoverAdress)
//   }
  return (
    <>
    <UsdcTransfers/>
    {/* <Data></Data> */}

      {/* <p>{messageHash}</p>
      <p>{toHex("Hello, World!")}</p>
      <p>{key}</p>
      <button onClick={eip191Encode}>按钮</button> */}

      {/* <div>
        <p>"newKey: "{privateKey}</p>
        <p>"公钥: " {address}</p>
        <p>"签名:" {sign}</p>
        <button onClick={handleAccount}>签名</button>
        <p>"验签公钥: " {readdr}</p>
        <button onClick={handleRecover}>验签</button>
      </div> */}


      {/* <Modal/> */}
      {/* <Account/> */}
      {/* <BrowserRouter>
    <Route path="/" element= {<Home/>}/>
    <Route path="/wallet" element= {<Wallet/>}/>
    <Route path="/data" element= {<Data/>}/>
    </BrowserRouter> */}
    </>
  )
}

export default App

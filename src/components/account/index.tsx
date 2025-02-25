import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { useState } from 'react'
import { createPublicClient, createWalletClient, custom, formatEther, fromHex, Hex, http, parseEther, toHex } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

declare global {
    interface Window {
        ethereum: { request(...args: any): Promise<any> };
    }
}

function getWalletClient(key: Hex) {
    const account = privateKeyToAccount(key)
    const client = createWalletClient({
        account,
        chain: sepolia,
        // transport: http("https://rpc-sepolia.rockx.com")
        transport: custom(window.ethereum)
    })
    return client
}



const publicClient = createPublicClient({
    chain: sepolia,
    transport: http('https://rpc-sepolia.rockx.com'),
})


const Account = () => {
    const [key, setKey] = useState("")
    const [balance, setBalance] = useState("")
    const [address, setAddress] = useState("")
    const [txhash, setTxHash] = useState("")
    const [newPublicKey, setNewPublicKey] = useState("")
    const handleGenerateKey = () => {
        const newKey = generatePrivateKey();
        setKey(newKey)
        setNewPublicKey(privateKeyToAccount(newKey).address)
    }

    const handleGetBalance = async () => {
        if (!key) return
        console.log(key)
        try {
            const client = getWalletClient(key as Hex)
            const balanceWei = await publicClient.getBalance({
                address: client.account.address,
            })
            const balanceEth = formatEther(balanceWei)
            setBalance(balanceEth)
        } catch (error) {
            console.log(error)
            setBalance("查询失败")
        }
    }

    const handleGetAccount = async () => {
        const client = createWalletClient({
            chain: sepolia,
            transport: custom(window.ethereum!)
        })
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const [addr] = await client.getAddresses()
        setAddress(addr)

    }

    const handleTransfer = async () => {

        const client = createWalletClient({
            chain: sepolia,
            transport: custom(window.ethereum!)
        })
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const [addr] = await client.getAddresses()
        setAddress(addr)
        console.log("11111", address)
        console.log("11111", newPublicKey)
        const tx = {
            account: address as Hex,
            to: newPublicKey as Hex, // 替换为目标地址
            value: parseEther("0.001"), // 转账 0.01 ETH，转为 Wei
            // 可选：指定 gas 价格或限制
            // gasPrice: parseGwei("20"), // 20 Gwei
            // gasLimit: 21000n, // 默认简单转账 Gas 限制
        };
        
        // 发送交易
        const txHash = await client.sendTransaction(tx);
        setTxHash(txHash);
        console.log(txhash)
    }
    return (
        <>
            <div>
                <h1>获取私钥</h1>
                <p>
                    私钥:   {key}
                </p>
                <button onClick={handleGenerateKey}>第一步: 生成私钥</button>
            </div>
            <div>
                <p>balance : {balance} </p>
                {(key !== "") ? <button onClick={handleGetBalance}>第二步:查询生成私钥的余额</button> : ""}
                <div>
                    <p>{address}</p>
                    <button onClick={handleGetAccount}>第三步: 连接metamask</button>
                </div>
            </div>
            <div>
                <h1>转账</h1>
                <p>txhash {txhash}</p>
                <button onClick={handleTransfer}>转账</button>
            </div>
        </>
    )
}

export default Account
import { useState, useCallback } from 'react'
import './App.css'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const nftAbi = [
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const client = createPublicClient({
  chain: mainnet,
  transport: http('https://eth.blockrazor.xyz'),
})

const NFT_CONTRACT_ADDRESS = "0x0483b0dfc6c78062b9e999a82ffb795925381415"

function App() {
  // const [blockNumber, setBlockNumber] = useState<bigint | null>(null);
  // const fetchBlockNumber = useCallback(async () => {
  // const number = await client.getBlockNumber();
  // console.log('Block Number:', blockNumber);
  // setBlockNumber(number); // 更新状态
  // })

  const [owner, setOwner] = useState<string | null>(null)
  const [tokenUri, setTokenUri] = useState<string | null>(null)
  const fetchNFTData = async () => {
    const ownerAddress = await client.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: nftAbi,
      functionName: 'ownerOf',
      args: [408n]
    })
    setOwner(ownerAddress as string)

    const tokenUrl = await client.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: nftAbi,
      functionName: 'tokenURI',
      args: [408n]
    })
    setTokenUri(tokenUrl as string)
  };
  return (
    <>
      <button onClick={fetchNFTData}>获取NFT数据</button>
      {owner && (
        <p>owner: {owner}</p>
      )}
      {tokenUri && (
        <p>tokenUri: {tokenUri}</p>
      )}
    </>
  )
}

export default App

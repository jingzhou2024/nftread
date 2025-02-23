import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: mainnet, 
  transport: http('wss://ethereum-rpc.publicnode.com'), 
}) 

const blockNumber = await client.getBlockNumber() 
console.log(blockNumber)
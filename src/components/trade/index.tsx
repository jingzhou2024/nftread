// components/UsdcTransfers.tsx
import { useState, useEffect } from 'react'
import { createPublicClient, http, parseAbiItem, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'
import "./index.css"
// 定义 Transaction 接口，调整 transactionHash 类型为更具体的 `0x${string}`
interface Transaction {
  from: string
  to: string
  value: string // 格式化后的 USDC 值
  blockNumber: number
  transactionHash: `0x${string}` // 与 viem 返回的类型保持一致
}

// USDC 合约地址
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as const

// ERC-20 Transfer 事件 ABI
const transferEvent = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)'
)

// 创建客户端
const client = createPublicClient({
  chain: mainnet,
  transport: http('https://eth.llamarpc.com') 
})

const UsdcTransfers: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTransfers = async () => {
    setLoading(true)
    setError(null)

    try {
      const latestBlock = await client.getBlockNumber()
      const fromBlock = latestBlock - BigInt(100)

      const logs = await client.getLogs({
        address: USDC_ADDRESS,
        event: transferEvent,
        fromBlock,
        toBlock: latestBlock
      })

      const formattedTxns: Transaction[] = logs
        .map(log => {
          const from = log.args.from
          const to = log.args.to
          const value = log.args.value

          if (!from || !to || value === undefined) {
            return null
          }

          return {
            from: from as string,
            to: to as string,
            value: formatUnits(value, 6),
            blockNumber: Number(log.blockNumber),
            transactionHash: log.transactionHash // 类型已经是 `0x${string}`
          }
        })
        .filter((txn): txn is Transaction => txn !== null) // 确保类型安全

      setTransactions(formattedTxns)
    } catch (err) {
      setError('无法获取转账记录，请稍后重试')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransfers()
  }, [])

  return (
    <div className="container">
      <h2>最近 100 个区块的 USDC 转账记录</h2>
      
      <button 
        onClick={fetchTransfers} 
        disabled={loading}
        className="refresh-btn"
      >
        {loading ? '加载中...' : '刷新'}
      </button>

      {error && <div className="error">{error}</div>}

      {transactions.length === 0 && !loading && !error && (
        <p>最近 100 个区块内没有 USDC 转账记录</p>
      )}

      {transactions.length > 0 && (
        <div className="transactions">
          <table>
            <thead>
              <tr>
                <th>发送方</th>
                <th>接收方</th>
                <th>金额 (USDC)</th>
                <th>区块号</th>
                <th>交易哈希</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index}>
                  <td>{txn.from.slice(0, 8)}...</td>
                  <td>{txn.to.slice(0, 8)}...</td>
                  <td>{txn.value}</td>
                  <td>{txn.blockNumber}</td>
                  <td>{txn.transactionHash.slice(0, 8)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  )
}

export default UsdcTransfers
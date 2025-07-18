import React, { useState } from 'react';
import { useParticle } from '../contexts/ParticleContext';
import './TransactionDemo.css';

const TransactionDemo: React.FC = () => {
  const { isConnected, userInfo, particleConnect } = useParticle();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [chain, setChain] = useState('ethereum');
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);

  const chains = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC' },
    { id: 'bsc', name: 'BSC', symbol: 'BNB' },
    { id: 'arbitrum', name: 'Arbitrum', symbol: 'ETH' },
    { id: 'optimism', name: 'Optimism', symbol: 'ETH' },
  ];

  const sendTransaction = async () => {
    if (!particleConnect || !recipient || !amount) return;

    setLoading(true);
    setTxHash('');

    try {
      // Use actual Particle Network transaction methods
      const txData = {
        to: recipient,
        value: `0x${(parseFloat(amount) * 1e18).toString(16)}`, // Convert to hex wei
        data: '0x'
      };

      const result = await particleConnect.sendTransaction(txData);
      setTxHash(result.hash || result);
      
      // Reset form
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Transaction failed:', error);
      setTxHash('Transaction failed: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getBalance = async () => {
    if (!particleConnect) return;

    try {
      // Use actual Particle Network balance methods
      const balance = await particleConnect.getBalance();
      const balanceInEth = (parseInt(balance, 16) / 1e18).toFixed(4);
      alert(`Balance: ${balanceInEth} ${chains.find(c => c.id === chain)?.symbol}`);
    } catch (error) {
      console.error('Failed to get balance:', error);
      alert('Failed to get balance');
    }
  };

  if (!isConnected) {
    return (
      <div className="transaction-demo">
        <div className="not-connected">
          <p>Please connect your wallet to access transaction features</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-demo">
      <div className="transaction-container">
        <h3>Cross-Chain Transactions</h3>
        
        <div className="balance-section">
          <button className="balance-btn" onClick={getBalance}>
            Get Balance
          </button>
          <p className="wallet-address">
            <strong>Address:</strong> {userInfo?.walletAddress}
          </p>
        </div>

        <div className="transaction-form">
          <div className="form-group">
            <label>Select Chain:</label>
            <select value={chain} onChange={(e) => setChain(e.target.value)}>
              {chains.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Recipient Address:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
            />
          </div>

          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.01"
              step="0.001"
            />
          </div>

          <button
            className="send-btn"
            onClick={sendTransaction}
            disabled={loading || !recipient || !amount}
          >
            {loading ? 'Sending...' : 'Send Transaction'}
          </button>
        </div>

        {txHash && (
          <div className="transaction-result">
            <h4>Transaction Result:</h4>
            <p className="tx-hash">{txHash}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDemo;
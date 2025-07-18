import React from 'react';
import { useParticle } from '../contexts/ParticleContext';
import TransactionDemo from './TransactionDemo';
import './WalletConnect.css';

const WalletConnect: React.FC = () => {
  const { isConnected, userInfo, connect, disconnect } = useParticle();

  return (
    <div className="wallet-connect">
      <div className="wallet-connect-container">
        <h2>Particle Network Integration</h2>
        
        {!isConnected ? (
          <div className="connect-section">
            <h3>Connect Your Wallet</h3>
            <p>Sign in with your social account to create a Universal Account</p>
            <button className="connect-btn" onClick={connect}>
              Connect with Particle
            </button>
          </div>
        ) : (
          <div className="connected-section">
            <h3>Connected Successfully!</h3>
            <div className="user-info">
              <div className="user-avatar">
                <img 
                  src={userInfo?.avatar || '/default-avatar.png'} 
                  alt="User Avatar"
                  onError={(e) => {
                    e.currentTarget.src = '/default-avatar.png';
                  }}
                />
              </div>
              <div className="user-details">
                <p><strong>Name:</strong> {userInfo?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {userInfo?.email || 'N/A'}</p>
                <p><strong>Wallet:</strong> {userInfo?.walletAddress || 'N/A'}</p>
                <p><strong>UUID:</strong> {userInfo?.uuid || 'N/A'}</p>
              </div>
            </div>
            <button className="disconnect-btn" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        )}
        
        {isConnected && <TransactionDemo />}
      </div>
    </div>
  );
};

export default WalletConnect;
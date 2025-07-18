import React from 'react';
import { ParticleProvider } from './contexts/ParticleContext';
import WalletConnect from './components/WalletConnect';
import './App.css';

function App() {
  return (
    <ParticleProvider>
      <div className="App">
        <WalletConnect />
      </div>
    </ParticleProvider>
  );
}

export default App;

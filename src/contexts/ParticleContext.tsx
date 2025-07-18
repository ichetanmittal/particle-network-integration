import React, { createContext, useContext, useEffect, useState } from 'react';
import { ParticleConnect } from '@particle-network/connect';
import { particleConfig } from '../config/particle';

interface ParticleContextType {
  isConnected: boolean;
  userInfo: any;
  connect: () => void;
  disconnect: () => void;
  particleConnect: ParticleConnect | null;
}

const ParticleContext = createContext<ParticleContextType | undefined>(undefined);

export const ParticleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [particleConnect, setParticleConnect] = useState<ParticleConnect | null>(null);

  useEffect(() => {
    // Initialize Particle Connect
    const connect = new ParticleConnect({
      projectId: particleConfig.projectId,
      clientKey: particleConfig.clientKey,
      appId: particleConfig.appId,
      chains: particleConfig.chains,
      particleWalletEntry: {
        displayWalletEntry: true,
        customStyle: {},
      },
    });

    setParticleConnect(connect);

    // Check if already connected
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (particleConnect) {
        // Check if already connected with actual Particle Network
        const connectedAccounts = await particleConnect.getAccounts();
        if (connectedAccounts && connectedAccounts.length > 0) {
          const walletAddress = connectedAccounts[0];
          setIsConnected(true);
          setUserInfo({ 
            walletAddress: walletAddress,
            name: 'Particle User',
            email: 'Connected via Particle'
          });
        }
      }
    } catch (error) {
      console.log('Not connected');
    }
  };

  const connect = async () => {
    try {
      if (particleConnect) {
        // Use actual Particle Network connection
        const accounts = await particleConnect.connect();
        if (accounts && accounts.length > 0) {
          const walletAddress = Array.isArray(accounts) ? accounts[0] : accounts;
          localStorage.setItem('particle-connected', 'true');
          localStorage.setItem('particle-address', walletAddress);
          setIsConnected(true);
          setUserInfo({ 
            walletAddress: walletAddress,
            name: 'Particle User',
            email: 'Connected via Particle'
          });
        }
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const disconnect = async () => {
    try {
      if (particleConnect) {
        await particleConnect.disconnect();
        localStorage.removeItem('particle-connected');
        localStorage.removeItem('particle-address');
        setIsConnected(false);
        setUserInfo(null);
      }
    } catch (error) {
      console.error('Disconnection failed:', error);
    }
  };

  return (
    <ParticleContext.Provider
      value={{
        isConnected,
        userInfo,
        connect,
        disconnect,
        particleConnect,
      }}
    >
      {children}
    </ParticleContext.Provider>
  );
};

export const useParticle = () => {
  const context = useContext(ParticleContext);
  if (context === undefined) {
    throw new Error('useParticle must be used within a ParticleProvider');
  }
  return context;
};
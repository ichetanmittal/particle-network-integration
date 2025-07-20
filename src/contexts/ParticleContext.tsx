import React, { createContext, useContext, useEffect, useState } from 'react';
import { ParticleConnect } from '@particle-network/connect';
import { ParticleNetwork } from '@particle-network/auth';
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
  const [particleNetwork, setParticleNetwork] = useState<ParticleNetwork | null>(null);

  useEffect(() => {
    // Initialize Particle Network (Auth)
    const network = new ParticleNetwork({
      projectId: particleConfig.projectId,
      clientKey: particleConfig.clientKey,
      appId: particleConfig.appId,
    });
    setParticleNetwork(network);

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
    const checkConnection = async () => {
      try {
        if (connect && network) {
          // Check if already connected with actual Particle Network
          const provider = await connect.connect();
          if (provider && 'request' in provider) {
            const accounts = await (provider as any).request({ method: 'eth_accounts' });
            if (accounts && accounts.length > 0) {
              const walletAddress = accounts[0];
              
              // Get user profile from Particle Auth
              const user = network.auth.getUserInfo();
              if (user) {
                setIsConnected(true);
                setUserInfo({ 
                  walletAddress: walletAddress,
                  name: user.name || 'Particle User',
                  email: user.email || 'Connected via Particle',
                  uuid: user.uuid || 'N/A',
                  avatar: user.avatar || null
                });
              } else {
                setIsConnected(true);
                setUserInfo({ 
                  walletAddress: walletAddress,
                  name: 'Particle User',
                  email: 'Connected via Particle',
                  uuid: 'N/A'
                });
              }
            }
          }
        }
      } catch (error) {
        console.log('Not connected');
      }
    };

    checkConnection();
  }, []);

  const connect = async () => {
    try {
      if (particleConnect && particleNetwork) {
        // Use actual Particle Network connection
        const provider = await particleConnect.connect();
        if (provider && 'request' in provider) {
          const accounts = await (provider as any).request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
            const walletAddress = accounts[0];
            
            // Get user profile from Particle Auth
            const user = particleNetwork.auth.getUserInfo();
            if (user) {
              localStorage.setItem('particle-connected', 'true');
              localStorage.setItem('particle-address', walletAddress);
              setIsConnected(true);
              setUserInfo({ 
                walletAddress: walletAddress,
                name: user.name || 'Particle User',
                email: user.email || 'Connected via Particle',
                uuid: user.uuid || 'N/A',
                avatar: user.avatar || null
              });
            } else {
              localStorage.setItem('particle-connected', 'true');
              localStorage.setItem('particle-address', walletAddress);
              setIsConnected(true);
              setUserInfo({ 
                walletAddress: walletAddress,
                name: 'Particle User',
                email: 'Connected via Particle',
                uuid: 'N/A'
              });
            }
          }
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
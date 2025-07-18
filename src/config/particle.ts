// Particle Network Configuration
export const particleConfig = {
  projectId: process.env.REACT_APP_PARTICLE_PROJECT_ID || 'your-project-id',
  clientKey: process.env.REACT_APP_PARTICLE_CLIENT_KEY || 'your-client-key',
  appId: process.env.REACT_APP_PARTICLE_APP_ID || 'your-app-id',
  chains: [
    { id: 1, name: 'ethereum' },
    { id: 137, name: 'polygon' },
    { id: 56, name: 'bsc' },
    { id: 42161, name: 'arbitrum' },
    { id: 10, name: 'optimism' }
  ],
  socialLogins: [
    'google',
    'facebook',
    'twitter',
    'discord',
    'github'
  ]
};
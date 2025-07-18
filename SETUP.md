# Particle Network Web Integration

A complete React TypeScript application demonstrating Particle Network integration with Universal Accounts, social login, and cross-chain transactions.

## Features

- 🚀 **Universal Accounts**: Single account across all blockchains
- 🔐 **Social Login**: Google, Facebook, Twitter, Discord, GitHub
- 🌐 **Cross-Chain Support**: Ethereum, Polygon, BSC, Arbitrum, Optimism
- 💰 **Universal Gas**: Pay fees with any token
- 🔄 **Seamless Transactions**: No manual bridging required

## Setup Instructions

### 1. Get Particle Network API Keys

1. Visit [Particle Network Dashboard](https://dashboard.particle.network/)
2. Create an account and new project
3. Copy your Project ID, Client Key, and App ID

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your API keys to `.env`:
   ```
   REACT_APP_PARTICLE_PROJECT_ID=your-project-id-here
   REACT_APP_PARTICLE_CLIENT_KEY=your-client-key-here
   REACT_APP_PARTICLE_APP_ID=your-app-id-here
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## How It Works

### Universal Accounts
- Users connect once with social login
- Automatically generates wallet addresses for all supported chains
- Single balance view across all chains

### Social Login Flow
1. User clicks "Connect with Particle"
2. Modal opens with social login options
3. User authenticates with preferred social account
4. Universal Account is created automatically
5. User can immediately transact on any chain

### Cross-Chain Transactions
- Select target blockchain
- Enter recipient address and amount
- Transaction is processed on the selected chain
- Universal Gas allows payment with any token

## Key Components

### `ParticleContext.tsx`
- Manages Particle Network connection state
- Handles authentication and wallet operations
- Provides React context for app-wide access

### `WalletConnect.tsx`
- Main authentication UI component
- Displays connection status and user info
- Handles connect/disconnect actions

### `TransactionDemo.tsx`
- Cross-chain transaction interface
- Balance checking functionality
- Multi-chain transaction support

## Architecture

```
src/
├── components/
│   ├── WalletConnect.tsx    # Main auth component
│   ├── TransactionDemo.tsx  # Transaction interface
│   └── *.css               # Component styles
├── contexts/
│   └── ParticleContext.tsx  # Global state management
├── config/
│   └── particle.ts         # Configuration settings
└── App.tsx                 # Main app component
```

## Supported Chains

- **Ethereum** (ETH)
- **Polygon** (MATIC)
- **Binance Smart Chain** (BNB)
- **Arbitrum** (ETH)
- **Optimism** (ETH)

## Next Steps

1. **Add More Chains**: Extend `particle.ts` config
2. **Token Operations**: Add ERC-20 token support
3. **DeFi Integration**: Connect to DEX protocols
4. **NFT Support**: Add NFT viewing and trading
5. **Mobile App**: Use React Native SDK

## Resources

- [Particle Network Documentation](https://developers.particle.network/)
- [Dashboard](https://dashboard.particle.network/)
- [Discord Community](https://discord.com/invite/2y44qr6CR2)

## Troubleshooting

### Common Issues

1. **Connection Failed**: Check API keys in `.env`
2. **Transaction Errors**: Ensure sufficient balance
3. **Network Issues**: Try different RPC endpoints
4. **Social Login Issues**: Check domain configuration in dashboard

### Debug Mode

Enable console logging by setting:
```javascript
localStorage.setItem('debug', 'particle*');
```
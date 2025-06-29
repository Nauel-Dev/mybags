import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(
  'https://mainnet.helius-rpc.com/?api-key=7ead7d6e-a351-4828-b884-d552c6218be2',
  'confirmed'
);

export const fetchMyBagsBalance = async (walletAddress) => {
  try {
    let publicKey;
    try {
      publicKey = new PublicKey(walletAddress);
    } catch {
      throw new Error('Invalid wallet address format');
    }

    const mintAddress = '4Yd2z3AEFevY1yXfLLXxKyc3LGUWSQTYJu9QEJembonk';

    const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
      mint: new PublicKey(mintAddress),
    });

    if (tokenAccounts.value.length > 0) {
      const balance = await connection.getTokenAccountBalance(
        tokenAccounts.value[0].pubkey
      );
      return balance.value.uiAmount;
    }
    return 0;
  } catch (err) {
    if (err.message.includes('Invalid wallet address')) {
      throw err;
    } else if (err.message.includes('429')) {
      throw new Error('API rate limit exceeded. Try again later.');
    } else {
      throw new Error('Failed to fetch balance. Check network.');
    }
  }
};
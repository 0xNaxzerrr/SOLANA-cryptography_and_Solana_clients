import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import "dotenv/config";

async function getBalance() {
  const connection = new Connection(clusterApiUrl("devnet"));
  const address = new PublicKey(
    process.env.PUBLIC_KEY2 || "3sx6WXVe7eWqrh4XiWqpvppiHwjL27Kmpxymi4oY3kvv"
  );
  const balance = await connection.getBalance(address);
  const balanceInSol = balance / LAMPORTS_PER_SOL;

  console.log(
    `The balance of the account at ${address} is ${balanceInSol} SOL`
  );
  console.log(`✅ Finished!`);
}

getBalance();

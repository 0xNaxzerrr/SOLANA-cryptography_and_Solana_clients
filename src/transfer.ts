import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import "dotenv/config";

async function transfert() {
  const suppliedToPubkey = process.argv[2] || null;

  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }

  const secretKey = JSON.parse(process.env.SECRET_KEY2 || "[]");
  const senderKeypair = Keypair.fromSecretKey(new Uint8Array(secretKey));

  console.log(`💬 suppliedToPubkey: ${suppliedToPubkey}`);

  const toPubkey = new PublicKey(suppliedToPubkey);

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );

  const transaction = new Transaction();

  const LAMPORTS_TO_SEND = 100000000;

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });

  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
  ]);

  console.log(`🚨 ${senderKeypair.publicKey} is cooking...`);
  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
  );
  console.log(`Transaction signature is ${signature}!`);

  const balanceInLamports = await connection.getBalance(
    senderKeypair.publicKey
  );
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  const balanceInLamports_receiver = await connection.getBalance(toPubkey);
  const balanceInSol_sender = balanceInLamports_receiver / LAMPORTS_PER_SOL;
  console.log(
    `✅ Finished! The balance for the wallet at address ${senderKeypair.publicKey} is ${balanceInSOL}!`
  );
  console.log(
    `🚀 And now you (${toPubkey}) got ${balanceInSol_sender} in your wallet !`
  );
}

transfert();

import './App.css';
const {Keypair, sendAndConfirmTransaction, clusterApiUrl, Transaction, SystemProgram, Connection} = require("@solana/web3.js");

let fromKeypair = Keypair.generate();
let toKeypair = Keypair.generate();
const fromKeypairPublic = fromKeypair?.publicKey.toString();
const fromKeypairSecret = JSON.stringify(Array.from(fromKeypair.secretKey));
const toKeypairPublic = toKeypair?.publicKey.toString();
const toKeypairSecret = JSON.stringify(Array.from(toKeypair.secretKey));
let transaction = new Transaction();
let connection = new Connection(clusterApiUrl('devnet'));


function App() {
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toKeypair.publicKey,
      lamports: 1
    })
  );

  console.log("####------LLAVE PUBLICA ENVIA--------######");
  console.log(fromKeypairPublic);
  console.log("####-----LLAVE PRIVADA ENVIA-----#########");
  console.log(fromKeypairSecret);
  console.log("####------LLAVE PUBLICA RECIBE--------######");
  console.log(toKeypairPublic);
  console.log("####-----LLAVE PRIVADA RECIBE-----#########");
  console.log(toKeypairSecret);
  console.log("########----TRANSACCION----###########");
  console.log(transaction);
  console.log("########----CONEXION----###########");
  console.log(connection);

  return (
    <>
      <h3>PublicKey Del que Envia:</h3>
      <h4>{fromKeypairPublic}</h4>
      <h3>SecretKey Del que envia:</h3>
      <h4>{fromKeypair.secretKey}</h4>
      <h3>PublicKey Del que Recibe:</h3>
      <h4>{toKeypairPublic}</h4>
      <h3>SecretKey Del que Recibe:</h3>
      <h4>{toKeypairSecret}</h4>
      <button onClick={transactionByme}>Hacer Transaccion</button>
    </>
  )
}

function transactionByme() {
  sendAndConfirmTransaction(
    connection,
    transaction,
    [fromKeypair]
  );
  console.log(transaction);
}

export default App;

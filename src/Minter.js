import { useEffect, useState, useRef } from "react";
import {
  getCurrentWalletConnected, //import here
  mintNFT, connectWallet, getTxReceipt, getEthPrice
} from "./utils/interact.js";
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Form from 'react-bootstrap/Form'
import ethLogo from './media/e.png'
import detectEthereumProvider from '@metamask/detect-provider'
import ConnectWallet from './ConnectWallet'
import Spinner from 'react-bootstrap/Spinner'
import { getGasPrice } from "./utils/interact.js";
import Alert from 'react-bootstrap/Alert'

const Minter = ({quantity}) => {
  const [qty, setQty] = useState(1);
  //State variables
  const [mintModalShow, setMintModalShow] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(qty * .0025);
  const [ethprice, setEthPrice] = useState(0);
  const [txProgress, setTxProgress] = useState(0);
  const [txStatus, setTxStatus] = useState("");
  const [txIntervalId, setTxIntervalId] = useState();
  const [txSuccessMsg, setTxSuccessMsg] = useState();

  const [isMetamask, setIsMetamask] = useState(false);
  const [isEthereum, setIsEthereum] = useState(false);
  const [gasPrice, setGasPrice] = useState(0);



  useEffect(async () => {
   

    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
    addWalletListener(); 
    isMetaMaskInstalled();

    getEthPrice().then((data)=>{
      setEthPrice(parseFloat(data.result.ethusd));
    })

    getGasPrice().then(function(gasPriceData){
      try{
        setGasPrice(gasPriceData.result.ProposeGasPrice)
      }catch(e){
        console.log(e)
      }     
    });

}, []);

useEffect(async () => {

  txReceiptListener(); 

  
}, []);


const txReceiptListener = async () => {

  if(txProgress === 100){
    clearInterval(txIntervalId)
    setTxIntervalId(0)
  } 
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const isMetaMaskInstalled = async () => {

    if (window.ethereum){     
      setIsEthereum(window.ethereum.isMetaMask)
    }
  
  }

 function addWalletListener() {
    if (window.ethereum) {      
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);  
          setIsMetamask(true)        
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const resetForm = (event) => { //TODO: implement
    event.preventDefault();
    window.location.reload();
    setQty(1)
    setTxProgress(0)
    setStatus("")
    clearInterval(txIntervalId)
    setTxIntervalId(0)
    setMintModalShow(false)  
  }
  


  const onMintPressed = async (event) => { //TODO: implement
    event.preventDefault();

    setTxProgress(33)
    setTxStatus("Signing transaction...")
    const { status, txHash, success } = await mintNFT(qty);
    setStatus(status);
    
    ///check for successful transaction
      if(success ===true){
          setTxProgress(66)
          setTxStatus("awaiting tx receipt...")
            
            var delayInMilliseconds = 3000; //delay to check etherscan for tx receipt

      const newIntervalId = setInterval(function() {
        var txStatusMsg = "The following tokens have been minted to your wallet:"
            try{

              getTxReceipt(txHash).then((data)=>{
                try{

                  var txlogs = data.result.logs
    
                  txlogs.map((log)=>{
                    let logHex = log.topics[3]
                    let logInt = parseInt(logHex, 16);
                    txStatusMsg = txStatusMsg + ` HilariousHusky #${logInt} \n`
                  })
                  setTxProgress(100)
                  setTxStatus("minting complete")
                  setTxSuccessMsg(txStatusMsg);
                  clearInterval(txIntervalId)
                  setTxIntervalId(0)
                }catch(e){console.log(e)}
               
              })

            }catch(e){console.log(e)}
          }, delayInMilliseconds)

          setTxIntervalId(newIntervalId)

       
        }else{
          setTxProgress(0)
          setTxStatus("Something went wrong")
        }
    
  };
  const openMintModal = event => {
    if (walletAddress.length > 0) {
        setIsMetamask(true)
    }
    setMintModalShow(true)
  }

  const handleChange = event => {
    event.preventDefault()
    setQty(event.target.value);
    setPrice(event.target.value * .0025)
  };

  function MintButtonLogic(props) {

    if(txProgress === 0)
    return (

        <Button onClick={onMintPressed}>
         Mint selected quantity
        </Button> 
    )
    if(txProgress === 100)
    return(
      <Button onClick={resetForm}>
         Reset
        </Button>
    )
    else
    return(

            
      <Button variant="primary" disabled>
       Processing...
    </Button>
    )
  }

function MintModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {isMetamask ? (<> Mint your Hilarious Huskies </> ) : (<> Connect your wallet </>)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {isMetamask ? (
<>
<div class="flex justify-between pb-2"> 
    
      <p>Select the number of huskies to mint, then click on Mint. Your wallet will ask you to sign the transaction. 
        The transaction may take upto 60 seconds to process. You can monitor the progress on Etherscan.</p>

</div>

<div class="flex flex-wrap space-y-4">
      <Form.Select value={qty}  onChange={handleChange} >
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
      </Form.Select>

     <div class="flex flex-wrap font-medium"><img width={20} src={ethLogo} />{price} (approx ${(price*ethprice).toFixed(2)}) + Gas
     | Current Avg Gas: {gasPrice} GWEI
     </div>

    
 </div>   

<div class="py-2">
{txSuccessMsg && (
        <Alert variant="success">
        {txSuccessMsg}
      </Alert>
      
      )}
</div> 
<div class="py-2">
 {status && (
   <Alert>
   <div class="break-word">{status}</div>
   </Alert>

 )}

</div>
  


<div class="py-2">
<ProgressBar animated  now={txProgress} label={`${txProgress}% ${txStatus}`} />
</div>



</>
          ) : (<>
          
          In order to mint your husky NFT, connect to an Ethereum network wallet. 
         


          </>)}
      </Modal.Body>
      <Modal.Footer>

      {isMetamask ? (
      <MintButtonLogic />
      
      
      ) : (

        <div>
        {isEthereum ? (
    
    <Button variant="primary" onClick={connectWalletPressed}>
    {walletAddress.length > 0 ? (
      "Connected: " +
      String(walletAddress).substring(0, 6) +
      "..." +
      String(walletAddress).substring(38)
    ) : (
      <span>Connect Wallet</span>
    )}
    </Button>
    
        ) : (
    
          <Button variant="info" 
          onClick={(e) => {
            e.preventDefault();
            window.location.href='https://metamask.app.link/dapp/hilarioushuskies.life/';
            }}
      > Get Metamask</Button>
    
        ) }
    
    
    
    
    </div>  
      )}

  
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



  return (
    <div>
   
   <Button variant="primary" onClick={(e) => openMintModal()}>
        Mint
      </Button>

      <MintModal
        show={mintModalShow}
        onHide={() => setMintModalShow(false)}
      />
     
      
     
    </div>
  );
};

export default Minter;


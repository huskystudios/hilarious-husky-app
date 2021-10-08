import { useEffect, useState } from "react";
import {
  getCurrentWalletConnected, //import here
  mintNFT, connectWallet, getTokenSupply, getTxReceipt
} from "./utils/interact.js";

import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Minter = (props) => {

  //State variables
  const [mintModalShow, setMintModalShow] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [qty, setQty] = useState(1);
  const [isMetamask, setIsMetamask] = useState(false);
  const [isMintEnabled, setIsMintEnabled] = useState(false);
  const [tokenSupply, setTokenSupply] = useState("");
  const [txHash, setTxHash] = useState("");

  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
    addWalletListener(); 
}, []);

useEffect(async () => {

  txReceiptListener(); 
  isMetaMaskInstalled();

  getTokenSupply().then(function(supplyData){
    setTokenSupply(supplyData.result);
  });
  
}, [txHash]);

  
const txReceiptListener = async () => {

  if (window.ethereum) {      
    window.ethereum.on('confirmation', (receipt)=>{ 
      console.log(receipt)  
       })
    }
  }



const connectWalletPressed = async () => {
  const walletResponse = await connectWallet();
  setStatus(walletResponse.status);
  setWallet(walletResponse.address);
};

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        setStatus("");
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

const isMetaMaskInstalled = async () => {

  if (window.ethereum){     
    setIsMetamask(window.ethereum.isMetaMask)
  }

}

 function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
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

  const onMintPressed = async () => { //TODO: implement

    const { status, txHash, success } = await mintNFT(qty);
    setStatus(status);
    ///check for successful transaction
    let flag = false
    if(success){

      var delayInMilliseconds = 1000*30; //1 second

          setTimeout(function() {
           

            getTxReceipt(txHash).then((data)=>{
              var txlog = data.result.logs[0].topics[3]
              console.log(data)
              txlog = parseInt(txlog, 16);

              setStatus(txlog);
            })
          

          }, delayInMilliseconds);

     
    setTxHash(txHash);
        }
  
    
  };

  const onIncrementPressed = async (increment) => { //TODO: implement

    let newValue = qty + increment
    if(newValue > 0 && newValue <= 20 ){
      setQty(newValue)
    }

    
  };




  

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
          Mint your Hilarious Husky
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div class="flex justify-between	"> 
              <div> 
                <h4>Own a part of the collection</h4>
                    
                    <p>Add the instructions here. First item, tbd catchphrase</p>
        
                <div class="flex justify-between"> 
                  <div class="w-32"> 
                  <InputGroup>
                    <Button onClick={()=> onIncrementPressed(-1)} variant="outline-secondary">-</Button>
                        <FormControl class="text-center" value={qty} type="number" min="1" max="20" step="1" disabled={true} />
              
                          <Button onClick={()=> onIncrementPressed(1)} variant="outline-secondary">+</Button>
                   </InputGroup>
                  </div>
                  <div> 
                    <Button onClick={onMintPressed}>
                      Mint selected quantity
                      </Button>
                   
                  </div>    
                  Tokens minted: {tokenSupply}
                  </div>
                </div>

                <div>
                      {isMetamask ? (

                  <Button variant="info" size="lg" onClick={connectWalletPressed}>
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

                        <Button variant="info" size="lg" 
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href='https://metamask.app.link/dapp/hilarioushuskies.life/';
                          }}
                    > Get Metamask</Button>

                      ) }
          
          <ProgressBar now={60} />

            
                </div>    
          </div>

      
      

        <p class="text-xl break-words	">
        {status}
        </p>

      
      
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



  return (
    <>
   <Button variant="primary" size="lg" onClick={() => setMintModalShow(true)}>
        Mint your Husky
      </Button>

      <MintModal
        show={mintModalShow}
        onHide={() => setMintModalShow(false)}
      />     
    </>
  );
};

export default Minter;


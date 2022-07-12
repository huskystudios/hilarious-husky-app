import { useEffect, useState} from "react";
import {
  getCurrentWalletConnected, //import here
  connectWallet, 
} from "./utils/interact.js";
import { analytics } from "./initFirebase.js";
import { logEvent } from "firebase/analytics";
import Button from 'react-bootstrap/Button'

const ConnectWallet = ({nav}) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [isMetamask, setIsMetamask] = useState(false);


  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
    addWalletListener(); 
    isMetaMaskInstalled();
}, []);



  
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet();
  setStatus(walletResponse.status);
  setWallet(walletResponse.address);
  logEvent(analytics, 'button_click', { name: 'connect_wallet'});
  
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
        <div>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install a compatible web3 wallet in your browser, or launch this page from your wallet browser.
          </a>
        </div>
      );
    }
  }




  return (
   
    <div>
      {nav ? (

<span variant="dark" onClick={connectWalletPressed}>
{walletAddress.length > 0 ? (
  "Connected: " +
  String(walletAddress).substring(0, 6) +
  "..." +
  String(walletAddress).substring(38)
) : (
  <span>Connect Wallet</span>
)}
</span>

      ) : 
    isMetamask ? (
<span 
className="hover:underline cursor-pointer"
onClick={connectWalletPressed}>
{walletAddress.length > 0 ? (
  "Connected: " +
  String(walletAddress).substring(0, 6) +
  "..." +
  String(walletAddress).substring(38)
) : (
  <span>Connect Wallet</span>
)}
</span>

    ) : (

      <a href="https://metamask.app.link/dapp/hilarioushuskies.life/">Install a web 3 wallet</a>

    ) }




</div>  

  );
};

export default ConnectWallet;


import { useEffect, useState} from "react";
import {
  getCurrentWalletConnected, //import here
  mintNFT, getTokenSupply, getGasPrice, getEthPrice, isSaleActive, getContractPrice, tokensByOwner
} from "./utils/interact.js";
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import MyCollection from "./MyCollection.js";
import { analytics } from "./initFirebase.js";
import { logEvent } from "firebase/analytics";
import banner from "./media/banner.jpg"
import Title from "./title.js";
import ConnectWallet from "./ConnectWallet.js";
import Socials from "./reusables.js";
const Mint = (props) => {
  const [qty, setQty] = useState(0);
  //State variables
  ///
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(qty * cost);
  const [ethprice, setEthPrice] = useState(0);
  const [txProgress, setTxProgress] = useState(0);
  const [txIntervalId, setTxIntervalId] = useState();
  const [tokenSupply, setTokenSupply] = useState();
  const [isMetamask, setIsMetamask] = useState(true);
  const [activeSale, setActiveSale] = useState(true);
  const [gasPrice, setGasPrice] = useState(0);
  const [collections, setCollection] = useState([]);
  const [showCollectionToggle, setShowCollectionToggle] = useState(false);

const IncrementItem = () => {
   if(qty<20){
    setQty(qty + 1);
    setPrice((qty + 1) * cost)
   
   }
  }
  const DecreaseItem = () => {
    if(qty>0){
    setQty(qty - 1);
    setPrice((qty - 1) * cost)
    }
  }

  useEffect(async () => {
   
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
    addWalletListener(); 
address &&(
    tokensByOwner(address).then((tokenArray)=>{
      setCollection(tokenArray)
}) )

    getContractPrice().then((price)=>{      
    setCost(price);
    })

    isSaleActive().then((sale)=>{      
      setActiveSale(sale);
      })

      
   

    getEthPrice().then((ethprice)=>{
      setEthPrice(parseFloat(ethprice.result.ethusd));
    })

    getTokenSupply().then((supply)=>{
      setTokenSupply(parseFloat(supply));
    })

    getGasPrice().then(function(gasPriceData){
      try{
        setGasPrice(gasPriceData.result.ProposeGasPrice)
      }catch(e){
        console.log(e)
      }     
    });

}, []);



 function addWalletListener() {
    if (window.ethereum) {      
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);  
          setIsMetamask(true)        
          setStatus("👆🏽 Select quantity to mint.");
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
    setQty(0)
    setTxProgress(0)
    setStatus("")
    clearInterval(txIntervalId)
    setTxIntervalId(0)

  }
  


  const onMintPressed = async (event) => { //TODO: implement
    logEvent(analytics, 'button_click', { name: 'mint_pressed'});
    if(!activeSale){
      setStatus("Minting not open yet. Come back on the 15th of October")
      return
    }
    if(qty > 0){
      setStatus()
    event.preventDefault();

    setTxProgress(33)
   
    const { status, txHash, success } = await mintNFT(qty);
    setStatus(status);
    
    ///check for successful transaction
      if(success ===true){
          setTxProgress(100)
           
        }else{
          setTxProgress(0)
         
        }
      }
      else{
        setStatus("Quantity must be greater than zero")
      }
  };


  function MintButtonLogic(props) {    

    if(txProgress === 0)
    return (

      walletAddress && (      
      <Button variant="dark" onClick={onMintPressed}>
      Mint! 
     </Button> ) 
        
    )
    if(txProgress === 100)
    return(
      <Button onClick={resetForm}>
         Reset
        </Button>
    )
    else
    return(
            
      <Button variant="dark" disabled>
       Processing...
    </Button>
    )
  }

  function ShowCollection(props) {    

    if(collections.length > 0)
    return (
      walletAddress && (<Button variant="success" onClick={()=>setShowCollectionToggle(!showCollectionToggle)}>
      {showCollectionToggle ? ("Close") : ("Show My Huskies")}
     </Button> ) 
        
    )
    else
    return(
            
      <Button variant="dark" disabled>
       You don't have any huskies yet.
    </Button>
    )
  }




  return (
    <>

<div class="border-2 p-4 bg-white w-full md:w-96">
      

    

{isMetamask ? (
<>


<div className="flex flex-col justify-center items-center">
<div class="text-5xl font-bold uppercase text-center justify-center tracking-tighter">    
<img src={banner} class="w-full" />
Hilarious Huskies
</div>
<div class="text-3xl font-bold uppercase tracking-wide py-2 text justify-center">    
     .005 ETH
</div>
<div class="flex flex-col space-y-2 justify-center">
  
    <ConnectWallet />
  
 
  <div class="space-x-4 flex justify-center">
  <Button size={"lg"} onClick={DecreaseItem} variant="primary">-</Button>
  <input class="text-center w-16" value={qty}></input>
  <Button size={"lg"} onClick={IncrementItem} variant="primary">+</Button>
  
  
  </div>  
  <MintButtonLogic />
 </div>   
     <div class="flex flex-wrap font-bold justify-center pt-2">

<span class="text-xl uppercase">
{tokenSupply}/3000 minted
</span>
</div>
 </div>


        <div class="py-2">
        
          <Alert>
          <div class="break-word">{status}</div>
          </Alert>
        
        </div>
        
<ShowCollection />
<div class="pt-4">
{showCollectionToggle &&
<MyCollection collections={collections} />
}
</div>
</>
          ) : (<>
          
          In order to mint your husky NFT, connect to an Ethereum network wallet. 
         


          </>)}

        <div>
    </div>  

    
</ div>



</>
  );
};

export default Mint;


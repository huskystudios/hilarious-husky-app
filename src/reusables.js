import { useEffect, useState } from "react";
import {
 getTokenSupply, getGasPrice, getContractAddress
} from "./utils/interact.js";
import { SocialIcon } from 'react-social-icons';
import { shaFinal } from "./shaData";
import Placeholder from 'react-bootstrap/Placeholder'
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
export const ContractStats = (props) => {

const [tokenSupply, setTokenSupply] = useState("Loading...");
const [gasPrice, setGasPrice] = useState("Loading...");
const contract = getContractAddress();

useEffect(async () => {

  getTokenSupply().then(function(supplyData){
      setTokenSupply(supplyData);
     
    });
    getGasPrice().then(function(gasPriceData){
      try{
        setGasPrice(gasPriceData.result.ProposeGasPrice)
      }catch(e){
        console.log(e)
      }     
    });
    
    
  }, [0]);

  return(
    
<div class="text-lg font-bold break-all py-3 space-y-1">
<a class="text-blue-500 uppercase hover:underline" href={`https://etherscan.io/address/${contract}`}>Verified Contract</a>
<div>Tokens minted: <strong>{tokenSupply}/3000</strong></div>
<div>Gas: {gasPrice} GWEI</div>
</div>
  )
}


const Socials = (props) => {

  
  return (
    <>
 <div class="flex flex-wrap justify-between mt-3">
   <div class="md:w-1/2">
      <div class="space-x-3 w-full">
      <SocialIcon url="https://twitter.com/HuskiesNft" />
      <SocialIcon url="https://discord.gg/bYCs6UMWDS" />
      <SocialIcon url="https://www.instagram.com/hilarious.huskies/" />
      <SocialIcon url="https://www.youtube.com/channel/UCl-0uFCQRv1uQBkscBAVaNQ" />
      <SocialIcon url="https://github.com/cryptoafrican/hilarious-huskies-app" />
      <SocialIcon url="mailto:hello@hilarioushuskies.life" />
      
      </div>

      
      <Navbar>   
            <Nav>
            <Nav.Link href="https://etherscan.io/address/0x6e918a90dcb258353acCa3Dfdb2A54A5D81C4596/">Verified Contract</Nav.Link>
            <Nav.Link href="https://opensea.io/collection/hilarioushuskies">Hilarious Huskies on Opensea</Nav.Link>
            <Nav.Link href="/provenance/">Provenance</Nav.Link>
            </Nav>     
        </Navbar>
    </div>
      
      {/**
       <div>
        <a href="https://opensea.io/collection/hilarioushuskies" title="Buy on OpenSea" target="_blank">
          <img width={150} class="rounded-xl" src="https://storage.googleapis.com/opensea-static/Logomark/Badge%20-%20Available%20On%20-%20Light.png" alt="Available on OpenSea" /></a>
          
        </div>

       */ }  
       <div class="md:w-1/2">
        <div class="text-xl md:text-3xl xl:text-4xl font-bold">join the</div>
        <div class="text-4xl md:text-8xl xl:text-9xl font-bold"> #woofpack</div>
</div>
</div>

     
    
</>
    
  );
};

export default Socials;


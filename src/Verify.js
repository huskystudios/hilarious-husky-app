import { useEffect, useState, useRef } from "react";
import { getContent } from './utils/cms';
import Title from "./title";


const Verify = (props) => {

    
 
    return (

      <>
    <div class="flex">
    <div class="mx-auto">     

    <div class="flex flex-wrap align-middle md:justify-center pt-2">

        <div class="sm:w-full lg:w-1/2">
        <Title title={"Get a verifiable profile picture with your favourite Hilarious Husky NFT"} />

        <div class="pr-5 py-3">
        <div class="lg:text-base xl:text-lg pb-2 text">    
        <p>
        Turn your NFTs into verifiable ID assets you can use as a proof-of-identity.
        Prove that you own your NFT's on any social media platform or turn them into a proof-of-identity by getting them into MyWalliD wallet.
        </p>
        <p>
          Hilarious Huskies is part of the beta program at WalliD! <a class="hover:underline" href="https://wallid.io/NFTproof" target="_blank">Verify now!</a>
        </p>
       <a href="https://wallid.io/NFTproof" target="_blank"> <img width={100} src={`https://wallid.io/_nuxt/img/logo-wallid.2a194a9.png`} /></a>

        
        </div>

       

 </div>
</div>

     <div class="hidden lg:w-1/2 md:flex justify-content-center">
     <img class="shadow-lg rounded-3xl" width={300} src={`https://wallid-images.s3.eu-west-3.amazonaws.com/users/-10102866801633539184561`} />
    </div>
     
      </div>      
      
     
      </div>
     
 </div>


</>


    );
  }
  
export default Verify;


import React, { useState, useEffect } from "react";
import Title from './title';
import { ownerOf, getTokenSupply } from "./utils/interact";
import jackpotimg from './media/jackpot.jpg';
import Spinner from 'react-bootstrap/Spinner'
import { Button } from "react-bootstrap";


const Jackpot = (props) => {

const [leaderboard, setLeaderboard] = useState([]);
const [supply, setSupply] = useState(0);
const [jackpot, setJackpot] = useState(0);
const [showLeader, setShowLeader] = useState(false);

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.address === val ? a + 1 : a), 0);

const getOwnerData = async (index) => {
  let object
  try{
    let address = await ownerOf(index).then((address)=>{return(address)}) 
    let numtoken = index
    object = {address: address, tokens: numtoken}

    }catch(e){console.log(e)}



return(object)
}

useEffect(() => {

  getTokenSupply().then((supply)=>{
    setSupply(parseFloat(supply));
    setJackpot(parseFloat(supply*.025*.16).toFixed(4))
  })

  const init = async () => {
    
   let owners = await Promise.all(

      Array.from({ length: supply }).map((_, index) => (
        getOwnerData(index)
      )))

 
   let tokenCount = owners.map((item)=>{

      let object
      try{
      object = {address: item.address, tokens:countOccurrences(owners, item.address)}
          return(object)
          
   }catch(e){console.log(e)}})
       
        const uniqueArray = tokenCount.filter((thing, index) => {
          const _thing = JSON.stringify(thing);
          return index === tokenCount.findIndex(obj => {
            return JSON.stringify(obj) === _thing;
          });
        });

        function compare( a, b ) {
          if ( a.tokens < b.tokens){
            return 1;
          }
          if ( a.tokens > b.tokens ){
            return -1;
          }
          return 0;
        }
        
        uniqueArray.sort( compare );
        
      setLeaderboard(uniqueArray)
      setShowLeader(true)
      
  }
  init()
 
},[supply])


return (
    <>
    {/** Start of Intro */}
    <h1 class="text-6xl md:text-6xl xl:text-9xl font-bold pb-3">Jackpot</h1>
    <div class="md:flex md:flex-row-reverse">

    <div class="w-1/3">
    <img width={290} src={jackpotimg} class="rounded-full" />
    </div>
        <div class="md:w-2/3">
         

          <div class="pr-5 py-3">
            <div class="lg:text-base xl:text-lg pb-2 text">    
   
          
          <p>16% of total sales from the mint will be set aside for the jackpot, potentially valued at 12 ETH. 
            There will be 4 winners in three tiers, picked at random.
          </p>
          <p><strong>Payout</strong>
            <ul class="list-disc">
              <li>Wallets with less than 10 Huskies: 2 jackpots - <strong>1.2 ETH each</strong></li>
              <li>Wallets with less than 15 Huskies but greater than 10: <strong>1 jackpot - 3.2 ETH</strong></li>
              <li>Wallets with more than 15 Huskies: <strong>1 jackpot - 6.4 ETH</strong></li>
            </ul>
            </p><p>
            <strong>Terms and conditions:</strong>
            <ul class="list-disc">
              <li>At the end of the mint, a random number generator will be used as an index to pick a winner in each tier</li>
              <li>Winners will be published on website and announced on the discord, ETH will be transfered to their wallets the same day</li>
              <li>You need to hold on to your Huskies until the draw is complete, 24 hours after we mint out to be eligible.</li>
            </ul>
            </p>        

        
             </div>

          </div>
        </div>
</div>
<div class="flex flex-wrap justify-between">
<Title title={"Leaderboard"} />
<Title title={`Jackpot: ${jackpot} ETH`} />
<Title title={`Total minted: ${supply}/3000`} />
</div>

  
{leaderboard && showLeader ? (

<table class="table-auto">

<thead>
  <tr class="font-semibold">
  <th class="text-center">Tokens Owned</th>
  <th class="text-center">Owner Address</th>
   
  </tr>
  </thead>
  <tbody>
{(leaderboard.map((husk)=>{

  if(husk.address === "0xCcB6D1e4ACec2373077Cb4A6151b1506F873a1a5")
  {
    return(null) ///owner address - not participating in the jackpot obviously.
  }

  return(<>
  <tr>
  <td class="text-center">
  {husk.tokens && husk.tokens}
  </td>
  
  <td>{husk.address && husk.address}</td>

  
  </tr>
  </>)

  }))}
</tbody>
</table>

) : (<Spinner animation="border" role="status"></Spinner>)}



{/** End of Intro */}
</>
  );
};

export default Jackpot;

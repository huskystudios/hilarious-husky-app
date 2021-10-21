import React, { useState, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { getContract } from "./utils/interact";
import { db } from "./initFirebase";
import { getDatabase, ref, set, onValue, equalTo, query, get,child, orderByValue, push, orderByChild, limitToFirst, limitToLast, startAt, endAt} from "firebase/database";


const Leaderboard = ({tokenid}) => {
  
const {nftContract, web3} = getContract()
const contract = nftContract
const [orcObject, setorcObject] = useState();
const [showData, setShowData] = useState(false);
const [csvReport, setCsvReport] = useState([1,2,3])
const [loading, setLoading] = useState();

const handleClick = (e)=>{

  e.preventDefault()
  setLoading(true)
  setShowData(!showData)
  }


const getAllStats = async ()=>{
  const myOrcQuery = query(ref(db, 'etherorcs/orcs/'), orderByChild('calcLevel'), limitToLast(20) ) ///"0x25aBa46Dcb360902Ab8CA72cA8528F1da1D903d8"));

  let dataArry = []


onValue(myOrcQuery, (snapshot)=>{
 
      if(snapshot.exists()){    
        
        Object.entries(snapshot.val()).forEach(([key, value])=>{
  
        dataArry.push(value)         
        })
        function compare( a, b ) {
          if ( a.calcLevel < b.calcLevel){
            return 1;
          }
          if ( a.calcLevel > b.calcLevel ){
            return -1;
          }
          return 0;
        }
        
        dataArry.sort( compare );
        


  console.log("Found Orcs. Orc of them",  dataArry)   

}else{
 
  console.log("Got No Orcs. NOrc of them") 
}
      
      },{onlyOnce: true})

      setorcObject(dataArry)
}

useEffect(async () => {

if(!showData){
  getAllStats()
  }
}, [showData]);


return (
    <>

<div class="text-lg font-bold font-serif flex flex-wrap ">LEADERBOARD</div>  
<div class="py-4 text-lg font-bold font-serif flex flex-wrap "><button onClick={handleClick}>Ye Orcs are mighty... Load Leaderboard</button></div>  


{orcObject && (
  <div class="flex flex-wrap ">

<table class="table-auto border-collapse border-1 border-yellow-800">

  <thead>
    <tr class="text-center text-xs">
    <th class="border-1 border-yellow-600">Token ID</th>
    <th class="border-1 border-yellow-600">Owner</th>
     <th class="border-1 border-yellow-600">Level</th>
 
    </tr>
    </thead>
    <tbody>
  {(orcObject.map((orc, index)=>{

    let t = new Date(orc.time*1000)
    t = t.toLocaleString()

  return(<>
     <tr key={orc.tokenid} class="text-center text-sm">
    <td class="border-1 border-yellow-600"> 
    <a target="_blank" href={`https://opensea.io/assets/0x7d9d3659dcfbea08a87777c52020BC672deece13/${orc.tokenid}`}>{orc.tokenid}</a>
    </td>
    <td class="border-1 border-yellow-600">
    <a target="_blank" href={`https://etherscan.io/address/${orc.owner}/`}>{orc.owner}</a>
    </td>
    <td class="border-1 border-yellow-600"> {orc.calcLevel}</td>    
    </tr>
    </>)

    }))}
</tbody>
</table>
</div>
)}
<div class="py-5">
<p class="text-sm">NB: </p>
</div>

    </>
  );
};

export default Leaderboard;

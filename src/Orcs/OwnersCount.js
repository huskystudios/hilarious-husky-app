import React, { useState, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { getContract } from "./utils/interact";
import { db } from "./initFirebase";
import { getDatabase, ref, set, onValue, equalTo, query, get,child, orderByValue, push, orderByChild, limitToFirst, limitToLast, startAt, endAt} from "firebase/database";


const Owners = ({tokenid}) => {
  
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
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.owner === val ? a + 1 : a), 0);
  const myOrcQuery = query(ref(db, 'etherorcs/orcs/'), orderByChild('owner'), ) ///"0x25aBa46Dcb360902Ab8CA72cA8528F1da1D903d8"));

  let dataArry = []


onValue(myOrcQuery, (snapshot)=>{
 
      if(snapshot.exists()){    
        
        let tokenCount = []
        Object.entries(snapshot.val()).forEach(([key, value])=>{
  
        dataArry.push(value)             
    
        })

        dataArry.map((value)=>{
          let object
          try{
        
          object = {address: value.owner, username: value.username, tokens:countOccurrences(dataArry, value.owner)}
          tokenCount.push(object)
              ////remove duplicates from holders
       }catch(e){console.log(e)}
        })

     const uniqueArray = tokenCount.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === tokenCount.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });

    console.log(uniqueArray)
      //sort holders 
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


  console.log("Found Orcs. Orc of them",  uniqueArray)   
  setorcObject(uniqueArray)
}else{
 
  console.log("Got No Orcs. NOrc of them") 
}
      
      },{onlyOnce: true})

      
}

useEffect(async () => {

if(!showData){
  getAllStats()
  }
}, [showData]);


return (
    <>

<div class="text-lg font-bold flex flex-wrap ">OWNERS</div>  
<Button onClick={handleClick}>Ye Orcs are mighty... Load ORC WRANGLERS</Button> 


{orcObject && (
  <div class="flex flex-wrap ">

<table class="table-auto border-collapse border-1 border-yellow-800">

  <thead>
    <tr class="text-center text-xs">
    <th class="border-1 border-yellow-600">Owner OS username</th>
     <th class="border-1 border-yellow-600">Address</th>
     <th class="border-1 border-yellow-600">ORC Count</th>
 
    </tr>
    </thead>
    <tbody>
  {(orcObject.map((orc, index)=>{

    let t = new Date(orc.time*1000)
    t = t.toLocaleString()

  return(<>
     <tr key={orc.tokenid} class="text-center text-sm">
     <td class="border-1 border-yellow-600"> {orc.username}</td>     
    <td class="border-1 border-yellow-600">
    <a target="_blank" href={`https://etherscan.io/address/${orc.address}/`}>{orc.address}</a>
    </td>
    <td class="border-1 border-yellow-600"> {orc.tokens}</td>     
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

export default Owners;

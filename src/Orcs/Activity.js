import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { updateDatabase } from "./utils/services";
import { lookupAllOrcs } from "./utils/interact"; 
import { ProgressBar } from "react-bootstrap";




const Activity = ({contract}) => {

const [loading, setLoading] = useState();
const [tokenSupply, setTokenSupply] = useState();
const [showData, setShowData] = useState(false);
const [progress, setProgress] = useState(0);

const handleClick = (e)=>{
e.preventDefault()
setShowData(!showData)
}


const init = async () => {
  // set school contract
  setProgress(1)
  setLoading(true)
  let results = []
  let start = 1
  let stop = 1000

  results = await lookupAllOrcs({start, stop})
  results.map((orc)=>{
    updateDatabase(orc) 
  })
  setProgress(20)
  start = start + 1000
  stop = stop + 1000
  results = await lookupAllOrcs({start, stop})
  results.map((orc)=>{
    updateDatabase(orc) 
  })
  setProgress(40)
  start = start + 1000
  stop = stop + 1000
  results = await lookupAllOrcs({start, stop})
  results.map((orc)=>{
    updateDatabase(orc) 
  })
  setProgress(60)
  start = start + 1000
  stop = stop + 1000
  results = await lookupAllOrcs({start, stop})
  results.map((orc)=>{
    updateDatabase(orc) 
  })
  setProgress(80)
  start = start + 1000
  stop = stop + 1000
  results = await lookupAllOrcs({start, stop}) 
  results.map((orc)=>{
    updateDatabase(orc) 
  })
  setProgress(90)
  start = start + 1000
  stop = stop + 51
  results = await lookupAllOrcs({start, stop})
  results.map((orc)=>{
    updateDatabase(orc) 
  })


  setProgress(100)
setLoading(false)
  
};


useEffect(async() => {

  let supply = await contract.methods.totalSupply().call()
  setTokenSupply(supply);

     if(showData){
      init()
     }
  

}, [showData]);


return (
    <>

  

 

  {!loading ? ( 
    <Button onClick={handleClick}>Update Orc Metadata</Button>
  ) : ( <Button disabled><div class="animate-bounce">Loading...</div></Button>)}

  {loading && <ProgressBar now={progress} label={`${progress}%`} />}


 </>



  );
};

export default Activity;


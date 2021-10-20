import { useState, useEffect } from "react";
import { updateDatabase } from "./utils/services";
import { lookupOrc } from "./utils/interact"; 
import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


function Orc({tokenid, allData}) {
 
const [orcData, setOrcData] = useState(null);
const [loading, setLoading] = useState(false);
const [showClaimable, setShowClaimable] = useState(false);
const [claimable, setClaimable] = useState(false);

 
const ref = useRef()

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `Orc${tokenid}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

useEffect(async () => {


const lookupsOrc = async ()=>{

    setLoading(true)
    
    let orcObj = await lookupOrc(tokenid)
    setOrcData(orcObj)

    setClaimable(((parseInt(orcObj.claimable))/Math.pow(10, 18)).toFixed(2))
    setShowClaimable(true)
       
    updateDatabase(orcObj) //update firestore eachtime someone looksup orc.
    setLoading(false)
  }

  lookupsOrc()


 },[tokenid])

 let additionalClasses = "bg-yellow-50 border-yellow-600 border-2 p-4 my-2"
 let baseClass = "p-2"

 if(allData){
  baseClass = additionalClasses
 }

return (
    <>


<div ref={ref} class={baseClass}>

{orcData && (
<div class="space-y-2 pb-3">
<div class="flex justify-center">
       <div class="font-semibold text-xl ">{orcData.name}</div>
   </div>
  <div class="flex justify-center">
    <img  width={150} src={orcData.image} alt={orcData.name} />
   </div>

   <div class="flex justify-center">
       <div class="font-semibold text-xl">Lvl: {orcData.calcLevel}</div>
   </div>
   <div class="flex justify-center">
       <div class="font-semibold text-xs">{orcData.actionString} {showClaimable && `| ${claimable} Zug claimable`}</div>
   </div>
   <div class="flex justify-center">
       <div class="font-semibold text-xs">{`$Zug Bonus ${orcData.zugModifier}+`}</div>
   </div>

   
   
   {allData && (
     <>
    <div class="text-sm">
    This orc is <strong>{orcData.actionString} </strong> and on the way to level <strong>{orcData.calcLevel}</strong>{showClaimable && ` with ${claimable} claimable.`}
    </div>
   
  
   </>
   )}
   
      {allData && orcData && (orcData.attributes.map((a, i)=>{

return(<div key={orcData.name + i}>
<div class="flex justify-between border-b-2">
<div class="text-sm capitalize">{a['trait_type'] /*//fix this laer */}</div> 
<div class="font-semibold text-sm">{a.value}</div>

</div>  
</div>)
}))}

{allData && <div class="break-all text-xs">Owner: {orcData.owner}</div> }
</div>


)}

</div>

{allData && (
<button onClick={onButtonClick}>Download PNG</button>
)}
</>
  )
}

export default Orc;

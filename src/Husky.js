import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Placeholder from 'react-bootstrap/Placeholder'
import { shaData, allTraits } from "./shaData";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";


const Husky = ({tokenidprop}) => {

    let { tokenId } = useParams();
    
    if(tokenidprop > -1) tokenId = tokenidprop

    const [huskyProv, setHuskyProv] = useState("Loading...");
    const placeholderImg = "https://huskies.s3.eu-west-2.amazonaws.com/grey.png"
    const [imageSrc, setImageSrc] = useState(`https://huskies.s3.eu-west-2.amazonaws.com/images/${tokenId}.png`)
    const [mintedFlag, setMintedFlag] = useState(false);
    const [loadedFlag, setloadedFlag] = useState(false);
      

    const init = {
        method: 'GET', 
        headers: {
        }
    }

 
    useEffect(async () => {   
        if(tokenId < 3000 ) {
            getHuskyProvenance()
        }

    }, [tokenId]);

const getHuskyProvenance = async () => {
   
    let osRequest
    let osResponse
    let responseString

        try{
            osRequest = await fetch(`https://provenance.huskies.workers.dev/?token=${tokenId}`, init);
            osResponse = await osRequest.json()

        }catch(e){console.log(e)}
                 
            if(osResponse.success === false){
                setHuskyProv(<ListGroup.Item> {"Not born (minted) yet"}</ListGroup.Item> )
                setloadedFlag(true)
            }

            if(osResponse.detail){
                setHuskyProv(<ListGroup.Item>{`${osResponse.detail}`}</ListGroup.Item> )
                setloadedFlag(true)
            }

            if(osResponse.image_url){
                setImageSrc(osResponse.image_url)
            }
            
            if(osResponse.top_ownerships){
               
                responseString = osResponse.top_ownerships.map((owner, index) =>{
                    
                        return(
                        <>
                        <ListGroup.Item key={index}> Owner Address: <span class="font-medium"><a href={`https://etherscan.io/address/${owner.owner.address}`}>
                        {owner.owner.address}</a></span></ListGroup.Item>
                        {owner.owner.user &&
                        (<>
                        <ListGroup.Item key={index}>
                                 Owner:{" "}
                                 <span class="font-medium">
                                     {owner.owner.user.username}
                                </span>
                        </ListGroup.Item></>)}
                        </>)
                    
                })
               
                setHuskyProv(responseString)
                setMintedFlag(true)
                setloadedFlag(true)
    
            }
        }



      const image = imageSrc
      const ipfsLink = `https://gateway.pinata.cloud/ipfs/QmdDVGZijQQpvMxubwLxanU4HH8yVSk6HEsqtbtpJVugLH/${tokenId}.png`
      const heading = `Hilarious Husky #${tokenId}`

     
  
return (
    <div class="max-w-lg py-2">
       <Card>
       {mintedFlag ? (<Card.Img variant="top" alt={heading} src={image} />) : (<Card.Img variant="top" alt={heading} src={placeholderImg} />)}
        <Card.Body> 
                {loadedFlag ? (
                    <>
                   <Card.Title>Hilarious Huskies #{tokenId}</Card.Title>
                  
                       {mintedFlag && (
                            <ListGroup variant="flush">
                                <Card.Header>Traits</Card.Header>
                                <ListGroup.Item><span class="font-medium">Accessories:</span> {allTraits[tokenId].Accessories}</ListGroup.Item>
                                <ListGroup.Item><span class="font-medium">Base:</span> {allTraits[tokenId].Base}</ListGroup.Item>
                                <ListGroup.Item><span class="font-medium">Hats:</span> {allTraits[tokenId].Hats}</ListGroup.Item>
                                <ListGroup.Item><span class="font-medium">Background:</span> {allTraits[tokenId].Background}</ListGroup.Item>
                                </ListGroup>
                       )}
                   

                   <ListGroup variant="flush">
                   <Card.Header>Provenance</Card.Header>
                   {huskyProv}
                   {mintedFlag && (<>
                   <ListGroup.Item><span class="break-all">IPFS Link: <a href={ipfsLink}>{ipfsLink}</a></span> </ListGroup.Item>
                   <ListGroup.Item><span class="break-all">SHA256: {shaData[tokenId]} </span></ListGroup.Item>
                   </>
                   )}
                   </ListGroup>  
                   </>  
                   ) : (
                    <>
                           <Placeholder as={Card.Title} animation="glow"><Placeholder xs={8} /></Placeholder>
                           <Placeholder as={Card.Text} animation="glow">
                               <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                               <Placeholder xs={6} /> <Placeholder xs={8} />
                           </Placeholder>
                          
                    </>  
                 )                  

                   
                   }               
          </Card.Body>            
        </Card>
    </div>
  );
};

export default Husky;


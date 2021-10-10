
import Title from "./title";
import { tokensByOwner, getCurrentWalletConnected } from "./utils/interact";
import { useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import MyCollection from "./MyCollection";
import Chat from "./Chat"
import { Tab } from "bootstrap";
import Tabs from 'react-bootstrap/Tabs'

const Members = ({}) => {

    const [auth, setAuth] = useState(false)
    const [wallet, setWallet] = useState("")
    const [collections, setCollection] = useState([]);
    const [showCollectionToggle, setShowCollectionToggle] = useState(false);

 function addWalletListener() {
    if (window.ethereum) {      
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);  
        } else {
          setWallet("");
         
        }
      });
    } 
  }

  function ShowCollection(props) {    

    if(collections.length > 0)
    return (
      wallet && (<Button variant="success" onClick={()=>setShowCollectionToggle(!showCollectionToggle)}>
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

  function ControlledTabs() {
    const [key, setKey] = useState('chat');
  
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        
      >
        <Tab eventKey="chat" title="Husky Chat">
        <Chat pfp={collections} wallet={wallet}/>
       
        </Tab>
        <Tab eventKey="collection" title="My Collection">
        <MyCollection collections={collections} />
        </Tab>
        <Tab eventKey="vote" title="Community Project Voting" disabled>
  
        </Tab>
       
      </Tabs>
    );
  }
  
 
  
    useEffect(async () => {
    

    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    addWalletListener()
    wallet &&(
        tokensByOwner(wallet).then((tokenArray)=>{
         if(tokenArray.length>0){
            setCollection(tokenArray)
            setAuth(true)
         }
    }) )
    
    }, [wallet])
  
     return (
         <>
         <div class="flex justify-between">
         <Title title={"Token Holders"} />
        
         </div>
  

       {auth ? (
       <>
       <div class="p-2">
          
          <ControlledTabs />
        
       </div>
      

       </>): (<>
       <div class=" md:w-1/2">
       Your HUSK token unlocks a members only area where the community can interact with each other and vote on future projects. Mint or purcahse one on Opensea to access.
       </div>
       
       </>) }      
   

‍
              
‍</>
            


    );
  }
  
export default Members;



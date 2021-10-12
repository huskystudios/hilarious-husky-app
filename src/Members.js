
import Title from "./title";
import { tokensByOwner, getCurrentWalletConnected } from "./utils/interact";
import { useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import MyCollection from "./MyCollection";
import Chat from "./Chat"
import { Tab } from "bootstrap";
import Tabs from 'react-bootstrap/Tabs'
import { getDatabase, ref, set, onValue, query, orderByValue, push, orderByChild, limitToLast} from "firebase/database";
import { Helmet } from "react-helmet";
const Members = ({}) => {

    const [auth, setAuth] = useState(false)
    const [wallet, setWallet] = useState("")
    const [collections, setCollection] = useState([]);
    const [showCollectionToggle, setShowCollectionToggle] = useState(false);
    const [username, setUsername] = useState(null);

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

  const login = async (event) => {
    event.preventDefault();
    const db = getDatabase();
    const timestamp = Date.now()
   
   
    const userDataRef = ref(db, 'members/' + wallet)

    const init = {method: 'GET', headers: { }}

  let osRequest 
  let osResponse 

  try{
  osRequest = await fetch(`https://provenance.huskies.workers.dev/?token=${collections[0]}`, init);
  osResponse = await osRequest.json()
  setUsername(osResponse.top_ownerships[0].owner.user.username)
  }catch(e){console.log(e)}
  
  const profileImage = `https://huskies.s3.eu-west-2.amazonaws.com/images/${collections[0]}.png`
  const tokensOwned = collections
   
    await set(userDataRef, {
      wallet: wallet,
      tokenid:collections[0],
      lastSeen: timestamp,
      tokensOwned: tokensOwned,
      image: profileImage,
      username: username
    });

   setShowCollectionToggle(!showCollectionToggle) 
   
}

  function LogIn(props) {    

    if(auth)
    return (
      wallet && (<Button variant="success" onClick={login}>
      {showCollectionToggle ? ("Logout") : ("Login")}
     </Button> ) 
        
    )
    else
    return(
            
      <Button variant="dark" disabled>
       You don't own any HUSKY's
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
        <Chat pfp={collections} wallet={wallet} user={username}/>
       
        </Tab>
        <Tab eventKey="collection" title="My Collection">
        <MyCollection collections={collections} />
        </Tab>
        <Tab eventKey="prizes" title="Community Prizes">
        Winners will be announced here. 
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
                 <Helmet>
    <title>Hilarious Huskies - Members</title>
       </Helmet>

         <div class="flex justify-between">
         <Title title={"Token Holders"} />
         <div>
         <LogIn />
         </div>
         
         </div>
        
  

       {auth ? (
       <>
       <div class="p-2">
       {showCollectionToggle &&
          <ControlledTabs />}
    {!showCollectionToggle &&
           <div class=" md:w-1/2">
           Your HUSK token unlocks a members only area where the community can interact with each other and vote on future projects. Click "login" on 
           the top right corner to access this feature.
           </div>
           }
 
        
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



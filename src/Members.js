
import Title from "./title";
import { tokensByOwner, getCurrentWalletConnected } from "./utils/interact";
import { useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import MyCollection from "./MyCollection";
import Chat from "./Chat"


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

  
  const Login = async () => {



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
  <Title title={"Token Holders"} />

       {auth ? (<>logged in
       
       <Chat/>
        <br/>
     
       <div class="pt-4">

<MyCollection collections={collections} />
</div>

       </>): (<>You dont have any HUSK tokens in this wallet.</>) }      
   

‍
              
‍</>
            


    );
  }
  
export default Members;



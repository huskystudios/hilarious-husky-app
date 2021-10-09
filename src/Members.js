
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
         <div class="flex justify-between">
         <Title title={"Token Holders - members only area"} />
         {auth ? (<>logged in</>) : (<>no husky no access</>)}
         </div>
  

       {auth ? (
       <>
       <div class="flex flex-wrap p-2">
           <div class="md:w-1/2">
           <Chat/>
           </div>
       
       <div class="md:w-1/2">
       <MyCollection collections={collections} />
       </div>

      

       </div>
      

       </>): (<>You dont have any HUSK tokens in this wallet.</>) }      
   

‍
              
‍</>
            


    );
  }
  
export default Members;



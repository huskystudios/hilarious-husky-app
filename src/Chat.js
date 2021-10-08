
import Title from "./title";
import { tokensByOwner, getCurrentWalletConnected } from "./utils/interact";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Form from 'react-bootstrap/Form'
import Chats from "./Chats";
import ToastContainer from 'react-bootstrap/ToastContainer'
const Chat = () => {
 
    ///Chat App stuff
   
    const inputRef = useRef();
    const [data, setData] = useState()
    let dataArry = []
    const [wallet, setWallet] = useState("")
    const [chatText, setChatText] = useState("")
    const db = getDatabase();
    const timestamp = Date.now()
    const chatData = ref(db, 'messages/' + wallet + timestamp)


   


    const handleSubmit = (event) => {
      
        event.preventDefault();
       
        const chatEntry = inputRef.current.value;
       
        set(chatData, {
          sender: wallet,
          timeStamp: timestamp,
          chat: chatEntry
        });
        setChatText("")
       
        
    }



  useEffect(async()=>{
    const {address} = await getCurrentWalletConnected();
    setWallet(address)

  const db = getDatabase();
  const chatsDisplayRef = ref(db, 'messages/');

  onValue(chatsDisplayRef, (snapshot) =>{
    
    const obj = snapshot.val();
    Object.entries(obj).forEach(([key, value])=>{

      dataArry.push({chat:value.chat, 
                      time:value.timeStamp, 
                      sender: value.sender})
    })

    const chatLog = dataArry.map((items)=>{

         return(<>
    <Chats items={items} />
        </>)
      })
    
  
    

    setData(chatLog)

  })


},[])
  
return (
  <div>

<ToastContainer>
{data}

</ToastContainer>


<Form onSubmit={handleSubmit}>
  <Form.Group class="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Chat</Form.Label>
    <Form.Control size="lg" type="text" placeholder="Enter your message"
    value={chatText}
    ref={inputRef}
    onChange={e => setChatText(e.target.value)}    
    />
    <Button onClick={handleSubmit}>
      Send
    </Button>
  </Form.Group>
  
</Form>




   
  </div>
);
}
  
export default Chat;



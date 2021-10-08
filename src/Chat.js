
import Title from "./title";
import { tokensByOwner, getCurrentWalletConnected } from "./utils/interact";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Form from 'react-bootstrap/Form'

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

     const sender = String(items.sender).substring(0, 6) +
      "..." +
      String(items.sender).substring(38)

      const d = new Date(items.time)
      const ts = d.toUTCString();  

  
        return(<>
        <div class="border-2 p-2 m-2 w-80">{sender}:<p>{items.chat}</p> <span class="text-xs">{ts}</span></div>
        </>)
      })
    
  
    

    setData(chatLog)

  })


},[])
  
return (
  <div>
<div class="">
{data}
</div>
<Form onSubmit={handleSubmit}>
  <Form.Group class="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Chat</Form.Label>
    <Form.Control size="lg" type="text" placeholder="Enter your message"
    value={chatText}
    ref={inputRef}
    onChange={e => setChatText(e.target.value)}
    
    />
  </Form.Group>
  <Button onClick={handleSubmit}>
      Send
    </Button>
</Form>




   
  </div>
);
}
  
export default Chat;



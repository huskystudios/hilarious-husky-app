
import Title from "./title";
import { tokensByOwner, getCurrentWalletConnected } from "./utils/interact";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Form from 'react-bootstrap/Form'
import Chats from "./Chats";
import ToastContainer from 'react-bootstrap/ToastContainer'
import InputGroup from 'react-bootstrap/InputGroup'

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
    const messagesEndRef = useRef(null)


    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }


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
 
 const chatsDisplayRef = ref(db, 'messages/');

 onValue(chatsDisplayRef, (snapshot) =>{
    
    const obj = snapshot.val();
    Object.entries(obj).forEach(([key, value])=>{

      dataArry.push({chat:value.chat, 
                      time:value.timeStamp, 
                      sender: value.sender})
    })

    let chatLog = dataArry.map((items)=>{

         return(<>
    <Chats key={items.time} items={items}/>
    <div ref={messagesEndRef} />
        </>)
      })
    
  setData(chatLog)
  scrollToBottom()  
  })
  

},[])
  
return (
  <div>
   
<h4>Leave a message for the community</h4>
<div class="w-full lg:w-1/2 border-2 shadow-lg rounded-xl p-2">
<div class="h-80 overflow-y-scroll mb-2">
<ToastContainer>
{data}

</ToastContainer>
</div>


<Form onSubmit={handleSubmit}>
<InputGroup className="mb-3">
  
    <Form.Control size="lg" type="text" placeholder="Enter your message"
    value={chatText}
    ref={inputRef}
    onChange={e => setChatText(e.target.value)}    
    />
    <Button onClick={handleSubmit}>
      Send
    </Button>

    </InputGroup>
  
</Form>
</div> 
  </div>
);
}
  
export default Chat;



import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { getDatabase, ref, set, onValue, query, orderByValue, push, orderByChild, limitToLast} from "firebase/database";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { timeAgo } from "./utils/dateFunctions";

const Chat = ({pfp, wallet}) => {
 
    let dataArry = []
    
    const [chatText, setChatText] = useState("")
    const db = getDatabase();
    const timestamp = Date.now()
   

    const profileImage = `https://huskies.s3.eu-west-2.amazonaws.com/images/${pfp[0]}.png`
    const chatsDisplayRef = query(ref(db, 'messages'), orderByChild('timeStamp'), limitToLast(100));


    const messagesEndRef = useRef(null)

    onValue(chatsDisplayRef, (snapshot) =>{
    
      const obj = snapshot.val();
     
      Object.entries(obj).forEach(([key, value])=>{
    
        dataArry.push({chat:value.chat, 
                        time:value.timeStamp, 
                        sender: value.sender,
                        image: value.image,
                        tokenid: value.tokenid,                      
                      })
      })
    /*
      function compare( a, b ) {
        if ( a.time < b.time){
          return -1;
        }
        if ( a.time > b.time ){
          return 1;
        }
        return 0;
      }
      
      dataArry.sort( compare );*/
    
    })
    

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    const sendMessage = async (event) => {
      
        event.preventDefault();
        const chatDataRef = ref(db, 'messages/')
        const newChatDataRef = push(chatDataRef);
        
        const chatEntry = chatText;
        if(chatEntry !=="" ){
          await set(newChatDataRef, {
            sender: wallet,
            tokenid:pfp[0],
            timeStamp: timestamp,
            chat: chatEntry,
            image: profileImage,
            username: null
          });
          setChatText("")
          scrollToBottom()
        }
       
       

    }

   

 useEffect(async()=>{

 scrollToBottom()
},[chatsDisplayRef])
  
return (
  <div> 
      <div class="border-2 shadow-lg rounded-xl bg-white">
          
          <div class="h-96 overflow-y-scroll mb-2 p-2">
              {dataArry && dataArry.map((items, index)=>{
                  return(<Chats wallet={wallet} key={items.time + items.sender} items={items} />)})}
                        <div ref={messagesEndRef} />
            </div>

<div class="p-2">

<Form onSubmit={sendMessage}>
<InputGroup className="mb-3">
  
    <Form.Control type="text" placeholder={"start typing..."}
    value={chatText}
    onChange={e => setChatText(e.target.value)}    
    />
    <Button type="submit" disabled={!chatText}>
      Send
    </Button>

    </InputGroup>
  
</Form>
</div>
</div> 
  </div>
);
}
  
export default Chat;


const Chats = ({items, wallet}) => {
 
  const d = new Date(items.time)
  const ta = timeAgo(d)
  let auth = false
  if(items.sender === wallet)
  {auth = true}

  const messageClass = auth ? 'flex-row-reverse' : 'flex-row';
  const messageBodyClass = auth ? 'bg-green-500 text-right text-white' : 'bg-gray-100';
  const imageClass = auth ? 'ml-2' : 'mr-2';
  
return (
  <div className={`px-3 py-2 flex no-wrap items-start ${messageClass}`}>
  <div>
    <img className={`block rounded-full object-cover w-10 ${imageClass}`} src={items.image || 'https://i.imgur.com/rFbS5ms.png'} alt="{items.tokenid}'s pfp" />
  </div>
  <div className={`block w-80 break-words p-2 rounded-md ${messageBodyClass}`}>
  <div class="flex flex-wrap items-baseline	space-x-2">
    <div className="font-semibold">Husky #{items.tokenid}</div>
    <div className="text-xs">{ta}</div>
  </div>
    <div>{items.chat}</div>
    
  </div>
</div>

);
}


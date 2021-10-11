import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { getDatabase, ref, set, onValue, query, get,child, orderByValue, push, orderByChild, limitToLast} from "firebase/database";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { timeAgo } from "./utils/dateFunctions";

const Chat = ({pfp, wallet, user}) => {
 
    const [chatText, setChatText] = useState("")
    const [chatData, setChatData] = useState("")
    const [isTyping, setIsTyping] = useState()
  
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const timestamp = Date.now()
   
    const profileImage = `https://huskies.s3.eu-west-2.amazonaws.com/images/${pfp[0]}.png`
    const chatsDisplayRef = query(ref(db, 'messages'), orderByChild('timeStamp'), limitToLast(100));
    const isTypingRef = query(ref(db, 'isTyping'), );
  

    const messagesEndRef = useRef(null)

    /*
    get(child(dbRef, `members/${wallet}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })
    */
    
    const scrollToBottom = async () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const typingDb = async (typingBool) => {

      const typingDataRef = ref(db, 'isTyping/' + wallet)      
      await set(typingDataRef, {
       typing: typingBool,
       username: user ? user : `Husky #${pfp[0]}`
     })

    }


    const typing = async (e) => {
      setChatText(e.target.value)  
       e.preventDefault();
       const text = e.target.value
            
      if(text.length >2){
        
        typingDb(true)
       }else{
        
        typingDb(false)
       }             

       

  }

  setTimeout(function() { typingDb(false); }, 5000)
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
            username: user
          });
         
          setChatText("")
          typingDb(false)
          scrollToBottom()
        }     
       

    }

    useEffect(()=>{
  const loadTwice = () => {

    onValue(chatsDisplayRef, (snapshot) =>{
     const dataArry = []
     const obj = snapshot.val();
     
      Object.entries(obj).forEach(([key, value])=>{
    
        dataArry.push({chat:value.chat, 
                        time:value.timeStamp, 
                        sender: value.sender,
                        image: value.image,
                        tokenid: value.tokenid,      
                        username: value.username                
                      })
                     
      });
      setChatData(dataArry)
      scrollToBottom()
    })
   
    
  }
  loadTwice()


},[db])

useEffect(()=>{
  const loadOnce = () => {

    onValue(isTypingRef, (snapshot) =>{
     const dataArry = []
     const obj = snapshot.val();
     
      Object.entries(obj).forEach(([key, value])=>{
    
        dataArry.push({typing: value.typing, 
                        username: value.username                
                      })
                     
      });
      setIsTyping(dataArry)
      
    })
   
    
  }
  loadOnce()


},[db])



  
return (
<>



  <div class="w-7/8 mx-auto"> 
 
      <div class="border-2 shadow-lg rounded-xl bg-white">
          
          <div class="h-96 overflow-y-scroll mb-2 p-2">
              {chatData && chatData.map((items, index)=>{
                  return(<Chats wallet={wallet} key={items.time + items.sender} items={items} />)})}
                        <div ref={messagesEndRef} />
            </div>

            <div class="animate-pulse pl-3 flex flex-wrap space-x-2">
            {isTyping && isTyping.map((items, index)=>{
              if(items.typing)
                return(<div key={index} class="text-xs">{items.username} is typing...</ div>)})}           
            </div>

<div class="p-2">

<Form onSubmit={sendMessage}>
<InputGroup className="mb-3">
  
    <Form.Control type="text" placeholder={"start typing..."}
    value={chatText}
    onChange={e => typing(e)}    
    />
    <Button type="submit" disabled={!chatText}>
      Send
    </Button>

    </InputGroup>
  
</Form>
</div>
</div> 
  </div>
  </>
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
  const messageBodyClass = auth ? 'bg-green-500 text-white' : 'bg-gray-100';
  const imageClass = auth ? 'ml-2' : 'mr-2';
  let nickname = items.username ? items.username : `Husky #${items.tokenid}`
  
return (
  <div className={`px-3 py-2 flex no-wrap items-start ${messageClass}`}>
  <div>
    <img className={`block rounded-full object-cover w-10 ${imageClass}`} src={items.image || 'https://i.imgur.com/rFbS5ms.png'} alt="{items.tokenid}'s pfp" />
  </div>
  <div className={`block w-80 break-words p-2 rounded-md ${messageBodyClass}`}>
  <div class="flex flex-wrap items-baseline	space-x-2">
    <div className="font-semibold">{nickname}</div>
    <div className="text-xs">{ta}</div>
  </div>
    <div>{items.chat}</div>
    
  </div>
</div>

);
}


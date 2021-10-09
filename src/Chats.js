
import Title from "./title";
import { tokensByOwner, getCurrentWalletConnected } from "./utils/interact";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'

const Chats = ({items, wallet}) => {
 
    const [showA, setShowA] = useState(true);
 
    const toggleShowA = () => setShowA(!showA);

    const sender = String(items.sender).substring(0, 6) +
      "..." +
      String(items.sender).substring(38)

      const d = new Date(items.time)
      const ts = d.toUTCString();  
     
   

return (
<div class="bg-white border-1 shadow rounded w-80">
            <div class="bg-gray-100 p-2 flex justify-around">
            <strong className="me-auto">{sender}</strong>
            <span class="text-xs">{ts}</span>
            </div>
          <div class="p-2">{items.chat}</div>
        </div>

);
}
  
export default Chats;



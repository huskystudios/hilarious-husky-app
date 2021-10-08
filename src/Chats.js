
import Title from "./title";
import { tokensByOwner, getCurrentWalletConnected } from "./utils/interact";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'

const Chats = ({items}) => {
 
    const [showA, setShowA] = useState(true);
 
    const toggleShowA = () => setShowA(!showA);

    const sender = String(items.sender).substring(0, 6) +
      "..." +
      String(items.sender).substring(38)

      const d = new Date(items.time)
      const ts = d.toUTCString();  
     

return (
<Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{sender}</strong>
            <small>{ts}</small>
          </Toast.Header>
          <Toast.Body>{items.chat}</Toast.Body>
        </Toast>

);
}
  
export default Chats;



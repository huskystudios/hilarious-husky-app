
import { createBrowserHistory } from 'history';
import Horde from "./Horde";
import {
getContract
  
} from "./utils/interact.js";
import Leaderboard from "./Leaderboard";
import Owners from "./OwnersCount";
import { Tab } from "bootstrap";
import Tabs from 'react-bootstrap/Tabs'
import { useState } from 'react';

//bg-light-image
function OrcsDashboard() {

  const {nftContract} = getContract()

  function ControlledTabs() {
    const [key, setKey] = useState('activity');
  
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        
      >
        <Tab eventKey="activity" title="Activity Sheet">
        
         
           <Horde contract={nftContract} />
                 
       
        </Tab>
        <Tab eventKey="leaderboard" title="Leaderboard">
        <Leaderboard />

        </Tab>
        <Tab eventKey="owners" title="Owners">
        <Owners />
      
        </Tab>
   
      </Tabs>
    );
  }

  return (
    <>
      {/*  <Helmet>
    <title>Orcs</title>
      <meta name="Hilarious Huskies is an NFT collection inspired a beautiful pup named Hazel." content="Hilarious Huskies is an NFT collection inspired a beautiful pup named Hazel." />
      <meta content="summary_large_image" property="twitter:card" />
      <meta content="HilariousHuskies Marketplace: Mint and explore digital assets" property="og:title" />
      </Helmet>
      //class="bg-light-image">
      */ }

                

                <ControlledTabs />


</>


  );
}

export default OrcsDashboard;



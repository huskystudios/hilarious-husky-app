import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Mint from './Mint';
import { Helmet } from 'react-helmet';
import banner from "./media/banner.jpg"
import {app} from './initFirebase';
import { getAnalytics } from "firebase/analytics";
import Track from './Track';
const history = createBrowserHistory();

getAnalytics(app)

const title = "Husky Studios: A Web3 Creative Agency"
const desc = "Husky Studios is a full service creative agency that specializes in NFTs, Web3, Ai, and Blockchain. We are a team of artists, developers, and marketers that are passionate about the future of the internet."

const services = [
"Smart Contract Design and Implementation ",
"EVM Chains – Ethereum, Polygon, Avalanche",
"Smart Contract Audit",
"Known vulnerabilities, access control, logical flaws",
"Adding blockchain to your existing project ",
"NFT project management",
"Consulting",
"Web3 dapp",
"Discord and Twitter sales bot",
"Custom Whitelist process",
"L1-L2 bridge"
]

function App() {




  return (
    <>
    <Helmet>
    <title>Husky Studios</title>
      <meta name="Hilarious Huskies is an NFT collection inspired a beautiful pup named Hazel." content="Hilarious Huskies is an NFT collection inspired a beautiful pup named Hazel." />
      <meta content="summary_large_image" property="twitter:card" />
      <meta content={`${desc}`} property="og:title" />
      <meta content={`${desc}`} property="og:description" />
      <meta content={`${desc}`} name="description" />
      <meta content={banner} property="og:image" />
      <link href="https://www.huskystudios.io/" rel="canonical" />      
    </Helmet>
   
    <Router history={history}>
    <div class="h-screen w-screen flex flex-wrap justify-center items-center"> 
    
    <div className='flex flex-col justify-center items-center'>
      <div>
      <h1 class="text-8xl font-bold uppercase text-center justify-center tracking-tighter">
        Husky Studios
      </h1>
      <div className='text-center p-4'>
        Smart contract development, NFTs, and more. Email 0xHusky at hello(at)huskystudios(dot)io for more info or ping us on Discord (0xHusky#7639)...
      </div>
      <div className="text-2xl font-bold text-center p-2">
        Services
      </div>
      <div>
        {services.map((service) => (
          <div className='text-center p-0'>
            {service}
            </div>
        ))}
      </div>

      <div className='text-center p-4 text-indigo-500'>
        This website sucks because we're busy other making cool stuff.
      </div>

      </div>
      <Track />
    <Mint />
    </div>
    </div>
    </Router>
    </>
  );
}

export default App;

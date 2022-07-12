import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Huskies from './Huskies'
import Mint from './Mint';
import Faq from './faq';
import TableList from './Table';
import Socials from './reusables';
import { Helmet } from 'react-helmet';
import banner from "./media/banner.jpg"
import bg from "./media/bgfixed1.jpeg"
import Verify from './Verify';
import Team from './Team';
import NavComp from './Nav';
import Home from './home';
import Jackpot from './Jackpot';
import Roadmap from './roadmap';
import Members from "./Members";
import {app} from './initFirebase';
import { getAnalytics } from "firebase/analytics";

const history = createBrowserHistory();

getAnalytics(app)

function App() {



  return (
    <>
    <Helmet>
    <title>Hilarious Huskies</title>
      <meta name="Hilarious Huskies is an NFT collection inspired a beautiful pup named Hazel." content="Hilarious Huskies is an NFT collection inspired a beautiful pup named Hazel." />
      <meta content="summary_large_image" property="twitter:card" />
      <meta content="HilariousHuskies Marketplace: Mint and explore digital assets" property="og:title" />
      <meta content="Hilarious Huskies is an NFT collection inspired by a beautiful Siberian Husky, named Hazel. Loyal, friendly, and plagued with wanderlust, this collection is a tribute to our furry friends, doing things you would normally find huskies doing." property="og:description" />
      <meta content={banner} property="og:image" />
      <link href="https://hilarioushuskies.life" rel="canonical" />
      <meta content="Hilarious Huskies is an NFT collection inspired by a beautiful Siberian Husky, named Hazel. Loyal, friendly, and plagued with wanderlust, this collection is a tribute to our furry friends, doing things you would normally find huskies doing." name="description" />
    </Helmet>
   
    <Router history={history}>
    <div class="h-screen w-screen flex flex-wrap justify-center items-center"> 

         

<div className='flex flex-col justify-start'>
              <Mint />
              </div>

              
           
          

      </div>
      </Router>
      </>
  );
}

export default App;

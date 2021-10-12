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
    <div class="min-h-screen"> 
      <div class="container mx-auto">             
         
<NavComp />
              <Switch>
                <Route path="/mint">   
                <Mint/>
                </Route>
                <Route path="/huskies">
                <Huskies />
                </Route>
                <Route path="/prizes">
                <Jackpot />
                </Route>
                <Route path="/members">
                <Members />
                </Route>
                <Route path="/faq">
                <Faq />
                </Route>
                <Route path="/provenance">
                <TableList />
                </Route>
                <Route path="/verify">
                <Verify />
                </Route>
                <Route path="/team">
                <Team />
                </Route>
                <Route path="/roadmap">
                <Roadmap />
                </Route>
                <Route path="/">
                <Home />
                </Route>

                
              
              
              </Switch>

              <Socials />
           
          
      </div>
      </div>
      </Router>
      </>
  );
}

export default App;

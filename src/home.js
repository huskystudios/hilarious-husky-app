import Intro from './Intro'
import Mint from './Mint';
import Faq from './faq';
import Team from './Team';
import List from './List';
import Verify from "./Verify"

function Home() {

  return (
    <div class="space-y-8">
    <Intro />
    <Mint />
    <Verify />
    <Faq />
    <List />
    <Team />
    
      </div>
  );
}

export default Home;

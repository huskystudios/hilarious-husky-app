import Title from './title';
import { Accordion } from 'react-bootstrap';

const Faq = (props) => {

return (
<div class="lg:text-base xl:text-lg pb-2 text">    
<Title title="FAQ's About The Project" />
<Accordion defaultActiveKey="0">

  <Accordion.Item eventKey="0">
    <Accordion.Header>Why</Accordion.Header>
    <Accordion.Body>    
    We wanted to do this because we’re Husky lovers. The project started out as a programatic pixel art project, but has since expanded as we added some blue sky to our thinking. As part of the first phase, we will be dropping 3000 Hilarious Husky ERC721 tokens with a number of different traits. Rarity will be announced after minting. As a part of phase two, we will have the community decide what the project team will do next. Don't forget to join the discord!
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="1">
    <Accordion.Header>When does minting start?</Accordion.Header>
    <Accordion.Body>
    The drop is happening on October 15th. We'll announce on twitter and discord.
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="2">
    <Accordion.Header>How can I mint one?</Accordion.Header>
    <Accordion.Body>
    While some were minted in September for giveaways and for the project team, a few others got lucky and minted because I definitely forgot to flip the mint swtich at launch. lol. 
    These can be minted at the drop by either use this site (click on mint) or you can also interact with the contract on etherscan yourself. 
    Verified contract &amp; code is available <a href="https://etherscan.io/address/0x6e918a90dcb258353acca3dfdb2a54a5d81c4596#code"><u>here</u></a>. 
    Shoot us an email or get in touch with us on either<a href="https://twitter.com/HuskiesNft" target="_blank" rel="noopener noreferrer">twitter</a> or <a href="https://discord.gg/bYCs6UMWDS" target="_blank" rel="noopener noreferrer">discord </a>if you have any trouble.
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="3">
    <Accordion.Header>Whats next?</Accordion.Header>
    <Accordion.Body>
    Check out our <a href="/roadmap/">roadmap.</a>
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="4">
    <Accordion.Header>Additional Details</Accordion.Header>
    <Accordion.Body>
    Husky metadata and pngs are stored on the IPFS and will be preserved for eternity. A cached version is also avaialbe on AWS (IPFS is a bit slow at times). 
    HUSK Tokens are ERC-721 compliant and can be traded on OpenSea.
    </Accordion.Body>
  </Accordion.Item>


</Accordion>

  <p>Cant find what your looking for? As us anything on the Hilarious Huskies <a href="https://discord.gg/bYCs6UMWDS" target="_blank" rel="noopener noreferrer"><u>discord</u></a> server
  </p>

</div>
)}

export default Faq;

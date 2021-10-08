import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import mobileLogo from './media/logo.gif'
import ConnectWallet from './ConnectWallet';  


const NavComp = ({props}) => {

  return (
      <>
      <div class="pt-2 flex justify-end">
   
   <ConnectWallet />
   </div>
    <div class="flex justify-between space-x-2 py-3">    
    <div class="flex space-x-2 md:flex-row-reverse	">
      
        <div class="flex flex-wrap space-x-2">
        
        <Navbar>   
            <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/mint/">Mint</Nav.Link>
            <Nav.Link href="/jackpot/">Jackpot</Nav.Link>
            <Nav.Link href="/roadmap/">Roadmap</Nav.Link>
            <Nav.Link href="/members/">Token holders</Nav.Link>            
            </Nav>     
        </Navbar>
      
        </div>
        <div>
        <a href="/">
        <img class="hidden md:flex" width={60} alt="Logo" src={mobileLogo} />
        </a>
        </div>
    </div>
    
    
    </div>
    </>
)}

export default NavComp;

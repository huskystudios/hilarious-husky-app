import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Title from './title';
import { Button } from 'react-bootstrap';

const MyCollection = ({collections}) => {

     return (
    <div class="min-h-full p-2">
     <div class="flex justify-between">
     <Title title={"My Collection"} />
     
     </div>
  
  
    <Row xs={2} sm={3} md={4} className="g-4">
    {collections.length > 0 && collections.map((pup, index) => (
      <Col key={pup}>
        
         <div class="w-4/5" key={index}>
            <div class="flex justify-evenly">
             <img class="rounded-full" src={`https://huskies.mypinata.cloud/ipfs/QmdDVGZijQQpvMxubwLxanU4HH8yVSk6HEsqtbtpJVugLH/${pup}.png`} />
             </div>
             <div class="flex justify-evenly font-bold pt-2">
               <a class="no-underline text-center" rel='noopener noreferrer' target="_blank" href={`https://opensea.io/assets/ethereum/0x6e918a90dcb258353acca3dfdb2a54a5d81c4596/${pup}`}>
               Hilarious Huskies #{pup}</a></div>
                      
        </div>
     
       </Col>
    ))}
  </Row>
  {collections.length <= 0 && (
        <div class="p-3">
          <h4>You dont have any Huskies yet.</h4>
        </div>
      )}

</div>
    );
  }
  
export default MyCollection;


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Title from './title';

const MyCollection = ({collections}) => {

     return (
    <div class="min-h-full p-2">
  <Title title={"My Collection"} />
    <Row xs={2} sm={3} md={4} className="g-4">
    {collections.length > 0 && collections.map((pup, index) => (
      <Col key={pup}>
        
         <div key={index}>
            <div class="flex justify-evenly">
             <img class="rounded-full" src={`https://huskies.s3.eu-west-2.amazonaws.com/images/${pup}.png`} />
             </div>
             <div class="flex justify-evenly font-bold pt-2">
               <a class="no-underline text-center" href={`/huskies/${pup}`}>Hilarious Huskies #{pup}</a></div>
                      
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


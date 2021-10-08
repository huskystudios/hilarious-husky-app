import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card } from "react-bootstrap";
import Title from "./title";

const MyCollection = ({collections}) => {

     return (
    <div class="min-h-full">
  
    <Row xs={1} sm={2} md={5} className="g-4">
    {collections.length > 0 && collections.map((pup, index) => (
      <Col key={pup}>
        
         <Card key={index}>
      
             <Card.Img variant="top" src={`https://huskies.s3.eu-west-2.amazonaws.com/images/${pup}.png`} />
       
        <Card.Body>
                              
                   <>
                   <Card.Title><a href={`/huskies/${pup}`}>Hilarious Huskies #{pup}</a></Card.Title>
                   <Card.Text>
                   </Card.Text>
                   
                   </>                   
                 
    
          
     
          </Card.Body>            
        </Card>
     
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


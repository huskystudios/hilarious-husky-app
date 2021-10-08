import { useEffect, useState, useRef } from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Husky from "./Husky";
import {
  getTokenSupply
 } from "./utils/interact.js";
import Title from "./title";

const List = (props) => {

    const [huskyMeta, setHuskyMeta] = useState([]);
    const [huskyMetaLoaded, setHuskyMetaLoaded] = useState(false);
    const [page, setPage] = useState(0);

    const numberperpage = 3

    useEffect(async () => {
    
        getHuskyMeta();


    }, [page]);

    let start = (page * numberperpage)
    let end = ((page + 1) * numberperpage)
    
    const getHuskyMeta = async () => {
        
    let resultArray = []

    for(let i=start; i<end;i++){

        const response = await fetch(`https://huskies.s3.eu-west-2.amazonaws.com/metadata/${i}`);
        const answer = await response.json()
        resultArray.push(answer)

    }      
     setHuskyMeta(resultArray)
     setHuskyMetaLoaded(true)
    };


    const onPagePress = (pageNum)=> { //TODO: implement
        setHuskyMetaLoaded(false)
        setPage(pageNum)
      };
    

    return (
      <div class="min-h-full bg-white">
        <Title title="Explore The Collection" />
    <Row xs={1} sm={2} md={3} className="g-4 p-3">
    {huskyMeta.map((pup, index) => (
      <Col key={pup.name}>
        <Husky key={pup.name + index} tokenidprop={pup.tokenId} />
      
       {/* <Card key={index}>
         {huskyMetaLoaded ? (
             <Card.Img variant="top" src={`https://huskies.s3.eu-west-2.amazonaws.com/images/${pup.tokenId}.png`} />
         ):(
            <Card.Img variant="top" src={`https://huskies.s3.eu-west-2.amazonaws.com/grey.png`} />
         )} 
        <Card.Body>
            {huskyMetaLoaded ? (
                   
                   <>
                   <Card.Title>Hilarious Huskies #{pup.tokenId}</Card.Title>
                   <Card.Text>
                   Wearing {hat[pup.attributes[2].value]}, this collectable pup is on a {pup.attributes[0].value} background. 
                   It looks like he is {activity[pup.attributes[1].value]}.
                   
                   </Card.Text>
                    <Button variant="dark" onClick={(e) => {
                                    e.preventDefault();
                                      window.location.href=`/huskies/${pup.tokenId}`;
                                             }}>
                    
                    Details</Button>
                  
                   
                   </>                   
                 
         ):(
            <>
                   <Placeholder as={Card.Title} animation="glow"><Placeholder xs={8} /></Placeholder>
                   <Placeholder as={Card.Text} animation="glow">
                       <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                       <Placeholder xs={6} /> <Placeholder xs={8} />
                   </Placeholder>
                   <Placeholder.Button variant="primary" xs={6} />
            </>  
         )} 
          
     
          </Card.Body>            
        </Card>
         */}
       </Col>
    ))}
  </Row>
<div class="flex justify-center">

  <Pagination size={"lg"}>
  <Pagination.First onClick={() => onPagePress(0)} />
  <Pagination.Prev onClick={() => onPagePress(page - 1)}/>

  <Pagination.Next onClick={() => onPagePress(page + 1)}/>
  <Pagination.Last onClick={() => onPagePress((3000/numberperpage)-1)}/>
</Pagination>
</div>
</div>
    );
  }
  
export default List;


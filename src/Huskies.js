import Husky from "./Husky"
import Pagination from 'react-bootstrap/Pagination'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import List from './List'
import Logo from "./logo";
import Carousel from 'react-bootstrap/Carousel'

const Huskies = (props) => {
let match = useRouteMatch();


const PaginationHandler = ({position}) => {
    const { tokenId } = useParams();

    let pageNum = parseInt(tokenId)
    let first = 0
    let last = 2999
    let prev = pageNum - 1
    let prev1 = pageNum - 2
    let next = pageNum + 1
    let next1 = pageNum + 2

    let fwddisabledFlag = false
    if(next >= last) fwddisabledFlag = true
    let bckdisabledFlag = false
    if(prev <= first) bckdisabledFlag = true

        for(let i=1; i<5; i++){

        }
    if (position === "next")
    {
        return(<Pagination>
          
            {fwddisabledFlag ? (
                <>
               
                <Pagination.Next disabled onClick={(e) => {e.preventDefault();window.location.href=`/huskies/${next}`;}} />
                <Pagination.Last disabled onClick={(e) => {e.preventDefault();window.location.href=`/huskies/${last}`;}} />
                </>
            ) : (
                <>
                 <Pagination.Next onClick={(e) => {e.preventDefault();window.location.href=`/huskies/${next}`;}} />
                <Pagination.Last onClick={(e) => {e.preventDefault();window.location.href=`/huskies/${last}`;}} />
                
                </>
            )}
            
          </Pagination>)
    }
    if (position === "prev")
    {
        return(
            <Pagination>
        {bckdisabledFlag ? (
            <>
            <Pagination.First disabled onClick={(e) => {e.preventDefault();window.location.href=`/huskies/${first}`;}} />
            <Pagination.Prev disabled onClick={(e) => {e.preventDefault();window.location.href=`/huskies/${prev}`;}} />
          
            </>
        ) : (
            <>
          
            <Pagination.First onClick={(e) => {e.preventDefault();window.location.href=`/huskies/${first}`;}} />
            <Pagination.Prev onClick={(e) => {e.preventDefault();window.location.href=`/huskies/${prev}`;}} />
            </>
        )}
       
       
    
        
      </Pagination>
        )
    }
   

}

 
return (
      <>

<Switch>
        <Route path={`${match.path}/:tokenId`}>
         <Husky/>
        </Route>
        <Route path={match.path}>  
          <List />
    {/*
    
       <Row xs={1} sm={2} md={3} lg={4} className="g-4">

        {Array.from({ length: 12 }).map((_, index) => (
            <Col key={index}>
            <Husky tokenidprop={index + 1}/>
            </Col>


            ))}
      </Row>
    */} 

  

        </Route>
</Switch>
     
  </>
  );
};

export default Huskies;


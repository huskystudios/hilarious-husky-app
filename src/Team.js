import Title from "./title";
import { Card } from "react-bootstrap";
import { CardGroup } from "react-bootstrap";

const Team = (props) => {


 
    return (

     <>
      <Title title={"Project Team"} />
      <div class="bg-white p-3">
    
   
    <CardGroup>
  <Card>
    <Card.Img variant="top" src="https://wallid-images.s3.eu-west-3.amazonaws.com/users/-10102866801633539184561" />
    <Card.Body>
      <Card.Title>hazelthehusky</Card.Title>
      <Card.Text>
       Devwork like wetwork
      </Card.Text>
    </Card.Body>

  </Card>
  <Card>
    <Card.Img variant="top" src="https://huskies.s3.eu-west-2.amazonaws.com/images/0.png" />
    <Card.Body>
      <Card.Title>Naberius</Card.Title>
      <Card.Text>
        Strategy 
      </Card.Text>
    </Card.Body>

  </Card>
  <Card>
    <Card.Img variant="top" src="https://huskies.s3.eu-west-2.amazonaws.com/images/36.png" />
    <Card.Body>
      <Card.Title>BabyAj</Card.Title>
      <Card.Text>
       Marketing
      </Card.Text>
    </Card.Body>

  </Card>
  <Card>
    <Card.Img variant="top" src="https://wallid-images.s3.eu-west-3.amazonaws.com/users/11890992111633653248965" />
    <Card.Body>
      <Card.Title>_cryptic_coder</Card.Title>
      <Card.Text>
       PenTest dont rest
      </Card.Text>
    </Card.Body>

  </Card>
  
</CardGroup>
     



</div>

</>
    );
  }
  
export default Team;


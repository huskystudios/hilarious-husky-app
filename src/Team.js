import Title from "./title";
import { Card } from "react-bootstrap";
import { CardGroup } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";

const Team = (props) => {


 
    return (

     <>
      <Title title={"Project Team"} />
      <div class="bg-white p-3">
    
   
    <CardGroup>
  <Card>
    <Card.Img variant="top" src="https://wallid-images.s3.eu-west-3.amazonaws.com/users/-10102866801633539184561" />
    <Card.Body>
      <Card.Title>Sid aka "hazelthehusky"</Card.Title>
      <div class="space-x-2">
      <SocialIcon url="https://twitter.com/sid_wahi?lang=en" />
      <SocialIcon url="https://www.linkedin.com/in/sidwahi/" />
      </div>
      
    </Card.Body>

  </Card>
  <Card>
    <Card.Img variant="top" src="https://huskies.s3.eu-west-2.amazonaws.com/images/0.png" />
    <Card.Body>
      <Card.Title>Naberius</Card.Title>
      <div class="space-x-2">
      <SocialIcon url="https://twitter.com/thebarkinspot" />
 
      </div>
    </Card.Body>

  </Card>

  <Card>
    <Card.Img variant="top" src="https://wallid-images.s3.eu-west-3.amazonaws.com/users/11890992111633653248965" />
    <Card.Body>
      <Card.Title>_cryptic_coder</Card.Title>
      <div class="space-x-2">
      <SocialIcon url="https://twitter.com/_cryptic_coder" />
     
      </div>
    </Card.Body>

  </Card>
  
</CardGroup>
     



</div>

</>
    );
  }
  
export default Team;


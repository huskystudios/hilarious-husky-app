import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import {shaData, shaFinal} from "./shaData"
import { getTokenSupply } from './utils/interact'
import { ContractStats } from './reusables'
const TableList = (props) =>{

  const [tokenSupply, setTokenSupply] = useState(0)

  useEffect(()=>{
    getTokenSupply().then((supply)=>{
      setTokenSupply(supply)
    })
  },[])
    return(
        <>
         <ContractStats />
        Final Proof Hash | {' '} {shaFinal}
        <br />
        <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>Token Id</th>
      <th>SHA256 Hash</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {Array.from({ length: tokenSupply }).map((_, index) => (
                <tr>
                <td>#{index}</td>
                <td>{shaData[index]}</td>
                <td><a class="hover:underline" href={`https://gateway.pinata.cloud/ipfs/QmdDVGZijQQpvMxubwLxanU4HH8yVSk6HEsqtbtpJVugLH/${index}.png`}>IPFS Link</a></td>
                <td><a class="hover:underline" href={`/huskies/${index}`}>Details</a></td>
                
              </tr>


            ))}


  </tbody>
</Table>
</>
    )



}

export default TableList
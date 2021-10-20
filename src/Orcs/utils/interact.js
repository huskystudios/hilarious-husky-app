require('dotenv').config();
const Web3 = require("web3")

const {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} = require("ethereum-multicall");




const infuraKey = process.env.REACT_APP_INFURA_KEY;

///Alchemy and web3
///const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
///const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
//const web3 = createAlchemyWeb3(alchemyKey); 

const contractAddress = "0x3abedba3052845ce3f57818032bfa747cded3fca"

const web3 = new Web3(new Web3.providers.HttpProvider(infuraKey))
const orcs = require('../orcs-abi.json')
const zug = require('../zug-abi.json')
const nftContract = new web3.eth.Contract(orcs.abi, contractAddress);
const ercContract = new web3.eth.Contract(zug.abi, contractAddress);

const etherscanKey = process.env.REACT_APP_ETHERSCAN_KEY;
var api = require('etherscan-api').init(etherscanKey);

const multiCallOrcs = async (multicallArray)=>{
  
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
  const contractCallContext: ContractCallContext[] = multicallArray
  const results: ContractCallResults = await multicall.call(contractCallContext);

  return results
}

export const calcuclateLevel = ({action, claimable, level, lvlProgress})=>{
///straight math... claimable/1000+levelprogress/1000

  let level2 = ((parseInt(lvlProgress) + (parseInt(claimable)))/1000).toFixed(1)
  let level01 = (level)

  let calcLevel

let activitymap = null
  switch(parseInt(action)) {
      case 1:
        activitymap = "Farming"
        calcLevel = level01
        break;
      case 2:
        activitymap = "Training"
        calcLevel = level2
        break;
      default:
        activitymap = "Idle"
        calcLevel = level01
    }

    return({calcLevel, activitymap})

}

export const lookupAllOrcs = async ({start, stop, array})=>{
  let loopStart = start
  let loopEnd = stop
  let tempArr = []

  console.log("3.", array)

  if(array){
  array.map((i, index)=>{
    console.log(i)
    var tx = {
      reference: 'EtherOrcs'+i.toString(),
      contractAddress: contractAddress,
      abi: orcs.abi,
      calls: [{ reference: 'orcsCall'+i.toString(), methodName: 'orcs', methodParameters: [i]},
      { reference: 'claimableCall'+i.toString(), methodName: 'claimable', methodParameters: [i]},
      { reference: 'activitiesCall'+i.toString(), methodName: 'activities', methodParameters: [i]},
     ]
    };
    tempArr.push(tx);
  })
}else
{

  for(var i=loopStart;i<loopEnd;i++){
    var tx = {
     reference: 'EtherOrcs'+i.toString(),
     contractAddress: contractAddress,
     abi: orcs.abi,
     calls: [{ reference: 'orcsCall'+i.toString(), methodName: 'orcs', methodParameters: [i]},
     { reference: 'claimableCall'+i.toString(), methodName: 'claimable', methodParameters: [i]},
     { reference: 'activitiesCall'+i.toString(), methodName: 'activities', methodParameters: [i]},
    ]
   };
   tempArr.push(tx);
 }
}

let results = await multiCallOrcs(tempArr)
console.log(results)
///0 is orcs
///1 claimable
///2 activities
let orcObj 
let orcArry = []

for(let i=loopStart; i<loopEnd; i++){
  
  let orcData = results.results[`EtherOrcs${i}`].callsReturnContext[0].returnValues
  let activity = results.results[`EtherOrcs${i}`].callsReturnContext[2].returnValues[2]
  let claimable = parseInt(results.results[`EtherOrcs${i}`].callsReturnContext[1].returnValues[0].hex, 16)

  let level =  orcData[4]
  let lvlProgress =  orcData[6]
  let action = activity
  
const {calcLevel, activitymap} = calcuclateLevel({action, claimable, level, lvlProgress})

orcObj = {
    owner: results.results[`EtherOrcs${i}`].callsReturnContext[2].returnValues[0],
    tokenid: i,
    time: parseInt(results.results[`EtherOrcs${i}`].callsReturnContext[2].returnValues[1].hex,16),  
    action: results.results[`EtherOrcs${i}`].callsReturnContext[2].returnValues[2].toString(),  
    actionString: activitymap,
    level:orcData[4], 
    calcLevel: calcLevel,
    claimable: claimable,
    image: null,
    name: `Orc #${i}`,
    body: orcData[0],
    helm: orcData[1],
    mainhand: orcData[2],
    offhand: orcData[3],
    zugModifier: orcData[5], 
    attributes: null
  }

  orcArry.push(orcObj)
}

return orcArry

}

export const lookupOrc = async (tokenid)=>{

  let orcs = await nftContract.methods.orcs(tokenid).call()

  let a = await nftContract.methods.tokenURI(tokenid).call()
  var b = a.split(",")
  var orc = JSON.parse(atob(b[1]))

  let activity = await nftContract.methods.activities(tokenid).call()
  let claimable = parseInt(await nftContract.methods.claimable(tokenid).call())
  
 
  let level = orcs.level
  let lvlProgress = orcs.lvlProgress
  let action = activity.action
  
const {calcLevel, activitymap} = calcuclateLevel({action, claimable, level, lvlProgress})

const  orcObj = {
      owner: activity.owner.toLowerCase(),
      tokenid: tokenid, 
      time: activity.timestamp,  
      action: activity.action,  
      actionString: activitymap,
      level:orcs.level, 
      calcLevel: calcLevel,
      claimable: claimable,
      image: orc.image,
      name: orc.name,
      body: orcs.body,
      helm: orcs.helm,
      mainhand: orcs.mainhand,
      offhand: orcs.offhand,
      zugModifier: orcs.zugModifier,    
      attributes: orc.attributes
    }

    return(orcObj)

}


export const pillage = async({tokenid, place, tryHelm, tryMainhand, tryOffhand}) => {
  
  const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest'); //get latest nonce
 
  //the transaction
  const tx = {
    'from': window.ethereum.selectedAddress,
    'to': contractAddress,
    'nonce': nonce.toString(),
    'data': nftContract.methods.pillage(tokenid, place, tryHelm, tryMainhand, tryOffhand).encodeABI()
  };

 
  //sign the transaction via Metamask
try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [tx],
      })
      
  
      
  return {
      success: true,
      status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
      txHash: txHash
      

  }
} catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
  }

}

}




export const doAction = async(action, id) => {
  
  const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest'); //get latest nonce
 
  var txData;
  if(id.length > 1){
    txData = nftContract.methods.doActionWithManyOrcs(id, action).encodeABI()
    console.log("yes array")
  }else{
    txData = nftContract.methods.doAction(id, action).encodeABI()
  }
console.log(id, action, txData)
  
  //the transaction
  const tx = {
    'from': window.ethereum.selectedAddress,
    'to': contractAddress,
    'nonce': nonce.toString(),
    'data': txData
  };

 
  //sign the transaction via Metamask
try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [tx],
      })
      
  
      
  return {
      success: true,
      status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
      txHash: txHash
      

  }
} catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
  }

}

}



  
export const mintNFT = async() => {
  
  const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest'); //get latest nonce
 
  //the transaction
  const tx = {
    'from': window.ethereum.selectedAddress,
    'to': contractAddress,
    'nonce': nonce.toString(),
    'data': nftContract.methods.mint().encodeABI()
  };

 
  //sign the transaction via Metamask
try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [tx],
      })
      
  
      
  return {
      success: true,
      status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
      txHash: txHash
      

  }
} catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
  }

}

}

/*

export const collect_zug =() =>{
  var temp = [];
  for(var i=0;i<this.Orcs.length;i++){
    if(await this.contract_service.contract.methods.claimable(this.Orcs[i].id).call().then()>0){
      temp.push(this.Orcs[i].id);
    }
  }

  var func = {"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"claim"};

  var tx = await this.contract_service.buildTransaction(this.contract_service.current_account,func,[temp]);

  
  this.contract_service.send_transaction(tx);

  this.collectable_zug.next(0);
}

}
*/



  
export const collectZug = async(Orcs) => {
  
 console.log(Orcs)
 const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest'); //get latest nonce
  //the transaction
  const tx = {
    'from': window.ethereum.selectedAddress,
    'to': contractAddress,
    'nonce': nonce.toString(),
    'data': nftContract.methods.claim(Orcs).encodeABI()
  };

 
  //sign the transaction via Metamask
try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [tx],
      })
      
  
      
  return {
      success: true,
      status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
      txHash: txHash
      

  }
} catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
  }

}

}




///////////OLD

export function getContract(){
    
    return {nftContract, ercContract, web3}
  }

export async function getContractPrice(){
  const res = await nftContract.methods.getPrice().call();  
  return web3.utils.fromWei(res)
}


export const getContractAddress = () => {
  return(contractAddress)
  }

export const tokensByOwner = async (address) => {
var supply = nftContract.methods.tokensByOwner(address).call();
return(supply)
}

export const ownerOf = async (token) => {
  var address = nftContract.methods.ownerOf(token).call();
  return(address)
  }

export const getTokenSupply = async () => {
  var supply = nftContract.methods.totalSupply().call();
  return(supply)
  }
  

  export const isSaleActive = async () => {
    var sale = nftContract.methods.isSaleActive().call();
    return(sale)
    }

export const getEthPrice = async () => {
  var price = api.stats.ethprice();
  return(price)
}

export const getGasPrice = async () => {
  const gasApi = fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanKey}`, {method: "GET"})
  const response = (await gasApi).json()
  return(response)
}



export const getTxReceipt = async (txHash) => {
  var ret = api.proxy.eth_getTransactionReceipt(txHash); 
  return(ret)
}

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "Wallet connected...",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a rel="noreferrer" target="_blank" href={`https://metamask.app.link/dapp/hilarioushuskies.life/`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a rel="noreferrer" target="_blank" href={`https://metamask.app.link/dapp/hilarioushuskies.life/`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

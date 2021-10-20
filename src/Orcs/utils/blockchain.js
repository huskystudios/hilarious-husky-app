import { ethers, utils } from 'ethers';
import { setGlobal, getGlobal } from 'reactn';
import abi_orcs from './abi_orcs.json';
import abi_proxy from './abi_proxy.json';
const { Contract, Provider } = require('ethers-multicall');

async function getGas(){

    // let findgaslimit = await provider.estimateGas(signature, destination, data, rawTx);
    // rawTx.gasLimit = findgaslimit;
    
    var gasPrice = await window.provider.getGasPrice();
    console.log(parseInt(gasPrice));

    return { gasLimit: 21000, gasPrice: gasPrice }

}


export async function getTokenIdsForAddress(contract){
    let ethcallProvider = new Provider(window.provider);
    await ethcallProvider.init();
    const orcContract = new Contract(contract, abi_orcs);
    
    var tokenIds = [];
    let calls = [];
    let results = [];
    for (let index = 1; index < 4356; index++) {
        calls.push(orcContract.ownerOf(index));
        if (calls.length === 300) {
            let partial = await ethcallProvider.all(calls);
            results = results.concat(partial);
            calls = [];
        }
    }
    
    let partial = await ethcallProvider.all(calls);
    results = results.concat(partial);

    var contract_owned = [];

    var i = 1;
    for(var r of results){
        if(r === getGlobal().address){
            tokenIds.push(i);
        }
        if(r === contract){
            contract_owned.push(i);
        }
        i++;
    }

    

    // get ids of tokens owned by the contract
    calls = [];
    results = [];
    for (var id of contract_owned) {
        calls.push(orcContract.activities(id));
        if (calls.length === 300) {
            let partial = await ethcallProvider.all(calls);
            results = results.concat(partial);
            calls = [];
        }
    }

    partial = await ethcallProvider.all(calls);
    results = results.concat(partial);

    var i = 0;
    for(var r of results){
        if(r.owner === getGlobal().address){
            tokenIds.push(contract_owned[i]);
        }
        i++;
    }

    
    


    // get actions

    calls = [];
    results = [];
    for(var id of tokenIds){
        console.log(id);
        calls.push(orcContract.activities(id));
        if (calls.length === 300) {
            let partial = await ethcallProvider.all(calls);
            results = results.concat(partial);
            calls = [];
        }
    }
    
    partial = await ethcallProvider.all(calls);
    results = results.concat(partial);

    setGlobal({tokenIds: tokenIds, actions: results});
    
}




export function fromWeiToEth(wei){
    return utils.formatEther(ethers.BigNumber.from(wei));
}

export function formatAddress(addr){
    return addr.substr(2, 4) + '...' + addr.substr(-4, 4);
}

export function networkIdToName(id){
    if(id === 1) return 'Mainnet';
    if(id === 4) return 'Rinkeby';
    if(id === 3) return 'Ropsten';
    if(id === 5) return 'Goerli';
    if(id === 42) return 'Kovan';
}

export async function doActionWithManyOrcs(contractAddress, ids, action){
    var contract = new ethers.Contract(contractAddress, abi_orcs, window.provider);
    var contractWithSigner = contract.connect(window.signer);
    var tx = await contractWithSigner.doActionWithManyOrcs(ids, action, getGas());
    console.log(tx);
}


export async function callContract(address, functionName){
    var contract = new ethers.Contract(address, abi_proxy, window.provider);
    var res = await contract[functionName]();
    return res;
}

export async function transactContractWithWallet(contractAddress, proxyContract, functionName, params){
    var contract = new ethers.Contract(contractAddress, abi_orcs, window.provider);
    var contractWithSigner = contract.connect(window.signer);
    var tx = await contractWithSigner[functionName](proxyContract, params, getGas());
    console.log(tx);
}

export async function transactContractSingle(contractAddress, functionName, params){
    try{
        var contract = new ethers.Contract(contractAddress, abi_proxy, window.provider);
        var contractWithSigner = contract.connect(window.signer);
        var tx = await contractWithSigner[functionName](params, getGas());
    }catch(e){
        if(e.message){
            alert(e.message);
        }
    }
    console.log(tx);
}

export async function transactContractMany(contractAddress, functionName, params){
    params = params.split(',');
    try{
        var contract = new ethers.Contract(contractAddress, abi_proxy, window.provider);
        var contractWithSigner = contract.connect(window.signer);
        var tx = await contractWithSigner[functionName](params, getGas());
    }catch(e){
        if(e.message){
            alert(e.message);
        }
    }
    console.log(tx);
}








export async function connectWallet(){
    
    if(typeof window.ethereum === 'undefined') return;
    
    
    window.provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.provider.send("eth_requestAccounts", []);
    
    window.signer = window.provider.getSigner();

    window.provider.getNetwork().then(n => setGlobal({ chainId: parseInt(n.chainId) }));
    


    window.ethereum.on('chainChanged', id => {
        // setGlobal({ chainId: parseInt(id) });
        document.location.reload();
    });
    
    window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        document.location.reload();
    });

    var address = await window.signer.getAddress();

    console.log('connected');
    
    setGlobal({ address });

}


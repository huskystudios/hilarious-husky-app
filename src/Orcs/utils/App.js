import { useEffect, useGlobal, useState } from 'reactn';
import { connectWallet,
formatAddress,
networkIdToName,
transactContractMany,
transactContractSingle,
transactContractWithWallet,
getTokenIdsForAddress,
doActionWithManyOrcs } from './lib/blockchain';



function App() {

    
    const [orcsContract, setOrcsContract] = useState('0x7d9d3659dcfbea08a87777c52020BC672deece13');
    const [proxyContract, setProxyContract] = useState('0xdBb7Be7a35d8C2323EaC3E73C11e12E87Fe51F46');


    // const [approved, setApproved] = useState('');
    const [ints, setInts] = useState('1,2,3');
    const [singleint, setSingleint] = useState('');
    const [address] = useGlobal('address');
    const [chainId] = useGlobal('chainId');
    const [tokenIds] = useGlobal('tokenIds');
    const [actions] = useGlobal('actions');

    useEffect(() => {
        
        init();
        
    }, [address]);

    const init = async () => {
        await connectWallet();
        if(address){
            await getTokenIdsForAddress(orcsContract);
        }
    }

    const unstake = async () => {
        var training_ids = [];
        var i = 0;
        for(var a of actions){
            if(a.action === 2){ // training
                training_ids.push(tokenIds[i]);
            }
            i++;
        }
        await doActionWithManyOrcs(orcsContract, training_ids, 0);
        getTokenIdsForAddress(orcsContract);
        
        console.log(training_ids);
    }

    var showUnstake = false;
    if(actions){
        for(var a of actions){
            if(a.action == 2) showUnstake = true;
        }
    }


    return (
        <div>


            <div className="max-w-5xl mt-24 mb-12 mx-auto">


                {!address &&
                    <div className="mb-12">
                        <button onClick={() => connectWallet()}>Connect with Metamask (Step 1)</button>
                    </div>
                }
                {address &&
                    <div className="mb-12">
                        <div className="text-gray-400 mb-8">Step 1 Complete, Connected as: {formatAddress(address)} on {networkIdToName(chainId)}</div>
                        {!tokenIds && <div>Fetching tokens, please wait...</div>}

                        {!!tokenIds &&
                            <div style={{padding: 10, width: 300, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.4)', overflow: 'scroll', height: 200}}>
                                {tokenIds.map((t, i) => <div key={i}>
                                    Token ID: {t}, action: {actions[i].action}
                                </div>)}
                            </div>
                        }
                        
                        {!!tokenIds && tokenIds.length > 0 && showUnstake &&
                            <div className="mt-4">
                                <button onClick={() => unstake()}>Unstake (Step 2)</button>
                            </div>
                        }

                        {/*                 
                        <div className="mb-2 mt-10">Approve:</div>
                        <div className="flex">
                            <div>
                                <select value={approved}  onChange={e => setApproved(e.target.value)}>
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                            </div>
                            <div className="pl-4">
                                <button onClick={() => transactContractWithWallet(contract, 'setApprovalForAll', approved)}>setApprovalForAll (Step 3)</button>
                            </div>
                        </div> */}


                        <div className="pt-12">
                            <div>
                                <button onClick={() => transactContractWithWallet(orcsContract, proxyContract, 'setApprovalForAll', true)}>setApprovalForAll (Step 3)</button>
                            </div>
                        </div> 


                        <div className="mb-2 mt-10">Step 4, Migrate Single Orcs (single int):</div>
                        <div className="flex">
                            <div>
                            <input type="text" style={{width: 450}} value={singleint} onChange={e => setSingleint(e.target.value)}></input>
                            </div>
                            <div className="pl-4">
                                <button className="mr-4" onClick={() => {
                                    if(singleint == '') return;
                                    transactContractSingle(proxyContract, 'migrateAndFarm', singleint)
                                }}>MigrateAndFarm</button>
                                <button className="mr-4" onClick={() => {
                                    if(singleint == '') return;
                                    transactContractSingle(proxyContract, 'migrateAndTrain', singleint)
                                }}>MigrateAndTrain</button>
                                <button onClick={() => {
                                    if(singleint == '') return;
                                    transactContractSingle(proxyContract, 'justMigrate', singleint)
                                }}>Migrate</button>
                            </div>
                        </div>


                        <div className="mb-2 mt-10">Step 4, Migrate Many Orcs (comma separated):</div>
                        <div className="flex mb-48">
                            <div>
                            <input type="text" style={{width: 450}} value={ints} onChange={e => setInts(e.target.value)}></input>
                            </div>
                            <div className="pl-4">
                                <button className="mr-4" onClick={() => transactContractMany(proxyContract, 'migrateManyAndFarm', ints)}>MigrateManyAndFarm</button>
                                <button className="mr-4" onClick={() => transactContractMany(proxyContract, 'migrateManyAndTrain', ints)}>MigrateManyAndTrain</button>
                            </div>
                        </div>

                        
                    </div>
                }

                
                
                
                
                
            </div>
        </div>
    );
}

export default App;

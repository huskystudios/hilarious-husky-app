import { Injectable } from '@angular/core';
import { ContractService } from './contract.service';
import { Orc } from './orc';
import { encode, decode } from 'js-base64';
import { EventEmitter } from 'stream';
import { BehaviorSubject } from 'rxjs';
import { ContractCallContext, ContractCallResults } from 'ethereum-multicall';


@Injectable({
  providedIn: 'root'
})

export class OrcService {

  //Owned orcs: 7,8,9,10
  Orcs: Array<Orc> = [];
  OrcIDs: Array<any> = [];
  IdleOrcs: Array<any> = [];
  TrainingOrcs: Array<any> = [];
  FarmingOrcs: Array<any> = [];
  LootPoolsLevel: Array<any> = [1,3,6,15,25,36];
  collectable_zug = new BehaviorSubject<Number>(0);

  constructor(public contract_service: ContractService){
    this.contract_service=contract_service;
  }

  async mint(){
    var func = {"inputs":[],"name":"mint"};
    var tx = await this.contract_service.buildTransaction(this.contract_service.eth_accounts[0],func,[]);

    this.contract_service.send_transaction(tx);
  }


  getOrcs(){
    return this.Orcs;
  }

  getIdleOrcs(){
    var idle_orcs=[]
    for(var i=0;i<this.IdleOrcs.length;i++){
      var orc=this.getOrcById(this.IdleOrcs[i]);
      if(orc!=null){
        idle_orcs.push(orc);
      }
    }

    return idle_orcs;
  }

  getFarmingOrcs(){
    var farming_orcs=[];
    for(var i=0;i<this.FarmingOrcs.length;i++){
      var orc=this.getOrcById(this.FarmingOrcs[i]);
      if(orc!=null){
        farming_orcs.push(orc);
      }
    }

    return farming_orcs;
  }

  getTrainingOrcs(){
    var training_orcs=[]
    for(var i=0;i<this.TrainingOrcs.length;i++){
      var orc=this.getOrcById(this.TrainingOrcs[i]);
      if(orc!=null){
        training_orcs.push(orc);
      }
    }

    return training_orcs;
  }

  getOrcById(orcID:any){
    for(var i=0;i<this.Orcs.length;i++){
      if(this.Orcs[i].id==orcID){
        return this.Orcs[i];
      }
    }
    return null;
  }

  async updateOrcs(){
    this.IdleOrcs=[];
    this.FarmingOrcs=[];
    this.TrainingOrcs=[];
    var orc_list=[];
    var temp:any=0;
    for(var i=0;i<this.OrcIDs.length;i++){
      //request data from blockchain
      var orc_data = await this.getOrcData(this.OrcIDs[i]);
      var orc_svg = await this.getOrcSVG(this.OrcIDs[i]);
      var orc_cooldown = await this.getOrcCoolDown(this.OrcIDs[i]);
      var orc_action = (await this.getOrcAction(this.OrcIDs[i])).action;


      if(orc_action==0){
        this.IdleOrcs.push(this.OrcIDs[i]);
      }
      else if(orc_action==1){
        this.FarmingOrcs.push(this.OrcIDs[i]);
      }
      else if(orc_action==2){
        this.TrainingOrcs.push(this.OrcIDs[i]);
      }


      //convert blockchain data to Orc Object
      var orc = new Orc();
      orc.id = this.OrcIDs[i];
      orc.body = orc_data.body;
      orc.helm = orc_data.helm;
      orc.mainhand = orc_data.mainhand;
      orc.offhand = orc_data.offhand;
      orc.level = orc_data.level;
      orc.zugModifier = orc_data.zugModifier;
      orc.lvlProgress = orc_data.lvlProgress;
      orc.svg = orc_svg;
      orc.action=orc_action;
      orc.cooldown=orc_cooldown;


      try {
        temp+=parseInt(await this.contract_service.contract.methods.claimable(orc.id).call().then());
      }
      catch (exception_var) {
        temp+=0;
      }

      orc_list.push(orc);
    }
    if(temp>=100000000000000){
      temp = temp/1000000000000000000;
      this.collectable_zug.next(temp.toFixed(4));
    }
    this.Orcs=orc_list;
  }

  async getTimeStamp(){
    return (await this.contract_service.web3.eth.getBlock("latest")).timestamp;
  }

  async getEligibleOrcs(action:any){
    var eligible_orcs = [];
    for(var i=0;i<this.Orcs.length;i++){
      if(this.Orcs[i].action!=action && this.Orcs[i].cooldown<=(await this.getOrcCoolDown(this.Orcs[i].id))){
        eligible_orcs.push(this.Orcs[i]);
      }
    }
    return eligible_orcs;
  }

  async getEligibleOrcsForPillage(place:any){
    var eligible_orcs = [];
    for(var i=0;i<this.Orcs.length;i++){
      if(this.Orcs[i].level>=this.LootPoolsLevel[place]){
        eligible_orcs.push(this.Orcs[i]);
      }
    }
    return eligible_orcs;
  }

  async getOrcData(orcID:any){
    return await this.contract_service.contract.methods.orcs(orcID).call().then();
  }

  async getOrcSVG(orcID:any){
    var data=JSON.parse(decode((await this.contract_service.contract.methods.tokenURI(orcID).call().then()).substring(29)));
    return '<svg id="orc" version="1.1" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image x="0" y="-5" width="60" height="60" image-rendering="pixelated" preserveAspectRatio="xMidYMid" xlink:href="'+data.image+'"/></svg>';
  }

  async getOrcAction(orcID:any){
    return this.contract_service.contract.methods.activities(orcID).call().then();
  }

  async doAction(orcIDs:Array<Number>,action:Number){
    var func = {"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"enum EtherOrcs.Actions","name":"action_","type":"uint8"}],"name":"doActionWithManyOrcs"};

    var tx = await this.contract_service.buildTransaction(this.contract_service.current_account,func,[orcIDs,action]);

    this.contract_service.send_transaction(tx);
  }

  async train(orcIDs:Array<Number>){
    await this.doAction(orcIDs,2);
  }

  async farm(orcIDs:Array<Number>){
    await this.doAction(orcIDs,1);
  }

  async unstack(orcIDs:Array<Number>){
    await this.doAction(orcIDs,0)
  }


  async getOrcCoolDown(orcID:any){
    return (await this.contract_service.contract.methods.activities(orcID).call().then()).timestamp;
  }

  async pillage(orcID:any,place:any,tryHelm:boolean,tryMainhand:boolean,tryOffhand:boolean){
    var func = {"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"enum Orcs.Places","name":"place","type":"uint8"},{"internalType":"bool","name":"tryHelm","type":"bool"},{"internalType":"bool","name":"tryMainhand","type":"bool"},{"internalType":"bool","name":"tryOffhand","type":"bool"}],"name":"pillage"};

    var tx = await this.contract_service.buildTransaction(this.contract_service.current_account,func,[orcID,place,tryHelm,tryMainhand,tryOffhand]);

    this.contract_service.send_transaction(tx);
  }



  async get_orc_ids(){
    var contractCallContext: ContractCallContext[] = [];

    for(var i=1;i<5050;i++){
       var tx: ContractCallContext = {
        reference: 'EtherOrcs'+i.toString(),
        contractAddress: this.contract_service.contract_address,
        abi: [{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
        calls: [{ reference: 'ownerOfCall'+i.toString(), methodName: 'ownerOf', methodParameters: [i] }]
      };
      contractCallContext.push(tx);
    }

    var temp = [];

    var results: ContractCallResults = await this.contract_service.multicall.call(contractCallContext);
    for(var i=1;i<5050;i++){
      if(results.results['EtherOrcs'+i.toString()].callsReturnContext[0].returnValues[0].toLowerCase()==this.contract_service.current_account){
        this.OrcIDs.push(i);
      }
      else if(results.results['EtherOrcs'+i.toString()].callsReturnContext[0].returnValues[0].toLowerCase()==this.contract_service.contract_address.toLowerCase()){
        temp.push(i);
      }
    }

    contractCallContext = [];
    for(var i=0;i<temp.length;i++){
      var tx: ContractCallContext = {
        reference: 'EtherOrcs'+temp[i].toString(),
        contractAddress: this.contract_service.contract_address,
        abi: [{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"activities","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint88","name":"timestamp","type":"uint88"},{"internalType":"enum EtherOrcs.Actions","name":"action","type":"uint8"}],"stateMutability":"view","type":"function"}],
        calls: [{ reference: 'ownerOfCall'+temp[i].toString(), methodName: 'activities', methodParameters: [temp[i]] }]
      };
      contractCallContext.push(tx);
    }
    var results: ContractCallResults = await this.contract_service.multicall.call(contractCallContext);

    for(var i=0;i<temp.length;i++){
      if(results.results['EtherOrcs'+temp[i].toString()].callsReturnContext[0].returnValues[0].toLowerCase()==this.contract_service.current_account){
        this.OrcIDs.push(temp[i]);
      }
    }

    this.OrcIDs.sort(function(a, b) {
      return a - b;
    });


  }

  async collect_zug(){
    var temp:any=[];
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

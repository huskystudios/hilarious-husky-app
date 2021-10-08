import Title from './title';

const Intro = (props) => {

const huskiesonDisplay = ["310.png","420.png","69.png","109.png","logo.gif","123.png","115.png","1337.png","266.png"]

return (
    <>
    {/** Start of Intro */}
    <div class="flex flex-wrap align-middle md:justify-center pt-2 md:flex-row-reverse ">
        

    <div class="md:hidden">
        <div class="flex flex-wrap content-start">
        <img class="shadow-lg rounded-3xl w-32" src={`https://huskies.s3.eu-west-2.amazonaws.com/images/logo.gif`} />
          </div>
        </div>

       <div class="hidden lg:w-1/2 lg:flex lg:flex-wrap">
        <div class="flex flex-wrap content-start pl-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} class="p-1 w-1/3">
            <img class="shadow-lg rounded-3xl" src={`https://huskies.s3.eu-west-2.amazonaws.com/images/${huskiesonDisplay[index]}`} />
            </div>
          ))}
          </div>
        </div>

        
        <div class="sm:w-full lg:w-1/2 px-2">
          <h1 class="text-6xl md:text-6xl xl:text-9xl font-bold">Hilarious Huskies</h1>

          <div class="py-3">
            <div class="lg:text-base xl:text-lg pb-2 text">    
              <Title title="ERC-721 tokens on the Ethereum blockchain and hosted on IPFS." />
          
          <p>Hilarious Huskies is an NFT collection inspired by Siberian Huskys.Loyal, friendly, and plagued with wanderlust, this collection is a 
          tribute to our furry friends. 
          </p>
          <p>
          Minting <strong> more than one </strong> of this NFT enters you into the jackpot. Win upto <strong>ETH 6.4</strong> by owning more than 15 huskies. <a href="/jackpot/">Check out the Jackpot here.</a>
          </p>
          <p>
          Your NFT also doubles up as a membership card that will give you
          access to enhancements as we hit project milestones. <a href="/roadmap/">Read more on this here.</a>
          </p>
          

          
          <p>Follow us on <a href="https://twitter.com/HuskiesNft" target="_blank" rel="noopener noreferrer"><u>twitter</u></a> {" "} 
          and join the <a href="https://discord.gg/bYCs6UMWDS" target="_blank" rel="noopener noreferrer"><u>discord</u></a> {" "}
          to find out more.</p>
        
             </div>

          </div>
        </div>

       

      
      
    
 </div>

{/** End of Intro */}
</>
  );
};

export default Intro;

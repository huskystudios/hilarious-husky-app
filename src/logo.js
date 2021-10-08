import mobileLogo from './media/logo.gif'

const Logo = (props) => {

  return (
    
  <>   
<div class="flex flex-wrap align-middle md:justify-left py-4 space-x-4">
<a href="/">
<img width={150} class="shadow-lg rounded-3xl" src={mobileLogo} />  
</a>
<div class="w-1/2 self-center">
<h1 class="text-4xl md:text-6xl font-bold break-words">Hilarious Huskies</h1>
</div>
</div>   

</>
    
  );
};

export default Logo;

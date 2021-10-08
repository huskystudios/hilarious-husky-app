import Logo from
 './logo';
import { useState, useEffect } from 'react';
import { getContent } from './utils/cms';
import HTML2React from 'html2react'


const faquri = "https://hilarious-cms-6feha.ondigitalocean.app/faqs"

const Faq = (props) => {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

useEffect(async () => {
  setData(await getContent("faqs"))
    

  },[0]);
  
  return (
    <div>

            <div class="flex flex-wrap align-middle md:justify-left py-2">

        <div class="sm:w-full lg:w-2/3">
        

 <div>
{data ? (data.map((faq, index)=>{

return(

    <div key={faq.title} class="py-3">

    <h2 class="text-2xl xl:text-4xl font-bold">{faq.Title} </h2>
    
    <div class="lg:text-base xl:text-lg py-2">  
    {HTML2React(faq.Body)}  
    </div>
    
    </div>

)
})) : null}
    
        <h2 class="text-xl md:text-3xl xl:text-4xl font-bold">join the</h2>
        <h2 class="text-4xl md:text-8xl xl:text-9xl font-bold"> #woofpack</h2>
       
          
    </div>
  </div>
</div>      
     
</div>

    
  );
};

export default Faq;
    
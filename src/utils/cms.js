const baseURI = "https://hilarious-cms-6feha.ondigitalocean.app/"

export const getContent = async (path) => {

    const fetchUrl = baseURI + path
   
    const parseJSON = resp => (resp.json ? resp.json() : resp);

     // Checks if a network request came back fine, and throws an error if not
     const checkStatus = resp => {
       if (resp.status >= 200 && resp.status < 300) {
         return resp;
       }
       return parseJSON(resp).then(resp => {
         throw resp;
       });
     };
     const headers = {
       'Content-Type': 'application/json',
     };
 
     try {
       const fetchData = await fetch(fetchUrl, {
         method: 'GET',
         headers: headers,
       })
         .then(checkStatus)
         .then(parseJSON);
        
         return( fetchData );
     } catch (error) {
        console.log(fetchUrl)
      return({ error });
     }

  }
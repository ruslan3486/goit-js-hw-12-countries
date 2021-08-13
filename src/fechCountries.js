export default  function fetchCountries(countriesName){

     return fetch(`https://restcountries.eu/rest/v2/name/${countriesName}`)
         .then(response => {
             if (countriesName) {
                 return response.json();
             } else {
                 return
             }
            
         }).catch(error => console.log(error));
        
        
}
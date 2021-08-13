import './sass/main.scss';
import _ from 'lodash'
import countriesCharacteristics from './tampletes/countries.hbs';
import countriesName from './tampletes/countriesName.hbs';
import fetchCountries from './fechCountries.js'
import './sass/main.scss';
import error from './tampletes/pnitify.js'


import { options } from 'colorette';




const refs = {
    inputContries: document.querySelector('#searchContries'),
    cardContainer: document.querySelector('.js-card-container'),
  
}


   

           
refs.inputContries.addEventListener('input',  _.debounce(renderCounriesCard, 1000))
       
function renderCounriesCard(e) {
    e.preventDefault()
    const filter = e.target.value.trim();

    clearContainerCountries();

    fetchCountries(filter).then(data => {
        const markup = listCountriesName(data);

        const country = oneCountries(data);

        if (!data) {
            return;
        } else if (data.length > 10) {
            
            error({
              
                title: 'Найдено слишком много совпадений, уточните ваш запрос',
                    
                 delay: 2000,    
            })
        //  refs.textMessage.insertAdjacentHTML('beforeend', message); 
        } else if  (data.length >= 2 && data.length <= 10){
            
            insertListItem(country);

        } else if (data.length === 1){
            
            insertListItem(markup)
      }
    }
        
    )

}

function insertListItem(items) {
  refs.cardContainer.insertAdjacentHTML('beforeend', items);
}
    
function oneCountries(item) {
    
    return countriesName(item) 
}

function listCountriesName(item) {
    return  countriesCharacteristics(item)

  }      


   
function clearContainerCountries() {
     
    refs.cardContainer.innerHTML = '';
 }

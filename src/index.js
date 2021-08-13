import './sass/main.scss'; 
import _ from 'lodash'
import countriesCharacteristics from './tampletes/countries.hbs';//Импорт шаблонизатора характеристик стран
import countriesName from './tampletes/countriesName.hbs'; //Импорт шаблонизатора  страны
import fetchCountries from './fechCountries.js'//Импорт  HTTP запроса
import './sass/main.scss';
import error from './tampletes/pnitify.js'// Импорт плагина pnitify для оповещений


import { options } from 'colorette';




const refs = {
    inputContries: document.querySelector('#searchContries'),
    cardContainer: document.querySelector('.js-card-container'),
  
}


   

           
refs.inputContries.addEventListener('input',  _.debounce(renderCounriesCard, 1000))
       //Создаем функцию для вывода информации о стране
function renderCounriesCard(e) {

    e.preventDefault()
    //Создаем переменную для вывода информации елементов в окно браузера
    const filter = e.target.value.trim();

    clearContainerCountries();
//Выводим значение в зависимости от полученого к-ва стран
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
        
        } else if  (data.length >= 2 && data.length <= 10){
            
            insertListItem(country);

        } else if (data.length === 1){
            
            insertListItem(markup)
      }
    }
        
    )

}

//Функция которая вставляет указанные  шаблони в DOM дерево
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

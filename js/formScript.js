/**
 * 
 * Form custom script
 * 
 */

/**
 * 
 * Dynamic reading group 
 * 
 */
 const newReadingButton      =   document.getElementById('newReading');
 const anchorPoint           =   newReadingButton.closest('.row');
 const container             =   document.getElementById('mdml-form-step-readings')
 
 
 function appendNewReadingGroup(event){
     const index             =   event.target.getAttribute('data-index');
     const newIndex          =   parseInt(index, 10) + 1;
     const readingGroupHTML  =   newReadingGroup(index);
     anchorPoint.insertAdjacentHTML('beforebegin', readingGroupHTML);
     event.target.setAttribute('data-index', newIndex);
 }
 
 function deleteReadingGroup(event){
     const button            =   event.target;
     if (button.classList.contains('removeReading')){
         const index         =   button.getAttribute('data-index');
         const readingGroup  =   document.getElementById(`mdml-form-reading-group-${index}`);
         readingGroup.remove();
     }
 }
 
 newReadingButton.addEventListener('click', appendNewReadingGroup);
 container.addEventListener('click', deleteReadingGroup);
 
 /**
  * 
  * Dynamic location 
  * 
  */
 
 const userInput = document.getElementById('mdml-event-location');
 const preview = document.getElementById('mdml-event-location-api-result');
 const latitude = document.getElementById('mdml-event-location-lat');
 const longitude = document.getElementById('mdml-event-location-long');
 
 async function getPosition(query){
     try{
         const url = 'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=' + query
         const req = await fetch(url);
         const res = await req.json();
         return res;
     }
     catch(error){
         console.log(error);
     }
 }
 
 async function handlePosition(event){
     const position = event.target.value;
     const geolocation = await getPosition(position);
     if (geolocation[0]){
         latitude.value = (geolocation[0].lat);
         longitude.value = (geolocation[0].lon);
         const {leisure,house_number, road, town, postcode, country} = geolocation[0].address;
         locationName = [leisure, house_number, road, postcode, town, country].join(' ');
     } else {
         latitude.value = null;
         longitude.value = null;
         locationName = 'Désolé, la géolocalisation à échouer. Vérifiez l\'adresse saisie, une correction manuelle sera apportée avant publication.';
     }
     preview.innerText = locationName;
 }
 
 userInput.addEventListener('blur', handlePosition);
 
 /**
  * 
  * Form success
  * 
  */
 const form = document.getElementById('mdml-form-row');
 const success = document.getElementById('mdml-form-success');
 const formSubmit = document.getElementById('mdml-form-submit');
 const formReload = document.getElementById('mdml-form-reload');
 
 function onSuccess(){
    form.classList.add('d-none');
    success.classList.remove('d-none');
    windows.scroll(0, 0)
 }
 
 function onReload(){
     form.classList.remove('d-none');
     success.classList.add('d-none');
 }
 
 formSubmit.addEventListener('click', (e) => {e.preventDefault(); onSuccess()});
 formReload.addEventListener('click', onReload);
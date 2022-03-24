/**
 * Dark/light mode toggle
 */
const theme = document.getElementById('theme')
const toggleTheme = document.getElementById('toggleTheme');


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    toggleTheme.firstChild.classList.replace('bi-moon', 'bi-sun');
}

toggleTheme.addEventListener('click', (e)=> {
    if (e.target.classList.contains('bi-moon')){
        e.target.classList.replace('bi-moon', 'bi-sun');
        switchMode('dark');
        return;
    }
    if (e.target.classList.contains('bi-sun')){
        e.target.classList.replace('bi-sun', 'bi-moon');
        switchMode('light');
        return;
    }
    
})

function switchMode(mode){
    const colors = {
        light: './css/bootstrap.css',
        dark: './css/bootstrap-dark.css'
    }
    theme.setAttribute('href', colors[mode])
}

/**
 * Font toggle
 */

const body = document.getElementById('body');
const toggleFont = document.getElementById('toggleFont');

toggleFont.addEventListener('click', (e)=> {
    switchPolice();
})

function switchPolice(){
    body.classList.toggle('dys');
}

/**
 * Offcanvas mobile menu
 */

const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const menu = document.getElementById('menu');

openMenu.addEventListener('click', ()=>{showMenu()});
closeMenu.addEventListener('click', ()=> {hideMenu()} );

function showMenu(){
    console.log('click')
    menu.classList.add('show');
};
function hideMenu(){
    menu.classList.remove('show');
};

/**
 * Handle scroll to adapt logo
 */

// The debounce function receives our function as a parameter
const debounce = (fn) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;
  
    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {
      
      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) { 
        cancelAnimationFrame(frame);
      }
  
      // Queue our function call for the next frame
      frame = requestAnimationFrame(() => {
        
        // Call our function and pass any params we received
        fn(...params);
      });
  
    } 
};
  
  
// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
document.documentElement.dataset.scroll = window.scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();

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
const apiKeyInput = document.getElementById('api-key');
let apiKey = '';



// TO DO : put this function server side
async function getPosition(query){
    try{
        const url = 'http://api.positionstack.com/v1/forward?access_key='+ apiKey +'&limit=1&query=' + query
        const req = await fetch(url);
        const res = await req.json();
        console.log(res);
        return res;
    }
    catch(error){
        console.log(error);
    }
}

async function handlePosition(event){
    const position = event.target.value;
    const geolocation = await getPosition(position);
    latitude.value = (geolocation.data[0].latitude);
    longitude.value = (geolocation.data[0].longitude);
    preview.innerText = geolocation.data[0].label;
}

userInput.addEventListener('blur', handlePosition);
apiKeyInput.addEventListener('blur', function(event){
    apiKey = event.target.value;
})

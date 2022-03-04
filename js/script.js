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
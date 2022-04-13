/**
 * Dark/light mode toggle
 */
 const themeDark = document.getElementById('theme-dark');
 const toggleTheme = document.getElementById('toggleTheme');
 const darkThemeIcon = document.getElementById('dark-theme-icon');
 const lightThemeIcon = document.getElementById('light-theme-icon');
 let userPreference = localStorage.getItem('mdml-theme');

 
if (userPreference === 'dark'){
	switchMode('dark');
    darkThemeIcon.classList.add('d-none');
	lightThemeIcon.classList.remove('d-none');
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
	darkThemeIcon.classList.add('d-none');
	lightThemeIcon.classList.remove('d-none');
	localStorage.setItem('mdml-theme', 'dark')
}

toggleTheme.addEventListener('click', (e)=> {
    userPreference = localStorage.getItem('mdml-theme');
	if (userPreference === 'dark'){
		lightThemeIcon.classList.add('d-none');
		darkThemeIcon.classList.remove('d-none');
		switchMode('light');
		return;
	} else {
		darkThemeIcon.classList.add('d-none');
		lightThemeIcon.classList.remove('d-none');
		switchMode('dark');
		return;
	}
	
})

function switchMode(mode){
localStorage.setItem('mdml-theme', mode)
const colors = {
	light: 'none',
	dark: 'all'
}
themeDark.setAttribute('media', colors[mode]);
}

/**
 * Font toggle
 */

const body = document.getElementById('body');
const toggleFont = document.getElementById('toggleFont');
const userFont = localStorage.getItem('mdml-font');

if (userFont === 'dys'){
	switchPolice()
}

toggleFont.addEventListener('click', (e)=> {
    switchPolice();
})

function switchPolice(){
    body.classList.toggle('dys');
	localStorage.setItem('mdml-font', 'dys');
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


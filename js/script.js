const theme = document.getElementById('theme')
const toggleTheme = document.getElementById('toggleTheme');
const body = document.getElementById('body');
const toggleFont = document.getElementById('toggleFont');

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

toggleFont.addEventListener('click', (e)=> {
    switchPolice();
})


function switchMode(mode){
    const colors = {
        light: './css/bootstrap.css',
        dark: './css/bootstrap-dark.css'
    }
    theme.setAttribute('href', colors[mode])
}

function switchPolice(){
    body.classList.toggle('dys');
}
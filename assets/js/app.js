(function () {
  const element = document.querySelector('.page');

  if(!element) {
    return;
  }

  const toggle = document.querySelector('.js-colour-switch');
  const checkbox = document.querySelector('.js-colour-switch input');

  const current = localStorage.getItem('page');

  if(current === 'light'){
    element.classList.add('page--light');
    checkbox.checked = true;
  }

  toggle.addEventListener('click', function(e) {
    
    if (checkbox.checked === false) {
      element.classList.remove('page--light');
      localStorage.setItem('page', 'dark');
    }
    
    if (checkbox.checked === true) {    
      element.classList.add('page--light');
      localStorage.setItem('page', 'light');
    }  
    
  });
})();
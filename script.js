const backToTopButton = document.getElementById("btt");
// let lastScrollPosition = window.scrollY;
const navbar = document.getElementById('navbar');
const revealElements = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  for (const element of revealElements) {
    if (element.getBoundingClientRect().top < window.innerHeight - 300) {
      element.classList.add("active");
    }
  }
  // when they scroll down 20px from the top
  if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
      backToTopButton.style.display = "block";
  } else {
      backToTopButton.style.display = "none";
  }
  // scrolling down
  if (window.scrollY > 50) {
      navbar.classList.add('fixed');
      // if (middleLogo) middleLogo.style.visibility = "visible";
      return;
  }
  // scrolling up
  navbar.classList.remove('fixed');
  // if (middleLogo) middleLogo.style.visibility = "hidden";
});

function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// ---------------------------------------------------------------

const dropcheck = document.getElementById('dropcheck');
const dropdownContent = document.querySelector('.dropdown-content');
const fries = document.querySelector('.fries');


dropcheck.addEventListener('change', function() {
    if (this.checked) {
        dropdownContent.classList.add('slide-down');
        dropdownContent.classList.remove('slide-up');
        fries.classList.add('open');
    } else {
        dropdownContent.classList.add('slide-up');
        dropdownContent.classList.remove('slide-down');
        fries.classList.remove('open');
    }
});  

// ---------------------------------------------------------------

const modeToggleBtn = document.querySelectorAll('[id^="l-d"]');
const root = document.documentElement;
const isLightMode = localStorage.getItem('isLightMode');

function setMode(mode) {
  if (mode === 'light') {
    root.classList.add('light-mode');
    localStorage.setItem('isLightMode', 'true');
  } else {
    root.classList.remove('light-mode');
    localStorage.removeItem('isLightMode');
  }
}

if (isLightMode) {
  setMode('light');
} else { 
  setMode('dark')
}

setInterval(function() {
  const lightMode = localStorage.getItem('isLightMode');
  if (lightMode) {
    setMode('light');
  } else { 
    setMode('dark')
  }
}, 1000);

modeToggleBtn.forEach(button => {
  button.addEventListener('click', function() {
    const currentMode = root.classList.contains('light-mode') ? 'dark' : 'light';
    setMode(currentMode);
  })
});

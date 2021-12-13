let input = document.querySelector('.categories');
let count = document.querySelector('.count');
let apiList = document.querySelector('.apis');
let loaderHTML = document.querySelector('.loader');
let scrollToTopBtn = document.querySelector('#top');
document.querySelector('.show-btn').addEventListener('click', getApis);

// DOM Elements

const lightButton = document.getElementById('light');
const darkButton = document.getElementById('dark');
const body = document.body;

// Apply the cached theme on reload

const theme = localStorage.getItem('theme');

if (theme) {
  body.classList.add('theme');
}



// Button Event 

darkButton.onclick = () => {
  body.classList.remove('light');
  body.classList.add('dark');
  localStorage.setItem('theme', 'dark');
}

lightButton.onclick = () => { 
  body.classList.replace('dark', 'light')
  localStorage.setItem('theme', 'light');
}

// mainThemeButton.onclick = () => {

//   if (body.classList.contains('mainTheme')) {

//     body.classList.remove('mainTheme');
//     mainThemeButton.style.cssText = `
//     var(--first);
//     `

//     mainTheme.innerText = 'mainTheme';

//   }

// else {
//   mainThemeButton.style.cssText = `
//     var(--first);
//     `
// }

// }





const renderLoader = () => {
  let loader = `
      <div class="spinner-border spinner" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      `;
  loaderHTML.insertAdjacentHTML('beforeend', loader);
}

const clearLoader = () => {
  let spinner = document.querySelector('.spinner');
  if (spinner) {
    spinner.parentElement.removeChild(spinner);
  }

}
async function getApis() {
  apiList.innerHTML = "";
  count.textContent = "";
  let category = input.value;

  renderLoader();
  fetch(`https://api.publicapis.org/entries?category=${category}&https=true`)

    .then(apis => {
      data = apis.json();
      return data;
    }
    )
    .then(data => {
      count.textContent = `${data.count} Apis found`;

      let entries = data.entries;
      clearLoader();
      entries.forEach(api => {
        if (api.Auth == "")
          api.Auth = 'No Auth';

        displayApi(api);
      });

    })

    .catch(error => {
      if (error) {
        alert("Sorry, Something went wrong !");
      }
    })
}


const displayApi = (api) => {

  let apisBox = ` 
        <div class="apibox card " data-aos="zoom-in-down">
            <h4 class="mt-4 fnt">${api.API}</h4>
            <p class="bg">${api.Description}</p>
            <p class="float-left fnt">Auth Type : ${api.Auth}</p>
            <a href=${api.Link} class="btn link float-right" target="_blank" >View</a>
        </div>  
        `;

  apiList.insertAdjacentHTML('beforeend', apisBox)
}


//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 40px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 50 ||
    document.documentElement.scrollTop > 50
  ) {
    mybutton.style.display = "block";
    mybutton.style.behavior = "smooth";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.behavior = "smooth";
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


const arrowPageDown = document.getElementById("arrow-page-down");
const arrowPageUp = Array.from(document.getElementsByClassName("arrow-page-up"));
const arrowPageRight = document.getElementById("arrow-page-right");
const arrowPageLeft = document.getElementById("arrow-page-left");
const pageContainer = document.getElementById("all-content-container");

arrowPageDown.addEventListener("click", () => {
    window.scrollTo(0, window.innerHeight)
})

arrowPageUp.forEach(arrow => {
    arrow.addEventListener("click", () => {
        window.scrollTo(0, 0)
    })
})


arrowPageRight.addEventListener("click", () => {
    window.scrollTo(window.innerWidth, window.innerHeight)
})

arrowPageLeft.addEventListener("click", () => {
    window.scrollTo(0, window.innerHeight)
})


const portfolioSingleContainer = document.getElementById("portfolio-single-item-container")
const portfolioItems = Array.from(document.getElementsByClassName("portfolio__item-container"))
const portfolioContainer = document.getElementById("portfolio-container");
const portfolioImages = Array.from(document.getElementsByClassName("portfolio-img"))
const portfolioTitles = Array.from(document.getElementsByClassName("portfolio__item__heading"))
const portfolioElements = []

class PortfolioElement {
    constructor(title, img, desc) {
        this.title = title,
        this.img = img,
        this.desc = desc
    }
}

portfolioImages.forEach(item => {
    const index = portfolioImages.indexOf(item)
    portfolioElements.push ( new PortfolioElement(portfolioTitles[index].textContent, item.src, "") )
})

function addToPortfolio(item) {
    portfolioElements.push(item)
}

// call addToPortfolio for each project that needs adding to the page rather than hard coding anything
// portfolioElements will then need to be looped through in order to render each item to the page

// portfolioSingleContainer and portfolioItems can probably be deleted

// move the portfolio items to be added into their own file which can act as a basic database
// use fetch to get the data from this file and then create a function to loop thorough the
// resulting array and create a new PortfolioElement for each one


portfolioElements.find(item => item.title === "Movie Watchlist App").desc = 
    `This is a project I built for a Scrimba challenge. It involved fetching data from an API in order to populate the results when the user searches for a film.`


// deleting portfolioItems will break this code but this can be replaced by looping through
// portfolioElements instead
portfolioItems.forEach(item => {
    item.addEventListener("click", () => {
        renderPortfolioItem(portfolioItems.indexOf(item))  
    } )
})

function renderPortfolioItem(index) {
    const {title, img, desc} = portfolioElements[index]
    portfolioContainer.style.display = "none"
    portfolioSingleContainer.innerHTML = 
    `
    <div class="portfolio-single-container">
        <i class="fas fa-times-circle portfolio-close-btn" id="close-btn"></i>
        <h2 class="heading portfolio-single__title">${title}</h2>
        <img src="${img}" class="portfolio-single__img"/>
        <p class="portfolio-desc">${desc}</p>
    `
    const closeBtn = document.getElementById("close-btn")
    closeBtn.addEventListener("click", () => {
        portfolioSingleContainer.innerHTML = ""
        portfolioContainer.style.display = "block"
    })
}

// refactor portfolio so that each item can be added or removed dynamically in the
// js rather than having 4 items hardcoded in the html

// add a contact form at the end of the page that can directly send emails to my inbox

// move the photo down on the homescreen so it is right on top of the text, then add a
// burger menu that can jump to different points on the page
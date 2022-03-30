const homePageDown = document.getElementById("home-page-down");
const aboutPageDown = document.getElementById("about-page-down");
const aboutPageUp = document.getElementById("about-page-up");
const portfolioPageUp = document.getElementById("portfolio-page-up");
const portfolioPageDown = document.getElementById("portfolio-page-down");
const contactPageUp = document.getElementById("contact-page-up");

function setScrollTo(fromHeight, toHeight) {
    fromHeight.addEventListener("click", () => {
        window.scrollTo(0, toHeight)
    })
}

setScrollTo(homePageDown, window.innerHeight)
setScrollTo(aboutPageDown, window.innerHeight * 2)
setScrollTo(portfolioPageDown, window.innerHeight * 4)
setScrollTo(aboutPageUp, 0)
setScrollTo(portfolioPageUp, window.innerHeight)
setScrollTo(contactPageUp, window.innerHeight * 2)


const pageContainer = document.getElementById("all-content-container");
const portfolioSingleContainer = document.getElementById("portfolio-single-item-container")
const portfolioContainer = document.getElementById("portfolio-container");


let portfolioElements = []

fetch("./portfolioItems.md")
    .then(res => res.json())
    .then(data => {
        portfolioElements = data
        let allItemsMarkup = ""
        data.forEach(item => {
            allItemsMarkup +=
            `<div class="portfolio__item-container">
                <h3 class="portfolio__item__heading">${item.title}</h3>
                <a href="#portfolio">
                    <div class="portfolio__item">
                        <img src="${item.image}" 
                        alt="${item.altText}"
                        class="portfolio-img" />
                    </div>
                </a>
            </div>` 

        })
        portfolioContainer.innerHTML = allItemsMarkup
    
        const portfolioImages = Array.from(document.getElementsByClassName("portfolio-img"))

        portfolioImages.forEach(image => {
            image.addEventListener("click", () => {
                renderPortfolioItem(portfolioImages.indexOf(image))  
            } )
        })

        return portfolioElements
    })


function renderPortfolioItem(index) {
    const {
        title, 
        image, 
        description, 
        link, 
        toolsUsed, 
        github } = portfolioElements[index]
    let toolsList = ""
    toolsUsed.forEach(tool => {
        toolsList += tool

        if (toolsUsed.indexOf(tool) !== toolsUsed.length - 1) {
            toolsList += ` • `
        }
    })
    portfolioContainer.style.display = "none"
    portfolioSingleContainer.innerHTML = 
    `
    <div class="portfolio-single-container">
        <div class="portfolio-single-top">
            <i class="fas fa-times-circle portfolio-close-btn" id="close-btn"></i>
            <h2 class="heading portfolio-single__title">${title}</h2>
        </div>
        <p class="portfolio-tools">${toolsList}</p>
        <p class="portfolio-desc">${description}</p>
        <h3 class="heading heading--links">Project Links <span>(Opens in new tab)</span></h3>
        <p class="github-link">
            <a href="${github}" target="_blank">Click here to view the Github Repo!</a>
        </p> 
        <p class="portfolio-link">
            <a href="${link}" target="_blank">Click here to view the live site!</a>
        </p>
        <div class="portfolio-images">
            <img src="${image}" class="portfolio-images__small"/>
            <img src="${image}" class="portfolio-images__small"/>
            <img src="${image}" class="portfolio-images__wide"/> 
        </div>
    </div>
    `
    const closeBtn = document.getElementById("close-btn")
    closeBtn.addEventListener("click", () => {
        portfolioSingleContainer.innerHTML = ""
        portfolioContainer.style.display = "flex"
    })
}

// change images so that 3 different ones are used rather than the same one being repeated

const menuIcon = document.getElementById("menu-icon--container")
const menu = document.getElementById("open-menu")

menuIcon.addEventListener("click", () => {
   
    menu.classList.add("animate-menu")
    menu.classList.remove("remove-menu")

    document.getElementById("menu-close-btn").addEventListener("click", () => {
        menu.classList.add("remove-menu")
        menu.classList.remove("animate-menu")
    })
})

const menuItems = Array.from(document.getElementsByClassName("menu-item"))

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menu.classList.add("remove-menu")
    })
})
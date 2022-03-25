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
                <div class="portfolio__item">
                    <img src="${item.image}" 
                    alt="${item.altText}"
                    class="portfolio-img" />
                </div>
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
    const {title, image, description, link} = portfolioElements[index]
    portfolioContainer.style.display = "none"
    portfolioSingleContainer.innerHTML = 
    `
    <div class="portfolio-single-container">
        <i class="fas fa-times-circle portfolio-close-btn" id="close-btn"></i>
        <h2 class="heading portfolio-single__title">${title}</h2>
        <img src="${image}" class="portfolio-single__img"/>
        <p class="portfolio-desc">${description}</p>
        <p class="portfolio-link">
            <a href="${link}" target="_blank">Click here to view the live site! <span>(Opens in new tab)</span></a>
        </p>
    `
    const closeBtn = document.getElementById("close-btn")
    closeBtn.addEventListener("click", () => {
        portfolioSingleContainer.innerHTML = ""
        portfolioContainer.style.display = "flex"
    })
}

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
// FOOTER DESCRIPTION CONTENT HEIGHT
const unvisibleP = document.querySelector(".footer-description p:nth-child(2)")
const changeVisibility = document.querySelector(".footer-description button")

changeVisibility.addEventListener("click", () => {
    if (unvisibleP.style.display === 'none' || unvisibleP.style.display === '') {
        changeVisibility.textContent = "Gizle"
        unvisibleP.style.display = 'block';
    } else {
        changeVisibility.textContent = "Tümünü Göster"
        unvisibleP.style.display = 'none';
    }
})

// LANG SELECT FOR MOBILE
const langContent = document.querySelector(".lang-content")
const langSelect = document.querySelector(".lang-select")
langContent.addEventListener("click", () => {
    langSelect.classList.toggle("display")
})

// MOBILE NAV ITEMS OPEN

const navItems = document.querySelectorAll(".nav-titles li")
const navSubItems = document.querySelectorAll(".nav-sub-container")

navItems.forEach(navItem => navItem.addEventListener("click", () => {
    navSubItems.forEach(navSubItem => {
        if (document.documentElement.clientWidth < 800) {
            if (navItem.id === navSubItem.id) {
                if (navSubItem.classList.contains("nav-sub-item-mobile")) {
                    navSubItem.classList.remove("nav-sub-item-mobile")
                    navSubItem.parentElement.children[0].children[1].style.transform = "rotate(0deg)"
                } else {
                    navSubItem.classList.add("nav-sub-item-mobile");
                    navSubItem.parentElement.children[0].children[1].style.transform = "rotate(180deg)"
                }
            } else {
                navSubItem.classList.remove("nav-sub-item-mobile")
                navSubItem.parentElement.children[0].children[1].style.transform = "rotate(0deg)"
            }
        }
    })
}))

// MOBILE NAVOPEN & CLOSE
const nav = document.querySelector(".nav")
const overlay = document.querySelector(".overlay")
const close = document.querySelector(".lnr-cross")
const open = document.querySelector(".lnr-menu")

open.addEventListener("click", () => {
    nav.style.left = "0"
    overlay.style.display = "block"
    document.body.style.overflow = "hidden"
})

close.addEventListener("click", closeNavbar)
overlay.addEventListener("click", closeNavbar)

function closeNavbar() {
    nav.style.left = "-100%"
    overlay.style.display = "none"
    document.body.style.overflow = "auto"
}


// FIXED NAV/HEADER & BACK TO TOP BUTTON WHEN SCROLL
const header = document.querySelector(".header-container")
const backToTop = document.querySelector(".back-to-top")
backToTop.addEventListener("click", () => window.scrollTo({ top: 0 }))

window.addEventListener('scroll', () =>
    window.scrollY > 200 ?
        backToTop.classList.add("top-button-active") :
        backToTop.classList.remove("top-button-active"))

window.addEventListener('scroll', () => {
    if (document.documentElement.clientWidth > 800) {
        window.scrollY > nav.offsetTop ? nav.classList.add("fixed") : nav.classList.remove("fixed")
    } else if (document.documentElement.clientWidth < 800)
        window.scrollY > header.clientHeight ? header.classList.add("fixed") : header.classList.remove("fixed")
})

// WINDOW FOCUS/BLUR SLIDE STOP/CONTINUE
window.onblur = () => {
    headerAutoSlide = false
    productAutoSlide = false
}

window.onfocus = () => {
    headerAutoSlide = true
    productAutoSlide = true
}

// HEADER SLIDER
const headerSlide = document.querySelector('.slide'),
    headerRightButton = document.querySelector('.slider-btn-right'),
    headerLeftButton = document.querySelector('.slider-btn-left')
let headerSliderIsMoving = false,
    headerSlideIndex = 0,
    headerAutoSlide = true

function processHeaderImages(item) {
    return `<img src='${item.url}' alt='${item.alt}'>`
}

function moveHeaderSlides() {
    if (headerSlideIndex == headerSlide.children.length) {
        headerSlide.style.transform = `translateX(0%)`
        headerSlideIndex = 0
        return
    }
    if (headerSlideIndex == -1) {
        headerSlide.style.transform = `translateX(-${(headerSlide.children.length - 1) * 100}%)`
        headerSlideIndex = headerSlide.children.length - 1
        return
    }

    headerSlide.style.transform = `translateX(-${headerSlideIndex * 100}%)`
}

function moveHeaderHandler(direction) {
    headerSliderIsMoving = true
    direction !== 'right' ? (headerSlideIndex -= 1) : (headerSlideIndex += 1)
    moveHeaderSlides()
}

async function fetchHeaderImages() {
    await fetch(document.documentElement.clientWidth < 600 ? './images/header-images-phone.json' : './images/header-images.json').then(res => {
        if (!res.ok) throw new Error('Fetch error')
        return res.json()
    }).then(data => {
        headerSlide.innerHTML = data.map(processHeaderImages).join('')
        moveHeaderSlides()
    }).catch(error => console.log(error))
}

fetchHeaderImages()

window.addEventListener('resize', () => document.documentElement.clientWidth < 800 && fetchHeaderImages())
window.addEventListener('resize', () => document.documentElement.clientWidth > 800 && fetchHeaderImages())

setInterval(() => {
    if (headerAutoSlide) moveHeaderHandler('right')
}, 3000)

// Button Clicks
headerRightButton.addEventListener('click', () => {
    headerAutoSlide = false
    if (headerSliderIsMoving) return
    moveHeaderHandler('right')
    setTimeout(() => headerAutoSlide = true, 10000)
})

headerLeftButton.addEventListener('click', () => {
    headerAutoSlide = false
    if (headerSliderIsMoving) return
    moveHeaderHandler('left')
    setTimeout(() => headerAutoSlide = true, 10000)
})

headerSlide.addEventListener('transitionend', () => headerSliderIsMoving = false)


// PRODUCT SLIDER

const productSlide = document.querySelector('.products-slide'),
    productRightButton = document.querySelector('.products-btn-right'),
    productLeftButton = document.querySelector('.products-btn-left')
let productSliderIsMoving = false,
    productSlideIndex = 0,
    productAutoSlide = true

function moveProductSlides() {
    productSlide.style.transform = `translateX(-${productSlideIndex * (document.documentElement.clientWidth < 800 ? 50 : 20)}%)`
}

function moveProductHandler(direction) {
    productSliderIsMoving = true
    direction !== 'right' ? (productSlideIndex -= 1) : (productSlideIndex += 1)
    moveProductSlides()
}

function processProducItems(item) {
    return (
        `<div class="product">
            <a class="item-category">İpek Eşarp</a>
            <div class="product-img-container">
            <span class="sale">%8</span>
            <span class="new">Yeni</span>
                <a href="#" class="img-link">
                    <img class="product-image" src=${item.url} alt=${item.src}>
                </a>
                <div class="fav-icon" title="Favorilere Ekle"></div>
                <div class="shopping-card">
                    <a href="#" title="Sepete Ekle">Sepete Ekle</a>
                </div>
            </div>
            <div class="product-details">
                <span class="product-name">
                    <a href="#">${item.name}</a>
                </span>
            </div>
            <div class="product-price">
                <sub>${item.sub}</sub>
                <sup>${item.sup}</sup>
            </div>
        </div>`
    )
}

async function fetchProductImages() {
    await fetch('./images/product-images.json').then(res => {
        if (!res.ok) throw new Error('Fetch error')
        return res.json()
    }).then(data => {
        productSlide.innerHTML = data.map(processProducItems).join('')
        moveProductSlides()
    }).catch(error => console.log(error))
}

fetchProductImages()

setInterval(() => {
    if (productAutoSlide && productSlideIndex !== productSlide.children.length - (document.documentElement.clientWidth < 800 ? 2 : 5))
        moveProductHandler('right')
}, 5000)

// Button Clicks
productRightButton.addEventListener('click', () => {
    if (productSlideIndex !== productSlide.children.length - (document.documentElement.clientWidth < 800 ? 2 : 5)) {
        productAutoSlide = false
        if (productSliderIsMoving) return
        moveProductHandler('right')
        setTimeout(() => productAutoSlide = true, 10000)
    }
})

productLeftButton.addEventListener('click', () => {
    if (productSlideIndex !== 0) {
        productAutoSlide = false
        if (productSliderIsMoving) return
        moveProductHandler('left')
        setTimeout(() => productAutoSlide = true, 10000)
    }
})

productSlide.addEventListener('transitionend', () => productSliderIsMoving = false)

// MAIN BOTTOM PRODUCTS

const bottomProductSlide = document.querySelector(".bottom-products-slide"),
    bottomRightButton = document.querySelector(".bottom-products-btn-right"),
    bottomLeftButton = document.querySelector(".bottom-products-btn-left")
let bottomProductSliderIsMoving = false,
    bottomProductSlideIndex = 0,
    bottomProductAutoSlide = true

function moveBottomProductSlides() {
    bottomProductSlide.style.transform = `translateX(-${bottomProductSlideIndex * (document.documentElement.clientWidth < 800 ? 50 : 20)}%)`
}

function moveBottomProductHandler(direction) {
    bottomProductSliderIsMoving = true
    direction !== 'right' ? (bottomProductSlideIndex -= 1) : (bottomProductSlideIndex += 1)
    moveBottomProductSlides()
}

function bottomProcessProducItems(item) {
    return (
        `<div class="product">
            <a class="item-category">Aksesuar</a>
            <div class="product-img-container">
            <span class="sale">%25</span>
                <a href="#" class="img-link">
                    <img class="product-image" src=${item.url} alt=${item.src}>
                </a>
                <div class="fav-icon" title="Favorilere Ekle"></div>
                <div class="shopping-card">
                    <a href="#" title="Sepete Ekle">Sepete Ekle</a>
                </div>
            </div>
            <div class="product-details">
                <span class="product-name">
                    <a href="#">${item.name}</a>
                </span>
            </div>
            <div class="product-price">
                <sub>${item.sub}</sub>
                <sup>${item.sup}</sup>
            </div>
        </div>`
    )
}

async function fetchBottomProductImages() {
    await fetch('./images/bottom-product-images.json').then(res => {
        if (!res.ok) throw new Error('Fetch error')
        return res.json()
    }).then(data => {
        bottomProductSlide.innerHTML = data.map(bottomProcessProducItems).join('')
        moveBottomProductSlides()
    }).catch(error => console.log(error))
}

fetchBottomProductImages()

setInterval(() => {
    if (bottomProductAutoSlide && bottomProductSlideIndex !== bottomProductSlide.children.length - (document.documentElement.clientWidth < 800 ? 2 : 5))
        moveBottomProductHandler('right')
}, 5000)

// Button Clicks
bottomRightButton.addEventListener('click', () => {
    if (bottomProductSlideIndex !== bottomProductSlide.children.length - (document.documentElement.clientWidth < 800 ? 2 : 5)) {
        bottomProductAutoSlide = false
        if (productSliderIsMoving) return
        moveBottomProductHandler('right')
        setTimeout(() => bottomProductAutoSlide = true, 10000)
    }
})

bottomLeftButton.addEventListener('click', () => {
    if (productSlideIndex !== 0) {
        productAutoSlide = false
        if (productSliderIsMoving) return
        moveBottomProductHandler('left')
        setTimeout(() => productAutoSlide = true, 10000)
    }
})

bottomProductSlide.addEventListener('transitionend', () => bottomProductSliderIsMoving = false)
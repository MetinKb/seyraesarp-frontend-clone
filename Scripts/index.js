// FIXED NAV WHEN SCROLL

const nav = document.querySelector(".nav")

window.addEventListener('scroll', () => {
    window.scrollY > nav.offsetTop ? nav.classList.add("fixed") : nav.classList.remove("fixed")
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
let isPhone = screen.width < 600
const images = isPhone ? './images/header-images-phone.json' : './images/header-images.json'
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
    await fetch(images).then(res => {
        if (!res.ok) throw new Error('Fetch error')
        return res.json()
    }).then(data => {
        console.log(data)
        headerSlide.innerHTML = data.map(processHeaderImages).join('')
        moveHeaderSlides()
    }).catch(error => console.log(error))
}

fetchHeaderImages()

setInterval(() => {
    if (headerAutoSlide) {
        moveHeaderHandler('right')
    }
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
    productSlide.style.transform = `translateX(-${productSlideIndex * 20}%)`
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
    if (productAutoSlide && productSlideIndex !== productSlide.children.length - 5) {
        moveProductHandler('right')
    }
}, 5000)

// Button Clicks
productRightButton.addEventListener('click', () => {
    if (productSlideIndex !== productSlide.children.length - 5) {
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
const slide = document.querySelector('.slide')
const rightButton = document.querySelector('.slider-btn-right')
const leftButton = document.querySelector('.slider-btn-left')
let isMoving = false
let slideIndex = 1
let autoSlide = true

function processImages(item) {
    return `<img src='${item.url}' alt='${item.alt}'>`
}

function moveSlides() {
    if (slideIndex == 6) {
        slide.style.transform = `translateX(-100%)`
        return
    }
    slide.style.transform = `translateX(-${slideIndex * 100}%)`
}

function moveHandler(direction) {
    isMoving = true
    slide.style.transition = `transform 450ms ease-in-out`
    direction !== 'right' ? (slideIndex -= 1) : (slideIndex += 1)
    moveSlides()
}

async function fetchImages() {
    await fetch('./images/images.json').then(res => {
        if (!res.ok) throw new Error('Fetch error')

        return res.json()
    }).then(data => {
        data.push(data[0])
        data.unshift(data[data.length - 2])

        slide.innerHTML = data.map(processImages).join('')
        moveSlides()
    }).catch(error => console.log(error))
}

fetchImages()

setInterval(() => {
    if (autoSlide) {
        moveHandler('right')
    }
}, 3000)

window.onblur = () => autoSlide = false
window.onfocus = () => autoSlide = true

// Button Clicks
rightButton.addEventListener('click', () => {
    autoSlide = false
    if (isMoving) return
    moveHandler('right')
    setTimeout(() => autoSlide = true, 10000)
})

leftButton.addEventListener('click', () => {
    autoSlide = false
    if (isMoving) return
    moveHandler('left')
    setTimeout(() => autoSlide = true, 10000)
})

slide.addEventListener('transitionend', () => {
    isMoving = false
    const slidesArray = [...slide.querySelectorAll('img')]
    if (slideIndex === 0) {
        slide.style.transition = 'none'
        slideIndex = slidesArray.length - 2
        moveSlides()
    }
    if (slideIndex === slidesArray.length - 1) {
        slide.style.transition = 'none'
        slideIndex = 1
        moveSlides()
    }
})
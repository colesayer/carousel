window.onload = function(){

  const carousel = function(){
    const carousel = document.getElementById('carousel')
    const carouselImageContainer = document.getElementById('carousel-image-container')
    const carouselImageDivs = carousel.getElementsByClassName('image-div')
    const carouselNav = document.getElementById('carousel-nav')
    const carouselBack = document.getElementById('previous')
    const carouselNext = document.getElementById('next')
    let timing = 3000
    let active

    function setActiveNav(el){

      if (active) {
        active.id = ""
        active.style.color = "#A9A9A9"
      }
      el.id = "active"
      el.style.color = "black"
      active = el
      console.log("ACTIVE", active)
    }

    function setNextIndex(){
      let currentIndex = active.getAttribute("data-index")
      currentIndex++
      if(currentIndex === carouselImageDivs.length){
        currentIndex = 0
      }
      return currentIndex
    }

    function setPreviousIndex(){
      let currentIndex = active.getAttribute("data-index")
      currentIndex--
      if(currentIndex < 0){
        currentIndex = carouselImageDivs.length - 1
      }
      return currentIndex
    }

    function setActiveIndex(link){
      let nextIndex = link.getAttribute("data-index")
      return nextIndex
    }

    function setActiveImage(index){
      carouselImageContainer.style.marginLeft = "-" + index + "00%"
    }

    function displaySlide(index){
      setActiveNav(carouselNav.children[index])
      setActiveImage(index)
    }

    function makeCarousel(){
      if(carousel){
        let imageDivsLength = carouselImageDivs.length
        if(imageDivsLength === 0) return
        carouselImageContainer.style.width = 100 * imageDivsLength + "%"
        for(let i = 0; i < imageDivsLength; i++){
          carouselImageDivs[i].style.width = 100/imageDivsLength + "%"
          let link = document.createElement("a")
          link.setAttribute('data-index', i)

          if(i === 0){
            setActiveNav(link)
          }

          link.onclick = function(){
            clearInterval(animation)
            let nextIndex = setActiveIndex(link)
            displaySlide(nextIndex)
          }
          carouselNav.append(link)
        }
        carouselNext.onclick = function(){
          clearInterval(animation)
          let currentIndex = setNextIndex()
          displaySlide(currentIndex)
        }
        carouselBack.onclick = function(){
          clearInterval(animation)
          let currentIndex = setPreviousIndex()
          displaySlide(currentIndex)
        }
      }

      const animation = setInterval(function(){
        let currentIndex = setNextIndex()
        displaySlide(currentIndex)
      }, timing)
    }

    return {
      makeCarousel: makeCarousel
    }
  }()

  carousel.makeCarousel()
}

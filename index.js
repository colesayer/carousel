window.onload = function(){

  var carousel = function(){
    const carousel = document.getElementById('carousel')
    const carouselImageContainer = document.getElementById('carousel-image-container')
    const carouselImages = carousel.getElementsByTagName('img')
    const carouselNav = document.getElementById('carousel-nav')
    const carouselBack = document.getElementById('previous')
    const carouselNext = document.getElementById('next')
    let timing = 3000
    let active

    function setActiveNav(el){
      if (active) active.id = ""
      el.id = "active"
      active = el
    }

    //USE FOR FORWARD BUTTON NOT FOR BOTTOM NAVIGATION
    function setNextIndex(){
      let currentIndex = active.getAttribute("data-index")
      currentIndex++
      if(currentIndex === carouselImages.length){
        currentIndex = 0
      }
      return currentIndex
    }

    function setPreviousIndex(){
      let currentIndex = active.getAttribute("data-index")
      currentIndex--
      if(currentIndex < 0){
        currentIndex = carouselImages.length - 1
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
        let imagesLength = carouselImages.length
        if(imagesLength === 0) return
        carouselImageContainer.style.width = 100 * imagesLength + "%"
        for(let i = 0; i < imagesLength; i++){
          carouselImages[i].style.width = 100/imagesLength + "%"
          let link = document.createElement("a")
          link.setAttribute('data-index', i)

          if(i === 0){
            setActiveNav(link)
          }

          link.onclick = function(){
            // let currentIndex = setNextIndex()
            // console.log("clicked Link", link)
            // console.log(currentIndex)
            // displaySlide(currentIndex)
            clearInterval(animation)
            let nextIndex = setActiveIndex(link)
            console.log(nextIndex)
            displaySlide(nextIndex)
          }
          carouselNav.append(link)
        }
        // carousel.onclick = function(){
        //   clearInterval(animation)
        //   let currentIndex = setNextIndex()
        //   displaySlide(currentIndex)
        // }
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

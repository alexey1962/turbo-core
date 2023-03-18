export function isWebp() {
    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {

        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });
}

export function initPopups() {
    const popupLinks = document.querySelectorAll('.popup-link')
    const body = document.querySelector('body')
    const lockPadding = document.querySelectorAll('.lock-padding')

    let unlock = true

    const timeout = 800

    if (popupLinks.length > 0) {
        for (let i = 0; i < popupLinks.length; i++) {
            const popupLink = popupLinks[i]
            popupLink.addEventListener('click', function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '')
                const curentPopup = document.getElementById(popupName)
                popupOpen(curentPopup)
                e.preventDefault()
            })
        }
    }

    const popupCloseIcon = document.querySelectorAll('.close-popup')
    if (popupCloseIcon.length > 0) {
        for (let i = 0; i < popupCloseIcon.length; i++) {
            const el = popupCloseIcon[i]
            el.addEventListener('click', function (e) {
                popupClose(el.closest('.popup'))
                e.preventDefault()
            })
        }
    }

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open')
            if (popupActive) {
                popupClose(popupActive, false)
            } else {
                bodyLock()
            }
            curentPopup.classList.add('open')
            curentPopup.addEventListener('click', function (e) {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'))
                }
            })
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open')
            if (doUnlock) {
                bodyUnlock()
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i]
                el.style.paddingRight = lockPaddingValue
            }
        }

        body.style.paddingRight = lockPaddingValue
        body.classList.add('lock')

        unlock = false
        setTimeout(function () {
            unlock = true
        }, timeout)
    }

    function bodyUnlock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let i = 0; i < lockPadding.length; i++) {
                    const el = lockPadding[i]
                    el.style.paddingRight = '0px'
                }
            }

            body.style.paddingRight = '0px'
            body.classList.remove('lock')
        }, timeout)

        unlock = false
        setTimeout(function () {
            unlock = true
        }, timeout)
    }

    document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup.open')
            popupClose(popupActive)
        }
    })

    // (function () {
    //     if(!Element.prototype.closest) {
    //         Element.prototype.closest = function(css) {
    //             var node = this
    //             while(node) {
    //                 if(node.matches(css)) return node
    //                 else node = node.parentElement
    //             }
    //             return null
    //         }
    //     }
    // })()

    // (function () {
    //     if(!Element.prototype.matches) {
    //         Element.prototype.matches = Element.prototype.matchesSelector ||
    //             Element.prototype.webkitMatchesSelector ||
    //             Element.prototype.mozMatchesSelector ||
    //             Element.prototype.msMatchesSelector
    //     }
    // })()
}

export function initForm() {
  let checkbox = document.querySelector('.form-register__check')
  let checkboxText = document.querySelector('.other-form__check')
  checkboxText.addEventListener('click', () => {
    !checkbox.checked ? checkbox.checked = true : checkbox.checked = false 
  })
  checkbox.addEventListener('click', () => {
    !checkbox.checked ? checkbox.checked = true : checkbox.checked = false
  })
}

export function video() {
const videoWrappers = document.querySelectorAll('.player-video')


videoWrappers.forEach((videoWrapper) => {
  const videoBtn = videoWrapper.querySelector('.player-video__btn')
  const videoOverlay = videoWrapper.querySelector('.player-video__overlay')
  const videoFile = videoWrapper.querySelector('.player-video__object')
  videoBtn.addEventListener('click', function () {
    videoOverlay.classList.toggle('hidden')
    function toggleOverlay(event) {
      if (event.type === 'mouseleave') {
        videoBtn.classList.add('hidden')
      } else {
        videoBtn.classList.remove('hidden')
      }
    }
    
    if (videoFile.paused) {
      videoFile.play()
      videoBtn.onmouseleave = toggleOverlay
      videoFile.onmouseenter = toggleOverlay
    } else {
      videoFile.pause()
      videoBtn.onmouseleave = null
    }
  })
})
}
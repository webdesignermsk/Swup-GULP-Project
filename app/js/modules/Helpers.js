class NodeHelper {

    getNode = $node =>  document.querySelector($node)

    getNodes = $nodes =>  document.querySelectorAll($nodes)

    addClass = ($node, className = '') => {
        if (typeof $node === 'string') {
            const $element = this.getNode($node) 
            if ($element) {
                $element.classList.add(className)
            }
            return ''
        }
        $node.classList.add(className)
    }

    removeClass = ($node, className = '') => {
        if (typeof $node === 'string') {
            const $element = this.getNode($node) 
            if ($element) {
                $element.classList.remove(className)
            }
            return ''
        }
        $node.classList.remove(className)
    }

    nextNode = ($currentNode) => {
        if (typeof $currentNode === 'string') {
            const $element = this.getNode($currentNode) 
            if ($element) {
                return $element.nextElementSibling
            }
        }
        return $currentNode.nextElementSibling
    }

}

class FuncsHelper {

    imgLoadHelper = () => {
        const lazyImages = document.querySelectorAll('img[data-src],source[data-srcset]')
        const windowHeight = document.documentElement.clientHeight
    
        let lazyImagesPositions = [];
        if (lazyImages.length > 0) {
            lazyImages.forEach(img => {
                if (img.dataset.src || img.dataset.srcset) {
                    lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset)
                    lazyScrollCheck()
                }
            })
        }
    
        window.addEventListener('scroll', lazyScroll)
    
        function lazyScroll() {
            if (lazyImages.length > 0) {
                lazyScrollCheck()
            }
        }
    
        function lazyScrollCheck() {
            let imgIndex = lazyImagesPositions.findIndex(
                item => pageYOffset > item - windowHeight
            )
            if (imgIndex  >= 0) {
                if (lazyImages[imgIndex].dataset.src) {
                    lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src
                    lazyImages[imgIndex].removeAttribute('data-src')
                } else if (lazyImages[imgIndex].dataset.srcset) {
                    lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset
                    lazyImages[imgIndex].removeAttribute('data-srcset')
                }
                delete lazyImagesPositions[imgIndex]
            }
        }
    }

}

export {
    NodeHelper,
    FuncsHelper
}

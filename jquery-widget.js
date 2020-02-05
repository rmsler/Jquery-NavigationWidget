// import { NavigationWidget } from "./modules/NavigationWidget.js";
// $.getScript('./modules/NavigationWidget.js');

(function ( $ ) {
    let navElements = [];
    let elements = [];
    $.fn.addNavigation = function( options ) {

         // Default options
         var settings = $.extend({
            dataAttribute: 'data-attribute'
        }, options );
 
        // Apply options
        window.addEventListener("load", checkPosition.bind(this));
        $(window).scroll(checkPosition.bind(this));
        return render(this, settings.dataAttribute);
 
    };
    addActiveClass = function(element){
        element.classList.add("active");
    };
    render = function(wrapper , attribute) {
        // render elements
        elements = document.querySelectorAll('[' + attribute + ']');
        for(let i = 0; i<elements.length; i++){
            let currentElement = elements[i];
            let domElement = document.createElement("li");
            domElement.classList.add("parent");
            let name = document.createElement("a");
            let textchild = document.createTextNode(currentElement.innerText);
            name.appendChild(textchild);
            domElement.appendChild(name);
            $(wrapper).append(domElement);
            let crtElRect = currentElement.parentElement.getBoundingClientRect();
            let windowScrollTop = $(window).scrollTop();
            navElements.push({
                navReference: domElement,
                top: Number(crtElRect.top + windowScrollTop),
                bottom: Number(crtElRect.bottom + windowScrollTop)
            });
            domElement.addEventListener("click", () => moveWindowTo(navElements[i].top));
        }
    };
    moveWindowTo = function(top){
        window.scrollTo(0,top);
    };
    checkPosition = function(){ 
        window.setTimeout(function (){
            let crtScrollTop = Number($(window).scrollTop())
            for(let i = 0; i<navElements.length; i++) {
                if (navElements[i].top <= crtScrollTop && crtScrollTop <= navElements[i].bottom) {
                    navElements[i].navReference.classList.add("active");
                } else {
                    navElements[i].navReference.classList.remove("active");
                }
            }
        }.bind(this), 200)
    }
 
}( jQuery ));
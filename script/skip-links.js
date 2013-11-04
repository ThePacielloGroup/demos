document.addEventListener('DOMContentLoaded', function () {
    var skip3 = document.querySelector("a#skip3")
    skip3.onfocus = function() {
        skip3.classList.add('visible');
    }
    
    var skip4 = document.querySelector("a#skip4")
    var arrow = document.querySelector("#arrow")
    skip4.onfocus = function() {
        arrow.classList.add('visible');
    }
    skip4.onblur = function() {
        arrow.classList.remove('visible');
    }
});
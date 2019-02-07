//for download section
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                nav: true,
                loop: false
            }
        }
    })
});





//For map
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(23.792750, 90.407606),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("gMap"), mapProp);
}

//
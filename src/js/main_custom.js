


//FOr recent news
$(document).ready(function () {
    $('.custom-owl-carousel').owlCarousel({
        loop: true,
        stagePadding: 0,
        margin: 15,
        responsiveClass: true,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: true
            },
            1000: {
                items: 3,
                nav: true,
                loop: true
            }
        }
    })
});

//for download section
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        stagePadding: 6,
        margin: 14,
        responsiveClass: true,
        nav: true,
        dots: false,
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
                nav: true
            },
            1000: {
                items: 5,
                nav: true,
                loop: true
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

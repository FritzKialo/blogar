(function (window, document, $, undefined) {
    'use strict';
    var axilInit = {
        i: function (e) {
            axilInit.s();
            axilInit.methods();
        },

        s: function (e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html'),
                this._subscribePopUp = $('.subscribe-popup')
        },

        methods: function (e) {
            axilInit.w();
            axilInit.axilBackToTop();
            axilInit.mobileMenuShow();
            axilInit.mobileMenuHide();
            axilInit.mobileMenuNavShow();
            axilInit.cursorAnimate();
            axilInit.onhoverAnimated();
            axilInit.animatedOverlay();
            axilInit.wowActive();
            axilInit.bgMarque();
            axilInit.onePageClick();
            axilInit.axilSlickActivation();
            axilInit.staggerImages();
            axilInit._clickDoc();

        },

        w: function (e) {
            this._window.on('load', axilInit.l).on('scroll', axilInit.scrl).on('resize', axilInit.res)
        },

        onePageClick: function name(params) {
            $(".mainmenu-wrapper a, .slider-btn a").on('click', function(event) {
                if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 1000, function(){
                    window.location.hash = hash;
                });
                }
            });
        },

        bgMarque: function () {
            $('.background-marque').each(function () {
                var t = 0;
                var i = 1;
                var $this = $(this);
                setInterval(function () {
                    t += i;
                    $this.css('background-position-x', -t + "px");
                }, 10);
            });
        },

        axilSlickActivation: function () {
            $('.banner-image-activation').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                fade: true,
                adaptiveHeight: true,
                cssEase: 'linear',
                autoplay: true,
                autoplaySpeed: 3000,
            });
        },

        scrl: function () {

        },

        staggerImages: function () {

            var timelineOne = gsap.timeline();
            timelineOne
            .from('.axil-footer .title span', {
                scale: 0.8, 
                ease: 'back',
                duration: 1.2,
                opacity: 0,
                repeat: -1,
                yoyo: true,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: "auto",
                    delay: 0.5,
                    ease: "back",
                }
            })
            .from('.axil-slider-area .slider-btn', {
                y: 30,
                delay: 0.7,
                duration: 1.2,
                opacity: 0,
            });

            var timelineTwo = gsap.timeline();
            timelineTwo
            .from('.axil-slider-area .title span', {
                y: -50, opacity:0, scale:0.5,
                stagger: {
                    from: 'start',
                    amount: 1,
                    delay: 1,
                }, duration: 1, ease: 'back',
            })
            .from('.axil-slider-area .shape.shape-3 img,.axil-footer .shape-group .shape.shape-03 img', {
                rotation: 10,
                delay: 1,
                duration: 5,
                yoyo: true,
                scale: 0.9,
                repeat: -1,
            })
            
        },

        animatedOverlay: function () {
            $('.axil_overlay').imagesLoaded().always(function () {
                setTimeout(function () {
                    var smc = new ScrollMagic.Controller;
                    $('.axil_overlay').each(function () {
                        new ScrollMagic.Scene({
                            triggerElement: this,
                            triggerHook: "onCenter",
                            reverse: !1
                        }).setClassToggle(this, 'animated').addTo(smc)
                    })
                }, 1000)
            })
        },

        cursorAnimate: function () {
            var screenWidth = axilInit._window.width();
            if (screenWidth > 991) {
                var myCursor = jQuery('.mouse-cursor');
                if (myCursor.length) {
                    if ($("body")) {
                        const e = document.querySelector(".cursor-inner"),
                            t = document.querySelector(".cursor-outer");
                        let n, i = 0,
                            o = !1;
                        window.onmousemove = function (s) {
                            o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
                        }, $("body").on("mouseenter", "a, .cursor-pointer", function () {
                            e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
                        }), $("body").on("mouseleave", "a, .cursor-pointer", function () {
                            $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
                        }), e.style.visibility = "visible", t.style.visibility = "visible"
                    }
                }
            }
        },

        onhoverAnimated: function () {
            var cerchio = document.querySelectorAll('.cerchio');
            cerchio.forEach(function (elem) {
                $(document).on('mousemove touch', function (e) {
                    magnetize(elem, e);
                });
            })

            function magnetize(el, e) {
                var mX = e.pageX,
                    mY = e.pageY;
                const item = $(el);

                const customDist = item.data('dist') * 5 || 60;
                const centerX = item.offset().left + (item.width() / 2);
                const centerY = item.offset().top + (item.height() / 2);

                var deltaX = Math.floor((centerX - mX)) * -0.45;
                var deltaY = Math.floor((centerY - mY)) * -0.45;

                var distance = calculateDistance(item, mX, mY);

                if (distance < customDist) {
                    TweenMax.to(item, 0.5, {
                        y: deltaY,
                        x: deltaX,
                        scale: 1.05
                    });
                    item.addClass('magnet');
                } else {
                    TweenMax.to(item, 0.6, {
                        y: 0,
                        x: 0,
                        scale: 1
                    });
                    item.removeClass('magnet');
                }
            }

            function calculateDistance(elem, mouseX, mouseY) {
                return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
            }
            /*- MOUSE STICKY -*/
            function lerp(a, b, n) {
                return (1 - n) * a + n * b
            }
        },

        mobileMenuShow: function () {
            $('.hamburger-menu').on('click', function (e) {
                e.preventDefault();
                axilInit._body.addClass('popup-mobile-menu-show'),
                    axilInit._html.css({
                        overflow: "hidden"
                    });
            })
        },

        wowActive: function () {
            new WOW().init();
        },

        mobileMenuHide: function () {
            $('.mobile-close').on('click', function (e) {
                e.preventDefault();
                axilInit._body.removeClass('popup-mobile-menu-show'),
                    axilInit._html.css({
                        overflow: ""
                    });
            })
            $('.popup-mobilemenu-area').on('click', function (e) {
                e.target === this && axilInit._body.removeClass('popup-mobile-menu-show'),
                    axilInit._html.css({
                        overflow: ""
                    });;
            })
        },

        mobileMenuNavShow: function (e) {
            var screenWidth = axilInit._window.width();
            if (screenWidth < 1200) {
                $('.popup-mobilemenu-area .menu-item-has-children a').on('click', function (e) {
                    // e.preventDefault();
                    $(this).siblings('.axil-submenu').slideToggle('400');
                    $(this).toggleClass('open').siblings('.axil-submenu').toggleClass('active')
                })
            }
        },

        axilBackToTop: function () {
            var btn = $('#backto-top');
            $(window).scroll(function () {
                if ($(window).scrollTop() > 300) {
                    btn.addClass('show');
                } else {
                    btn.removeClass('show');
                }
            });
            btn.on('click', function (e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, '300');
            });
        },

        _clickDoc: function (e) {

        }

    }
    axilInit.i();

})(window, document, jQuery);
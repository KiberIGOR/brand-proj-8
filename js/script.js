$(function () {
    /* Inits */
    initLazy();
    initMenu();
    innitrightMarquee()
    innitleftMarquee();
    /* Lazy */
    function initLazy() {

        let
            lazyArr = [].slice.call(document.querySelectorAll('.lazy')),
            active = false,
            threshold = 200
            ;

        const lazyLoad = function (e) {
            if (active === false) {
                active = true;

                setTimeout(function () {
                    lazyArr.forEach(function (lazyObj) {
                        if ((lazyObj.getBoundingClientRect().top <= window.innerHeight + threshold && lazyObj.getBoundingClientRect().bottom >= -threshold) && getComputedStyle(lazyObj).display !== 'none') {

                            if (lazyObj.dataset.src) {
                                let
                                    img = new Image(),
                                    src = lazyObj.dataset.src
                                    ;
                                img.src = src;
                                img.onload = function () {
                                    if (!!lazyObj.parent) {
                                        lazyObj.parent.replaceChild(img, lazyObj);
                                    } else {
                                        lazyObj.src = src;
                                    }
                                }
                                lazyObj.removeAttribute('data-src');
                            }

                            if (lazyObj.dataset.srcset) {
                                lazyObj.srcset = lazyObj.dataset.srcset;
                                lazyObj.removeAttribute('data-srcset');
                            }

                            lazyObj.classList.remove('lazy');
                            lazyObj.classList.add('lazy-loaded');

                            lazyArr = lazyArr.filter(function (obj) {
                                return obj !== lazyObj;
                            });

                            if (lazyArr.length === 0) {
                                document.removeEventListener('scroll', lazyLoad);
                                window.removeEventListener('resize', lazyLoad);
                                window.removeEventListener('orientationchange', lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        lazyLoad();

        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }
    $('.popup-menu__link').click(function () {
        $.fancybox.close();
    });
    /*burger*/
    function initMenu() {
        $('.header__menu').on('click', function () {
            $('.header__nav').toggleClass('active')

        });
        $('.header__nav-link').on('click', function () {
            $('.ham, .header__nav').removeClass('active');
        });
    }
    /*menu fixed*/
    function initScrollHeader() {
        const header = $('.header');
        const scroll = $(window).scrollTop();
        if (scroll >= 40) {
            header.addClass('fixed');

        } else {
            header.removeClass('fixed');
        }
    }
    $(window).scroll(() => initScrollHeader())


    /*speakers hover layout*/
    $(".speakers__item").hover(
        function () {
            $(this).closest('.speakers__box').addClass("hover");
            var window_width = $(window).width();


            if (window_width > 1565) {
                $(this).mousemove(function (e) {
                    // положение элемента
                    var width = $(this).width(),
                        pos = $(this).offset(),
                        elem_left = pos.left,
                        elem_top = pos.top,
                        // положение курсора внутри элемента
                        Xinner = e.pageX - elem_left,
                        Yinner = e.pageY - elem_top
                        ;
                    // console.log("X: " + Xinner + " Y: " + Yinner); // вывод результата в консоль
                    if (Xinner > (width / 2)) {

                        // $(this).css({ 'transform': 'rotate3d(0, 39.1, 1, -30deg)' });
                        $(this).css({ 'transform': 'rotate3d(0, 1, 0, 20deg)' });
                    }
                    else {
                        // $(this).css({ 'transform': 'rotate3d(0, 39.1, 1, 30deg)' });
                        $(this).css({ 'transform': 'rotate3d(0, 1, 0, -15deg)' });
                    }
                });
            }
        }, function () {
            $(this).closest('.speakers__box').removeClass("hover");
            $(this).css({ 'transform': 'unset' });
        });
    /*Marquee skroling bar to the right*/
    function innitrightMarquee() {
        let a;

        if (document.body.clientWidth > 767) { a = 75 }
        else if (document.body.clientWidth > 320) { a = 30 };

        $('.marquee__right').marquee({
            duration: 20000,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'right',
            duplicated: true,
            startVisible: true,
            speed: a
        });
    }
    /*Marquee skroling bar to the left*/
    function innitleftMarquee() {
        let a;

        if (document.body.clientWidth > 767) { a = 75 }
        else if (document.body.clientWidth > 320) { a = 30 };

        $('.marquee__left').marquee({
            duration: 20000,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            startVisible: true,
            speed: a
        });
    }

    /* Слайдеры */
    let $stage_slider = $('.stage__bloks'),
        settingsStage = {
            mobileFirst: true,
            dots: false,
            arrows: false,
            infinite: false,
            centerMode: false,
            slidesToShow: 1.227,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick"
                }
            ]

        }


    $stage_slider.slick(settingsStage);

    $(window).on('resize', function () {
        if (!$stage_slider.hasClass('slick-initialized')) {
            return $stage_slider.slick(settingsStage);
        }
    });

    let $partners_slider = $('.partners__blocks'),
        settingsPartners = {
            mobileFirst: true,
            dots: false,
            arrows: false,
            infinite: false,
            centerMode: false,
            slidesToShow: 1.227,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick"
                }
            ]

        }


    $partners_slider.slick(settingsPartners);

    $(window).on('resize', function () {
        if (!$partners_slider.hasClass('slick-initialized')) {
            return $partners_slider.slick(settingsPartners);
        }
    });

    /*Спикеры убирание data-more-hidden*/
    $('[data-more-button]').on('init.more click', function (event) {
        var
            $container = $('[data-more-options]', $(this).parent()),
            options = {},
            visible = 0,
            window_width = $(window).width(),
            $items
            ;

        options = $container.data('more-options');

        if (event.type == 'init') {
            visible = window_width > 991 ? options.init_desktop : options.init_mobile;

            /*if ( window_width > 991 && window_width < 1200 && visible % 2 == 0 ) {
            visible--;
            }*/
        }
        else {
            visible = window_width > 991 ? options.show_desktop : options.show_mobile;
        }

        $items = $(options.target + '[data-more-hidden]', $container);
        $items.slice(0, visible).removeAttr('data-more-hidden');

        $('html, body')
            .animate({ scrollTop: '+=1' }, 0)
            .animate({ scrollTop: '-=1' }, 0)
            ;

        if ($items.length - visible <= 0) {
            $(this).addClass('d-none');
        }

    })
        .trigger('init.more');

    //Слайдеры
    let $speakers_slider = $('.concept__block'),
        settingsSpeakers = {
            mobileFirst: true,
            infinite: false,
            arrows: true,
            dots: false,
            centerPadding: '0px',
            canterMode: false,
            slidesToShow: 1.3,
            slidesToScroll: 1,

            centerPadding: '80px',


        }


    $speakers_slider.slick(settingsSpeakers);

    $(window).on('resize', function () {
        if (!$speakers_slider.hasClass('slick-initialized')) {
            return $speakers_slider.slick(settingsSpeakers);
        }
    });
    $(window).on('resize', function () {
        if (!$speakers_slider.hasClass('slick-initialized')) {
            return $speakers_slider.slick(settingsSpeakers);
        }
    });
    //organizator slider
    let $organizator_slider = $('.organizator__block'),
        settingsOrganizator = {
            mobileFirst: true,
            infinite: false,
            arrows: true,
            dots: false,
            centerPadding: '0px',
            canterMode: false,
            slidesToShow: 1.15,
            slidesToScroll: 1,

            centerPadding: '80px',


        }


    $organizator_slider.slick(settingsOrganizator);

    $(window).on('resize', function () {
        if (!$organizator_slider.hasClass('slick-initialized')) {
            return $organizator_slider.slick(settingsOrganizator);
        }
    });
    //partners slider woow!
    let $brands_slider = $('.brands__block'),
        settingsBrands = {
            infinite: false,
            mobileFirst: false,

            centerMode: true,
            slidesToShow: 1.6,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            centerPadding: '0px',
            responsive: [
                {
                    breakpoint: 991,
                    settings: "unslick"
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1.1,
                        slidesToScroll: 1
                    }

                },
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 1.25,
                        slidesToScroll: 1
                    }

                }

            ]
        }
    if ($brands_slider.length) {
        var currentSlide;
        var slidesCount;
        var sliderCounter = document.createElement('div');
        sliderCounter.classList.add('slider__counter');

        var updateSliderCounter = function (slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            $(sliderCounter).text(currentSlide + ' / ' + slidesCount)
        };

        $brands_slider.on('init', function (event, slick) {
            $brands_slider.append(sliderCounter);
            updateSliderCounter(slick);
        });

        $brands_slider.on('afterChange', function (event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
        });
    }



    $brands_slider.slick(settingsBrands);

    $(window).on('resize', function () {
        if (!$brands_slider.hasClass('slick-initialized')) {
            return $brands_slider.slick(settingsBrands);
        }
    });



});
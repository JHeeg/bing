// JavaScript Document
$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});

$(document).ready(function(){
    setGnb();
    setCurrentPage();
    
    // skip-top
    setScrollUI();
    $(window).on('scroll', function() {
        setScrollUI();
    });
    $('#btn-top').on('click', function() {
        $('html, body').animate({'scrollTop': 0}, 500);
    });
});

function setGnb() {
    // 모바일 메뉴 열기
    $('a.btn-menu').on('click', function() {
        toggleGnb();
    });
    // 빈 영역 클릭하면 메뉴 닫기
    $('div.gnb-modal').on('click', function() {
        toggleGnb();
    });
    // 모바일 메뉴 depth2 열기
    $('div.menu ul li.depth1 > a').on('click', function() {
        if ($(this).parent().hasClass('on')) {
            $(this).parent().removeClass('on');
        } else {
            $('div.menu ul li.depth1 > a').parent().removeClass('on');
            $(this).parent().toggleClass('on');
        }
    });
    // 모바일 메뉴 depth3 열기
    $('div.menu ul li.depth2 > a').on('click', function() {
        if ($(this).parent().hasClass('on')) {
            $(this).parent().removeClass('on');
        } else {
            $('div.menu ul li.depth2 > a').parent().removeClass('on');
            $(this).parent().toggleClass('on');
        }
    });
    // 모바일 메뉴 etc2 열기
    $('div.etc2 ul li.depth1 > a').on('click', function() {
        if ($(this).parent().hasClass('on')) {
            $(this).parent().removeClass('on');
        } else {
            $('div.menu ul li.depth1 > a').parent().removeClass('on');
            $(this).parent().toggleClass('on');
        }
    });

    function toggleGnb() {
        $('a.btn-menu').toggleClass('on-m');
        $('header').toggleClass('on-m');
        $('h1.logo').toggleClass('on-m');
        $('nav.gnb-mobile').toggleClass('on-m');
        $('div.gnb-modal').toggleClass('on-m');
    }

    // pc 메뉴
    $('nav.gnb-pc > ul > li > a').on('mouseenter focus', function() {
        $('nav.gnb-pc > ul > li > ul.depth2-box').css({'display': 'block'});
        $('div.gnb-bg').css({'display': 'block'});
        $('header').addClass('on');
    });
    $('header').on('mouseleave', function() {
        $('nav.gnb-pc > ul > li > ul').css({'display': 'none'});
        $('div.gnb-bg').css({'display': 'none'});
        $('header').removeClass('on');
    });
}

function setImageSlide(selector, first, status, speed) {
    var numSlide = $(selector).find('ul.main-slide li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var slideFirst = first;
    var timerId = null;
    var isTimerOn = status;
    var timerSpeed = speed;
    var startX = 0;
    var delX = 0;
    var offsetX = 0;

    // 초기화
    $(selector).find('ul.main-slide li').each(function(i) {
        $(this).css({'left': (i * 100) + '%', 'display': 'block'});
    });
    showSlide(slideFirst);

    //Swipe
    $(selector).find('ul.main-slide').on('touchstart', function(e) {
        //e.preventDefault();
        $(this).css({'transition': 'none'});
        clearTimeout(timerId);
        isTouched = true;
        startX = e.touches[0].clientX;
        offsetX = $(this).position().left;

        document.addEventListener('touchmove', function(e) {
            if (isTouched === true) {
                delX = e.touches[0].clientX - startX;
                delY = e.touches[0].clientY - startY;
                if (direction === '') {
                    if (Math.abs(delX) > 5) {
                        direction = 'horizon';
                    } else if (Math.abs(delY) > 5) {
                        direction = 'vertical';
                    }
                } else if (direction === 'horizon') {
                    e.preventDefault();
                    if ((slideNow === 1 && delX > 0) || (slideNow === numSlide && delX < 0)) {
                        delX = delX / 10;
                    }
                    $(selector).find('ul.slide').css({'left': (offsetX + delX) + 'px'});
                } else if (direction === 'vertical') {
                    //delX를 계속 구하고 있어서 0으로 초기화시켜주지 않으면 세로로 이동하다가도 좌우로 슬라이드 될 수 있음
                    delX = 0;
                }
            }
        }, {passive: false});
        $(document).on('touchend', function() {
            if (isTouched === true) {
                if (delX < -50 && slideNow !== numSlide) {
                    showSlide(slideNext);
                } else if (delX > 50 && slideNow !== 1) {
                    showSlide(slidePrev);
                } else {
                    showSlide(slideNow);
                }
                isTouched = false;
                direction = '';
            }
        });
    });

    function showSlide(n) {
        clearTimeout(timerId);
        if (slideNow === 0) {
            $(selector).find('ul.main-slide').css({'transition': 'none', 'left': -((n - 1) * 100) + '%'});
        } else {
            $(selector).find('ul.main-slide').css({'transition': 'left 0.3s', 'left': -((n - 1) * 100) + '%'});
        }
        slideNow = n;
        slidePrev = (n - 1) < 1 ? numSlide : n - 1;
        slideNext = (n + 1) > numSlide ? 1 : n + 1;
        //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
        if (isTimerOn === true) {
            timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
        }
    }
}

// 메인 이미지 슬라이드 (pc)
function setMainVisualUI() {
    var numMainSlidePc = $('section#main-visual-pc ul.main-slide li').length;
    var timerIdMainPc = '';
    var timerSpeedMainPc = 3000;
    var fontColor = ['#248dd5', '#ffec48', '#ff5c58', '#cadf47', '#ff5f3c', '#f5d33b'];

    $('section#main-visual-pc ul.main-slide > li').each(function(i) {
        $(this).css({'right': (i * 100) + '%'});
        $('section#main-visual-pc div.bg-circle ul li:eq(' + i + ')').css({'left': (i * 100) + '%'});
        $('section#main-visual-pc div.cate-circle ul.cate-bg li:eq(' + i + ')').css({'right': (i * 100) + '%'});
    });
    showSlideMainPc(1);

    function showSlideMainPc(n) {
        clearTimeout(timerIdMainPc);

        $('#main-visual-pc .cate-list li').css({'color': '#000'});
        $('#main-visual-pc .cate-list li:eq(' + (n - 1) + ')').css({'color': fontColor[n - 1], 'font-weight': '600'});

        //console.log(n + ' / ' + numMainSlidePc);
        if (n === 1) {
            $('section#main-visual-pc ul.main-slide').css({'transition': 'none', 'right': -((n - 1) * 100) + '%'});
            $('section#main-visual-pc div.bg-circle ul').css({'transition': 'none', 'left': -((n - 1) * 100) + '%'});
            $('section#main-visual-pc div.cate-circle ul.cate-bg').css({'transition': 'none', 'right': -((n - 1) * 100) + '%'});
            $('section#main-visual-pc div.slide-img > img').css({'transition': 'none', 'right': '-1200px'});
            $('section#main-visual-pc div.slide-img > img:eq(' + (n - 1) + ')').css({'transition': 'none', 'right': 0});
        } else {
            $('section#main-visual-pc ul.main-slide').css({'transition': 'right 0.5s', 'right': -((n - 1) * 100) + '%'});
            $('section#main-visual-pc div.bg-circle ul').css({'transition': 'left 0.5s', 'left': -((n - 1) * 100) + '%'});
            $('section#main-visual-pc div.cate-circle ul.cate-bg').css({'transition': 'right 0.5s', 'right': -((n - 1) * 100) + '%'});
            $('section#main-visual-pc div.slide-img > img').css({'transition': '0.7s', 'right': '-1200px'});
            $('section#main-visual-pc div.slide-img > img:eq(' + (n - 1) + ')').css({'transition': '0.5s', 'right': '0'});
        }
        if (n === numMainSlidePc) n = 0;
        timerIdMainPc = setTimeout(function() {showSlideMainPc(n + 1);}, timerSpeedMainPc);
    }
}

// 히스토리 이미지 슬라이드 (모바일)
function setHistoryUI() {
    var numSlideHistoryM = $('#history ul.cont-box.mobile > li.on div.cont-ui ul.image-slide li').length;
    var timerIdHistoryM = '';
    var timerSpeedHistoryM = 2000;
    // 히스토리 숫자 롤링 (pc)
    var slideNowHistory = 0;
    var slideNextHistory = 0;
    var timerIdHistory = '';
    var timerSpeedHistory = 6000;
    var isTimerOnHistory = true;
    var windowWidth = $(window).width();
    
    $('#history ul.cont-box.mobile > li').each(function(i) {
        $(this).find('div.cont-ui ul.image-slide li').each(function(j) {
            $(this).css({'left': (j * 100) + '%', 'display': 'block'});
        });
    });

    $(window).on('resize', function() {
        windowWidth = $(window).width();
        if (windowWidth <= 850) {
            showSlideHistory(1);
        } else {
            showYear(1);
        }
    });

    //히스토리 카테고리 버튼 클릭시 (pc/mobile)
    $('div.btn-cate ul li a').on('click', function() {
        var index = $('div.btn-cate > ul > li').index($(this).parent());
        var device = '';
        if (windowWidth <= 850) {
            device = 'mobile';
        } else {
            device = 'pc';
        }
        //mobile
        $('section#history ul.cont-box.mobile > li').css({'display': 'none'});
        $('section#history ul.cont-box.mobile > li:eq(' + index + ')').css({'display': 'block'});
        $('section#history ul.bottom-box.mobile > li').css({'display': 'none'});
        $('section#history ul.bottom-box.mobile > li:eq(' + index + ')').css({'display': 'block'});

        //pc
        $('section#history ul.cont-box.pc > li').css({'display': 'none'});
        $('section#history ul.cont-box.pc > li:eq(' + index + ')').css({'display': 'block'});
        $('section#history ul.cont-box.pc > li').removeClass('on');
        $('section#history ul.cont-box.pc > li:eq(' + index + ')').addClass('on');

        $('section#history div.btn-cate ul li').removeClass('on');
        $(this).parent().addClass('on');

        if (device === 'mobile') {
            showSlideHistory(1);
        } else {
            showYear(1);
        }
    });

    // 년도 인디케이터 클릭 시 (pc)
    $('div.cont-ui ul.year-indicator li a').on('click', function() {
        var index = $('ul.cont-box.pc > li.on div.cont-ui ul.year-indicator li').index($(this).parent());
        showYear(index + 1);
    });
    showYear(1);
    function showYear(n) {
        clearTimeout(timerIdHistory);
        
        var arrayTop = [];
        var year = $('ul.cont-box.pc > li.on div.cont-ui ul.year-indicator li:eq(' + (n - 1) + ') a').text();
        var textSpeed = (slideNowHistory === 0) ? 0 : 2000;

        arrayTop.push(2000 + Number(year[0]) * 100);
        arrayTop.push(2000 + Number(year[1]) * 100);
        arrayTop.push(2000 + Number(year[2]) * 100);
        arrayTop.push(2000 + Number(year[3]) * 100);
        
        $('ul.cont-box.pc > li.on ul.year > li > ul.num').empty().stop(true).css({'top': 0});
        appendNumber('ul.cont-box.pc > li.on ul.year > li > ul.num');

        // 이미지변경
        $('ul.cont-box.pc ul.image-slide > li').css({'display': 'none'});
        $('ul.cont-box.pc > li.on ul.image-slide > li:eq(' + (n - 1) + ')').css({'display': 'block'});
        
        // 년도 롤링
        $('ul.cont-box.pc > li.on ul.year > li:eq(0) > ul.num').stop(true).delay(0).animate({'top': -arrayTop[0] + '%'}, textSpeed);
        $('ul.cont-box.pc > li.on ul.year > li:eq(1) > ul.num').stop(true).delay(200).animate({'top': -arrayTop[1] + '%'}, textSpeed);
        $('ul.cont-box.pc > li.on ul.year > li:eq(2) > ul.num').stop(true).delay(400).animate({'top': -arrayTop[2] + '%'}, textSpeed);
        $('ul.cont-box.pc > li.on ul.year > li:eq(3) > ul.num').stop(true).delay(600).animate({'top': -arrayTop[3] + '%'}, textSpeed);
        
        $('ul.cont-box.pc > li.on ul.year-indicator li').removeClass('on');
        $('ul.cont-box.pc > li.on ul.year-indicator li:eq(' + (n - 1) + ')').addClass('on');

        slideNowHistory = n;
        slideNextHistory = (n + 1) > numSlideHistoryM ? 1 : n + 1;
        if (isTimerOnHistory === true) {
            timerIdHistory = setTimeout(function() {showYear(slideNextHistory);}, timerSpeedHistory);
        }
    }
    // 숫자 셋팅 (PC)
    function appendNumber(selector) {
        for (var j = 0; j < 5; j++) {
            for (var i = 0; i < 10; i++) {
                $(selector).append('<li>' + i + '</li>');
            }
        }
    }
    showSlideHistory(1);
    function showSlideHistory(n) {
        clearTimeout(timerIdHistoryM);
        $('#history ul.cont-box.mobile div.cont-ui ul.image-slide').css({'transition': 'left 0.7s', 'left': -((n - 1) * 100) + '%'});
        if (n === numSlideHistoryM) {n = 0;}
        timerIdHistoryM = setTimeout(function() {showSlideHistory(n + 1);}, timerSpeedHistoryM);
    }
}

function setBannerInfinite(selector) {
    var numBanner = $(selector).find('ul.image-slide-news li').length;
    var bannerNow = 0;
    var bannerPrev = 0;
    var bannerNext = 0;
    var widthBox = $(selector).find('> div.image-slide-box').innerWidth();
    var widthBar = 0;
    var offsetLeft = 0;
    var minNumSide = 0;
    var timerId = null;
    var isTimerOn = true;
    var timerSpeed = 3000;
    
    $(selector).find('ul.image-slide-news li').each(function(i) {
        widthBar += $(this).outerWidth(true);
        $(this).attr({'data-num': (i + 1)});
        //$(selector).find('ul.indicator').append('<li><a href="#">' + (i + 1) + '번 배너</a></li>');
    });

    $(selector).find('ul.image-slide-news').css({'width': (widthBar + 30) + 'px'});

    checkMinNumSide();
    showBanner(1);

    $(window).on('resize', function() {
        widthBox = $(selector).find('> div.image-slide-box').innerWidth();

        $(selector).find('ul.image-slide-news li').each(function(i) {
            widthBar += $(this).outerWidth(true);
        });
        $(selector).find('ul.image-slide-news').css({'width': widthBar + 'px'});

        checkMinNumSide();
        showBanner(bannerNow);
    });
    
    function showBanner(n) {
        clearTimeout(timerId);
        checkVisibility(n);
        var $bannerNow = null;
        $(selector).find('ul.image-slide-news li').each(function() {
            if (Number($(this).attr('data-num')) === n) {
                $bannerNow = $(this);
                return false;
            }
        });
        offsetLeft = -$bannerNow.position().left + (widthBox / 2) - $bannerNow.outerWidth() / 2;
        if (bannerNow === 0) {  
            $(selector).find('ul.image-slide-news').css({'transition': 'none', 'left': offsetLeft + 'px'});
        } else {
            $(selector).find('ul.image-slide-news').css({'transition': 'left 0.5s', 'left': offsetLeft + 'px'});
        }
        $(selector).find('ul.image-slide-news li').removeClass('on');
        $bannerNow.addClass('on');

        bannerNow = n;
        bannerPrev = (n - 1) < 1 ? numBanner : n - 1;
        bannerNext = (n + 1) > numBanner ? 1 : n + 1;
        if (isTimerOn === true) {
            timerId = setTimeout(function() {showBanner(bannerNext);}, timerSpeed);
        }
    }
    
    function checkMinNumSide() {
        var widthBox = $(selector).find('> div.image-slide-box').innerWidth();
        var sumWidth = 0;
        $(selector).find('ul.image-slide-news li').each(function(i) {
            sumWidth += $(this).outerWidth(true);
            if (sumWidth > widthBox) {
                minNumSide = Math.floor((i + 1) / 2);
                return false;
            }
        });
        //console.log(minNumSide);
    }
    
    // 앞뒤로 minNumSide 갯수 만큼의 banner가 존재하도록 재배치
    function checkVisibility(n) {
        var $bannerNow = null;
        $(selector).find('ul.image-slide-news li').each(function() {
            if (Number($(this).attr('data-num')) === n) {
                $bannerNow = $(this);
                return false;
            }
        });
        for (var i = $bannerNow.prevAll().length; i < minNumSide; i++) {
            $bannerNow.parent().prepend($(selector).find('ul.image-slide-news li:last').clone());
            $(selector).find('ul.image-slide-news li:last').remove();
            offsetLeft -= $(selector).find('ul.image-slide-news li:eq(0)').outerWidth(true);
            $(selector).find('ul.image-slide-news').css({'transition': 'none', 'left': offsetLeft + 'px'});
            //console.log(offsetLeft);
        }
        for (var i = $bannerNow.nextAll().length; i < minNumSide; i++) {
            $bannerNow.parent().append($(selector).find('ul.image-slide-news li:eq(0)').clone());
            $(selector).find('ul.image-slide-news li:eq(0)').remove();
            offsetLeft += $(selector).find('ul.image-slide-news li:last').outerWidth(true);
            $(selector).find('ul.image-slide-news').css({'transition': 'none', 'left': offsetLeft + 'px'});
        }
    }
}


function setScrollUI() {
    var scrollTop = $(document).scrollTop();
    if (scrollTop > 100) {
        $('#skip-top').addClass('on');
    } else {
        $('#skip-top').removeClass('on');
    }
}

// gnb에서 현재페이지 표시
function setCurrentPage() {
    var bodyClass = $('body').attr('class');
    var arrayClass = bodyClass.split(' ');
    if (arrayClass[0] === 'main') return false;

    // 1depth
    $('.gnb-pc > ul > .depth1').each(function() {
        if ($(this).attr('data-menu') === arrayClass[1]) {
            $(this).addClass('nowpage');
            //alert(arrayClass[1]);
        } else {
            $(this).removeClass('nowpage');
        }
    });
    // 2depth
    $('.gnb-pc > ul > li.nowpage > ul > li').each(function() {
        if ($(this).attr('data-menu') === arrayClass[2]) {
            $(this).addClass('nowpage');
            //$(this).addClass('on');
        } else {
            $(this).removeClass('nowpage');
        }
    })
}

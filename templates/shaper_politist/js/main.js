/**
* @package Helix3 Framework
* @author JoomShaper http://www.joomshaper.com
* @copyright Copyright (c) 2010 - 2015 JoomShaper
* @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
*/
jQuery(function($) {

    // Off Canvas Menu
    $('.offcanvas-toggler').on('click', function(event){
        event.preventDefault();
        $('body').addClass('offcanvas');
    });

    $( '<div class="offcanvas-overlay"></div>' ).insertBefore( '.body-innerwrapper > .offcanvas-menu' );

    $('.close-offcanvas, .offcanvas-overlay').on('click', function(event){
        event.preventDefault();
        $('body').removeClass('offcanvas');
    });

    //Mega Menu
    $('.sp-megamenu-wrapper').parent().parent().css('position','static').parent().css('position', 'relative');
    $('.sp-menu-full').each(function(){
        $(this).parent().addClass('menu-justify');
    });
    
    //hikashop module title
    $('.hikashop_module .hikashop_products_listing_main > h2').html(function(){
        var text= $(this).text().split('//');
        var last = text.pop();
        return text.join("//") + (text.length > 0 ? ' <span class="politist-last-title">'+last+'</span>' : last);   
    });


    //Top Search
    var searchtgle = $(".search-toggler");

    searchtgle.on('click', function(){
        $(".searchwrapper").fadeIn(200);
    });

    $(".icon-remove-wrapper").on('click', function(){
        $(".searchwrapper").fadeOut(200);
    });

    $(".politist-top-search .searchwrapper").prependTo("#sp-header .row:last-child");

    // click outside search fadeout
    $(document).on('click', function(e) {
        //var selector = $('.cart-toggle');
        if (!searchtgle.is(e.target) && !$('#sp-header').is(e.target) && !$('#sp-header *').is(e.target)) {
            $(".searchwrapper").fadeOut(200);
        }
    });

    //Shopping cart
    var toggle = $('.cart-toggle'),
    hikashop_cart = $('.hikashop_cart_module');
    
    toggle.on('click', function() {
        hikashop_cart.slideToggle();
        $(this).parent().toggleClass('active');
    });

    // click outside slideup
    $(document).on('click', function(e) {
        if (!toggle.is(e.target) && !$('.hikashop_cart_module').is(e.target) && !$('.hikashop_cart_module *').is(e.target) && toggle.has(e.target).length === 0) {
            hikashop_cart.slideUp();
            toggle.parent().removeClass('active');
        }
    });

    // Slideshow disaper and conflict with motools
    var carousel = jQuery('.carousel');
    if(carousel) {
        window.onload = function() {
            if (typeof jQuery != 'undefined' && typeof MooTools != 'undefined' ) {
                Element.implement({
                    slide: function(how, mode){
                        return this;
                    }
                });
            }
        };
    }

    // has slideshow and sub header
    $(document).ready(function(){
        var spHeader = $("#sp-header, #sp-mobile-header");
        // class in header
        spHeader.addClass('menu-fixed-out');
    });

    // sticky nav
    var stickyNavTop = $('#sp-header, #sp-mobile-header').offset().top;
    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            //alert('top');
            $('#sp-header, #sp-mobile-header').removeClass('menu-fixed-out')
            .addClass('menu-fixed');
        }
        else
        {
            if($('#sp-header, #sp-mobile-header').hasClass('menu-fixed'))
            {
                $('#sp-header, #sp-mobile-header').removeClass('menu-fixed').addClass('menu-fixed-out');
            }

        }
    };

    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });

    //donation js
    var donation_input = $('.sppb-addon-donation .donation-ammount-wrap > input');
    donation_input.on('click', function(){
        // remove previous active class and add class
        donation_input.removeClass('active');
        $(this).addClass('active');

        var currency = $(".sppb-addon-donation .donation-ammount-wrap").data('currency'),
        crncy_code = currency.split(':'),
        pid = $(".sppb-addon-donation .donation-ammount-wrap").data('pid'),
        this_val = $(this).val(),
        amt = this_val.split('$');

        if (amt[1]) {
            var amt = amt[1];
        } else{
            var amt = this_val;
        };

        if (amt != '' && amt > 0) {
            $(".sppb-addon-donation .donation-button .donation-button-link").attr("href", "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business="+pid+"&item_name=donation&amount="+amt+"&currency_code="+crncy_code[0]+"");
        };
        
    });

    //donation custom onkeyup change value
    $('.sppb-addon-donation .donation-ammount-wrap > input.input-text').on('keyup', function(event) {
        var this_val = $(this).val(),
        pid = $(".sppb-addon-donation .donation-ammount-wrap").data('pid'),
        currency = $(".sppb-addon-donation .donation-ammount-wrap").data('currency'),
        crncy_code = currency.split(':');

        if (this_val != '' && this_val > 0) {
            $(".sppb-addon-donation .donation-button .donation-button-link").attr("href", "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business="+pid+"&item_name=donation&amount="+this_val+"&currency_code="+crncy_code[0]+"");
        };
    });

    // Select
    $(document).on('click', function(e) {
        var selector = $('.sp-select');
        if (!selector.is(e.target) && selector.has(e.target).length === 0) {
            selector.find('ul').slideUp();
            selector.removeClass('active');
        }
    });

    $('.mod-languages select').each(function(event) {
        $(this).hide();
        var $self = $(this);
        var spselect  = '<div class="sp-select">';
        spselect += '<div class="sp-select-result">';
        spselect += '<span class="sp-select-text">' + $self.find('option:selected').text() + '</span>';
        spselect += ' <i class="fa fa-angle-down"></i>';
        spselect += '</div>';
        spselect += '<ul class="sp-select-dropdown">';

        $self.children().each(function(event) {
            if($self.val() == $(this).val()) {
                spselect += '<li class="active" data-val="'+ $(this).val() +'">' + $(this).text() + '</li>';
            } else {
                spselect += '<li data-val="'+ $(this).val() +'">' + $(this).text() + '</li>';
            }
        });

        spselect += '</ul>';
        spselect += '</div>';
        $(this).after($(spselect));
    });

    $(document).on('click', '.sp-select', function(event) {
        $('.sp-select').not(this).find('ul').slideUp();
        $(this).find('ul').slideToggle();
        $(this).toggleClass('active');
    });

    $(document).on('click', '.sp-select ul li', function(event) {
        var $select = $(this).closest('.sp-select').prev('select');
        $(this).parent().prev('.sp-select-result').find('span').html($(this).text());
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        $select.val($(this).data('val'));
        $select.change();
    });
    // End Select


    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // fix conflicting with mootools
    if (typeof MooTools != 'undefined') {
      var mHide = Element.prototype.hide;
      Element.implement({
         hide: function() {
            if ($('[data-toggle="tooltip"]').attr('itemprop')) {
               return this;
            }
            mHide.apply(this, arguments);
         }
      });
    }
    
    
    $(document).on('click', '.sp-rating .star', function(event) {
        event.preventDefault();

        var data = {
            'action':'voting',
            'user_rating' : $(this).data('number'),
            'id' : $(this).closest('.post_rating').attr('id')
        };

        var request = {
                'option' : 'com_ajax',
                'plugin' : 'helix3',
                'data'   : data,
                'format' : 'json'
            };

        $.ajax({
            type   : 'POST',
            data   : request,
            beforeSend: function(){
                $('.post_rating .ajax-loader').show();
            },
            success: function (response) {
                var data = $.parseJSON(response.data);

                $('.post_rating .ajax-loader').hide();

                if (data.status == 'invalid') {
                    $('.post_rating .voting-result').text('You have already rated this entry!').fadeIn('fast');
                }else if(data.status == 'false'){
                    $('.post_rating .voting-result').text('Somethings wrong here, try again!').fadeIn('fast');
                }else if(data.status == 'true'){
                    var rate = data.action;
                    $('.voting-symbol').find('.star').each(function(i) {
                        if (i < rate) {
                           $( ".star" ).eq( -(i+1) ).addClass('active');
                        }
                    });

                    $('.post_rating .voting-result').text('Thank You!').fadeIn('fast');
                }

            },
            error: function(){
                $('.post_rating .ajax-loader').hide();
                $('.post_rating .voting-result').text('Failed to rate, try again!').fadeIn('fast');
            }
        });
    });

});
// $(document).ready(function() {
//     $('#dtBasicExample, #dtBasicExample-2, #dtBasicExample-3, #dtBasicExample-4').DataTable();
// });

//	
window.onload = function() {
    var buttons = document.getElementsByTagName('span'),
        result = document.querySelectorAll('.result p')[0],
        clear = document.getElementsByClassName('clear')[0];
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML === '=') {
            buttons[i].addEventListener("click", calculate(i));
        } else {
            buttons[i].addEventListener("click", addValue(i));
        }
    }
    // clear.onclick = function () {
    //   result.innerHTML = '';
    // };
    function addValue(i) {
        return function() {
            try {
                result.innerHTML += buttons[i].innerHTML;
            } catch (error) {}
        };
    }

    function calculate(i) {
        return function() {
            var final_res = result.innerHTML;
            result.innerHTML = eval(final_res);
        };
    }
};
// left Side bar
$(document).ready(function() {

    // if ($(window).outerWidth() > 992) {
    //     $("nav.side-navbar").mCustomScrollbar({
    //         scrollInertia: 200
    //     });
    // }
    var brandPrimary = '#33b35a';
    $('#toggle-btn').on('click', function(e) {

        e.preventDefault();

        if ($(window).outerWidth() > 1194) {
            $('nav.side-navbar').toggleClass('shrink');
            $('.page').toggleClass('active');
        } else {
            $('nav.side-navbar').toggleClass('show-sm');
            $('.page').toggleClass('active-sm');
        }
    });

    // $('[data-toggle="tooltip"]').tooltip()

    jQuery('.toggle-button').click(function() {
        jQuery('.toggle-button').toggleClass('active')
        jQuery('body').toggleClass('night')
    });


});

// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })

// $(document).ready(function () {
//   $('select').awselect()
// });



$(document).ready(function() {
    
    $('#tabs li a:not(:first)').addClass('inactive');
    $('.cp_tabs').hide();
    $('.cp_tabs:first').show();

    $('#tabs li a').click(function() {
        var t = $(this).attr('id');
        if ($(this).hasClass('inactive')) { //this is the start of our condition 
            $('#tabs li a').addClass('inactive');
            $(this).removeClass('inactive');

            $('.cp_tabs').hide();
            $('#' + t + 'C').fadeIn('slow');
        }
    });

});


$("form").on("change", ".file-upload-field", function() {
    $(this).parent(".file-upload-wrapper").attr("data-text", $(this).val().replace(/.*(\/|\\)/, ''));
});




$('.cur_type span').on('keydown', function(event) {
    //$('span').text('Total chars:' + $(this).text().length);
    if ($(this).text().length === 13 && event.keyCode != 8) {
        event.preventDefault();
    }
});
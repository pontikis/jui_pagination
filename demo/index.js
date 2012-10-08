$(function() {

/*    $('#switcher').themeswitcher();*/

    $("#demo_pag1").jui_pagination({
        currentPage: 31,
        visiblePageLinks: 10,
        totalPages: 100,
        container_class: 'demo_pag1',
        onNavPageClick: function(event, page_num) {
            alert('Page number is: ' + page_num);
        }
    });

    $("#demo_pag2").jui_pagination({
        currentPage: 100,
        visiblePageLinks: 5,
        totalPages: 300,
        container_class: 'demo_pag2'
    });


    $("#set_option_1").click(function() {
        $("#demo_pag1").jui_pagination({
            container_class: 'demo_pag1_alt1'
        });
    });

    $("#set_option_2").click(function() {
        $("#demo_pag1").jui_pagination({
            container_class: 'demo_pag1'
        });
    });

    $("#get_option_1").click(function() {
        var tmp = $("#demo_pag1").jui_pagination('getOption', 'container_class');
        alert(tmp);
    });


});


$(function() {
// TODO jQuery-UI 1.9.0 themeswitcher not working
/*    $('#switcher').themeswitcher();*/

    $("#demo_pag1").jui_pagination({
        currentPage: 33,
        visiblePageLinks: 10,
        totalPages: 103,
        container_class: 'demo_pag1',
        onNavPageClick: function(event, page_num) {
            alert('Page number is: ' + page_num);
        }
    });

    $("#demo_pag2").jui_pagination({
        currentPage: 7,
        visiblePageLinks: 10,
        totalPages: 24,
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


    $("#set_option_3").click(function() {
        $("#demo_pag2").jui_pagination({
            totalPages: 5
        });
    });

    $("#set_option_4").click(function() {
        $("#demo_pag2").jui_pagination({
            totalPages: 50
        });
    });

    $("#get_option_2").click(function() {
        var tmp = $("#demo_pag2").jui_pagination('getOption', 'totalPages');
        alert(tmp);
    });



});


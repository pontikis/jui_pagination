$(function() {

/*    $('#switcher').themeswitcher();*/

    $("#demo_pag1").jui_pagination({
        currentPage: 1,
        visiblePageLinks: 10,
        totalPages: 100
    });

    $("#demo_pag2").jui_pagination({
        currentPage: 10,
        visiblePageLinks: 5,
        totalPages: 300
    });

});


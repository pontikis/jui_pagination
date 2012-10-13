$(function() {
// TODO jQuery-UI 1.9.0 themeswitcher not working
    //$('#switcher').themeswitcher();

    $("#demo_pag1").jui_pagination({
        currentPage: 8,
        visiblePageLinks: 10,
        totalPages: 103,
        containerClass: 'demo_pag1',
        sliderClass: 'demo_pag1_slider',
        onChangePage: function(event, page_num) {
            $("#result").html('Page changed to: ' + page_num);
        }
    });

    $("#result").html('Current page is: ' + $("#demo_pag1").jui_pagination('getOption', 'currentPage'));


    $("#demo_pag2").jui_pagination({
        currentPage: 7,
        visiblePageLinks: 5,
        totalPages: 24,

        navPaneElementID: 'navpane2',
        navPaneClass: 'navpane2 nav-pane ui-widget ui-widget-header ui-corner-all',
        navItemHoverClass: '',

        sliderElementID: 'slider2',
        sliderClass: 'slider2',
        sliderOrientation: 'vertical',

        onChangePage: function(event, page_num) {
            $("#result2").html('Page changed to: ' + page_num);
        }

    });

    $("#result2").html('Current page is: ' + $("#demo_pag2").jui_pagination('getOption', 'currentPage'));

    $("#set_option_1").click(function() {
        $("#demo_pag1").jui_pagination({
            containerClass: 'demo_pag1_alt1'
        });
    });

    $("#set_option_2").click(function() {
        $("#demo_pag1").jui_pagination({
            containerClass: 'demo_pag1'
        });
    });

    $("#get_option_1").click(function() {
        var tmp = $("#demo_pag1").jui_pagination('getOption', 'containerClass');
        alert(tmp);
    });

    $("#set_option_11").click(function() {
        $("#demo_pag1").jui_pagination({
            useNavPane: true,
            useSlider: false
        });
    });

    $("#set_option_12").click(function() {
        $("#demo_pag1").jui_pagination({
            useNavPane: false,
            useSlider: true
        });
    });

    $("#set_option_13").click(function() {
        $("#demo_pag1").jui_pagination({
            useNavPane: true,
            useSlider: true
        });
    });

    $("#set_option_14").click(function() {
        $("#demo_pag1").jui_pagination({
            useNavPane: false,
            useSlider: false
        });
    });


    $("#set_option_3").click(function() {
        $("#demo_pag2").jui_pagination({
            totalPages: 50
        });
    });

    $("#set_option_4").click(function() {
        $("#demo_pag2").jui_pagination({
            totalPages: 24
        });
    });

    $("#get_option_2").click(function() {
        var tmp = $("#demo_pag2").jui_pagination('getOption', 'totalPages');
        alert(tmp);
    });

    $("#set_option_7").click(function() {
        $("#demo_pag2").jui_pagination({
            useNavPane: true,
            useSlider: false
        });
    });

    $("#set_option_8").click(function() {
        $("#demo_pag2").jui_pagination({
            useNavPane: false,
            useSlider: true
        });
    });

    $("#set_option_9").click(function() {
        $("#demo_pag2").jui_pagination({
            useNavPane: true,
            useSlider: true
        });
    });

    $("#set_option_10").click(function() {
        $("#demo_pag2").jui_pagination({
            useNavPane: false,
            useSlider: false
        });
    });

});


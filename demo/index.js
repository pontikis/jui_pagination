$(function() {

    $("#ui-theme-switcher").change(function() {
        var theme_url = $(this).val();
        $("#ui-theme").attr("href", theme_url);
    })


    /**
     * demo_pag1 ---------------------------------------------------------------
     */
    $("#demo_pag1").jui_pagination({
        currentPage: 8,
        visiblePageLinks: 5,
        totalPages: 103,
        containerClass: 'container1',

        useSlider: false,
        sliderClass: 'slider1',

        disableSelectionNavPane: true,

        onChangePage: function(event, page_num) {
            $("#result").html('Page changed to: ' + page_num);
        }
    });

    $("#result").html('Current page is: ' + $("#demo_pag1").jui_pagination('getOption', 'currentPage'));


    /**
     * demo_pag2 ---------------------------------------------------------------
     */
    $("#demo_pag2").jui_pagination({
        currentPage: 7,
        visiblePageLinks: 6,
        totalPages: 24,
        containerClass: 'container2',

        navPaneElementID: 'navpane2',
        navPaneClass: 'navpane2 nav-pane ui-widget ui-widget-header ui-corner-all',
        navItemHoverClass: '',

        useSlider: true,
        sliderElementID: 'slider2',
        sliderClass: 'slider2',
        sliderOrientation: 'vertical',

        disableSelectionNavPane: true,

        onChangePage: function(event, page_num) {
            $("#result2").html('Page changed to: ' + page_num);
        }

    });

    $("#result2").html('Current page is: ' + $("#demo_pag2").jui_pagination('getOption', 'currentPage'));


    /**
     * various tests -----------------------------------------------------------
     */

    // mode -----------------------------------
    $('[id$="mode_first-last-always-visible"]').click(function() {
        var elem_selector = '#' + 'demo_pag' + $(this).attr("id").substr(0,1);
        $(elem_selector).jui_pagination({
            navPagesMode: 'first-last-always-visible'
        })
    });

    $('[id$="mode_continuous"]').click(function() {
        var elem_selector = '#' + 'demo_pag' + $(this).attr("id").substr(0,1);
        $(elem_selector).jui_pagination({
            navPagesMode: 'continuous'
        })
    });

    // show ----------------------------------
    $('[id$="show_panel"]').click(function() {
        var state = $(this).is(":checked");
        var elem_selector = '#' + 'demo_pag' + $(this).attr("id").substr(0,1);
        $(elem_selector).jui_pagination({
            useNavPane: state
        })
    });

    $('[id$="show_slider"]').click(function() {
        var state = $(this).is(":checked");
        var elem_selector = '#' + 'demo_pag' + $(this).attr("id").substr(0,1);
        $(elem_selector).jui_pagination({
            useSlider: state
        })
    });

    $('[id$="show_label_page"]').click(function() {
        var state = $(this).is(":checked");
        var elem_selector = '#' + 'demo_pag' + $(this).attr("id").substr(0,1);
        $(elem_selector).jui_pagination({
            showLabelPage: state
        })
    });

    $('[id$="show_total_pages"]').click(function() {
        var state = $(this).is(":checked");
        var elem_selector = '#' + 'demo_pag' + $(this).attr("id").substr(0,1);
        $(elem_selector).jui_pagination({
            showTotalPages: state
        })
    });



    // test some options (demo_pag1) ----------------------------
    $("#1visiblePageLinks_set").click(function() {
        $("#demo_pag1").jui_pagination({
            visiblePageLinks: parseInt($("#1visiblePageLinks_value").val())
        })
    });
    $("#1visiblePageLinks_reset").click(function() {
        $("#1visiblePageLinks_value").val('');
        $("#demo_pag1").jui_pagination({
            visiblePageLinks: 5
        })
    });
    $("#1visiblePageLinks_get").click(function() {
        alert($("#demo_pag1").jui_pagination('getOption', 'visiblePageLinks'));
    });


    $("#1totalPages_set").click(function() {
        $("#demo_pag1").jui_pagination({
            totalPages: parseInt($("#1totalPages_value").val())
        })
    });
    $("#1totalPages_reset").click(function() {
        $("#1totalPages_value").val('');
        $("#demo_pag1").jui_pagination({
            totalPages: 103
        })
    });
    $("#1totalPages_get").click(function() {
        alert($("#demo_pag1").jui_pagination('getOption', 'totalPages'));
    });


    $("#1containerClass_set").click(function() {
        $("#demo_pag1").jui_pagination({
            containerClass: 'container1_alt'
        })
    });
    $("#1containerClass_reset").click(function() {
        $("#demo_pag1").jui_pagination({
            containerClass: 'container1'
        })
    });
    $("#1containerClass_get").click(function() {
        alert($("#demo_pag1").jui_pagination('getOption', 'containerClass'));
    });


    // test some options (demo_pag2) ----------------------------
    $("#2visiblePageLinks_set").click(function() {
        $("#demo_pag2").jui_pagination({
            visiblePageLinks: parseInt($("#2visiblePageLinks_value").val())
        })
    });
    $("#2visiblePageLinks_reset").click(function() {
        $("#2visiblePageLinks_value").val('');
        $("#demo_pag2").jui_pagination({
            visiblePageLinks: 6
        })
    });
    $("#2visiblePageLinks_get").click(function() {
        alert($("#demo_pag2").jui_pagination('getOption', 'visiblePageLinks'));
    });


    $("#2totalPages_set").click(function() {
        $("#demo_pag2").jui_pagination({
            totalPages: parseInt($("#2totalPages_value").val())
        })
    });
    $("#2totalPages_reset").click(function() {
        $("#2totalPages_value").val('');
        $("#demo_pag2").jui_pagination({
            totalPages: 24
        })
    });
    $("#2totalPages_get").click(function() {
        alert($("#demo_pag2").jui_pagination('getOption', 'totalPages'));
    });

});


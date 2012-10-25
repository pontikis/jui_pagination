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
            if(isNaN(page_num) || page_num <= 0) {
                alert('Invalid page' + ' (' + page_num + ')');
            } else {
                $("#result").html('Page changed to: ' + page_num);
            }
        },
        onSetRowsPerPage: function(event, rpp) {
            if(isNaN(rpp) || rpp <= 0) {
                alert('Invalid rows per page' + ' (' + rpp + ')');
            } else {
                alert('rows per page successfully changed' + ' (' + rpp + ')');
                $(this).jui_pagination({
                    rowsPerPage: rpp
                })
            }
        },
        onDisplay: function() {
            var showRowsInfo = $(this).jui_pagination('getOption', 'showRowsInfo');
            if(showRowsInfo) {
                var prefix = $(this).jui_pagination('getOption', 'nav_rows_info_id_prefix');
                $("#" + prefix + $(this).attr("id")).text('Test info');
            }
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
        navPaneClass: 'navpane2 nav-pane ui-state-default ui-corner-all',
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
        var elem_selector = '#' + 'demo_pag' + $(this).attr("id").substr(0, 1);
        $(elem_selector).jui_pagination({
            navPagesMode: 'first-last-always-visible',
            showLabelTotalPages: false,
            showTotalPages: false,
            showNavButtons: false
        })
    });

    $('[id$="mode_continuous"]').click(function() {
        var elem_selector = '#' + 'demo_pag' + $(this).attr("id").substr(0, 1);
        $(elem_selector).jui_pagination({
            navPagesMode: 'continuous',
            showLabelTotalPages: true,
            showTotalPages: true,
            showNavButtons: true
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

});


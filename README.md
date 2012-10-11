jui_pagination
==============

jQuery pagination plugin (using jQuery UI)

Copyright Christos Pontikis http://pontikis.net License MIT

Preview:
---

![jui_pagination sample][sample]

[sample]: https://github.com/pontikis/jui_pagination/raw/master/demo/images/sample.png "jui_pagination sample"

Usage:
---

<p>HTML (head section)</p>

    <link rel="stylesheet" href="/path/to/jqueryui_theme/jquery-ui.css">
    <link rel="stylesheet" href="/path/to/jqueryui_theme/jquery.jui_pagination.css">

    <script type="text/javascript" src="/path/to/jquery.js"></script>
    <script type="text/javascript" src="/path/to/jquery-ui.js"></script>
    <script type="text/javascript" src="/path/to/jquery.jui_pagination.js"></script>


<p>JS code</p>

    $("#element_id").jui_pagination({
        totalPages: 100
    })

Detailed syntax:

    $("#element_id").jui_pagination({
        totalPages: 100,

        // DEFAULTS
        currentPage: 1,
        visiblePageLinks: 10,

        navPaneClass: 'nav-pane ui-widget ui-widget-header ui-corner-all',
        navCurrentPageClass: 'current-page',
        navButtonClass: 'nav-button ui-widget-header',
        navDotsLeftClass: 'nav-dots-left',
        navPagesClass: 'nav-pages',
        navItemClass: 'nav-item ui-widget-header',
        navItemSelectedClass: 'nav-item ui-state-highlight ui-widget-header',
        navDotsRightClass: 'nav-dots-right',
        navTotalPagesClass: 'total-pages',
        dividerClass: 'nav-slider-divider',

        labelPage: 'Page',
        labelTotalPages: 'Total',

        nav_pane_id_prefix: 'nav_pane_',
        nav_current_page_id_prefix: 'current_',
        nav_top_id_prefix: 'top_',
        nav_prev_id_prefix: 'prev_',
        nav_dots_left_id_prefix: 'dots_left_',
        nav_pages_id_prefix: 'pages_',
        nav_item_id_prefix: 'page_',
        nav_dots_right_id_prefix: 'dots_right_',
        nav_next_id_prefix: 'next_',
        nav_last_id_prefix: 'last_',
        nav_total_id_prefix: 'total_',
        divider_id_prefix: 'clear_',
        slider_id_prefix: 'sld_',

        onChangePage: function() {
        }
    })


Default styling needs jquery-ui Themes CSS: http://jqueryui.com/themeroller/

Demo
---

JSFIDDLE demo DEMO http://jsfiddle.net/pontikis/zwL4F/ (not working with Internet Explorer)
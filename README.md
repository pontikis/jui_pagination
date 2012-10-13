jui_pagination
==============

jQuery pagination plugin (using jQuery UI)

Copyright Christos Pontikis http://pontikis.net

License MIT

Usage:
------

HTML (head section)
------------------
```html
<link rel="stylesheet" href="/path/to/jqueryui_theme/jquery-ui.css">
<link rel="stylesheet" href="/path/to/jquery.jui_pagination.css">

<script type="text/javascript" src="/path/to/jquery.js"></script>
<script type="text/javascript" src="/path/to/jquery-ui.js"></script>
<script type="text/javascript" src="/path/to/jquery.jui_pagination.js"></script>
```

JS code
-------

### Common
```javascript
$("#element_id").jui_pagination({
    totalPages: 103, // REQUIRED
    containerClass: 'some_class' // NOT MANDATORY
    visiblePageLinks: 10,  // default = 10

    onChangePage: function(event, page_num) {
        $("#result").html('Page changed to: ' + page_num);
    }
});
```

Preview:

![jui_pagination sample][sample]
[sample]: https://raw.github.com/pontikis/jui_pagination/master/demo/images/sample.png "jui_pagination common usage"


### Nav pane and slider inside their own divs
```javascript
$("#element_id").jui_pagination({
    totalPages: 24, // REQUIRED
    containerClass: 'some_class' // NOT MANDATORY
    visiblePageLinks: 5  // default = 10

    navPaneElementID: 'some_div_id',
    navPaneClass: 'custom_class_for_pane nav-pane ui-widget ui-widget-header ui-corner-all',

    sliderElementID: 'some_div_id',
    sliderClass: 'custom_class_for_slider',
    sliderOrientation: 'vertical',

    onChangePage: function(event, page_num) {
        $("#result").html('Page changed to: ' + page_num);
    }
});
```

Preview:

![jui_pagination sample][sample1]
[sample1]: https://raw.github.com/pontikis/jui_pagination/master/demo/images/sample1.png "jui_pagination with pane and slider inside their own divs"


Options
-------
```javascript
$("#element_id").jui_pagination({
    totalPages: 100, // REQUIRED

    containerClass: 'some_class', // NOT MANDATORY

    // DEFAULTS
    currentPage: 1,
    visiblePageLinks: 10,

    useNavPane: true,
    navPaneElementID: false,

    useSlider: true,
    sliderElementID: false,
    useSliderWithPagesCount: 0,
    sliderOrientation: 'horizontal',

    labelPage: 'Page',
    labelTotalPages: 'Total',

    navPaneClass: 'nav-pane ui-widget ui-widget-header ui-corner-all',
    navCurrentPageClass: 'current-page',
    navButtonClass: 'nav-button ui-widget-header',
    navDotsLeftClass: 'nav-dots-left',
    navPagesClass: 'nav-pages',
    navItemClass: 'nav-item ui-widget-header',
    navItemSelectedClass: 'nav-item ui-state-highlight ui-widget-header',
    navItemHoverClass: 'ui-state-hover',
    navDotsRightClass: 'nav-dots-right',
    navTotalPagesClass: 'total-pages',
    sliderClass: 'nav-slider',

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
});
```

Default styling needs jquery-ui Themes CSS: http://jqueryui.com/themeroller/

Methods
------

### getDefaults
```javascript
$("#element_id").jui_pagination('getDefaults');
```
### getOption
```javascript
$("#element_id").jui_pagination('getOption', 'option_name');
```

### getAllOptions
```javascript
$("#element_id").jui_pagination('getAllOptions');
```

### setOption
```javascript
$("#element_id").jui_pagination('setOption', 'option_name', option_value, reinit);
```

#### Alternative way to set one or more options
```javascript
$("#element_id").jui_pagination({option1_name: option1_value, etc});
```

### destroy
```javascript
$("#element_id").jui_pagination('destroy');
```

Events
------

### onChangePage
```javascript
$("#element_id").jui_pagination({
    onChangePage: function() {
        // your code here
    }
});
```

Demo
----

JSFIDDLE demo DEMO http://jsfiddle.net/pontikis/zwL4F/ (not working with Internet Explorer)
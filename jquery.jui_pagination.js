/**
 * jquery pagination plugin
 * Requires jquery, jquery-ui slider, jquery-ui CSS
 * For touch event support jquery.ui.touch-punch.min.js could be used (see folder /lib)
 * Copyright 2012 Christos Pontikis http://pontikis.net
 * Project page https://github.com/pontikis/jui_pagination
 * UPCOMING Release 1.01
 * License MIT
 */
"use strict";
(function($) {

    var pluginName = 'jui_pagination';

    /* public methods ------------------------------------------------------- */
    var methods = {

        /**
         * @constructor
         * @param options
         * @return {*}
         */
        init: function(options) {

            var elem = this;

            return this.each(function() {

                /**
                 * settings and defaults
                 * using $.extend, settings modification will affect elem.data() and vive versa
                 */
                var settings = elem.data(pluginName);
                if(typeof(settings) == 'undefined') {
                    var defaults = elem.jui_pagination('getDefaults');
                    settings = $.extend({}, defaults, options);
                } else {
                    settings = $.extend({}, settings, options);
                }
                elem.data(pluginName, settings);

                var container_id = elem.attr("id");

                // simple validation
                validate_input(container_id);

                if(elem.data('error_occured')) {
                    elem.html('');
                    elem.data('error_occured', false);
                }

                if(settings.containerClass != '') {
                    elem.removeClass().addClass(settings.containerClass);
                }

                // bind events
                elem.unbind("onChangePage").bind("onChangePage", settings.onChangePage);

                // set container style


                var goto_page;

                // retrieve options
                var totalPages = settings.totalPages;
                var currentPage = settings.currentPage;
                var visiblePageLinks = settings.visiblePageLinks;

                var useNavButtons = settings.useNavButtons;

                var useNavPane = settings.useNavPane;
                var navPaneElementID = settings.navPaneElementID;

                var useSlider = settings.useSlider;
                var sliderElementID = settings.sliderElementID;
                var useSliderWithPagesCount = settings.useSliderWithPagesCount;
                var sliderOrientation = settings.sliderOrientation;

                var nav_pane_id = (!navPaneElementID ? settings.nav_pane_id_prefix + container_id : navPaneElementID);
                var slider_id = (!sliderElementID ? settings.slider_id_prefix + container_id : sliderElementID);

                var current_id = settings.nav_current_page_id_prefix + container_id;
                var nav_top_id = settings.nav_top_id_prefix + container_id;
                var nav_prev_id = settings.nav_prev_id_prefix + container_id;
                var nav_dots_left_id = settings.nav_dots_left_id_prefix + container_id;
                var nav_pages_id = settings.nav_pages_id_prefix + container_id;
                var nav_item_id_prefix = settings.nav_item_id_prefix + container_id + '_';
                var nav_dots_right_id = settings.nav_dots_right_id_prefix + container_id;
                var nav_next_id = settings.nav_next_id_prefix + container_id;
                var nav_last_id = settings.nav_last_id_prefix + container_id;
                var total_id = settings.nav_total_id_prefix + container_id;

                var disableSelectionNavPane = settings.disableSelectionNavPane;

                var showLabelCurrentPage = settings.showLabelCurrentPage;
                var showCurrentPage = settings.showCurrentPage;
                var showLabelTotalPages = settings.showLabelTotalPages;
                var showTotalPages = settings.showTotalPages;

                var navPaneClass = settings.navPaneClass;
                var navCurrentPageClass = settings.navCurrentPageClass;
                var navButtonClass = settings.navButtonClass;
                var navDotsLeftClass = settings.navDotsLeftClass;
                var navPagesClass = settings.navPagesClass;
                var navDotsRightClass = settings.navDotsRightClass;
                var navTotalPagesClass = settings.navTotalPagesClass;

                var sliderClass = settings.sliderClass;

                if(useSlider) {
                    var pageLimit = (useSliderWithPagesCount == 0 ? visiblePageLinks : Math.max(useSliderWithPagesCount, visiblePageLinks));
                    if(totalPages <= pageLimit) {
                        useSlider = false;
                    }
                }

                /* CREATE PANEL --------------------------------------------- */
                if(useNavPane) {

                    if(!navPaneElementID) {
                        if($("#" + nav_pane_id).length == 0) {
                            elem.html('<div id="' + nav_pane_id + '"></div>' + elem.html());
                        }
                    }

                    var nav_pane_html = '';





                    if(showLabelCurrentPage) {
                        nav_pane_html += '<div id="' + current_id + '">' + rsc_jui_pag.page_label  + '</div>';
                    }
                    if(showCurrentPage) {
                        nav_pane_html += '<div id="' + current_id + '">' + rsc_jui_pag.page_label  + '</div>';
                    }

                    if(useNavButtons) {
                        nav_pane_html += '<div id="' + nav_top_id + '">&laquo;</div>';
                        nav_pane_html += '<div id="' + nav_prev_id + '">&larr;</div>';
                        nav_pane_html += '<div id="' + nav_dots_left_id + '">...</div>';
                    }

                    nav_pane_html += '<div id="' + nav_pages_id + '">';
                    nav_pane_html += '</div>';

                    if(useNavButtons) {
                        nav_pane_html += '<div id="' + nav_dots_right_id + '">...</div>';
                        nav_pane_html += '<div id="' + nav_next_id + '">&rarr;</div>';
                        nav_pane_html += '<div id="' + nav_last_id + '">&raquo;</div>';
                    }

                    if(showTotalPages) {
                        nav_pane_html += '<div id="' + total_id + '">' + rsc_jui_pag.total_pages_label + ' ' + totalPages + '</div>';
                    }

                    // set nav_pane_html
                    $("#" + nav_pane_id).html(nav_pane_html);

                    // apply style
                    $("#" + nav_pane_id).removeClass().addClass(navPaneClass);

                    $("#" + current_id).removeClass().addClass(navCurrentPageClass);

                    $("#" + nav_top_id).removeClass().addClass(navButtonClass);
                    $("#" + nav_prev_id).removeClass().addClass(navButtonClass);
                    $("#" + nav_dots_left_id).removeClass().addClass(navDotsLeftClass);

                    $("#" + nav_pages_id).removeClass().addClass(navPagesClass);

                    $("#" + nav_dots_right_id).removeClass().addClass(navDotsRightClass);
                    $("#" + nav_next_id).removeClass().addClass(navButtonClass);
                    $("#" + nav_last_id).removeClass().addClass(navButtonClass);

                    $("#" + total_id).removeClass().addClass(navTotalPagesClass);

                    create_nav_items(container_id);

                    // panel enents
                    var selector;
                    if(useNavButtons) {

                        // click on go to top button
                        selector = "#" + nav_top_id;
                        $("#" + nav_pane_id).off('click', selector).on('click', selector, function() {
                            goto_page = 1;
                            change_page(container_id, goto_page, true, true);
                        });

                        // click on go to prev button
                        selector = "#" + nav_prev_id;
                        $("#" + nav_pane_id).off('click', selector).on('click', selector, function() {
                            goto_page = parseInt(settings.currentPage) - 1;
                            change_page(container_id, goto_page, true, true);
                        });

                        // click on go to next button
                        selector = "#" + nav_next_id;
                        $("#" + nav_pane_id).off('click', selector).on('click', selector, function() {
                            goto_page = parseInt(settings.currentPage) + 1;
                            change_page(container_id, goto_page, true, true);
                        });

                        // click on go to end button
                        selector = "#" + nav_last_id;
                        $("#" + nav_pane_id).off('click', selector).on('click', selector, function() {
                            goto_page = parseInt(settings.totalPages);
                            change_page(container_id, goto_page, true, true);
                        });

                    }

                    // click on nav page item
                    selector = '[id^="' + nav_item_id_prefix + '"]';
                    $("#" + nav_pane_id).off('click', selector).on('click', selector, function(event) {
                        var len = nav_item_id_prefix.length;
                        goto_page = $(event.target).attr("id").substr(len);
                        if(useNavButtons) {
                            change_page(container_id, goto_page, false, true);
                        } else {
                            change_page(container_id, goto_page, true, true);
                        }

                    });

                    if(disableSelectionNavPane) {
                        disableSelection($("#" + nav_pane_id));
                    }

                } else {
                    $("#" + nav_pane_id).removeClass();
                    $("#" + nav_pane_id).html('');
                }

                /* CREATE SLIDER -------------------------------------------- */
                if(useSlider) {

                    if(!sliderElementID) {
                        if($("#" + slider_id).length == 0) {
                            elem.append('<div id="' + slider_id + '"></div>');
                        }
                    }

                    $("#" + slider_id).removeClass(sliderClass).addClass(sliderClass);

                    $("#" + slider_id).slider({
                        min: 1,
                        max: totalPages,
                        value: (sliderOrientation == 'horizontal' ? currentPage : totalPages - currentPage + 1),
                        animate: 'slow',
                        range: (sliderOrientation == 'horizontal' ? 'min' : 'max'),
                        orientation: sliderOrientation,
                        stop: function(event, ui) {
                            goto_page = (sliderOrientation == 'horizontal' ? ui.value : totalPages - ui.value + 1);
                            change_page(container_id, goto_page, true, false);
                        }
                    });

                } else {
                    if(typeof($("#" + slider_id).data("slider")) == 'object') {
                        $("#" + slider_id).slider('destroy');
                        $("#" + slider_id).html('');
                    }
                }

            });

        },

        /**
         * Get default values
         * Usage: $(element).jui_pagination('getDefaults');
         * @return {Object}
         */
        getDefaults: function() {
            var defaults = {
                currentPage: 1,
                visiblePageLinks: 5,

                useNavButtons: false,

                useNavPane: true,
                navPaneElementID: false,

                useSlider: true,
                sliderElementID: false,
                useSliderWithPagesCount: 0,
                sliderOrientation: 'horizontal',

                maxVisiblePageLinks: 20,
                disableSelectionNavPane: false,

                showLabelCurrentPage: true,
                showCurrentPage: false,
                showLabelTotalPages: false,
                showTotalPages: false,

                navPaneClass: 'nav-pane ui-widget ui-widget-header ui-corner-all',
                navCurrentPageClass: 'current-page',
                navButtonClass: 'nav-button ui-widget-header',
                navDotsLeftClass: 'nav-dots-left',
                navPagesClass: 'nav-pages',
                navItemClass: 'nav-item ui-widget-header ui-corner-all',
                navItemSelectedClass: 'nav-item ui-state-highlight ui-widget-header ui-corner-all',
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

                onChangePage: function() {
                }
            };
            return defaults;
        },

        /**
         * Get any option set to plugin using its name (as string)
         * Usage: $(element).jui_pagination('getOption', some_option);
         * @param opt
         * @return {*}
         */
        getOption: function(opt) {
            var elem = this;
            return elem.data(pluginName)[opt];
        },

        /**
         * Get all options
         * Usage: $(element).jui_pagination('getAllOptions');
         * @return {*}
         */
        getAllOptions: function() {
            var elem = this;
            return elem.data(pluginName);
        },

        /**
         * Set option
         * Usage: $(element).jui_pagination('setOption', 'oprion_name',  'oprion_value',  reinit);
         * @param opt
         * @param val
         * @param reinit
         */
        setOption: function(opt, val, reinit) {
            var elem = this;
            elem.data(pluginName)[opt] = val;
            if(reinit) {
                elem.jui_pagination('init');
            }
        },

        /**
         * Destroy plugin
         * Usage: $(element).jui_pagination('destroy');
         * @param options
         * @return {*|jQuery}
         */
        destroy: function(options) {
            return $(this).each(function() {
                var $this = $(this);

                $this.removeData(pluginName);
            });
        }
    };

    /* private methods ------------------------------------------------------ */

    /**
     * Create element id
     * @param prefix
     * @param container_id
     * @return {*}
     */
    var create_id = function(prefix, plugin_container_id) {
        return prefix + plugin_container_id;
    }

    /**
     * Disable selection (jquery 1.8)
     * http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
     * @param element
     * @return {*}
     */
    var disableSelection = function(element) {
        return element
            .attr('unselectable', 'on')
            .css('user-select', 'none')
            .on('selectstart', false);
    };

    /**
     * Validate input values
     * @param container_id
     */
    var validate_input = function(container_id) {
        var totalPages = $("#" + container_id).jui_pagination('getOption', 'totalPages');
        if(parseInt(totalPages) <= 0 || isNaN(parseInt(totalPages))) {
            var err_msg = 'Invalid totalPages';
            $("#" + container_id).html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $("#" + container_id).data('error_occured', true);
            $.error(err_msg);
        }

        var currentPage = $("#" + container_id).jui_pagination('getOption', 'currentPage');
        if(parseInt(currentPage) <= 0 || isNaN(parseInt(currentPage))) {
            var err_msg = 'Invalid currentPage';
            $("#" + container_id).html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $("#" + container_id).data('error_occured', true);
            $.error(err_msg);
        }

        var visiblePageLinks = $("#" + container_id).jui_pagination('getOption', 'visiblePageLinks');
        if(parseInt(visiblePageLinks) <= 0 || isNaN(parseInt(visiblePageLinks))) {
            var err_msg = 'Invalid visiblePageLinks';
            $("#" + container_id).html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $("#" + container_id).data('error_occured', true);
            $.error(err_msg);
        }

        if(parseInt(currentPage) > parseInt(totalPages)) {
            var err_msg = 'Invalid currentPage > totalPages';
            $("#" + container_id).html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $("#" + container_id).data('error_occured', true);
            $.error(err_msg);
        }

        if(parseInt(visiblePageLinks) > parseInt(totalPages)) {
            var err_msg = 'Invalid visiblePageLinks > totalPages';
            $("#" + container_id).html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $("#" + container_id).data('error_occured', true);
            $.error(err_msg);
        }

        var maxVisiblePageLinks = $("#" + container_id).jui_pagination('getOption', 'maxVisiblePageLinks');
        if(parseInt(visiblePageLinks) > parseInt(maxVisiblePageLinks)) {
            var err_msg = 'Invalid visiblePageLinks > maxVisiblePageLinks';
            $("#" + container_id).html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $("#" + container_id).data('error_occured', true);
            $.error(err_msg);
        }
    }

    /**
     * Create nagivation pages
     * @param container_id
     */
    var create_nav_items = function(container_id) {

        // retrieve options
        var elem = $("#" + container_id);
        var s = $(elem).jui_pagination('getAllOptions');

        var useNavButtons = s.useNavButtons;

        var totalPages = s.totalPages;
        var currentPage = s.currentPage;
        var visiblePageLinks = s.visiblePageLinks;

        var nav_top_id = s.nav_top_id_prefix + container_id;
        var nav_prev_id = s.nav_prev_id_prefix + container_id;
        var nav_dots_left_id = s.nav_dots_left_id_prefix + container_id;
        var nav_pages_id = s.nav_pages_id_prefix + container_id;
        var nav_item_id_prefix = s.nav_item_id_prefix + container_id + '_';
        var nav_dots_right_id = s.nav_dots_right_id_prefix + container_id;
        var nav_next_id = s.nav_next_id_prefix + container_id;
        var nav_last_id = s.nav_last_id_prefix + container_id;

        var navItemClass = s.navItemClass;
        var navItemSelectedClass = s.navItemSelectedClass;
        var navItemHoverClass = s.navItemHoverClass;
        var navDotsLeftClass = s.navDotsLeftClass;
        var navDotsRightClass = s.navDotsRightClass;

        var nav_html = '';
        var goto = elem.data('goto');
        if(typeof(goto) == 'undefined') {
            goto = currentPage;
        }
        goto = parseInt(goto);

        if(useNavButtons) {

            var nav_start, nav_end, mod, offset, totalSections;
            nav_start = goto;

            // detect possible offset to navigation pages
            if(totalPages < visiblePageLinks) {
                nav_start = 1;
                nav_end = totalPages;
            } else {
                totalSections = Math.ceil(totalPages / visiblePageLinks);
                if(nav_start > visiblePageLinks * (totalSections - 1)) {
                    nav_start = totalPages - visiblePageLinks + 1;
                } else {
                    mod = nav_start % visiblePageLinks;
                    if(mod == 0) {
                        offset = -visiblePageLinks + 1;
                    } else {
                        offset = -mod + 1;
                    }
                    nav_start += offset;
                }
                nav_end = nav_start + visiblePageLinks - 1;
            }

            // store nav_start nav_end
            elem.data('nav_start', nav_start);
            elem.data('nav_end', nav_end);

            // show - hide nav controls
            var selector = '';
            selector = "#" + nav_top_id + ', ' + "#" + nav_prev_id + ', ' + "#" + nav_dots_left_id;
            if(nav_start > 1) {
                $(selector).show();
            } else {
                $(selector).hide();
            }

            selector = "#" + nav_dots_right_id + ', ' + "#" + nav_next_id + ', ' + "#" + nav_last_id;
            if(nav_end < totalPages) {
                $(selector).show();
            } else {
                $(selector).hide();
            }

            // create nav pages html
            for(var i = nav_start; i <= nav_end; i++) {
                nav_html += '<div id="' + nav_item_id_prefix + i + '">' + i + '</div>';
            }
            $("#" + nav_pages_id).html(nav_html);


        } else {

            var noNavButtonLinks = visiblePageLinks;
            if(noNavButtonLinks < 5) {
                noNavButtonLinks = 5;
            }
            var median_links = noNavButtonLinks - 2;
            var left_links = Math.floor((median_links - 1) / 2);
            var right_links = Math.ceil((median_links - 1) / 2);

            // create nav pages html
            if(goto <= median_links) {
                for(var i = 1; i <= median_links + 1; i++) {
                    nav_html += '<div id="' + nav_item_id_prefix + i + '">' + i + '</div>';
                }
                nav_html += '<div id="' + nav_dots_right_id + '">...</div>';
                nav_html += '<div id="' + nav_item_id_prefix + totalPages + '">' + totalPages + '</div>';
            } else if(goto > totalPages - median_links) {
                nav_html += '<div id="' + nav_item_id_prefix + '1' + '">1</div>';
                nav_html += '<div id="' + nav_dots_left_id + '">...</div>';
                for(var i = totalPages - median_links; i <= totalPages; i++) {
                    nav_html += '<div id="' + nav_item_id_prefix + i + '">' + i + '</div>';
                }
            } else {
                nav_html += '<div id="' + nav_item_id_prefix + '1' + '">1</div>';
                nav_html += '<div id="' + nav_dots_left_id + '">...</div>';
                for(var i = goto - left_links; i <= goto + right_links; i++) {
                    nav_html += '<div id="' + nav_item_id_prefix + i + '">' + i + '</div>';
                }
                nav_html += '<div id="' + nav_dots_right_id + '">...</div>';
                nav_html += '<div id="' + nav_item_id_prefix + totalPages + '">' + totalPages + '</div>';
            }
            $("#" + nav_pages_id).html(nav_html);


            $("#" + nav_dots_left_id).removeClass().addClass(navDotsLeftClass);
            $("#" + nav_dots_right_id).removeClass().addClass(navDotsRightClass);
        }

        // apply style for navigation items (pages)
        $('[id^="' + nav_item_id_prefix + '"]').removeClass().addClass(navItemClass);
        $("#" + nav_item_id_prefix + goto).removeClass().addClass(navItemSelectedClass);

        if(navItemHoverClass != '') {
            $('[id^="' + nav_item_id_prefix + '"]').hover(
                function() {
                    $(this).addClass(navItemHoverClass);
                },
                function() {
                    $(this).removeClass(navItemHoverClass);
                }
            );
        }
    };

    /**
     * Update current page
     * @param container_id
     * @param goto_page
     * @param update_slider
     */
    var update_current_page = function(container_id, goto_page, update_slider) {

        // retrieve options
        var elem = $("#" + container_id);
        var s = $(elem).jui_pagination('getAllOptions');

        var totalPages = s.totalPages;

        var sliderElementID = s.sliderElementID;
        var slider_id = (!sliderElementID ? s.slider_id_prefix + container_id : sliderElementID);
        var sliderOrientation = s.sliderOrientation;

        var current_id = s.nav_current_page_id_prefix + container_id;
        var nav_item_id_prefix = s.nav_item_id_prefix + container_id + '_';

        var navItemClass = s.navItemClass;
        var navItemSelectedClass = s.navItemSelectedClass;

        // change selected page, applying appropriate styles
        $('[id^="' + nav_item_id_prefix + '"]').removeClass().addClass(navItemClass);
        $("#" + nav_item_id_prefix + goto_page).removeClass().addClass(navItemSelectedClass);

        // update slider if exists
        if(update_slider) {
            if(typeof($("#" + slider_id).data("slider")) == 'object') {
                $("#" + slider_id).slider({
                    'value': (sliderOrientation == 'horizontal' ? goto_page : totalPages - goto_page + 1)
                });
            }
        }

        // update currentPage option
        elem.jui_pagination('setOption', 'currentPage', goto_page, false);

        // trigger event onChangePage
        elem.triggerHandler("onChangePage", goto_page);
    };

    /**
     * Change page
     * @param container_id
     * @param page_num
     * @param update_slider
     */
    var change_page = function(container_id, goto_page, update_nav_items, update_slider) {
        $("#" + container_id).data('goto', goto_page);
        if(update_nav_items) {
            create_nav_items(container_id);
        }
        update_current_page(container_id, goto_page, update_slider);
    }

    $.fn.jui_pagination = function(method) {

        if(this.size() != 1) {
            var err_msg = 'You must use this plugin with a unique element (at once)';
            this.html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $.error(err_msg);
        }

        // Method calling logic
        if(methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
        }

    };

})(jQuery);
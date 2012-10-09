/**
 * jquery pagination plugin
 * Requires jquery, jquery-ui
 * Copyright 2012 Christos Pontikis (http://pontikis.net)
 * Project page https://github.com/pontikis/jui_pagination
 * Release 1.00 - ??/10/2012
 * License MIT
 */
(function($) {

    var pluginName = 'jui_pagination';

    // private methods
    var create_nav_items = function(container_id) {

        var elem = $("#" + container_id);

        var settings = $(elem).jui_pagination('getAllOptions');

        var totalPages = settings.totalPages;
        var currentPage = settings.currentPage;
        var visiblePageLinks = settings.visiblePageLinks;

        var nav_pages_id = settings.navPages_id_prefix + container_id;
        var slider_id = settings.slider_id_prefix + container_id;

        var current_id = settings.current_id_prefix + container_id;
        var top_id_prefix = settings.top_id_prefix + container_id + '_';
        var prev_id_prefix = settings.prev_id_prefix + container_id + '_';
        var nav_item_id_prefix = settings.nav_item_id_prefix + container_id + '_';
        var nav_item_selected_id_prefix = settings.nav_item_selected_id_prefix + container_id + '_';
        var nav_item_link_id_prefix = settings.nav_item_link_id_prefix + container_id + '_';
        var next_id_prefix = settings.next_id_prefix + container_id + '_';
        var last_id_prefix = settings.last_id_prefix + container_id + '_';
        var total_id = settings.total_id_prefix + container_id;

        var labelPage = settings.labelPage;
        var labelTotalPages = settings.labelTotalPages;

        var navPagesClass = settings.navPagesClass;
        var navCurrentPage = settings.navCurrentPage;
        var navItemClass = settings.navItemClass;
        var navItemSelectedClass = settings.navItemSelectedClass;
        var navItemLinkClass = settings.navItemLinkClass;
        var navTotalPages = settings.navTotalPages;

        var offset = elem.data('offset');
        if(typeof(offset) == 'undefined') {
            elem.data('offset', 0);
            offset = 0;
        }

        var nav_start = elem.data('nav_start');
        if(typeof(nav_start) == 'undefined') {
            elem.data('nav_start', 1);
            nav_start = 1;
        }
        var nav_end;

        if(totalPages < visiblePageLinks) {
            nav_start = 1;
            nav_end = totalPages;
        } else {
            // special conditions
            var dist_to_last = totalPages - (nav_start - 1);
            if(dist_to_last < visiblePageLinks) {
                nav_start = nav_start - (visiblePageLinks - dist_to_last);
            }
            nav_end = nav_start + visiblePageLinks - 1;
        }

        var nav_html = '';

        nav_html += '<div id="' + current_id + '">' + labelPage + ' ' + currentPage + '</div>';

        if(nav_start > 1) {
            nav_html += '<div class="nav-item ui-widget-header"><a href="javascript:void(0);" class="nav-link">&laquo;</a></div>';
            nav_html += '<div class="nav-item ui-widget-header"><a href="javascript:void(0);" class="nav-link">&larr;</a></div>';
        }

        for(var i = nav_start; i <= nav_end; i++) {
            if(i == currentPage) {
                nav_html += '<div id="' + nav_item_selected_id_prefix + i + '">' +
                    '<a id="' + nav_item_link_id_prefix + i + '" href="javascript:void(0);">' + i + '</a>' +
                    '</div>';
            } else {
                nav_html += '<div id="' + nav_item_id_prefix + i + '">' +
                    '<a id="' + nav_item_link_id_prefix + i + '" href="javascript:void(0);">' + i + '</a>' +
                    '</div>';
            }

        }

        if(nav_end < totalPages) {
            nav_html += '<div class="nav-item ui-widget-header"><a href="javascript:void(0);" class="nav-link">&rarr;</a></div>';
            nav_html += '<div class="nav-item ui-widget-header"><a href="javascript:void(0);" class="nav-link">&raquo;</a></div>';
        }

        nav_html += '<div id="' + total_id + '">' + labelTotalPages + ' ' + totalPages + '</div>';

        // set nav pane html
        $("#" + nav_pages_id).html(nav_html);

        // apply style
        $("#" + nav_pages_id).removeClass().addClass(navPagesClass);
        $("#" + current_id).removeClass().addClass(navCurrentPage);

        var selector;
        selector = '[id^="' + nav_item_id_prefix + '"]';
        $(selector).removeClass().addClass(navItemClass);

        selector = '[id^="' + nav_item_selected_id_prefix + '"]';
        $(selector).removeClass().addClass(navItemSelectedClass);

        selector = '[id^="' + nav_item_link_id_prefix + '"]';
        $(selector).removeClass().addClass(navItemLinkClass);

        $("#" + total_id).removeClass().addClass(navTotalPages);

        // set currentPage and return page number when click on nav page item
        var nav_item_selector = '[id^="' + nav_item_link_id_prefix + '"]';
        $(nav_item_selector).on('click', function() {
            var len = nav_item_link_id_prefix.length;
            var page_num = $(this).attr("id").substr(len);
            var previous_currentPage = settings.currentPage;
            settings.currentPage = page_num;
            elem.jui_pagination('setOption', 'currentPage', page_num, false);

            // change id and apply appropriate styles
            $("#" + nav_item_selected_id_prefix + previous_currentPage).removeClass().addClass(navItemClass);
            $("#" + nav_item_selected_id_prefix + previous_currentPage).attr("id", nav_item_id_prefix + previous_currentPage);

            $("#" + nav_item_id_prefix + page_num).removeClass().addClass(navItemSelectedClass);
            $("#" + nav_item_id_prefix + page_num).attr("id", nav_item_selected_id_prefix + page_num);

            // change current page
            $("#" + current_id).text(labelPage + ' ' + page_num);

            // update slider if exists
            if(totalPages > visiblePageLinks) {
                $("#" + slider_id).slider({'value': page_num});
            }

            // trigger event
            elem.triggerHandler("onNavPageClick", page_num);
        });


    };

    // public methods
    var methods = {

        /**
         * @constructor
         * @param options
         * @return {*}
         */
        init: function(options) {

            var elem = this;

            return this.each(function() {

                // settings and defaults
                var settings = elem.data(pluginName);
                if(typeof(settings) == 'undefined') {
                    var defaults = elem.jui_pagination('getDefaults');
                    settings = $.extend({}, defaults, options);
                } else {
                    settings = $.extend({}, settings, options);
                }
                elem.data(pluginName, settings);

                // bind events
                elem.unbind("onNavPageClick").bind("onNavPageClick", elem.jui_pagination('getOption', 'onNavPageClick'));

                // set width
                if(settings.container_class != '') {
                    elem.removeClass().addClass(settings.container_class);
                }

                // create nav-pages, divider div and slider
                var container_id = elem.attr("id");
                var nav_pages_id = settings.navPages_id_prefix + container_id;
                var nav_slider_divider_id = settings.divider_id_prefix + container_id;
                var slider_id = settings.slider_id_prefix + container_id;

                var elem_html = '';
                elem_html += '<div id="' + nav_pages_id + '"></div>';
                elem_html += '<div id="' + nav_slider_divider_id + '"></div>';
                elem_html += '<div id="' + slider_id + '"></div>';

                elem.html(elem_html);

                create_nav_items(container_id);


                $("#" + nav_slider_divider_id).removeClass().addClass(settings.dividerClass);

                //  slider
                if(settings.totalPages > settings.visiblePageLinks) {
                    $("#" + slider_id).slider({
                        min: 1,
                        max: settings.totalPages,
                        value: settings.currentPage,
                        animate: 'slow',
                        range: 'min',
                        stop: function(event, ui) {
                            elem.data('nav_start', ui.value);
                            create_nav_items(container_id);
                        }
                    });

                } else {
                    if($("#" + slider_id).data("slider")) {
                        $("#" + slider_id).slider('destroy');
                        $("#" + slider_id).html('');
                    }
                }




            });
        },

        /**
         * Get default values
         * @return {Object}
         */
        getDefaults: function() {
            var defaults = {
                currentPage: 1,
                visiblePageLinks: 10,

                navPagesClass: 'nav-pane ui-widget ui-widget-header ui-corner-all',
                navCurrentPage: 'current-page',
                navItemClass: 'nav-item ui-widget-header',
                navItemSelectedClass: 'nav-item ui-state-highlight ui-widget-header',
                navItemLinkClass: 'nav-link',
                navTotalPages: 'total-pages',
                dividerClass: 'nav-slider-divider',

                labelPage: 'Page',
                labelTotalPages: 'Total',

                navPages_id_prefix: 'nav_',
                slider_id_prefix: 'sld_',
                divider_id_prefix: 'clear_',
                current_id_prefix: 'current_',
                top_id_prefix: 'top_',
                prev_id_prefix: 'prev_',
                nav_item_id_prefix: 'page_',
                nav_item_selected_id_prefix: 'page_sel_',
                nav_item_link_id_prefix: 'page_link_',
                next_id_prefix: 'next_',
                last_id_prefix: 'last_',
                total_id_prefix: 'total_',
                onNavPageClick: function() {
                }
            };
            return defaults;
        },

        /**
         * Get any option set to plugin using its name (as string)
         * Usage: $(element).jui_datagrid('getOption', some_option);
         * @param opt
         * @return {*}
         */
        getOption: function(opt) {
            var elem = this;
            return elem.data(pluginName)[opt];
        },

        /**
         * Get all options
         * @return {*}
         */
        getAllOptions: function() {
            var elem = this;
            return elem.data(pluginName);
        },

        /**
         *
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

    $.fn.jui_pagination = function(method) {

        if(this.size() != 1) {
            var err_msg = 'You must use this plugin with a unique element';
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
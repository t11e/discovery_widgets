/**
 * history 1.2 - Plugin for jQuery
 *
 *
 * IE8 is supporting onhashchange event
 * http://msdn.microsoft.com/en-us/library/cc288209(VS.85).aspx
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Depends:
 *   jquery.js
 *
 *  Copyright (c) 2008 Oleg Slobodskoi (ajaxsoft.de)
 */

(function ($, window, top) {
    var instance;

    $.history = function (method, param) {
        if (typeof method === 'function') {
            param = method;
            method = 'bind';
        }
        // bind and unbind methods need a callback function
        else if (/bind|unbind/.test(method) && !$.isFunction(param)) {
            return;
        }

        if (!instance) {
            instance = new Hist();
            instance.init();
        }

        if (method !== 'init') {
            instance[method](param);
        }
    };

    function Hist() {
        var self = this,
            IE67 = $.browser.msie && parseInt($.browser.version, 10) < 8,
            IE8 = $.browser.msie && parseInt($.browser.version, 10) >= 8,
            $iframe,
            $wnd = $(window),
            stop = false;

        self.value = top.location.hash.substr(1);

        this.init = function () {
            if (IE8) {
                $wnd.bind('hashchange', IE8Handler);
            } else if (IE67) {
                initIframe();
            } else {
                (function () {
                    if (stop) {
                        return;
                    }
                    if (top.location.hash.substr(1) !== self.value) {
                        changed(top.location.hash);
                    }
                    setTimeout(arguments.callee, 50);
                }());
            }
        };

        this.destroy = function () {
            // stop timeout
            stop = true;
            // remove iframe for IE6-7
            if ($iframe) {
                $iframe.remove();
            }
            // unbind all events
            $wnd.unbind('hashchanged');
            // remove the reference to the instance
            instance = null;
            // unbind event for IE8
            if (IE8) {
                $wnd.unbind('hashchange', IE8Handler);
            }
        };

        this.bind = function (callback) {
            $wnd.bind('hashchanged', callback);
        };

        this.unbind = function (callback) {
            $wnd.unbind('hashchanged', callback);
        };

        this.add = function (value) {
            top.location.hash = value;
        };

        this.forward = function () {
            history.go(1);
        };

        this.back = function () {
            history.go(-1);
        };

        /**
         * Only for IE6-7
         * Check if iframe hash the same as document
         */
        function initIframe() {
            $iframe = $iframe || $('<iframe style="display: none;" class="x-history-iframe"/>').appendTo(document.body);
            // if document is not ready, access to the contentWindow of the iframe is not immediately available
            try {
                var ignored = $iframe[0].contentWindow;
            } catch (e) {
                setTimeout(arguments.callee, 50);
                return;
            }

         // get the document of the iframe
            function iDoc() {
                return $iframe[0].contentWindow.document;
            }

            var iHash = iDoc().location.hash,
                hash = top.location.hash,
                iHashNew, hashNew;

            (function () {
                if (stop) {
                    return;
                }
                iHashNew = iDoc().location.hash;
                hashNew = top.location.hash;

                // changed using navigation buttons
                if (iHashNew !== iHash) {
                    iHash = iHashNew;
                    hash = iHash;
                    top.location.hash = changed(iHash);
                // changed using link or add method
                } else if (hashNew !== hash) {
                    hash = hashNew;
                    updateIFrame(hash);
                }
                setTimeout(arguments.callee, 50);
            }());

            // save value to the iframe
            function updateIFrame(value) {
                iDoc().open();
                iDoc().close();
                iDoc().location.hash = value;
            }
        }

        /**
         * hash was changed - do something
         * @param {String} value - '#value'
         */
        function changed(value) {
            self.value = value.substr(1);
            // call all callbacks
            $.event.trigger('hashchanged', [self]);
            return self.value;
        }

        function IE8Handler(e) {
            changed(top.location.hash);
        }


    }
}(jQuery, window, top));

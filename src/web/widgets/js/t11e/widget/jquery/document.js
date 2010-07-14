/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview document.js
 */
t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Finds all elements with a class of t11e-widget and copies the element and its
 * following script tag into a doc_wrapper html element (e.g. a pre tag) so that
 * the widget can be documented. Used by the JSDoc pages to document and show an
 * example widget which can easily be maintained in the JSDoc comment.
 *
 * @param $ jQuery
 * @param doc_wrapper optional string for the html element that will wrap the
 * documentation. Defaults to '<span></span>'.
 */
t11e.widget.jquery.document_widgets = function ($, doc_wrapper) {
    doc_wrapper = doc_wrapper || '<span/>';
    var get_element_html = function (element) {
        var wrapper = $('<span/>');
        wrapper.append($(element).clone());
        return $(wrapper).html();
    };

    $('.t11e-widget').each(function (index, element) {
        var widget_template_html = get_element_html(element);
        var script_content = $(element).next('script').html();
        var documented_content = widget_template_html;
        if (script_content) {
            documented_content += '\n<script type="text/javascript">' + script_content + '</script>';
        }
        var target = $(doc_wrapper);
        $(target).text(documented_content);
        $(element).before(target);
    });

    $('.t11e-widget-example').each(function (index, element) {
        var first = element.firstChild;
        if (t11e.util.is_defined(first) && first.nodeType === first.COMMENT_NODE) {
            var example_content = first.nodeValue;
            var documentation = $(doc_wrapper);
            $(documentation).text(example_content);
            $(element).before(documentation);

            var widget = $(first.nodeValue);
            $(element).before(widget);
            $(element).remove();
        }
    });
};

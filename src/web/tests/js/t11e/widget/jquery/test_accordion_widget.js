        test('Accordion positioning', function () {
            var test_offset = function (scroll_pos, current_offset, orig_offset) {
                if (scroll_pos >= orig_offset) {
                    same(current_offset >= orig_offset, true,
                        'Offset should be greater than scroll position: ' +
                        scroll_pos + '/' + current_offset + '/' + orig_offset);
                } else {
                    same(current_offset <= orig_offset, true,
                        'Offset should be less than scroll position: ' +
                        scroll_pos + '/' + current_offset + '/' + orig_offset);
                }
            }

            same($('[t11e-widget-id=accordion1]').css('position'), 'static');
            same($('[t11e-widget-id=accordion2]').css('position'), 'static');

            var acc1 = $('[t11e-widget-id=accordion1]').find('.t11e-widget-jquery-accordion-bd:first');
            var acc2 = $('[t11e-widget-id=accordion2]').find('.t11e-widget-jquery-accordion-bd:first');
            var acc1_click = acc1.find('.t11e-accordion-top:first');
            var acc2_click = acc2.find('.t11e-accordion-top:first');

            $(window).bind('scroll', function (event) {
                t11e.util.log('Scroll Position:', $(window).scrollTop());
                t11e.util.log('Position 1:', acc1.position().top);
                t11e.util.log('Position 2:', acc2.position().top);
                t11e.util.log('Offset 1:', acc1.offset().top);
                t11e.util.log('Offset 2:', acc2.position().top);
            });

            // Insure window is scrolled to the top
            //$(window).scrollTop(0);
            //$(window).scroll();

            var pos1 = acc1.position().top;
            var pos2 = acc2.position().top;
            var off1 = acc1.offset().top;
            var off2 = acc2.offset().top;

            t11e.util.log('Original Position 1:', pos1);
            t11e.util.log('Original Position 2:', pos2);
            t11e.util.log('Original Offset 1:', off1);
            t11e.util.log('Original Offset 2:', off2);

            same(true, pos1 !== pos2, 'Top positions should be different');
            same(pos1, off1, 'Acc1 - Position and offset should be the same');
            same(true, pos2!==off2, 'Acc2 - Position and offset should not be the same');

            t11e.util.log("Scrolling...", pos1);
            $(window).scrollTop(pos1);
            $(window).scroll();
            same(acc1.position().top, pos1);
            same(acc2.position().top, pos2);
            same(acc1.offset().top, off1);
            same(acc2.offset().top, off2);

            t11e.util.log("Scrolling...", pos2);
            $(window).scrollTop(off1);
            $(window).scroll();
            same(acc1.position().top, pos1);
            same(acc2.position().top, pos2);
            same(acc1.offset().top, off1);
            same(acc2.offset().top, off2);

            t11e.util.log("Scrolling...", off2);
            $(window).scrollTop(off2);
            $(window).scroll();
            same(acc1.position().top, pos1);
            same(acc2.position().top, pos2);
            same(acc1.offset().top, off1);
            same(acc2.offset().top, off2);

            // Open accordions
            t11e.util.log("Clicking buttons");
            $(window).scrollTop(0);
            acc1_click.click();
            acc2_click.click();
            $(window).scroll();

            t11e.util.log("Scrolling...", pos1);
            $(window).scrollTop(pos1);
            $(window).scroll();
            test_offset(off1, acc2.offset().top, off2)

            t11e.util.log("Scrolling...", pos2);
            $(window).scrollTop(pos2);
            $(window).scroll();
            test_offset(off1, acc2.offset().top, off2)

            t11e.util.log("Scrolling...", off1);
            $(window).scrollTop(off1);
            $(window).scroll();
            test_offset(off1, acc2.offset().top, off2)

            t11e.util.log("Scrolling...", off2);
            $(window).scrollTop(off2);
            $(window).scroll();
            test_offset(off2, acc2.offset().top, off2)

            t11e.util.log("Scrolling...", off2 + 10);
            $(window).scrollTop(off2 + 10);
            $(window).scroll();
            test_offset(off2 + 10, acc2.offset().top, off2)

            // Close accordion
            acc1_click.click();
            acc2_click.click();
        });
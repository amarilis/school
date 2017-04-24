(function(window, document, undefined) {
    'use strict';

    /**
     * Переменные для тултипа
     *
     * showingTooltip для тултипа descktop
     * showTooltipMobile для тултипа mobile
     */
    var showingTooltip,
        showTooltipMobile;

    /**
     * Показ тултипа при наведении на элемент с атрибутом data-tooltip
     *
     * для экранов больше 700
     */
    document.addEventListener('mouseover', function (e) {
        if (document.documentElement.clientWidth < 700) return;
        e = e || event;
        var target = e.target || e.srcElement;
        var tooltip = target.getAttribute('data-tooltip');
        if (!tooltip) return;
        var tooltipElem = document.createElement('div');
        tooltipElem.className = 'schedule__reader-tooltip';
        tooltipElem.innerHTML = tooltip;
        document.body.appendChild(tooltipElem);
        var coords = getCoords(target);
        var scroll = getPageScroll();
        var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth)/2^0;
        if (left < scroll.left) left = scroll.left;
        var top = coords.top - tooltipElem.offsetHeight - 5;
        if (top < scroll.top) {
            top = coords.top + target.offsetHeight + 5;
        }
        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
        tooltipElem.style.opacity = 1;
        showingTooltip = tooltipElem;
    }, false);

    document.addEventListener('mouseout', function (e) {
        if (showingTooltip) {
            document.body.removeChild(showingTooltip);
            showingTooltip = null;
        }
    }, false);

    /**
     * Получение координат прокрутки
     *
     * @returns {*} координаты
     */
    function getPageScroll() {
        if (window.pageXOffset != undefined) {
            return {
                left: pageXOffset,
                top: pageYOffset
            }
        }
        var html = document.documentElement;
        var body = document.body;
        var top = html.scrollTop || body && body.scrollTop || 0;
        top -= html.clientTop;
        var left = html.scrollLeft || body && body.scrollLeft || 0;
        left -= html.clientLeft;
        return { top: top, left: left };
    }

    /**
     * Получение координат
     *
     * @param elem
     * @returns {{top: number, left: number}} координаты
     */
    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        var body = document.body;
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return { top: Math.round(top), left: Math.round(left) };
    }

    /**
     * Показ тултипа при клике на элементе с атрибутом data-tooltip,
     * срабатывает при ширине экрана меньше 700px
     */
    document.addEventListener('click', function (e) {

        if (document.documentElement.clientWidth > 700) return;

        if (!e.target.closest('.schedule__reader-tooltip-mobile') && document.querySelector('.schedule__reader-tooltip-mobile') != null) {
            document.querySelector('.schedule__reader-tooltip-mobile').parentNode.removeChild(document.querySelector('.schedule__reader-tooltip-mobile'));
        }

        var target = e.target;

        while (target !== this) {
            if (target.getAttribute('data-tooltip') == null) return;
            var tooltip = target.getAttribute('data-tooltip');
            if (!!tooltip) break;
            target = target.parentNode;
        }

        if (!tooltip) return;

        var tooltipElem = document.createElement('div');
        tooltipElem.className = 'schedule__reader-tooltip-mobile';
        tooltipElem.innerHTML = tooltip;
        target.parentNode.insertBefore(tooltipElem, target.nextSibling);
        tooltipElem.style.opacity = 1;

        return tooltipElem;

    }, false);

    


})(window,document);
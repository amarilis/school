(function(window, document, undefined) {
    'use strict';
    var popup = {};

    popup.data = {
        htmlContent : '', // Содержимое всплывающего блока
        elem : '', // Элемент около которого появляется блок
        type : '' // Тип popup`а error или ok, для показа блока посередине окна
    };

    // позиционирование popup
    popup.popupPosition = function() {
        var popup = document.querySelector('.popup');
        if ( parseInt(popup.style.left) + popup.offsetWidth > document.documentElement.clientWidth ) {
            popup.style.left = document.documentElement.clientWidth - popup.offsetWidth - 5 +'px';
        }
    }

    // Отрисовка и показ всплывающего блока
    popup.show = function(day,month,year) {
        if (!!document.querySelector('#popup')) return;
        var popupElem = document.createElement('div');
        popupElem.className = 'popup';
        popupElem.id = 'popup';
        popupElem.innerHTML = popup.data.htmlContent;
        document.body.appendChild(popupElem);


        if (popup.data.elem != undefined) {

            var coords = popup.data.elem.getBoundingClientRect();

            var left, top;

            left = coords.left + (popup.data.elem.offsetWidth - popupElem.offsetWidth) / 2;
            if (left < 0) left = 0;
            top = coords.top - popupElem.offsetHeight - 5 + window.pageYOffset;

            if (top < 0) {
                top = coords.top + popup.data.elem.offsetHeight + 5;
            }

            popupElem.style.left = left + 'px';
            popupElem.style.top = top + 'px';

            popupElem.style.opacity = 1;


        } else {
            switch (popup.data.type) {
                case 'error':
                    popupElem.className = 'popup popup_info popup_error';
                    break;

                case 'ok':
                    popupElem.className = 'popup popup_info popup_ok';
                    break;


            }
        }

    };

    window.popup = popup;
})(window,document);
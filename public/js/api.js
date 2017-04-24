(function (window, document, undefined) {
    'use strict';

    var nowDate = new Date();
    var dateRegExp = /^(((0[1-9]|[12]\d|3[01])\.(0[13578]|1[02])\.((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\.(0[13456789]|1[012])\.((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\.02\.((19|[2-9]\d)\d{2}))|(29\.02\.((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;


    var scheduleEdit = document.querySelectorAll('.schedule__theme_edit');
    /**
     * Показ и скрытие режима администрирования.
     * При активном режиме в блоке лекций появляется кнопка edit
     */
    document.querySelector('.b-adminstiration__button').addEventListener('click', function () {
        this.classList.toggle('batton_activate');
        if (this.classList.contains('batton_activate')) {
            document.querySelector('.b-adminstiration__edit').classList.add('b-adminstiration__edit-show');
            for (var i = 0; i < scheduleEdit.length; i++) {
                scheduleEdit[i].classList.add('schedule__theme_edit-show');
            }
        } else {
            document.querySelector('.b-adminstiration__edit').classList.remove('b-adminstiration__edit-show');
            for (var i = 0; i < scheduleEdit.length; i++) {
                scheduleEdit[i].classList.remove('schedule__theme_edit-show');
            }
        }
    }, false);

    /**
     * Удаляет из списка option`ов выделенный
     * добавляет его рядом с select
     * так же в нем присутствует кнопка удалить его
     * при удалении он возвращаетс в select
     *
     * @param obj {Object} текущий объект select
     * @param count {Number} возможное количество выделенных пунктов
     * @param index {Number} индекс в селекте
     */
    function addSelectItem(obj, count, index) {

        if (count == 1 && obj.parentNode.querySelector('.select_actions_block')) {
            obj.parentNode.querySelector('.select_actions_block').querySelector('.select_actions_close').click();
        }

        var thisSelected = obj.options[index] || obj.options[obj.selectedIndex];
        var div = document.createElement('div');
        div.className = thisSelected.parentNode.className.split(' ')[1] + '-thisSelected select_actions_block';
        div.innerHTML = thisSelected.text;
        var close = document.createElement('div');
        close.className = thisSelected.parentNode.className.split(' ')[1] + '-thisSelectedClose select_actions_close';
        close.addEventListener('click', function () {
            DeleteSelectItem(this);
        }, false);
        div.appendChild(close);
        var inp = document.createElement('input');
        inp.setAttribute('type', 'hidden');
        inp.setAttribute('name', thisSelected.parentNode.className.split(' ')[1].split('__')[1].split('_')[1]);
        inp.setAttribute('value', thisSelected.text);
        div.appendChild(inp);
        thisSelected.parentNode.parentNode.appendChild(div);
        thisSelected.parentNode.removeChild(thisSelected);
    }


    /**
     * Удаляет блок с именем из селекта и вставляет это имя в селект
     * работает для удаления из addSelectItem
     *
     * @param obj {Object} кнопка закрытия на блоке
     * @constructor
     */
    function DeleteSelectItem(obj) {
        //console.log(obj.parentNode.textContent);
        var select = document.querySelector('.' + obj.className.split(' ')[0].split('-')[0]);
        var option = new Option(obj.parentNode.textContent);
        select.appendChild(option);
        obj.parentNode.parentNode.removeChild(obj.parentNode);
    }


    /**
     * change селект добавления школы
     */
    document.querySelector('.adminstiration__add_school').addEventListener('change', function (e) {
        addSelectItem(this);
        e.stopPropagation();
    }, false);

    /**
     * change селект добавления лектора
     */
    document.querySelector('.adminstiration__add_readers').addEventListener('change', function (e) {
        addSelectItem(this);
        e.stopPropagation();
    }, false);

    /**
     * change селект добавления комнаты
     */
    document.querySelector('.adminstiration__add_rooms').addEventListener('change', function (e) {
        addSelectItem(this, 1);
        e.stopPropagation();
    }, false);


    /**
     * Клик по чекбоксу(или лейблу) для блокировки соседнего селекта
     * Используется при добавлении/редактировании школы, класса
     *
     * @type {NodeList} список чекбоксов над селектами
     */
    var allInputCheckboxChoose = document.querySelectorAll('.input_checkbox-choose'),
        indICC, btnICC;
    for (indICC = 0; indICC < allInputCheckboxChoose.length; indICC++) {
        btnICC = allInputCheckboxChoose[indICC];
        btnICC.addEventListener('change', clickInputCheckboxChoose, false);
    }
    function clickInputCheckboxChoose(e) {
        if (this.checked) {
            this.parentNode.parentNode.querySelector('.select__item').setAttribute("disabled", "disabled");
            this.parentNode.parentNode.parentNode.querySelector('.input_Id').value = this.parentNode.parentNode.querySelector('.select__item').options[0].getAttribute('data-id');
            var allInputSiblingInputCheckboxChoose = this.parentNode.parentNode.parentNode.querySelectorAll('.input'),
                indISICC, oneInputSiblingInputCheckboxChoose;
            for (indISICC = 0; indISICC < allInputSiblingInputCheckboxChoose.length; indISICC++) {
                oneInputSiblingInputCheckboxChoose = allInputSiblingInputCheckboxChoose[indISICC];
                oneInputSiblingInputCheckboxChoose.value = '';
            }
        } else {
            this.parentNode.parentNode.querySelector('.select__item').removeAttribute("disabled");
        }
        e.stopPropagation();
    };


    /**
     * Изменение селекта
     * Добавление/редактирование школы
     */
    document.querySelector('.adminstiration__add_edit_school').addEventListener('change', function (e) {
        document.querySelector('.input_school_title').value = this.options[this.selectedIndex].getAttribute('title');
        document.querySelector('.input_school_count_students').value = this.options[this.selectedIndex].getAttribute('students-count');
        document.querySelector('.input_school_Id').value = this.options[this.selectedIndex].getAttribute('data-id');
        e.stopPropagation();
    }, false);


    /**
     * Изменение селекта
     * Добавление/редактирование класса
     */
    document.querySelector('.adminstiration__add_edit_rooms').addEventListener('change', function (e) {
        document.querySelector('.input_rooms_title').value = this.options[this.selectedIndex].getAttribute('title');
        document.querySelector('.input_rooms_capacity').value = this.options[this.selectedIndex].getAttribute('capacity');
        document.querySelector('.input_rooms_locate').value = this.options[this.selectedIndex].getAttribute('locate');
        document.querySelector('.input_rooms_Id').value = this.options[this.selectedIndex].getAttribute('data-id');
        e.stopPropagation();
    }, false);


    /**
     * При клике показывается/скрываетс фильрт
     *
     * @type {NodeList} список названий фильтрации
     */
    var allFilterTitle = document.querySelectorAll('.filter_title'),
        indFT, btnFT;
    for (indFT = 0; indFT < allFilterTitle.length; indFT++) {
        btnFT = allFilterTitle[indFT];
        btnFT.addEventListener('click', clickFilterTitle, false);
    }
    function clickFilterTitle(e) {
        this.parentNode.parentNode.querySelector('.b-schedule__item').classList.toggle('b-schedule__item_filter_hide');
        e.stopPropagation();
    };


    /**
     * Клик по первому input в "Фильрт по школам в заданный интервал дат"
     */
    document.querySelector('.filter__school-date_input_date-start').addEventListener('click', function (e) {
        if (!e.target.closest('.popup') && document.querySelector('.popup') != null) {
            document.querySelector('.popup').parentNode.removeChild(document.querySelector('.popup'));
        }
        popup.data = {
            'elem': this
        };
        popup.show();
        calendar.element_id = 'popup';
        calendar.drawCalendar(parseInt(nowDate.getMonth()) + 1, nowDate.getFullYear(), '.filter__school-date_input_date-start');
        popup.popupPosition();
        e.stopPropagation();
    }, false);

    /**
     * Клик по второму input в "Фильрт по школам в заданный интервал дат"
     */
    document.querySelector('.filter__school-date_input_date-end').addEventListener('click', function (e) {
        if (!e.target.closest('.popup') && document.querySelector('.popup') != null) {
            document.querySelector('.popup').parentNode.removeChild(document.querySelector('.popup'));
        }
        popup.data = {
            'elem': this
        };
        popup.show();
        calendar.element_id = 'popup';
        calendar.drawCalendar(parseInt(nowDate.getMonth()) + 1, nowDate.getFullYear(), '.filter__school-date_input_date-end');
        popup.popupPosition();
        e.stopPropagation();
    }, false);


    /**
     * Клик по первому input в "Фильрт по классам в заданный интервал дат"
     */
    document.querySelector('.filter__room-date_input_date-start').addEventListener('click', function (e) {
        if (!e.target.closest('.popup') && document.querySelector('.popup') != null) {
            document.querySelector('.popup').parentNode.removeChild(document.querySelector('.popup'));
        }
        popup.data = {
            'elem': this
        };
        popup.show();
        calendar.element_id = 'popup';
        calendar.drawCalendar(parseInt(nowDate.getMonth()) + 1, nowDate.getFullYear(), '.filter__room-date_input_date-start');
        popup.popupPosition();
        e.stopPropagation();
    }, false);

    /**
     * Клик по второму input в "Фильрт по классам в заданный интервал дат"
     */
    document.querySelector('.filter__room-date_input_date-end').addEventListener('click', function (e) {
        if (!e.target.closest('.popup') && document.querySelector('.popup') != null) {
            document.querySelector('.popup').parentNode.removeChild(document.querySelector('.popup'));
        }
        popup.data = {
            'elem': this
        };
        popup.show();
        calendar.element_id = 'popup';
        calendar.drawCalendar(parseInt(nowDate.getMonth()) + 1, nowDate.getFullYear(), '.filter__room-date_input_date-end');
        popup.popupPosition();
        e.stopPropagation();
    }, false);


    /**
     * Клик по input добавления даты в добавление/редактирование лекции
     */
    document.querySelector('.adminstiration__add_date').addEventListener('click', function (e) {
        if (!e.target.closest('.popup') && document.querySelector('.popup') != null) {
            document.querySelector('.popup').parentNode.removeChild(document.querySelector('.popup'));
        }
        popup.data = {
            'elem': this
        };
        popup.show();
        calendar.element_id = 'popup';
        calendar.drawCalendar(parseInt(nowDate.getMonth()) + 1, nowDate.getFullYear(), '.adminstiration__add_date');
        popup.popupPosition();
        e.stopPropagation();
    }, false);

    /**
     * Клик по input добавления времени в добавление/редактирование лекции

    document.querySelector('.adminstiration__add_time').addEventListener('input', function (e) {
        var number = this.value.replace(/[^0-9:-]/g, '');
        this.value = number;
        e.stopPropagation();
    }, false);*/



    /**
     * Переменные с данными для сортировки
     *
     * sortableBlock - блок, в котором находится список лекций
     * arrLectures - массив лекций после загрузки
     * arrLecturesCopy - копия arrLectures
     * arrLecturesEnded - массив лекций, которые уже закончились
     * arrLecturesFuture - массив лекций, которые еще не начались
     */
    var sortableBlock = document.querySelector('.b-schedule__sort');
    var arrLectures = [].slice.call(sortableBlock.querySelectorAll('.b-schedule__section'));
    var arrLecturesCopy = arrLectures.slice();
    var arrLecturesEnded = [].slice.call(sortableBlock.querySelectorAll('.b-schedule__section_ended'));
    var arrLecturesFuture = [].slice.call(sortableBlock.querySelectorAll('.b-schedule__section:not(.b-schedule__section_ended'));

    /**
     * Сортировка при вводе в строке поиска
     */
    document.querySelector('.search__input').oninput = function () {

        var val = this.value;

        if (val.length >= 0) {
            var filteredData = arrLectures.filter(function (obj) {
                var str = [].slice.call(obj.querySelectorAll('.schedule__item')).slice(0, 3)[0].textContent
                    + ' ' +
                    [].slice.call(obj.querySelectorAll('.schedule__item')).slice(0, 3)[1].textContent
                    + ' ' +
                    [].slice.call(obj.querySelectorAll('.schedule__item')).slice(0, 3)[2].textContent

                return str.toLowerCase().search(val.toLowerCase()) !== -1;
            });

            refactorListReaders(filteredData);

            searchNothingFound();

        }
        ;
    };

    /**
     * Сортировка по школам
     */
    document.querySelector('.select__item-school').addEventListener('change', function (e) {
        sortSelectSchool(this, 0)
    }, false);

    /**
     * Сортировка по лекторам
     */
    document.querySelector('.select__item-reader').addEventListener('change', function (e) {
        sortSelectSchool(this, 2)
    }, false);

    /**
     * Сортировка по дате
     */
    document.querySelector('.select__item-date').addEventListener('change', function (e) {
        var objSelectedIndex = this.selectedIndex;
        var siblingSelect = this.parentNode.parentNode.querySelectorAll('.select__item'),
            indSS;
        for (indSS = 0; indSS < siblingSelect.length; indSS++) {
            siblingSelect[indSS].selectedIndex = 0;
        }
        this.selectedIndex = objSelectedIndex;

        switch (this.selectedIndex) {
            case 0:
                refactorListReaders(arrLecturesCopy);
                break;

            case 1:
                arrLectures.sort(function (a, b) {
                    return a.children[3].dataset.date - b.children[3].dataset.date;
                });
                refactorListReaders(arrLectures);
                break;

            case 2:
                arrLectures.sort(function (a, b) {
                    return b.children[3].dataset.date - a.children[3].dataset.date;
                });
                refactorListReaders(arrLectures);
                break;

            case 3:
                arrLecturesEnded.sort(function (a, b) {
                    return b.children[3].dataset.date - a.children[3].dataset.date;
                });
                refactorListReaders(arrLecturesEnded);
                break;

            case 4:
                arrLecturesFuture.sort(function (a, b) {
                    return a.children[3].dataset.date - b.children[3].dataset.date;
                });
                refactorListReaders(arrLecturesFuture);
                break;
        }

    }, false);

    /**
     * Рефакторинг блока лекций
     *
     * @param arr {Object} объект, которым будет заполнен блок лекций
     */
    function refactorListReaders(arr) {
        var search_nothing_found = document.querySelector('.search_nothing_found');
        // Опустошаем блок лекций
        sortableBlock.innerHTML = "";
        // Заполняем блок лекций
        for (var i = 0; i < arr.length; i++) {
            sortableBlock.appendChild(arr[i]);
        }
        sortableBlock.appendChild(search_nothing_found);
    }

    /**
     * Функция сортировки по полю лекции и по полю школы
     *
     * @param obj {Object} текущий select
     * @param field {Number} номер поля в строке лекции, по которому будет произведена сортировка
     */
    function sortSelectSchool(obj, field) {
        var objSelectedIndex = obj.selectedIndex;
        var siblingSelect = obj.parentNode.parentNode.querySelectorAll('.select__item'),
            indSS;
        for (indSS = 0; indSS < siblingSelect.length; indSS++) {
            siblingSelect[indSS].selectedIndex = 0;
        }
        obj.selectedIndex = objSelectedIndex;

        var val = obj.options[obj.selectedIndex].text;

        if (obj.selectedIndex != 0) {
            var filteredData = arrLectures.filter(function (obj) {
                if (field != 3) {
                    var str = [].slice.call(obj.querySelectorAll('.schedule__item')).slice(0, 3)[field].textContent;
                } else {
                    var str = [].slice.call(obj.querySelectorAll('.schedule__item'))[field].querySelector('.schedule__block_date-place').textContent;
                }
                return str.toLowerCase().search(val.toLowerCase()) !== -1;
            });

            refactorListReaders(filteredData);
            searchNothingFound();

        } else {

            refactorListReaders(arrLecturesCopy);

        }
        ;
    }


    /**
     * Сортировка массива лекций по датам
     *
     * @param valStart {String} значение первой даты
     * @param valEnd {String} значение второй даты
     * @param arr {Array} массив, который нужно отсортировать
     */
    function filterBetweenDates(valStart, valEnd, arrLecturesNow) {
        var dateStart = +new Date(valStart.split('.')[2], valStart.split('.')[1]-1, valStart.split('.')[0]);
        var dateEnd = +new Date(valEnd.split('.')[2], valEnd.split('.')[1]-1, valEnd.split('.')[0]);

        var newAllDatesArr = arrLecturesNow.filter(function (obj) {
            var dateBlock = obj.querySelector('.schedule__block_date').dataset.date;
            return dateBlock >= dateStart && dateBlock <= dateEnd;
        });
        refactorListReaders(newAllDatesArr);
    }

    /**
     * Появление/скрытие блока с текстом
     * Ничего не найдено, попробуйте изменить запрос поиска
     */
    function searchNothingFound() {
        if (document.querySelector('.b-schedule__sort').querySelectorAll('.b-schedule__section').length == 0) {
            document.querySelector('.search_nothing_found').className = 'search_nothing_found search_nothing_found-show';
        } else {
            document.querySelector('.search_nothing_found').className = 'search_nothing_found';
        }
    }




    /**
     * Фильрт по школам в заданный интервал дат
     */
    document.querySelector('.filter__school-date').addEventListener('click', function (e) {

        refactorListReaders(arrLecturesCopy);
        sortSelectSchool(document.querySelector('.filter__select_school-date'), 0);

        var valStart = document.querySelector('.filter__school-date_input_date-start').value;
        var valEnd = document.querySelector('.filter__school-date_input_date-end').value;


        //console.log(  !ds.match(dateRegExp) && !de.match(dateRegExp)  );

        if (valStart != '' && valEnd != '') {
            if ( !!valStart.match(dateRegExp) && !!valEnd.match(dateRegExp) ) {
                var arrLecturesNow = [].slice.call(sortableBlock.querySelectorAll('.b-schedule__section'));

                filterBetweenDates(valStart, valEnd, arrLecturesNow)

            } else {
                popup.data = {
                    htmlContent : 'Проверьте данные! Дата должна быть в формате дд.мм.гггг.',
                    type : 'error'
                };
                popup.show();
            }
        }

        searchNothingFound();
        e.stopPropagation();
    }, false);


    /**
     * Фильрт по классам в заданный интервал дат
     */
    document.querySelector('.filter__room-date').addEventListener('click', function (e) {
        refactorListReaders(arrLecturesCopy);

        sortSelectSchool(document.querySelector('.filter__select_room-date'), 3);

        var valStart = document.querySelector('.filter__room-date_input_date-start').value;
        var valEnd = document.querySelector('.filter__room-date_input_date-end').value;

        if (valStart != '' && valEnd != '') {
            if ( !!valStart.match(dateRegExp) && !!valEnd.match(dateRegExp) ) {
                var arrLecturesNow = [].slice.call(sortableBlock.querySelectorAll('.b-schedule__section'));

                filterBetweenDates(valStart, valEnd, arrLecturesNow)

            } else {
                popup.data = {
                    htmlContent : 'Проверьте данные! Дата должна быть в формате дд.мм.гггг.',
                    type : 'error'
                };
                popup.show();
            }
        }

        searchNothingFound();
        e.stopPropagation();
    }, false);


    /**
     * Клик по документу для закрытия блока popup
     */
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.popup') && document.querySelector('.popup') != null) {
            document.querySelector('.popup').parentNode.removeChild(document.querySelector('.popup'));
        }
    }, false);


    /**
     * Добавление/редактирование школы
     */
    document.querySelector('.submit_add_school').addEventListener('click', function (e) {
        e.preventDefault();
        var schoolName = document.querySelector('.input_school_title').value;
        var studentsCountInput = document.querySelector('.input_school_count_students');
        var studentsCount = studentsCountInput.value;
        var Id = document.querySelector('.input_school_Id').value;


        if (schoolName != '' && studentsCount != '') {
            if ( +studentsCount <= +studentsCountInput.getAttribute('max') ) {
                ajax('schoolName=' + schoolName + '&' + 'studentsCount=' + studentsCount + '&' + 'Id=' + Id, 'schools');
            } else {
                popup.data = {
                    htmlContent: 'Количество студентов не должно превышать максимальной вместимости ('+studentsCountInput.getAttribute('max')+')',
                    type: 'error'
                };
                popup.show();
            }
        } else {
            popup.data = {
                htmlContent: 'Проверьте данные, надо заполнить все поля.',
                type: 'error'
            };
            popup.show();
        }

        e.stopPropagation();

    }, false);


    /**
     * Добавление/редактирование класса
     */
    document.querySelector('.submit_add_rooms').addEventListener('click', function (e) {
        e.preventDefault();
        var roomName = document.querySelector('.input_rooms_title').value;
        var capacityInput = document.querySelector('.input_rooms_capacity');
        var capacity = document.querySelector('.input_rooms_capacity').value;
        var locate = document.querySelector('.input_rooms_locate').value;
        var Id = document.querySelector('.input_rooms_Id').value;

        if (roomName != '' && capacity != '' && locate != '') {
            if( +capacity >= +capacityInput.getAttribute('max') ){
                ajax('roomName=' + roomName + '&' + 'capacity=' + capacity + '&' + 'locate=' + locate + '&' + 'Id=' + Id, 'rooms');
            } else {
                popup.data = {
                    htmlContent: 'Вместимость класса должна быть не меньше количества студентов ('+capacityInput.getAttribute('max')+')',
                    type: 'error'
                };
                popup.show();
            }
        } else {
            popup.data = {
                htmlContent: 'Проверьте данные, надо заполнить все поля.',
                type: 'error'
            };
            popup.show();
        }

        e.stopPropagation();

    }, false);


    /**
     * Добавление/редактирование лекции
     */
    document.querySelector('.submit_add_lectures').addEventListener('click', function (e) {
        e.preventDefault();

        var schoolNameArr = [].slice.call(document.querySelector('.adminstiration__add_school').parentNode.querySelectorAll('input'));
        var schoolName = [];
        for (var sn = 0; sn < schoolNameArr.length; sn++) {
            schoolName.push(schoolNameArr[sn].value);
        }
        var lecturesName = document.querySelector('.textarea_lecturesName').value;
        var readerNameArr = [].slice.call(document.querySelector('.adminstiration__add_readers').parentNode.querySelectorAll('input'));
        var readerName = [];
        for (var rn = 0; rn < readerNameArr.length; rn++) {
            readerName.push(readerNameArr[rn].value);
        }
        var dateText = document.querySelector('.adminstiration__add_date').value;
        var time = document.querySelector('.adminstiration__add_time').value;
        var blockAddRoomAllInput = document.querySelector('.adminstiration__add_rooms').parentNode.querySelectorAll('input');
        var roomName =  '';
        var presentation = document.querySelector('.adminstiration__add_presentation').value;
        var videoLink = document.querySelector('.adminstiration__add_video').value;
        var Id = document.querySelector('.input_lectures_id').value;

        var items = sortableBlock.querySelectorAll('.schedule__school_data');

        function checkAddEditLecturesNoTimeDateRoom(){
            // Проверка названия лекции на заполненность и длинну не менее 10 символов
            if ( lecturesName != '' && lecturesName.length > 10 ) {
                // Проверка школ на выбор
                if ( schoolName.length > 0 ) {
                    // Проверка лекторов на выбор
                    if ( readerName.length > 0 ) {
                        // Проверка даты на заполненность
                        if ( dateText !='' ) {
                            // Проверка даты на правильный формат дд.мм.гггг
                            if ( !!dateText.match(/^(((0[1-9]|[12]\d|3[01])\.(0[13578]|1[02])\.((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\.(0[13456789]|1[012])\.((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\.02\.((19|[2-9]\d)\d{2}))|(29\.02\.((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/) ) {
                                // Проверка времени на заполненность
                                if ( time != '' ) {
                                    // Проверка времени на правильный формат чч:мм-чч:мм
                                    if ( !!time.match(/^(((0|1)?[0-9])|(2[0-3])):[0-5][0-9]-(((0|1)?[0-9])|(2[0-3])):[0-5][0-9]$/) ) {
                                        // Проверка первое время меньше вророго времени
                                        var vt1 = time.split('-')[0].toString().split(':')[0] + time.split('-')[0].toString().split(':')[1];
                                        var vt2 = time.split('-')[1].toString().split(':')[0] + time.split('-')[1].toString().split(':')[1];
                                        if (vt1 < vt2){
                                            // Проверка класса
                                            if ( blockAddRoomAllInput.length > 2 ) {
                                                roomName = [].slice.call(blockAddRoomAllInput)[2].value;
                                                return true;
                                            } else {
                                                popup.data = {
                                                    htmlContent : 'Проверьте данные! Необходимо выбрать класс.',
                                                    type : 'error'
                                                };
                                                popup.show();
                                                return false;
                                            }
                                        } else {
                                            popup.data = {
                                                htmlContent : 'Проверьте данные! Первое время должно быть меньше второго.',
                                                type : 'error'
                                            };
                                            popup.show();
                                            return false;
                                        }

                                    } else {
                                        popup.data = {
                                            htmlContent : 'Проверьте данные!  Не корректный формат времени.',
                                            type : 'error'
                                        };
                                        popup.show();
                                        return false;
                                    }
                                } else {
                                    popup.data = {
                                        htmlContent : 'Проверьте данные! Необходимо заполнить время лекции.',
                                        type : 'error'
                                    };
                                    popup.show();
                                    return false;
                                }
                            } else {
                                popup.data = {
                                    htmlContent : 'Проверьте данные! Не корректный формат даты.',
                                    type : 'error'
                                };
                                popup.show();
                                return false;
                            }
                        } else {
                            popup.data = {
                                htmlContent : 'Проверьте данные! Необходимо установить дату лекции.',
                                type : 'error'
                            };
                            popup.show();
                            return false;
                        }
                    } else {
                        popup.data = {
                            htmlContent : 'Проверьте данные! Должен быть выбран хотя бы один лектор.',
                            type : 'error'
                        };
                        popup.show();
                        return false;
                    }
                } else {
                    popup.data = {
                        htmlContent : 'Проверьте данные! Должна быть выбрана хотя бы одна школа.',
                        type : 'error'
                    };
                    popup.show();
                    return false;
                }
            } else {
                popup.data = {
                    htmlContent : 'Проверьте данные! Необходимо заполнить название лекции. Название должно быть не менее 10 символов.',
                    type : 'error'
                };
                popup.show();
                return false;
            }
        };

        var ddd = dateText.split('.')[0];
        var mmm = +dateText.split('.')[1] - 1;
        var yyy = dateText.split('.')[2];
        var date = +new Date(yyy, mmm, ddd);

        function checkAddEditLectures() {
            if ( checkAddEditLecturesNoTimeDateRoom() ){

                var arr_obj = [];
                for (var i=0;i<items.length;i++){
                    var obj = JSON.parse(items[i].getAttribute('date_time'));
                    //var roomName = [].slice.call(blockAddRoomAllInput)[2].value;
//-------------
                    if (obj.roomName == roomName){
                        // если выбранная комната равна комнате в массиве объектов

                        if(+obj.date == +date){
                            // если выбранная дата совпадает в датой в оьъекте этой комнаты
                            arr_obj.push(obj);
                        }
                    };
                };

                var arr_time = [];
                for (var j=0;j<arr_obj.length;j++){
                    arr_time.push(arr_obj[j].time);
                };

                var arr_true_false = [];
                for (var index_time=0;index_time<arr_time.length;index_time++){

                    // занятое
                    var zt1 = arr_time[index_time].split('-')[0].toString().split(':')[0] + arr_time[index_time].split('-')[0].toString().split(':')[1];
                    var zt2 = arr_time[index_time].split('-')[1].toString().split(':')[0] + arr_time[index_time].split('-')[1].toString().split(':')[1];

                    // выбранное
                    var vt1 = time.split('-')[0].toString().split(':')[0] + time.split('-')[0].toString().split(':')[1];
                    var vt2 = time.split('-')[1].toString().split(':')[0] + time.split('-')[1].toString().split(':')[1];

                    if (+vt1 >= +zt2){
                        arr_true_false.push(true);
                    } else if (+vt2 <= +zt1){
                        arr_true_false.push(true);
                    } else {
                        arr_true_false.push(false);
                    }
                };
                if (arr_true_false.indexOf(false) == -1){
                    return true;
                } else {
                    popup.data = {
                        htmlContent : 'Проверьте данные! Это время занято, выберите другое время.',
                        type : 'error'
                    };
                    popup.show();
                    return false;
                };
            };
        };


        if ( checkAddEditLectures() ) {

            var formData = 'schoolName=' + schoolName + '&';
            formData += 'lecturesName=' + lecturesName + '&';
            formData += 'readerName=' + readerName + '&';
            formData += 'date=' + date + '&';
            formData += 'time=' + time + '&';
            formData += 'roomName=' + roomName + '&';
            formData += 'videoLink=' + videoLink + '&';
            formData += 'presentation=' + presentation + '&';
            formData += 'Id=' + Id;

            //console.log(formData);

            ajax(formData, 'lectures');
        }

        e.stopPropagation();

    }, false);


    /**
     * Для отправки данных на сервер
     *
     * @param formData {String} строка с данными
     * @param url {String} строка с адресом
     */
    function ajax(formData, url) {
        formData = formData || '';

        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/add-edit/' + url, true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            //console.log( this.responseText );
            popup.data = {
                htmlContent: 'Данные успешно добавлены!',
                type: 'ok'
            };
            popup.show();

            setTimeout(function () {
                window.location.reload();
            }, 1500);
        }

        xhr.send(formData);
    }


    /**
     * Ввод в input с классом input_number только цыфр
     */
    var inputNumber = document.querySelectorAll('.input_number'),
        indexInpNum,btnInpNum;
    for (indexInpNum=0;indexInpNum<inputNumber.length;indexInpNum++){
        btnInpNum = inputNumber[indexInpNum];
        btnInpNum.addEventListener('input',inputNumberOnInput,false);
    }
    function inputNumberOnInput() {
        var number = this.value.replace(new RegExp('\\D+', 'g'), '');
        this.value = number;
    };


    /**
     * Клик по кнопке добавить лекцию
     */
    document.querySelector('.adminstiration__add_lectures').addEventListener('click', function (e) {
        this.className = 'button adminstiration__add_lectures adminstiration__add_lectures-hide';

        var row = document.querySelector('.adminstiration__add_lectures_place');

        var form1 = document.querySelector('.b-add-edit-lectures-1');
        var form2 = document.querySelector('.b-add-edit-lectures-2');
        var form3 = document.querySelector('.b-add-edit-lectures-3');

        row.appendChild(form1);
        row.appendChild(form2);
        row.appendChild(form3);

        document.querySelector('.adminstiration__add_edit-title').className = 'adminstiration__add_edit-title adminstiration__add_title-hide';
        document.querySelector('.adminstiration__add_add-title').className = 'adminstiration__add_add-title adminstiration__add_title-show';

        clearFormDataEditLectures();
        document.querySelector('.input_lectures_id').value = document.querySelector('.textarea_lecturesName').dataset.id;

        e.stopPropagation();
    }, false);


    /**
     * Очистка формы добавления/редактирования лекции
     */
    function clearFormDataEditLectures() {
        var form2 = document.querySelector('.b-add-edit-lectures-2');
        var allCloseSelectBlock_school = [].slice.call(form2.querySelectorAll('.adminstiration__add_school-thisSelectedClose'));
        var allCloseSelectBlock_readers = [].slice.call(form2.querySelectorAll('.adminstiration__add_readers-thisSelectedClose'));
        var allCloseSelectBlock_rooms = [].slice.call(form2.querySelectorAll('.adminstiration__add_rooms-thisSelectedClose'));
        for (var indClose_school = 0; indClose_school < allCloseSelectBlock_school.length; indClose_school++) {
            DeleteSelectItem(allCloseSelectBlock_school[indClose_school]);
        }
        ;
        for (var indClose_readers = 0; indClose_readers < allCloseSelectBlock_readers.length; indClose_readers++) {
            DeleteSelectItem(allCloseSelectBlock_readers[indClose_readers]);
        }
        ;
        for (var indClose_rooms = 0; indClose_rooms < allCloseSelectBlock_rooms.length; indClose_rooms++) {
            DeleteSelectItem(allCloseSelectBlock_rooms[indClose_rooms]);
        };
        document.querySelector('.textarea_lecturesName').value = '';
        document.querySelector('.adminstiration__add_date').value = '';
        document.querySelector('.adminstiration__add_time').value = '';
        form2.querySelector('.adminstiration__add_video').value = '';
        form2.querySelector('.adminstiration__add_presentation').value = '';
    }


    /**
     * Клик по кнопке Edit
     * для редактирования лекции
     *
     * @type {NodeList}
     */
    var allEditLectures = document.querySelectorAll('.schedule__theme_edit'),
        indEL, btnEL;
    for (indEL = 0; indEL < allEditLectures.length; indEL++) {
        btnEL = allEditLectures[indEL];
        allEditLectures[indEL].parentNode.parentNode.querySelector('.schedule__school').className = 'schedule__item schedule__school schedule__school_data';
        btnEL.addEventListener('click', clickEditLectures, false);
    }
    function clickEditLectures(e) {
        document.querySelector('.adminstiration__add_lectures').className = 'button adminstiration__add_lectures adminstiration__add_lectures-show';
        document.querySelector('.adminstiration__add_edit-title').className = 'adminstiration__add_edit-title adminstiration__add_title-show';
        document.querySelector('.adminstiration__add_add-title').className = 'adminstiration__add_add-title adminstiration__add_title-hide';

        var ROW = document.querySelector('.b-schedule__sort').querySelectorAll('.b-schedule__section:not(.b-add-edit-lectures)');
        for (var I=0;I<ROW.length;I++){
            ROW[I].querySelector('.schedule__school').className = 'schedule__item schedule__school schedule__school_data';
        }

        var row = this.parentNode.parentNode;
        // удаляем класс у редактируемой лекции
        row.querySelector('.schedule__school').className = 'schedule__item schedule__school';

        var form1 = document.querySelector('.b-add-edit-lectures-1');
        var form2 = document.querySelector('.b-add-edit-lectures-2');
        var form3 = document.querySelector('.b-add-edit-lectures-3');

        row.parentNode.insertBefore(form3, row.nextSibling);
        row.parentNode.insertBefore(form2, row.nextSibling);
        row.parentNode.insertBefore(form1, row.nextSibling);

        // Очищаем форму
        clearFormDataEditLectures();

        var schoolArr = [].slice.call(row.querySelector('.schedule__school').querySelectorAll('div'));
        for (var s = 0; s < schoolArr.length; s++) {
            var schoolSelectOptions = [].slice.call(document.querySelector('.adminstiration__add_school').options);
            schoolSelectOptions.forEach(function (item, i) {
                if (item.text == schoolArr[s].textContent) {
                    addSelectItem(document.querySelector('.adminstiration__add_school'), null, i);
                }
            });
        };
        var readerArr = [].slice.call(row.querySelector('.schedule__reader').querySelectorAll('.js-schedule__show_tooltip-presence'));
        for (var r = 0; r < readerArr.length; r++) {
            var readerSelectOptions = [].slice.call(document.querySelector('.adminstiration__add_readers').options);
            readerSelectOptions.forEach(function (item, i) {
                if (item.text == readerArr[r].querySelector('.js-schedule__show_tooltip-reader').textContent) {
                    addSelectItem(document.querySelector('.adminstiration__add_readers'), null, i);
                }
            });
        }
        var roomSelectOptions = [].slice.call(document.querySelector('.adminstiration__add_rooms').options);
        roomSelectOptions.forEach(function (item, i) {
            if (item.text == row.querySelector('.schedule__block_date-place').textContent) {
                addSelectItem(document.querySelector('.adminstiration__add_rooms'), null, i);
            }
        });

        form2.querySelector('.textarea_lecturesName').value = row.querySelector('.span_lecturesName').textContent;
        form2.querySelector('.adminstiration__add_date').value = row.querySelector('.schedule__block_date-date').textContent;
        form2.querySelector('.adminstiration__add_time').value = row.querySelector('.schedule__block_date-time').textContent;
        form2.querySelector('.input_lectures_id').value = row.querySelector('.span_lecturesName').dataset.id;
        
        if(!!row.querySelector('.schedule__date-action-type_watch')) {
            form2.querySelector('.adminstiration__add_video').value = row.querySelector('.schedule__date-action-type_watch').getAttribute('href');
        }
        if(!!row.querySelector('.schedule__date-action-type_download')) {
            form2.querySelector('.adminstiration__add_presentation').value = row.querySelector('.schedule__date-action-type_download').getAttribute('href');
        }

        e.stopPropagation();
    };




})(window, document);
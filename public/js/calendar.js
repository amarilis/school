(function(window, document, undefined) {
    'use strict';
    var calendar = {};

    // Названия месяцев
    calendar.monthName=[
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    // Названия дней недели
    calendar.dayName=[
        'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
    ];

    // Выбранная дата
    calendar.selectedDate = {
        'Day' : new Date().getDate(),
        'Month' : parseInt(new Date().getMonth())+1,
        'Year' : new Date().getFullYear()
    };

    // ID элемента для размещения календарика
    calendar.element_id=null;

    // Выбор даты
    calendar.selectDate = function(day,month,year,classInput) {
        if (day.slice().length == 1) {
            day = '0'+day;
        }
        if (month.slice().length == 1) {
            month = '0'+month;
        }
        calendar.selectedDate={
            'Day' : day,
            'Month' : month,
            'Year' : year
        };
        calendar.drawCalendar(month,year,classInput);
        document.querySelector(classInput).value = calendar.selectedDate.Day+'.'+calendar.selectedDate.Month+'.'+calendar.selectedDate.Year;
        document.querySelector('.popup').parentNode.removeChild(document.querySelector('.popup'));
    };

    // Отрисовка календарика на выбранный месяц и год
    calendar.drawCalendar = function(month,year,classInput) {
        var tmp='';
        tmp+='<div class="calendarOut"><table class="calendar" cellspacing="0" cellpadding="0">';

        // Месяц и навигация
        tmp+='<tr>';
        tmp+='<td class="navigation navigation_to_left" month="'+(month>1?(+month-1):12)+'" year="'+(month>1?year:(+year-1))+'" classInput="'+classInput+'">&#9668;<\/td>';
        tmp+='<td colspan="5" class="navigation navigation_to_this_day" month="'+calendar.selectedDate.Month+'" year="'+calendar.selectedDate.Year+'" classInput="'+classInput+'">'+calendar.monthName[(month-1)]+'&nbsp;-&nbsp;'+year+'<\/td>';
        tmp+='<td class="navigation navigation_to_right" month="'+(month<12?(+month+1):1)+'" year="'+(month<12?year:(+year+1))+'" classInput="'+classInput+'">&#9658;<\/td>';
        tmp+='<\/tr>';

        // Шапка таблицы с днями недели
        tmp+='<tr>';
        tmp+='<th>'+calendar.dayName[0]+'<\/th>';
        tmp+='<th>'+calendar.dayName[1]+'<\/th>';
        tmp+='<th>'+calendar.dayName[2]+'<\/th>';
        tmp+='<th>'+calendar.dayName[3]+'<\/th>';
        tmp+='<th>'+calendar.dayName[4]+'<\/th>';
        tmp+='<th class="holiday">'+calendar.dayName[5]+'<\/th>';
        tmp+='<th class="holiday">'+calendar.dayName[6]+'<\/th>';
        tmp+='<\/tr>';

        // Количество дней в месяце
        var total_days = 32 - new Date(year, (month-1), 32).getDate();
        // Начальный день месяца
        var start_day = new Date(year, (month-1), 1).getDay();
        if (start_day==0) { start_day=7; }
        start_day--;
        // Количество ячеек в таблице
        var final_index=Math.ceil((total_days+start_day)/7)*7;

        var day=1;
        var index=0;
        do {
            // Начало строки таблицы
            if (index%7==0) {
                tmp+='<tr>';
            }
            // Пустые ячейки до начала месяца или после окончания
            if ((index<start_day) || (index>=(total_days+start_day))) {
                tmp+='<td class="grayed">&nbsp;<\/td>';
            }
            else {
                var class_name='';
                // Выбранный день
                if (calendar.selectedDate.Day==day &&
                    calendar.selectedDate.Month==month &&
                    calendar.selectedDate.Year==year) {
                    class_name='selected';
                }
                // Праздничный день
                else if (index%7==6 || index%7==5) {
                    class_name='holiday';
                }
                // Ячейка с датой
                //tmp+='<td class="td_day_active '+class_name+'" onclick="calendar.selectDate('+day+','+month+','+year+','+'\''+classInput+'\''+')">'+day+'</td>';
                tmp+='<td class="td_day_active '+class_name+'" day="'+day+'" month="'+month+'" year="'+year+'" classInput="'+classInput+'">'+day+'</td>';
                day++;
            }
            // Конец строки таблицы
            if (index%7==6) {
                tmp+='<\/tr>';
            }
            index++;
        }
        while (index<final_index);

        tmp+='<\/table><\/div>';


        // Вставить таблицу календарика на страницу
        var el=document.getElementById(calendar.element_id);
        if (el) {
            el.innerHTML=tmp;
        }

        document.querySelector('.navigation_to_left').addEventListener('click',function (e) {
            calendar.drawCalendar(this.getAttribute('month'),this.getAttribute('year'),this.getAttribute('classInput'));
            e.stopPropagation();
        },false);
        document.querySelector('.navigation_to_this_day').addEventListener('click',function (e) {
            calendar.drawCalendar(this.getAttribute('month'),this.getAttribute('year'),this.getAttribute('classInput'));
            e.stopPropagation();
        },false);
        document.querySelector('.navigation_to_right').addEventListener('click',function (e) {
            calendar.drawCalendar(this.getAttribute('month'),this.getAttribute('year'),this.getAttribute('classInput'));
            e.stopPropagation();
        },false);

        var all_td_day_active = document.querySelectorAll('.td_day_active'),
            ind_td_day_active, btn_td_day_active;
        for (ind_td_day_active=0;ind_td_day_active<all_td_day_active.length;ind_td_day_active++){
            btn_td_day_active = all_td_day_active[ind_td_day_active];
            btn_td_day_active.addEventListener('click',function (e) {
                calendar.selectDate(e.target.getAttribute('day'),e.target.getAttribute('month'),e.target.getAttribute('year'),e.target.getAttribute('classInput'));
                e.stopPropagation();
            },false);
        }

    };



    window.calendar = calendar;
})(window,document);
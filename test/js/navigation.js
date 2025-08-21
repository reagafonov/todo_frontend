var navigation_html = "";

function navigation_on_success(response) {

    $.each(response, OnDataElementLoaded)

    OnDataLoaded();
}


function OnDataElementLoaded(index, item) {
    console.log('Загружен ' + item);
    var current = '<li ref-id="' + item.id + '"><a href="#">' + item.name + '</a></li>';
    console.log(current)
    navigation_html += current
}

function OnDataLoaded() {
    console.log("Итого " + navigation_html);
    $('.nav1').html(navigation_html);

    const navLinks = document.querySelectorAll('.nav1 li');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Убираем активный класс со всех элементов
            navLinks.forEach(item => item.classList.remove('active'));

            // Добавляем активный класс на текущий элемент
            this.classList.add('active');

            // Здесь можно добавить логику переключения контента
        });
    });
}

function navigation_on_click(element)
{
    var attr= element.attr("ref-id");
    console.log("Нажат " +attr);
    var url = backend_tasks_for_lists+"/"+attr;
    Table_LoadData(url);
}

$('.nav1').on('click', 'li', function (e) {
    var target = $(e.target).closest("li");
    
    // Получаем информацию об элементе
    console.log('Тег элемента: ' + target.prop('tagName'));
    console.log('ID элемента: ' + target.attr('id'));
    console.log('REF-ID элемента: ' + target.attr('ref-id'));
    console.log('Класс элемента: ' + target.attr('class'));

    // Координаты клика
    console.log('X: ' + e.pageX + ', Y: ' + e.pageY);
    
    navigation_on_click(target);
});


$(function () {
    ajax_LoadObjectList(backend_lists, "GET", navigation_on_success, function () {
    });
    var target = $('.nav li:first');

    // Получаем информацию об элементе
    console.log('Тег элемента: ' + target.prop('tagName'));
    console.log('ID элемента: ' + target.attr('id'));
    console.log('REF-ID элемента: ' + target.attr('ref-id'));
    console.log('Класс элемента: ' + target.attr('class'));


});
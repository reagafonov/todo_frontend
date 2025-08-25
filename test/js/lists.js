var lists_html = "";

function ListsOnSuccess(response) {

    $.each(response, ListsOnDataElementLoaded)

    ListsOnDataLoaded();
}


function ListsOnDataElementLoaded(index, item) {
    console.log('Загружен ' + item);
    var current = '<li ref-id="' + item.id + '"><a href="#">' + item.name + '</a></li>';
    console.log(current)
    lists_html += current
}

function ListsOnDataLoaded() {
    console.log("Итого " + lists_html);
    $('.nav1').html(lists_html);

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

function ListsOnClick(element)
{
    var attr= element.attr("ref-id");
    console.log("Нажат " +attr);
    //TaskSetListId(attr);
    state.changedListId(attr);
    AddTaskSetTaskListId(attr);
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
    
    ListsOnClick(target);
});

//загрузка списков
function ListsLoad()
{
    ajax_LoadObjectList(backend_lists, "GET", ListsOnSuccess, function () {
    });
    var target = $('.nav li:first');

    // Получаем информацию об элементе
    console.log('Тег элемента: ' + target.prop('tagName'));
    console.log('ID элемента: ' + target.attr('id'));
    console.log('REF-ID элемента: ' + target.attr('ref-id'));
    console.log('Класс элемента: ' + target.attr('class'));
}

$(function () {
   ListsLoad();
});
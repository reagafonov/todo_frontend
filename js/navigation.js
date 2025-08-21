$('.nav').on('click','li', function(e) {
    var target = $(e.target);

    // Получаем информацию об элементе
    console.log('Тег элемента: ' + target.prop('tagName'));
    console.log('ID элемента: ' + target.attr('id'));
    console.log('Класс элемента: ' + target.attr('class'));

    // Координаты клика
    console.log('X: ' + e.pageX + ', Y: ' + e.pageY);
});
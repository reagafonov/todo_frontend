var config = {
    columns: [
        {
            field: 'name',
            title: 'Имя'
        }
    ],
    data: [], // Пустой массив для начала
    
};

// Функция для загрузки данных
function TasksLoadData(url) {
    $.ajax({
        url: url, // URL вашего API
        method: 'GET',
        success: function(response) {
            $('#dynamic-files').bootstrapTable('load', response);
           
          
        },
        error: function(error) {
            console.error('Ошибка загрузки данных:', error);
        }
    });
   TaskEditFormLoad(null);
}

$(document).ready(function() {
    // Функция для инициализации таблицы
    function TasksInitTable() {
        $('#dynamic-files').bootstrapTable(config);
    }

    // Инициализируем таблицу при загрузке страницы
    TasksInitTable();

    // Загружаем данные
    TasksLoadData("");
    $('#dynamic-files').on('click-row.bs.table', function (e, row, $element) {
        $('.table-primary').removeClass('table-primary'); // убираем выделение
        $element.addClass('table-primary');         // выделяем текущую строку
        console.log("Выбранная строка:", row);
        TaskEditFormLoad(row.id);
    });
});
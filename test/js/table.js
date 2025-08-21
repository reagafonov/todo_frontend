var config = {
    columns: [
        {
            field: 'name',
            title: 'Имя'
        },
        {
            field: 'priority',
            title: 'Приоритет'
        },
        {
            field: 'created',
            title: 'Дата создания'
        },
        {
            field: 'completeDate',
            title: 'Дата завершения'
        },
        {
            field: 'isCompleted',
            title: 'Выполнено'
        }
        
        
    ],
    data: [] // Пустой массив для начала
};

// Функция для загрузки данных
function Table_LoadData(url) {
    $.ajax({
        url: url, // URL вашего API
        method: 'GET',
        success: function(response) {
            $('#dynamic-table').bootstrapTable('load', response);
        },
        error: function(error) {
            console.error('Ошибка загрузки данных:', error);
        }
    });
}

$(document).ready(function() {
    // Функция для инициализации таблицы
    function initTable() {
        $('#dynamic-table').bootstrapTable(config);
    }

   

    // Инициализируем таблицу при загрузке страницы
    initTable();

    // Загружаем данные
    loadData("");
});
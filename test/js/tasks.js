var taskConfig = {
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
    data: [], // Пустой массив для начала
    
};

// Функция для загрузки данных
function TasksLoadData(url) {
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
   TaskEditFormLoad(null);
}

function TasksUpdateRow(index, data)
{
    $('#dynamic-table').bootstrapTable('updateRow', {
        index: index-1,
        row: data,
        success: function(row, $element) {
            // Добавляем класс при успешном обновлении
            $element.addClass('table-primary');
        }
    });
    
}

$(document).ready(function() {
    // Функция для инициализации таблицы
    function TasksInitTable() {
        $('#dynamic-table').bootstrapTable(taskConfig);
       
    }

    // Инициализируем таблицу при загрузке страницы
    TasksInitTable();

    // Загружаем данные
    TasksLoadData("");
    $('#dynamic-table').on('click-row.bs.table', function (e, row, $element) {
       
        console.log("Выбранная строка:", row);
        $('#task-form').attr('action', backend_task + row.id);
        console.dir(row);
        console.dir($element);
        var rowIndex = $element[0].rowIndex;
        console.log(rowIndex);
        TaskSetId(row.id);
        $('#task_rowIndex').val(rowIndex);
        $('#task_Id').val(row.Id);
        $('.table-primary').removeClass('table-primary'); // убираем выделение
        $element.addClass('table-primary');         // выделяем текущую строку
    });
   
});
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

function TaskSetListId(id) {
    $('#task-listId').val(id);
    TaskRefreshData();
}

function TaskGetListId() {
    return $('#task-listId').val();
}


function TaskGetUrl() {
    if (ShowRemovedOnly)
        return backend_tasks_for_lists+TaskGetListId()+"/deleted";
    return backend_tasks_for_lists+TaskGetListId();
}


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

function TaskRefreshData() {
    TasksLoadData(TaskGetUrl());
}

function GetCurrentRow()
{
    return $('#dynamic-table tr').eq(GetSelectedIndex());
}



function TasksUpdateRow(index, data)
{
    let $row = $('#dynamic-table tr[data-index="' + (index - 1)+ '"]');
    let $cells = $row.find("td");
    $('#dynamic-table thead tr th').each(function (index) { 
        var val = data[$(this).attr('data-field')];
        if (val !== undefined && val !== null) {
            $cells.eq(index).text(val);
        }
        else
        {
            $cells.eq(index).text('-');
        }
    });

}

function TaskDeselectMultiselected()
{
    $('.selected-task').removeClass('selected-task');
    SetMultiselectedIds([]);
}

function TaskDeselectSelected()
{
   $('.table-primary').removeClass('table-primary');    
}

function SetMultiselect(enabled)
{
    $('input[name="task-multiselect"]').removeAttr('checked');
    if (enabled)
        $('input[name="task-multiselect"][value="true"]').attr('checked','');
    else 
        $('input[name="task-multiselect"][value="false"]').attr('checked','');
    if (enabled) {
        TaskDeselectSelected();
        DeleteManyShow();
    }
    else {
        TaskDeselectMultiselected();
        DeleteManyHide();
    }
}

function GetMultiselect()
{
    return $('input[name="task-multiselect"]:checked').val() == 'true';
}

function GetMultiselectedIds()
{
    var data = $('#task_Ids').val();
    if (data == undefined || data == null ||  data == "" )
        return [];
    return JSON.parse(data);
}

function SetMultiselectedIds(data)
{
    var data = JSON.stringify(data);
    $('#task_Ids').val(data);
}

$(document).ready(function() {
    // Функция для инициализации таблицы
    function TasksInitTable() {
        $('#dynamic-table').bootstrapTable(taskConfig);
       SetMultiselect(false);
    }

    SetMultiselect(false);
    
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
        
        var id = row.id;
        $('#task_rowIndex').val(rowIndex);
        $('#task_Id').val(id);
        
        if (GetMultiselect())
        {
            $element.toggleClass('selected-task');
            var isSet  = $element.hasClass('selected-task');
            var ids = GetMultiselectedIds();
            
            if (isSet) {
                if (!ids.includes(id)) 
                {
                    ids.push(id);
                }
            }
            else if (ids.includes(id))
            {
                for (var i = 0; i < ids.length; i++) {
                    if (ids[i] == id) {
                        ids.splice(i, 1);
                        break;
                    }
                }
            }
            SetMultiselectedIds(ids);
        }
        else
        {
            $('.table-primary').removeClass('table-primary'); // убираем выделение
            $element.addClass('table-primary');         // выделяем текущую строку
            TaskSetId(row.id);
            LoadFiles(row.id);
        }
    });

    $('input[name="task-multiselect"]').change(function() {
        var value = $('input[name="task-multiselect"]:checked').val();
        if (value == 'true') {
            SetMultiselect(true);
            TaskSetId(null);
        }
        else {
            SetMultiselect(false);
        }
    });
    
});
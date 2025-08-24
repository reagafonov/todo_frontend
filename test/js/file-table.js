var fileConfig = {
    columns: [
        {
            field: 'name',
            title: 'Названиме'
        },
        {
            field: 'created',
            title: 'Дата создания'
        },
    ],
    data: [], // Пустой массив для начала

};

function FileControlShow() {
    $('#file-table').removeAttr('style');
    
}
function FileControlHide() {
    $('#file-table').attr('style', 'display:none');
    FileEditHide();
}

function RefreshFiles() {
    FileLoadData(GetFileUrl());
}


function SetTaskId(id) {
    state.selectedTaskId = id;
}

function LoadFiles(id) {
    SetTaskId(id);
    RefreshFiles();
}

function GetFileUrl() {
    return backend_task_files+state.selectedTaskId;
}

function FileLoadData(url) {
    if (url == "")
    {
        FileControlHide();
        return;
        
    }
    $.ajax({
        url: url, // URL вашего API
        method: 'GET',
        success: function(response) {
            $('#file-table').bootstrapTable('load', response);
        },
        error: function(error) {
            console.error('Ошибка загрузки данных:', error);
        }
    });
    FileControlShow();
    FileEditLoad(null);
}


$(function() {
    $('#file-table').bootstrapTable(taskConfig);
    FileLoadData("");
    $('#dynamic-table').on('click-row.bs.table', function (e, row, $element) {
        console.log("Выбранная строка:", row);
        $('#file-form').attr('action', backend_task_files + row.id);
        console.dir(row);
        console.dir($element);
        var rowIndex = $element[0].rowIndex;
        console.log(rowIndex);

        var id = row.id;
        $('#file_rowIndex').val(rowIndex);
        $('#file_Id').val(id);
        $('.table-primary').removeClass('table-primary'); // убираем выделение
        $element.addClass('table-primary');         // выделяем текущую строку
        LoadFiles(row.id);
        FileEditLoad(id);
        
    });
   
})
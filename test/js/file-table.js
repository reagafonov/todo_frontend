function FileTable(baseUrl) {
    this.baseUrl = baseUrl;
    this.fileConfig = {
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

    this.show = function () {
        $('#file-table').removeAttr('style');

    }

    this.hide= function () {
        $('#file-table').attr('style', 'display:none');
    }

    this.getUrl = function (id) {
        return this.baseUrl + id;
    }
    
    this.loadFromUrl = function (url) {
      
        $.ajax({
            url: url, // URL вашего API
            method: 'GET',
            success: function (response) {
                $('#file-table').bootstrapTable('load', response);
            },
            error: function (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        });
        this.show();
    }

    this.load = function (id, table) {
        if (id == null)
        {
            table.hide();
            return;
        }
        table.show();
        table.loadFromUrl(table.getUrl(id));
    }
    
    this.init = function () {
        var object = this;
        $('#file-table').bootstrapTable(object.taskConfig);
        $('#file-table').on('click-row.bs.table', function (e, row, $element) {
            console.log("Выбранная строка:", row);
            console.dir(row);
            console.dir($element);
            var rowIndex = $element[0].rowIndex;
            console.log(rowIndex);

            var id = row.id;
            $('.table-primary').removeClass('table-primary'); // убираем выделение
            $element.addClass('table-primary');         // выделяем текущую строку
            state.changedFileId(row.id);
        });
    };
    
    this.init();
    
}


$(function() {
    var table = new FileTable(backend_task_files);
    var adapter = new HandlerAdapter(table.load, table);
    state.subscribe_changedTaskId(adapter.adapted);
})
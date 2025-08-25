function TasksTable(baseUrl, table) {
    this.baseUrl = baseUrl;
    this.table = table;
    
    this.taskConfig = {
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
    
    this.toRestoreMode = function ()
    {
        $('#multiselect-radio').hide();
    }
    
    this.toNormalMode = function () {
        $('#multiselect-radio').show();
    }
    
    this.listId = null;
    
    this.load = function (id, subscriber) {
        subscriber.listId = id;
        state.changedTaskId(null);
        state.changedRestoringTaskId(null);
        subscriber.refresh();
    }
    
    this.SetUndeleting = function (enabled)
    {
        this.ShowRemovedOnly = enabled;
        if (enabled)
            this.toRestoreMode();
        else
            this.toNormalMode();
    }
    
    this.ShowRemovedOnly = false;
    
    this.getUrl = function () {
        var url =  baseUrl + state.selectedListId;
        if (this.ShowRemovedOnly)
            url = url + '/deleted';
        return url;
    }


// Функция для загрузки данных

    this.loadUrl = function (url) {
        var object = this;
        $.ajax({
            url: url, // URL вашего API
            method: 'GET',
            success: function (response) {
                object.table.bootstrapTable('load', response);
            },
            error: function (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        });
        state.changedTaskId(null);
    }

    this.refresh = function () {
        this.loadUrl(this.getUrl());
    }

    this.updateRow = function (data) {
        var index = this.index;
        let $row = this.table.find('tr[data-index="' + (index - 1) + '"]');
        let $cells = $row.find("td");
        this.table.find('thead tr th').each(function (index) {
            var val = data[$(this).attr('data-field')];
            if (val !== undefined && val !== null) {
                $cells.eq(index).text(val);
            } else {
                $cells.eq(index).text('-');
            }
        });

    }

    this.deselectMultiselect = function () {
        this.table.find('.selected-task').removeClass('selected-task');
        state.changeTaskIds(null);
    }

    this.deselect = function () {
        this.table.find('.table-primary').removeClass('table-primary');
    }

    this.IsMultiselect = false;
    
    this.ids = [];
    
    this.index = null;
    
    this.init = function (){
        var object = this;
        this.table.bootstrapTable(object.taskConfig);

        this.table.on('click-row.bs.table', function (e, row, $element) {

            console.log("Выбранная строка:", row);
            console.dir(row);
            console.dir($element);
            var rowIndex = $element[0].rowIndex;
            console.log(rowIndex);

            var id = row.id;
            object.index = rowIndex;

            if (object.IsMultiselect)
            {
                $element.toggleClass('selected-task');
                var isSet  = $element.hasClass('selected-task');
                var ids = state.selectedTaskIds;
                if (ids == null) ids = [];
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
                state.changedTaskIds(ids);
            }
            else
            {
                object.table.find('.table-primary').removeClass('table-primary'); // убираем выделение
                $element.addClass('table-primary');         // выделяем текущую строку
                if (object.ShowRemovedOnly)
                    state.changedRestoringTaskId(row.id);
                else
                    state.changedTaskId(row.id);
                object.id = id;
            }
        });

        $('input[name="task-multiselect"]').change(function() {
            var value = $('input[name="task-multiselect"]:checked').val();
            if (value == 'true') {
                object.IsMultiselect = true;
                state.changedTaskId(null);
                object.deselect();
            }
            else {
                object.IsMultiselect = false;
                object.deselectMultiselect();
            }
        });
    }
    
    this.init();
}

$(document).ready(function() {
    // Функция для инициализации таблицы
   var taskTable = new TasksTable(backend_tasks_for_lists, $('#task-table'));
   state.taskTable = taskTable;
   var adapter = new HandlerAdapter(taskTable.load, taskTable);
   
   state.subscribe_changedListId(adapter.adapted);
    
});
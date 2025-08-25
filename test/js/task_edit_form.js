function TaskEdit(baseUrl, taskTable) {
    this.baseUrl = baseUrl;
    this.taskTable = taskTable;
    
    this.apply = function (data) {
        $('#singleLineInput').val(data.name);
        $('#multiLineInput').val(data.description);
        $('#checkBoxExample').prop('checked', data.isCompleted);
        $('#editFormTaskListId').val(data.userTaskListId);
        $('input[name="priority"]').removeAttr('checked');
        switch (data.priority)
        {
            case 1:
                $('#edit-priority-low').attr('checked', '');
                break;
            case 2:
                $('#edit-priority-medium').attr('checked', '');
                break;
            case 3:
                $('#edit-priority-high').attr('checked', '');
                break;
            default:
                $('#edit-priority-undefined').attr('checked', '');
                break;    
        }
        this.show();
    }
    
    this.getUrl = function () {
        return this.baseUrl + state.selectedTaskId;
    } 

    this.setMultiselect = function (val) {
        $('#tasks-multiselect').val(val);
    }

    this.getMultiselect = function () {
        return $('#tasks-multiselect').val();
    }

    this.loadData = function (data, subscriber) {
        subscriber.apply(data);
        subscriber.taskTable.updateRow(data)
    }

    this.id = null;

    this.load = function (id,subscriber) {
        subscriber.id = id;
        subscriber.loadId(id);
    }

    this.hide = function () {
        $('#edit-form').attr('style', 'display:none');
    }

    this.show = function () {
        $('#edit-form').removeAttr('style');
    }

    this.refresh = function (tmp, subscriber) {
        if (subscriber != undefined && subscriber != null) 
            subscriber.loadId();
        else
            this.loadId();
    }


    this.loadId = function () {
        if (state.selectedTaskId == null) {
            this.hide();
            return;
        }
        this.show();
        var url = this.getUrl();
        var adapter = new HandlerAdapter(this.loadData, this);
        ajax_LoadObjectList(url, "GET", adapter.adapted, function () {});
    }

    this.fixData = function (data) {
        if (data.isCompleted == undefined) {
            data.isCompleted = "false";
        }
        return data;
    }

 
    this.deleteCurrent = function () {
        var removeUrl = this.getUrl();
        AjaxSendData(removeUrl, "DELETE", function(){state.changedListId(state.selectedListId);}, function () {});
        
    }
    
    this.getUrl = function () {
        return baseUrl + this.id;
    }
    
    
    this.init = function () {
        var object = this;
        $('#task-form').on('submit', function(e) {
            e.preventDefault(); // предотвращаем стандартную отправку
            var adapter = new HandlerAdapter(object.refresh,object);
            AjaxFormSend($(this),object.getUrl(),'PUT',adapter.adapted, object.fixData)
        });
        
        $('#checkBoxExample').on('change', function() {
            var adapter = new HandlerAdapter(object.refresh,object);
            if ($(this).is(':checked')) {
                AjaxSendData(backend_task+state.selectedTaskId+"/complete", "PATCH", adapter.adapted, function (){alert("err")});
            } else {
                AjaxSendData(backend_task+state.selectedTaskId+"/uncomplete", "PATCH", adapter.adapted, function (){});
            }
        });
        
        $('#task-delete').on('click', function() {
            object.deleteCurrent();
        });

    }
    this.init();
}

$(function() {
    
   var taskEdit = new TaskEdit(backend_task, state.taskTable);
   taskEdit.hide();
   var adapter = new HandlerAdapter(taskEdit.load,taskEdit);
   
   state.subscribe_changedTaskId(adapter.adapted);
    
});
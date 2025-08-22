function TaskApplyData(data)
{
    $('#singleLineInput').val(data.name);
    $('#multiLineInput').val(data.description);
    $('#checkBoxExample').prop('checked',data.isCompleted);
    $('#editFormTaskListId').val(data.userTaskListId);
    TaskShowForm();
    TasksUpdateRow(GetSelectedIndex(),data);
}

function GetSelectedIndex()
{
    return $('#task_rowIndex').val();
}

function GetCurrentId()
{
    return $('#taskRowId').val();
}

function SetCurrentId(id)
{
    $('#taskRowId').val(id);
}


function TaskSetId(id)
{
    SetCurrentId(id);
    TaskEditFormLoad(id);
}

function TaskHideForm()
{
    $('#edit-form').attr('style', 'visibility:hidden');
}

function TaskShowForm()
{
    $('#edit-form').removeAttr('style');
}

function TasksRefreshCurrent(tmp)
{
    TaskEditFormLoad(GetCurrentId());
}


function TaskEditFormLoad(id)
{
    if (id == null) {
        TaskHideForm();
        return;
    }
    SetCurrentId(id);
    var url = backend_task + id;
    
    ajax_LoadObjectList(url, "GET", TaskApplyData, function () {});
}

function FixData(data)
{
    if (data.isCompleted == undefined)
    {
        data.isCompleted = "false";
    }
    return data;
}

function TasksFormToJson(form) {
    const f = form.serializeArray();
    var obj = {};
    for (let i = 0; i < f.length; i++) {
        obj[f[i].name] = f[i].value;
    }
    return obj;
}



function TasksOnLoaded(response)
{
    response = FixData(response);
    TaskEditFormLoad(GetCurrentId());
}

function DeleteCurrent()
{
    var id = GetCurrentId();
    var removeUrl = backend_task+id;
    AjaxSendData(removeUrl,"DELETE",TaskRefreshData,function (){});
}

$(function() {
    $('#task-form').attr('method', "PUT");
    $('#task-form').on('submit', function(e) {
        e.preventDefault(); // предотвращаем стандартную отправку
       AjaxFormSend($(this),$('#task-form').attr("action"),$('#task-form').attr("method"),TasksOnLoaded, FixData)
    });
    $('#checkBoxExample').on('change', function() {
        if ($(this).is(':checked')) {
           AjaxSendData(backend_task+GetCurrentId()+"/complete", "PATCH", TasksRefreshCurrent, function (){alert("err")});
        } else {
            AjaxSendData(backend_task+GetCurrentId()+"/uncomplete", "PATCH", TasksRefreshCurrent, function (){});
        }
    });
    $('#task-delete').on('click', function() {
            DeleteCurrent();
    });
    
});
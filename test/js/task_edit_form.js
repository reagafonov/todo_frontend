function TaskApplyData(data)
{
    $('#singleLineInput').val(data.name);
    $('#multiLineInput').val(data.description);
    $('#checkBoxExample').prop('checked',data.isCompleted);
    $('#editFormTaskListId').val(data.userTaskListId);
    $('#edit-form').removeAttr('style');
    TasksUpdateRow($('#task_rowIndex').val(),data);
}

function TaskSetId(id)
{
    $('#taskRowId').val(id);
    TaskEditFormLoad(id);
}

function TaskEditFormLoad(id)
{
    if (id == null) {
        $('#edit-form').attr('style', 'visibility:hidden');
        return;
    }
    $('#task_Id').val(id);
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
    TaskEditFormLoad($('#taskRowId').val())
}

$(function() {
    $('#task-form').attr('method', "PUT");
    $('#task-form').on('submit', function(e) {
        e.preventDefault(); // предотвращаем стандартную отправку
       AjaxFormSend($(this),$('#task-form').attr("action"),$('#task-form').attr("method"),TasksOnLoaded, FixData)
    });

});
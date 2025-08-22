function AddTaskSetTaskListId(id)
{
    $('#add-task-list-id').val(id);
}

$(function () {
    $('#add-task-form').attr('method', "POST");
    $('#add-task-form').attr('action', backend_task);
    $('#add-task-form').on('submit', function(e) {
        e.preventDefault(); // предотвращаем стандартную отправку
        AjaxFormSend($(this),backend_task,"POST",TaskRefreshData);
        TaskRefreshData();
        $('#add-task-name').val('');
    });
})
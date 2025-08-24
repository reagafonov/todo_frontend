function RestoreHide() {
    $('#task-restore').attr('style', 'visibility: hidden');
}

function RestoreShow() {
    $('#task-restore').removeAttr('style');
}

$(function () {
    $('#task-undelete').on('change', function () {
        if ($(this).is(':checked'))
        {
            RestoreShow();
            ShowRemovedOnly = true;
        }
        else
        {
            RestoreHide();
            ShowRemovedOnly = false;
        }
        TaskRefreshData();
    });

    $('#task-restore').on('click', function () {
        AjaxSendData(backend_task+GetCurrentId()+"/undelete", "PATCH", function (){TaskRefreshData();}, function (){});
    });
})


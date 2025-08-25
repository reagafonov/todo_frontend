
function RestoreHide() {
    $('#task-restore').attr('style', 'visibility: hidden');
}

function RestoreShow() {
    $('#task-restore').removeAttr('style');
}

function RestoreController(id)
{
    if (id == null) {
        RestoreHide();
        return;
    }
    RestoreShow();
}

$(function () {
    $('#task-undelete').on('change', function () {
        if ($(this).is(':checked'))
        {
            state.taskTable.SetUndeleting(true);
            state.changedTaskId(null);
        }
        else
        {
            state.taskTable.SetUndeleting(false);
            state.changedRestoringTaskId(null);
        }
        state.changedListId(state.selectedListId);
    });

    $('#task-restore').on('click', function () {
        AjaxSendData(backend_task+state.selectedRestoringTaskId+"/undelete", "PATCH", function (){state.changedListId(state.selectedListId);}, function (){});
    });
    
    state.subscribe_changedRestoringTaskId(RestoreController);
})


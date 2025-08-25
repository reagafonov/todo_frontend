
function DeleteManyShow() {
    $('#task-delete-many').removeAttr('style');
}

function DeleteManyHide() {
    $('#task-delete-many').attr('style', 'visibility: hidden');
}

function LoadMany(data)
{
    if (data == null || data == [])
    {
        DeleteManyHide();
        return;
    }
    DeleteManyShow();
}


$(function (){
    DeleteManyHide();
    $('#task-delete-many').click(function (){
        var ids =  state.selectedTaskIds;
        AjaxSendInnerData(backend_task,'DELETE',function(){
            state.changedListId(state.selectedListId);
        }, 
            function (){}, JSON.stringify(state.selectedTaskIds) );
    });
    state.subscribe_changedTaskIds(LoadMany);
})

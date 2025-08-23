function DeleteManyShow() {
    $('#task-delete-many').removeAttr('style');
}

function DeleteManyHide() {
    $('#task-delete-many').attr('style', 'visibility: hidden');
}


$(function (){
    DeleteManyHide();
    $('#task-delete-many').click(function (){
        var ids =  GetMultiselectedIds();
        AjaxSendInnerData(backend_task,'DELETE',function(){
            TaskRefreshData();
        }, 
            function (){}, JSON.stringify(ids) );
    })
})

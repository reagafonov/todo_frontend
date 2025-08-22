function ListsOnLoaded(response)
{
    ListsLoad();
}

$(function() {
    $('#list-add').attr('method', "POST");
    $('#list-add').attr('action', backend_lists);
    $('#list-add').on('submit', function(e) {
        e.preventDefault(); // предотвращаем стандартную отправку
        AjaxFormSend($(this),backend_lists,"POST",ListsOnLoaded)
    });

});
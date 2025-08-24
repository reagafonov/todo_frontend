function FileEditHide(){
    $('#file-delete').attr('style', 'display:none');
}
function FileEditShow(){
    $('#file-delete').removeAttr('style');
}
function FileEditLoad(id) {
    if (id == null) {
        FileEditHide();
        return;
    }
    FileEditShow();
}

function FileOnLoad(data)
{
    $('#file-name').val(data.name);
}

function GetFileLoadUrl()
{
    return backend_files + state.selectedTaskId;
}

function RemoveFile() {
    var url = backend_files + state.selectedTaskId;
    AjaxSendData(url,"DELETE",RefreshFiles,function (){});
}

$(function () {
    $('#task-file-upload').on('submit', function(e) {
        e.preventDefault(); // предотвращаем стандартную отправку
        var formData = new FormData();
        formData.append('File', $('input[type=file]')[0].files[0]);
        formData.append('Name', $('#file-name').val());

        $.ajax({
            url: GetFileLoadUrl(), // например: /v1/TodoFile/{guid}
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                RefreshFiles();
            },
            error: function (xhr) {
                console.error("Ошибка загрузки:", xhr.responseText);
            }
        });
        //AjaxFormSendFiles(formData,GetFileLoadUrl(),$('#task-file-upload').attr("method"),TasksOnLoaded, FixData);
           
    });
    
    $('#task-file-upload').attr('method', "POST");
    $('#file-delete').on('click', function(e) {
        RemoveFile();
    })
})


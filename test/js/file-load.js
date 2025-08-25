function FileLoad(baseUrl) {
    this.baseUrl = baseUrl;
    this.id = null;
    this.hide = function () {
        $('#file-delete').attr('style', 'display:none');
    }

    this.show = function () {
        $('#file-delete').removeAttr('style');
    }

    this.load = function (id, subscriber) {
        if (id == null) {
            subscriber.hide();
            return;
        }
        subscriber.show();
        subscriber.id = id;
    }

    this.getUrl = function () {
        return baseUrl + this.id;
    }
    
    this.onLoaded = function () {
        sate.onchangedTaskId(state.selectedTaskId);
    }

    this.removeFile = function () {
        var url = this.getUrl();
        AjaxSendData(url, "DELETE", this.onLoaded , function () {
        });
    }
    
    this.init = function () {
        var object = this;
        $('#task-file-upload').on('submit', function(e) {
            e.preventDefault(); // предотвращаем стандартную отправку
            var formData = new FormData();
            var file =$('#fileUpload')[0].files[0];
            formData.append('File', $('#fileUpload')[0].files[0]);

            $.ajax({
                url: object.getUrl(), // например: /v1/TodoFile/{guid}
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    state.changedTaskId(state.selectedTaskId);
                },
                error: function (xhr) {
                    console.error("Ошибка загрузки:", xhr.responseText);
                }
            });
            $('#fileUpload').val('');
        });

       
    };
    
    this.init();
}

$(function () {
    var fileLoad = new FileLoad(backend_files);
    
    var adapter = new HandlerAdapter(fileLoad.load, fileLoad);
    state.subscribe_changedTaskId(adapter.adapted);
    fileLoad.hide();
})


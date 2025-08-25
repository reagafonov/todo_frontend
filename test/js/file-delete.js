function FileDelete(baseUrl, button) {
    this.baseUrl = baseUrl;
    
    this.button = button;
    
    this.hide = function (){ button.hide();}
    this.show = function () { button.show();}
    
    this.id = null;
    
    this.load = function (id, fileDelete) { 
        if (id == null)
        {
            buttonDelete.hide();
            return;
        }
        buttonDelete.show();
        buttonDelete.id = id;
    }
    
    this.init = function () {
        button.on('click', function(e) {
            var url = baseUrl+this.id;
            ajax_LoadObjectList(url, 'DELETE', state.changedTaskId(this.id), function (){});
        })
    };
    
    this.init();
    
}

$(function () {
    var deleteButton = new FileDelete(backend_files,$('#file-delete'));
    
    var adapter = new HandlerAdapter(deleteButton.load, deleteButton);
    state.subscribe_changedFileId(adapter.adapted);
})
function FileDelete(baseUrl, button) {
    this.baseUrl = baseUrl;
    
    this.button = button;
    
    this.hide = function (){ button.hide();}
    this.show = function () { button.show();}
    
    this.id = null;
    
    this.load = function (id, fileDelete) { 
        if (id == null)
        {
            fileDelete.hide();
            return;
        }
        fileDelete.show();
    }
    
    this.init = function () {
        button.on('click', function(e) {
            var url = baseUrl+state.selectedFileId;
            var adapter = new HandlerAdapter(this.onDeleted, this);
            AjaxDelete(url, function (response) {state.changedTaskId(state.selectedTaskId);});
            
        })
    };
    
    this.init();
    
}

$(function () {
    var deleteButton = new FileDelete(backend_files,$('#task-file-delete'));
    
    var adapter = new HandlerAdapter(deleteButton.load, deleteButton);
    state.subscribe_changedFileId(adapter.adapted);
})
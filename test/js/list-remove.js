function ListRemove(baseUrl,removeButon) {
    this.baseUrl = baseUrl;
    this.removeButon = removeButon;
    
    this.hide = function () {
        removeButon.hide();
    }
    
    this.show = function () {
        removeButon.show();
    }
    
    this.load = function (id,f) {
        if (id == null)
        {
            f.hide();
            return;
        }
        f.show();
    }
    
    this.getUrl = function () {
        return baseUrl + state.selectedListId;
    }
    
    this.action = function () {
        AjaxDelete(this.getUrl(), function (response) {state.changedListId(null);ListsLoad();});    
    }
    
    this.init = function () {
        var object = this;
        removeButon.on('click', function () {
            object.action();
        })
    }
    
    this.init();
}

$(function() {
    var deleteButton = new ListRemove(backend_lists,$('#delete-list'));
    var adapter = new HandlerAdapter(deleteButton.load, deleteButton);
    state.subscribe_changedListId(adapter.adapted);
})
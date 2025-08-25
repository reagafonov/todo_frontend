function ListEdit(form,baseUrl,name)
{
    this.baseUrl = baseUrl;
    this.name = name;
    this.form = form;
    
    this.show = function(){
        form.show();
    }
    
    this.hide = function (){
        form.hide();
    }
    
    this.load = function(tmp, f){
        if (state.selectedListId == null)
        {
            f.hide();
            return;
        }
        f.show();
        f.loadData();
    }
    
    this.getUrl = function(){
        return baseUrl + state.selectedListId;    
    }
    
    this.dataLoaded = function(data,f){
        f.name.val(data.name);
        ChangeName(state.selectedListId, data.name);
    }
    
    this.afterSave = function(tmp,f){
        f.load(tmp, f);
    }
    
    this.loadData = function(){
        var adapter = new HandlerAdapter(this.dataLoaded,this);
        ajax_LoadObjectList(this.getUrl(), 'GET', adapter.adapted, function (){})
    }
    
    this.saveData = function(){
        var adapter = new HandlerAdapter(this.afterSave, this);
        AjaxFormSend(form, this.getUrl(), 'PUT', adapter.adapted);
    }
    
    this.init =  function(){
        var object = this;
        form.on('submit', function (e) {
            e.preventDefault();
            object.saveData();
        })
        this.hide();
    }
    
    this.init();
}

$(function(){
    var edit = new ListEdit($('#list-edit'), backend_lists, $('#edit-list-name'));
    var adapter = new HandlerAdapter(edit.load,edit);
    state.subscribe_changedListId(adapter.adapted);
})
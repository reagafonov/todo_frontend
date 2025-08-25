var ShowRemovedOnly = false;

var state = state = {
    taskTable:null,
    selectedRestoringTaskId: null,
    selectedFileId: null,
    selectedTaskId: null,
    selectedTaskIds: null,
    selectedListId: null,
    
    changedListId: function (id)
    {
        var event = new CustomEvent('listchangedid',{
            detail: {
                id:id
            },
        });
        document.dispatchEvent(event);
    },
    subscribe_changedListId:   function (handler)
    {
        var adapter = new HandlerIdAdapter(handler);
        document.addEventListener('listchangedid', adapter.adapter);
    },

    changedRestoringTaskId: function (id)
    {
        var event = new CustomEvent('restoretaskchangedids',{
            detail: {
                id:id
            },
        });
        document.dispatchEvent(event);
    },
    subscribe_changedRestoringTaskId:   function (handler)
    {
        var adapter = new HandlerIdAdapter(handler);
        document.addEventListener('restoretaskchangedids', adapter.adapter);
    },
    
    changedTaskIds: function (id)
    {
        var event = new CustomEvent('taskchangedids',{
            detail: {
                id:id
            },
        });
        document.dispatchEvent(event);
    },
    subscribe_changedTaskIds:   function (handler)
    {
        var adapter = new HandlerIdAdapter(handler);
        document.addEventListener('taskchangedids', adapter.adapter);
    },

    changedTaskId: function (id)
    {
        var event = new CustomEvent('taskchangedid',{
            detail: {
                id:id
            },
        });
        document.dispatchEvent(event);
    },
    
    subscribe_changedTaskId:   function (handler)
    {
        var adapter = new HandlerIdAdapter(handler, function (id) {selectedTaskId = id});
        document.addEventListener('taskchangedid', adapter.adapter);
    },
    
    changedFileId: function (id)
    {
        var event = new CustomEvent('taskfilechangedid',{
            detail: {
                id:id
            },
        });
        document.dispatchEvent(event);
    },
    subscribe_changedFileId:   function (handler)
    {
        var adapter = new HandlerIdAdapter(handler);
        document.addEventListener('taskfilechangedid', adapter.adapter);
    }
}

function HandlerIdAdapter(handler) {
    this.handler = handler,
    this.adapter = function(event) {
        handler(event.detail.id);
    }
}

function HandlerAdapter(handler, handlerOwner)
{
    this.handler = handler;
    this.handlerOwner = handlerOwner;
    this.adapted = function (data)
    {
        handler(data, handlerOwner);
    }
}

$(function (){
    var listIdAdapter = new HandlerAdapter(function (id, global) {global.selectedListId = id;}, state);
    var taskIdAdapter = new HandlerAdapter(function (id, global) {global.selectedTaskId = id;}, state);
    var taskIdsAdapter = new HandlerAdapter(function (id, global) {global.selectedTaskIds = id;}, state);
    var fileIdAdapter = new HandlerAdapter(function (id, global) {global.selectedFileId = id;}, state);
    var restoringTaskIdAdapter = new HandlerAdapter(function (id, global) {global.selectedRestoringTaskId = id;}, state);

    state.subscribe_changedListId(listIdAdapter.adapted);
    state.subscribe_changedTaskId(taskIdAdapter.adapted);
    state.subscribe_changedTaskIds(taskIdsAdapter.adapted);
    state.subscribe_changedFileId(fileIdAdapter.adapted);
    state.subscribe_changedRestoringTaskId(restoringTaskIdAdapter.adapted);
})
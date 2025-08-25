var ShowRemovedOnly = false;
var state = null;
function HandlerIdAdapter(handler) {
    this.handler = handler,
    this.adapter = function(event) {
        handler(event.detail.id);
    }
}

$(function() {
    ShowRemovedOnly = false;
    state = {
        selectedFileId: null,
        selectedTaskId: null,
        selectedListId: null,
        changedFileId: function (id)
        {
            var event = new CustomEvent('taskfilefilechangedid',{
                detail: {
                    id:id
                },
            });
            document.dispatchEvent(event);
        },
        subscribe_changedFileId:   function (handler)
        {
            var adapter = new HandlerIdAdapter(handler);
            document.addEventListener('taskfilefilechangedid', adapter.adapter);
        }
    }
})
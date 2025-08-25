//function AjaxFormSend(form, url, method)
//{
//    e.preventDefault(); // предотвращаем стандартную отправку
//    var obj = FixData(TasksFormToJson(form));
//    console.dir(obj);
//    var data =  obj.serialize();
//    console.log(data);
//    $.ajax({
//        url: $('#task-form').attr("action"), // URL для отправки
//        type: $('#task-form').attr("method"),
//        data: data,
//        success: function(response) {
//            console.log('Успешно:', response);
//            response = FixData(response);
//            TaskEditFormLoad($('#task_Id').val())
//        },
//        error: function(error) {
//            console.error('Ошибка:', error);
//        }
//    });
//}

function AjaxFormSend(form, url, method, OnResponse, FixData)
{
    const f = form.serializeArray();
    var obj = {};
    for (let i = 0; i < f.length; i++) {
        obj[f[i].name] = f[i].value;
    }

    if (FixData != undefined)
        obj = FixData(obj);
    console.dir(obj);
    var data =  JSON.stringify(obj);
    console.log(data);
    $.ajax({
        url: url, // URL для отправки
        type: method,
        data: data,
        contentType: 'application/json',
        success: function(response) {
            console.log('Успешно:', response);
            OnResponse(response);
        },
        error: function(error) {
            console.error('Ошибка:', error);
        }
    });
}

function AjaxFormSendFiles(form, url, method, OnResponse)
{
    
    $.ajax({
        url: url, // URL для отправки
        type: method,
        data: form,
        success: function(response) {
            console.log('Успешно:', response);
            OnResponse(response);
        },
        error: function(error) {
            console.error('Ошибка:', error);
        }
    });
}
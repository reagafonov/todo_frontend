// function loadObjectList(url, method, on_success, on_error) {
//     // Выполняем AJAX-запрос
//     $.ajax({
//         url: url,                   // URL для получения данных
//         method: 'GET',             // Метод запроса
//         dataType: 'json',         // Ожидаемый тип данных
//         beforeSend: function() {
//             // Опционально: показываем индикатор загрузки
//             $('#' + containerId).html('<div class="loading">Загрузка...</div>');
//         },
//         success: function(response) {
//             // Обрабатываем успешный ответ
//             renderList(response, containerId);
//         },
//         error: function(xhr, status, error) {
//             // Обрабатываем ошибки
//             $('#' + containerId).html('<div class="error">Ошибка загрузки данных</div>');
//             console.error('Ошибка:', error);
//         }
//     });
// }

function ajax_LoadObjectList(url, method, on_success, on_error) {
     // Выполняем AJAX-запрос
     $.ajax({
         url: url,                   // URL для получения данных
         method: method,             // Метод запроса
         dataType: 'json',         // Ожидаемый тип данных
         contentType: 'application/json',
         beforeSend: function() {
             // Опционально: показываем индикатор загрузки
             //$('#' + containerId).html('<div class="loading">Загрузка...</div>');
         },
         success: on_success,
         error: on_error
     });
 }

function AjaxSendData(url, method, on_success, on_error) {
    // Выполняем AJAX-запрос
    $.ajax({
        url: url,                   // URL для получения данных
        method: method,             // Метод запроса
        contentType: 'application/json',
        beforeSend: function() {
            // Опционально: показываем индикатор загрузки
            //$('#' + containerId).html('<div class="loading">Загрузка...</div>');
        },
        success: on_success,
        error: on_error
    });
}


function AjaxSendInnerData(url, method, on_success, on_error, data) {
    // Выполняем AJAX-запрос
    $.ajax({
        url: url,                   // URL для получения данных
        method: method,             // Метод запроса
        data: data,
        contentType: 'application/json',
        beforeSend: function() {
            // Опционально: показываем индикатор загрузки
            //$('#' + containerId).html('<div class="loading">Загрузка...</div>');
        },
        success: on_success,
        error: on_error
    });
}
 
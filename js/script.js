document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Убираем активный класс со всех элементов
            navLinks.forEach(item => item.parentElement.classList.remove('active'));

            // Добавляем активный класс на текущий элемент
            this.parentElement.classList.add('active');

            // Здесь можно добавить логику переключения контента
        });
    });
});
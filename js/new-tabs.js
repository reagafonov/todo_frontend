function addNewTab() {
    const newTab = document.createElement('div');
    newTab.classList.add('tab-item');
    newTab.innerHTML = `
        <div class="tab-content">
            <div class="tab-title">Новый список</div>
            <div class="tab-actions">
                <button class="edit-btn">Редактировать</button>
                <button class="delete-btn">Удалить</button>
            </div>
        </div>
    `;
    document.querySelector('.tab-list').appendChild(newTab);
}
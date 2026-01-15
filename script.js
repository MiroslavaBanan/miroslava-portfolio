document.addEventListener('DOMContentLoaded', () => {
    const contentDynamic = document.getElementById('content-dynamic');

    // Загружаем секцию
    async function loadSection(section) {
        try {
            const response = await fetch(`./sections/${section}.html`);
            const html = await response.text();
            contentDynamic.innerHTML = html;

            // Запускаем табы в любой секции, где они есть
            initProjectTabs();

        } catch (error) {
            contentDynamic.innerHTML = "<p>Error loading section.</p>";
        }
    }

    // Клики по меню
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            loadSection(section);
        });
    });

    // Загружаем About по умолчанию
    loadSection('about');
});


// ---------------------------
// ТАБЫ ВНУТРИ КАРТОЧЕК
// ---------------------------
function initProjectTabs() {
    document.querySelectorAll('.project-card').forEach(card => {
        const output = card.querySelector('[data-content]');
        const allContents = card.querySelectorAll('[data-tab-content]');
        const tabs = card.querySelectorAll('.tab');

        if (!output || allContents.length === 0) return;

        // Показываем первый таб по умолчанию
        output.innerHTML = allContents[0].innerHTML;

        // Сбрасываем активность и ставим активным первый таб
        tabs.forEach(t => t.classList.remove('tab--active'));
        tabs[0].classList.add('tab--active');

        // Навешиваем обработчики на кнопки
        tabs.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                const content = card.querySelector(`[data-tab-content="${tab}"]`);

                if (content) {
                    output.innerHTML = content.innerHTML;
                }

                // Убираем активный класс у всех табов
                tabs.forEach(t => t.classList.remove('tab--active'));

                // Добавляем активный класс на выбранный
                btn.classList.add('tab--active');
            });
        });
    });
}

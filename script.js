document.addEventListener('DOMContentLoaded', () => {
    const contentDynamic = document.getElementById('content-dynamic');

    // Загружаем секцию
    async function loadSection(section) {
        try {
            const response = await fetch(`./sections/${section}.html`);
            const html = await response.text();
            contentDynamic.innerHTML = html;

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

            document.querySelectorAll('.sidebar__menu-item').forEach(item => {
                item.classList.remove('sidebar__menu-item--active');
            });

            link.classList.add('sidebar__menu-item--active');
        });
    });

    loadSection('about');

    const defaultLink = document.querySelector('[data-section="about"]');
    if (defaultLink) {
        defaultLink.classList.add('sidebar__menu-item--active');
    }
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

        output.innerHTML = allContents[0].innerHTML;

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

                tabs.forEach(t => t.classList.remove('tab--active'));

                btn.classList.add('tab--active');
            });
        });
    });
}

const nlEls = document.querySelectorAll('.nl');
const versEl = document.querySelectorAll('version');

document.querySelector('build').innerHTML = '20-11-2025';

nlEls.forEach(nl => {
    nl.addEventListener('click', (e) => {
        // prevent parent .nl handlers from also toggling when nested .nl clicked
        e.stopPropagation();

        const arrow = nl.querySelector('.arrow');
        const subList = nl.querySelector('ul');

        if (!arrow) return;

        const isCollapsed = arrow.classList.contains('collapsed');

        if (isCollapsed) {
            arrow.classList.remove('collapsed');
            arrow.classList.add('expanded');
            // clear inline style so CSS controls layout (removes display: none)
            if (subList) subList.style.display = '';
        } else {
            arrow.classList.remove('expanded');
            arrow.classList.add('collapsed');
            // hide sublist using inline style
            if (subList) subList.style.display = 'none';
        }
    });
});

versEl.forEach(ver => {
    ver.innerHTML = '6000.0.62f1';
})

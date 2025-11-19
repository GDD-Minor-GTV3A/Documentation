const versEl = document.querySelectorAll('version');

versEl.forEach(ver => {
    ver.innerHTML = '6000.0.62f1';
})

document.querySelector('build').innerHTML = '20-11-2025';

document.addEventListener("DOMContentLoaded", () => {
    const sidebarEl = document.getElementById("sidebar");
    
    fetch("../Templates/Sidebar.sidebar")
    .then(res => res.text())
    .then(html => {
        sidebarEl.innerHTML = html;

        AddSidebarListener();
        HighlightActiveLink();
    })
});

function AddSidebarListener() {
    const nlEls = document.querySelectorAll('.nl');

    nlEls.forEach(nl => {
        nl.addEventListener('click', (e) => {
            // prevent parent .nl handlers from also toggling when nested .nl clicked
            e.stopPropagation();

            // scope to direct children so nested .nl doesn't pick up ancestor arrows/lists
            const arrow = nl.querySelector(':scope > .arrow');
            const subList = nl.querySelector(':scope > ul');

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
};

function HighlightActiveLink() {
    const current = window.location.pathname.replace(/\\/g, "/");
    const links = document.querySelectorAll("#sidebar a");

    links.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (!linkPath) return;

        // resolve relative href to an absolute path and normalize
        let resolvedPath;
        try {
            resolvedPath = new URL(linkPath, window.location.href).pathname.replace(/\\/g, "/");
        } catch (e) {
            // fallback: strip common relative segments
            resolvedPath = linkPath.replace(/^\.\/?|^\.\.\//g, "");
        }

        // match exact or trailing path (keeps behavior if site is served from different base)
        if (current === resolvedPath || current.endsWith(resolvedPath)) {
            link.classList.add("current");

            // expand all ancestor groups so nested sections reveal the active link
            let parentUl = link.closest('ul');
            while (parentUl) {
                // show this sublist — clear inline style so CSS controls layout
                parentUl.style.display = '';

                const parentLi = parentUl.parentElement;
                if (!parentLi) break;

                // only target the arrow that's a direct child of this li
                const arrow = parentLi.querySelector(':scope > .arrow');
                if (arrow) {
                    arrow.classList.remove('collapsed');
                    arrow.classList.add('expanded');
                }

                // move up to the next containing ul (if any)
                parentUl = parentLi.closest('ul');
            }
        }
    });
};
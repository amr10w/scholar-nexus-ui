/* =================================================================
   LAYOUT.JS — Scholar Nexus
   Injects navbar and footer into #app-header and #app-footer.
   Handles logout. Uses new BEM CSS classes from layout.css.
   ================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ─── 1. Inject Navbar ─── */
    var header = document.getElementById('app-header');
    var path = window.location.pathname;

    if (header) {
        var user = JSON.parse(localStorage.getItem('nexus_user'));

        var authHTML = '';
        if (user) {
            authHTML =
                '<div class="navbar__user">' +
                '<i class="fas fa-user-circle"></i> ' + user.name +
                '</div>' +
                '<button class="btn btn-sm btn-outline" id="logout-btn">Logout</button>';
        } else {
            authHTML =
                '<a href="login.html" class="btn btn-sm btn-outline">Log in</a>' +
                '<a href="login.html" class="btn btn-sm btn-primary">Register</a>';
        }

        header.innerHTML =
            '<nav class="navbar">' +
            '<div class="navbar__inner">' +

            /* Brand */
            '<a href="index.html" class="navbar__brand">' +
            '<span class="navbar__brand-icon"><i class="fas fa-graduation-cap"></i></span>' +
            'Scholar Nexus' +
            '</a>' +

            /* Navigation Links */
            '<div class="navbar__links">' +
            '<a href="scanner.html" class="navbar__link' + (path.includes('scanner') ? ' active' : '') + '">Academia</a>' +
            '<a href="explorer.html" class="navbar__link' + (path.includes('explorer') ? ' active' : '') + '">Explorer</a>' +
            '<a href="jobs.html" class="navbar__link' + (path.includes('jobs') ? ' active' : '') + '">Jobs</a>' +
            '<a href="companies.html" class="navbar__link' + (path.includes('companies') ? ' active' : '') + '">Companies</a>' +
            '<a href="hottopics.html" class="navbar__link' + (path.includes('hottopics') ? ' active' : '') + '">Hot Topics</a>' +
            '<a href="grad-dashboard.html" class="navbar__link' + (path.includes('grad-dashboard') ? ' active' : '') + '">Database</a>' +
            '</div>' +

            /* Right Actions */
            '<div class="navbar__actions">' +
            '<button class="btn-icon" id="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark mode">' +
            '<i id="theme-icon" class="fas fa-moon"></i>' +
            '</button>' +
            authHTML +
            '</div>' +

            '</div>' +
            '</nav>';

        /* Update theme icon to match current state */
        var currentTheme = document.documentElement.getAttribute('data-theme');
        var themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        /* Attach logout handler */
        var logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                localStorage.removeItem('nexus_token');
                localStorage.removeItem('nexus_user');
                window.location.reload();
            });
        }
    }


    /* ─── 2. Inject Footer ─── */
    var footer = document.getElementById('app-footer');
    if (footer) {
        footer.innerHTML =
            '<footer class="footer">' +
            '<div class="footer__grid">' +

            /* Column 1: About */
            '<div class="footer__column">' +
            '<div class="footer__brand">' +
            '<span class="footer__brand-icon"><i class="fas fa-graduation-cap"></i></span>' +
            'Scholar Nexus' +
            '</div>' +
            '<p class="footer__text">The unified platform for academic research, global networking, and career opportunities in science and technology.</p>' +
            '<div class="footer__social">' +
            '<a href="#" class="footer__social-link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>' +
            '<a href="#" class="footer__social-link" aria-label="GitHub"><i class="fab fa-github"></i></a>' +
            '<a href="#" class="footer__social-link" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>' +
            '</div>' +
            '</div>' +

            /* Column 2: Resources */
            '<div class="footer__column">' +
            '<h4 class="footer__column-title">Resources</h4>' +
            '<div class="footer__links">' +
            '<a href="scanner.html" class="footer__link">Researcher Scanner</a>' +
            '<a href="explorer.html" class="footer__link">Topic Explorer</a>' +
            '<a href="jobs.html" class="footer__link">Jobs Portal</a>' +
            '<a href="hottopics.html" class="footer__link">Hot Topics</a>' +
            '</div>' +
            '</div>' +

            /* Column 3: Legal */
            '<div class="footer__column">' +
            '<h4 class="footer__column-title">Legal</h4>' +
            '<div class="footer__links">' +
            '<a href="privacy.html" class="footer__link">Privacy Policy</a>' +
            '<a href="api-docs.html" class="footer__link">API Documentation</a>' +
            '<a href="about.html" class="footer__link">About Us</a>' +
            '</div>' +
            '</div>' +

            /* Column 4: Connect */
            '<div class="footer__column">' +
            '<h4 class="footer__column-title">Connect</h4>' +
            '<div class="footer__links">' +
            '<a href="contact.html" class="footer__link">Contact Us</a>' +
            '<a href="team.html" class="footer__link">Our Team</a>' +
            '<a href="grad-form.html" class="footer__link">Register Project</a>' +
            '</div>' +
            '</div>' +

            '</div>' +
            '<div class="footer__bottom">&copy; 2026 Scholar Nexus. Built by Our Team.</div>' +
            '</footer>';
    }
});


/* ─── Global: logout (window-level for backward compat) ─── */
window.logout = function () {
    localStorage.removeItem('nexus_token');
    localStorage.removeItem('nexus_user');
    window.location.reload();
};


/* ─── Global: Success Toast ─── */
function showSuccessToast(message) {
    var toast = document.createElement('div');
    toast.className = 'toast toast--success';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(function () { toast.remove(); }, 400);
    }, 3000);
}
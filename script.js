/* ═══════════════════════════════════════════════
   MATH COURSE — script.js
═══════════════════════════════════════════════ */

"use strict";

// ── Éléments DOM ─────────────────────────────
const sidebar      = document.getElementById("sidebar");
const overlay      = document.getElementById("overlay");
const burgerBtn    = document.getElementById("burgerBtn");
const sidebarClose = document.getElementById("sidebarClose");
const modal        = document.getElementById("modal");
const modalClose   = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");
const toastEl      = document.getElementById("toast");
const searchBtn    = document.getElementById("searchBtn");

// ── État global ──────────────────────────────
let currentLevel = "Lycée";
let toastTimer   = null;

/* ═══════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════ */
function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

burgerBtn.addEventListener("click", openSidebar);
sidebarClose.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Swipe pour fermer la sidebar
(function initSwipeClose() {
    let startX = 0;
    sidebar.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
    sidebar.addEventListener("touchend", e => {
        const dx = startX - e.changedTouches[0].clientX;
        if (dx > 60) closeSidebar();
    }, { passive: true });
})();

/* ═══════════════════════════════════════════
   NAVIGATION — nav items
═══════════════════════════════════════════ */

// Contenu des pages
const pageContent = {
    cours: {
        title: "📚 Mes Cours",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:12px;">Mes Cours</h2>
            <p style="color:var(--text2);font-size:0.88rem;line-height:1.6;">
                Retrouvez ici tous vos cours organisés par niveau et par matière.
                Vos cours sauvegardés apparaîtront dans cette section.
            </p>
            <div style="margin-top:16px;padding:14px;background:var(--bg3);border-radius:var(--radius);border:1px solid var(--border);">
                <p style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent);">Niveau actuel : ${currentLevel}</p>
            </div>`
    },
    exercices: {
        title: "✏️ Exercices",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:12px;">Exercices</h2>
            <p style="color:var(--text2);font-size:0.88rem;line-height:1.6;">
                3 nouveaux exercices disponibles pour vous ! Pratiquez régulièrement pour progresser.
            </p>
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:16px;">
                ${["Équations du second degré", "Théorème de Pythagore", "Dérivées simples"].map((ex, i) =>
                    `<div style="padding:12px;background:var(--bg3);border-radius:var(--radius-sm);
                     border:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
                        <span style="font-size:0.85rem;">${ex}</span>
                        <span style="font-family:var(--font-mono);font-size:0.65rem;color:var(--accent);">NEW</span>
                    </div>`
                ).join("")}
            </div>`
    },
    progression: {
        title: "📊 Ma Progression",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:16px;">Ma Progression</h2>
            ${[
                { label: "Algèbre",      val: 75, color: "#f5e642" },
                { label: "Géométrie",    val: 50, color: "#60a5fa" },
                { label: "Calcul",       val: 30, color: "#f472b6" },
                { label: "Statistiques", val: 60, color: "#4ade80" },
            ].map(p => `
                <div style="margin-bottom:14px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                        <span style="font-size:0.85rem;">${p.label}</span>
                        <span style="font-family:var(--font-mono);font-size:0.75rem;color:${p.color};">${p.val}%</span>
                    </div>
                    <div style="height:5px;background:var(--bg3);border-radius:3px;overflow:hidden;">
                        <div style="height:100%;width:${p.val}%;background:${p.color};border-radius:3px;
                             transition:width 1s cubic-bezier(0.4,0,0.2,1);"></div>
                    </div>
                </div>
            `).join("")}`
    },
    favoris: {
        title: "⭐ Favoris",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:12px;">Favoris</h2>
            <p style="color:var(--text2);font-size:0.88rem;">Aucun favori pour l'instant. Ajoutez des cours ou exercices à vos favoris pour les retrouver rapidement.</p>`
    },
    parametres: {
        title: "⚙️ Paramètres",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:16px;">Paramètres</h2>
            ${[
                { icon: "🔔", label: "Notifications",    sub: "Activer les rappels" },
                { icon: "🌐", label: "Langue",           sub: "Français" },
                { icon: "🎨", label: "Thème",            sub: "Sombre" },
                { icon: "📱", label: "Mode hors-ligne",  sub: "Télécharger les cours" },
                { icon: "🔊", label: "Sons",             sub: "Effets sonores activés" },
            ].map(s => `
                <div style="display:flex;align-items:center;gap:12px;padding:12px;
                     background:var(--bg3);border-radius:var(--radius-sm);border:1px solid var(--border);margin-bottom:8px;cursor:pointer;">
                    <span style="font-size:1.2rem;">${s.icon}</span>
                    <div style="flex:1;">
                        <p style="font-size:0.88rem;font-weight:600;">${s.label}</p>
                        <p style="font-size:0.72rem;color:var(--text3);">${s.sub}</p>
                    </div>
                    <span style="color:var(--text3);font-size:0.9rem;">›</span>
                </div>
            `).join("")}`
    },
    notifications: {
        title: "🔔 Notifications",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:16px;">Notifications</h2>
            <p style="color:var(--text2);font-size:0.85rem;margin-bottom:16px;">Gérez comment vous souhaitez recevoir les notifications de l'application.</p>
            ${[
                "Rappels quotidiens",
                "Nouveaux exercices",
                "Résultats de quiz",
                "Mises à jour des cours",
            ].map(n => `
                <div style="display:flex;align-items:center;justify-content:space-between;
                     padding:12px;background:var(--bg3);border-radius:var(--radius-sm);
                     border:1px solid var(--border);margin-bottom:8px;">
                    <span style="font-size:0.85rem;">${n}</span>
                    <div class="toggle-switch" onclick="toggleSwitch(this)">
                        <div class="toggle-knob"></div>
                    </div>
                </div>
            `).join("")}`
    },
    langue: {
        title: "🌐 Langue",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:16px;">Choisir la langue</h2>
            ${[
                { flag: "🇫🇷", name: "Français",   active: true },
                { flag: "🇬🇧", name: "English",    active: false },
                { flag: "🇸🇦", name: "العربية",   active: false },
                { flag: "🇪🇸", name: "Español",   active: false },
            ].map(l => `
                <div style="display:flex;align-items:center;gap:12px;padding:12px;
                     background:var(--bg3);border-radius:var(--radius-sm);border:1px solid ${l.active ? 'var(--accent)' : 'var(--border)'};
                     margin-bottom:8px;cursor:pointer;" onclick="selectLanguage(this, '${l.name}')">
                    <span style="font-size:1.3rem;">${l.flag}</span>
                    <span style="font-size:0.88rem;flex:1;">${l.name}</span>
                    ${l.active ? '<span style="color:var(--accent);font-size:0.8rem;">✓</span>' : ''}
                </div>
            `).join("")}`
    },
    theme: {
        title: "🎨 Thème",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:16px;">Thème de l'application</h2>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                ${[
                    { name: "Sombre",  bg: "#0a0a0f", border: "#f5e642", active: true },
                    { name: "Clair",   bg: "#f8f8f0", border: "#333",    active: false },
                    { name: "Bleu",    bg: "#0a0f1a", border: "#60a5fa", active: false },
                    { name: "Rose",    bg: "#1a0a14", border: "#f472b6", active: false },
                ].map(t => `
                    <div style="padding:20px 12px;background:${t.bg};border-radius:var(--radius);
                         border:2px solid ${t.active ? t.border : 'var(--border)'};text-align:center;cursor:pointer;"
                         onclick="selectTheme(this, '${t.name}')">
                        <p style="font-size:0.85rem;color:${t.bg === '#f8f8f0' ? '#333' : '#fff'};font-weight:${t.active ? '700' : '400'};">${t.name}</p>
                        ${t.active ? '<p style="font-size:0.65rem;color:var(--accent);margin-top:4px;">Actif</p>' : ''}
                    </div>
                `).join("")}
            </div>`
    },
    support: {
        title: "💬 Support",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:8px;">Contacter le support</h2>
            <p style="color:var(--text2);font-size:0.82rem;margin-bottom:20px;">Notre équipe répond en moins de 24h.</p>
            <div style="display:flex;flex-direction:column;gap:10px;">
                ${[
                    { icon: "📧", label: "E-mail",      val: "support@mathcourse.app" },
                    { icon: "💬", label: "Chat en ligne", val: "Disponible 9h-18h" },
                    { icon: "📱", label: "WhatsApp",    val: "+212 6XX XXX XXX" },
                    { icon: "❓", label: "FAQ",          val: "Questions fréquentes" },
                ].map(c => `
                    <a style="display:flex;align-items:center;gap:12px;padding:12px;
                       background:var(--bg3);border-radius:var(--radius-sm);border:1px solid var(--border);
                       text-decoration:none;cursor:pointer;">
                        <span style="font-size:1.2rem;">${c.icon}</span>
                        <div>
                            <p style="font-size:0.85rem;font-weight:600;color:var(--text);">${c.label}</p>
                            <p style="font-size:0.72rem;color:var(--text3);">${c.val}</p>
                        </div>
                    </a>
                `).join("")}
            </div>`
    },
    confidentialite: {
        title: "🔒 Confidentialité",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:12px;">Politique de confidentialité</h2>
            <p style="color:var(--text2);font-size:0.82rem;line-height:1.7;margin-bottom:12px;">
                Nous accordons la plus grande importance à la protection de vos données personnelles.
            </p>
            ${[
                { title: "Données collectées",         text: "Nom, email, progression dans les cours et préférences de l'application." },
                { title: "Utilisation des données",    text: "Personnaliser votre expérience et améliorer nos services." },
                { title: "Partage des données",        text: "Vos données ne sont jamais vendues à des tiers." },
                { title: "Droits des utilisateurs",    text: "Vous pouvez demander la suppression de vos données à tout moment." },
            ].map(s => `
                <div style="padding:12px;background:var(--bg3);border-radius:var(--radius-sm);
                     border-left:3px solid var(--accent);margin-bottom:8px;">
                    <p style="font-weight:700;font-size:0.85rem;margin-bottom:4px;">${s.title}</p>
                    <p style="font-size:0.78rem;color:var(--text2);">${s.text}</p>
                </div>
            `).join("")}`
    },
    conditions: {
        title: "📄 Conditions",
        html: `
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;margin-bottom:12px;">Conditions d'utilisation</h2>
            <p style="color:var(--text2);font-size:0.82rem;line-height:1.7;">
                En utilisant Math Course, vous acceptez les présentes conditions. 
                L'application est destinée à des fins éducatives uniquement. 
                Toute reproduction du contenu sans autorisation est interdite.
                Dernière mise à jour : Mars 2026.
            </p>`
    },
    about: {
        title: "ℹ️ À propos",
        html: `
            <div style="text-align:center;padding:10px 0 20px;">
                <div style="width:72px;height:72px;background:linear-gradient(135deg,var(--accent),#fbbf24);
                     border-radius:18px;margin:0 auto 12px;display:flex;align-items:center;
                     justify-content:center;font-family:var(--font-mono);font-weight:700;font-size:1.3rem;color:#0a0a0f;">MC</div>
                <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.3rem;">Math Course</h2>
                <p style="color:var(--text3);font-size:0.78rem;margin-top:4px;">Version 2.4.1</p>
            </div>
            <p style="color:var(--text2);font-size:0.82rem;line-height:1.7;text-align:center;">
                Une application éducative interactive pour apprendre les mathématiques de façon moderne et engageante.
            </p>
            <div style="display:flex;justify-content:center;gap:12px;margin-top:16px;">
                <span style="font-size:0.75rem;color:var(--text3);">© 2026 Math Course</span>
                <span style="color:var(--text3);">·</span>
                <span style="font-size:0.75rem;color:var(--accent);">Tous droits réservés</span>
            </div>`
    },
    profil: {
        title: "👤 Mon Profil",
        html: `
            <div style="text-align:center;padding:10px 0 20px;">
                <div style="width:72px;height:72px;background:linear-gradient(135deg,var(--accent),#fbbf24);
                     border-radius:50%;margin:0 auto 12px;display:flex;align-items:center;
                     justify-content:center;font-family:var(--font-mono);font-weight:700;font-size:1.5rem;color:#0a0a0f;">👤</div>
                <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.2rem;">Étudiant</h2>
                <p style="color:var(--text3);font-size:0.78rem;margin-top:4px;">Niveau : ${currentLevel}</p>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;">
                ${[
                    { num:"14",  label:"Cours" },
                    { num:"87",  label:"Exercices" },
                    { num:"62%", label:"Moy. générale" },
                ].map(s => `
                    <div style="background:var(--bg3);border:1px solid var(--border);
                         border-radius:var(--radius-sm);padding:12px;text-align:center;">
                        <p style="font-family:var(--font-mono);font-size:1.1rem;color:var(--accent);">${s.num}</p>
                        <p style="font-size:0.68rem;color:var(--text3);margin-top:3px;">${s.label}</p>
                    </div>
                `).join("")}
            </div>`
    }
};

// Gestion des nav items sidebar
document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        const page = item.dataset.page;
        // Mettre à jour l'état actif
        document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        closeSidebar();
        // Ouvrir la modal avec le contenu
        if (pageContent[page]) {
            openModal(pageContent[page].html);
        }
    });
});

// Bottom nav
document.querySelectorAll(".bn-item").forEach(item => {
    item.addEventListener("click", () => {
        const page = item.dataset.page;
        document.querySelectorAll(".bn-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        if (pageContent[page]) {
            openModal(pageContent[page].html);
        }
    });
});

/* ═══════════════════════════════════════════
   SÉLECTION DU NIVEAU
═══════════════════════════════════════════ */
function selectLevel(btn, level) {
    document.querySelectorAll(".level-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    currentLevel = level;
    showToast(`📘 Niveau "${level}" sélectionné`);
    // Mise à jour de l'affichage dans la sidebar
    const roleEl = document.querySelector(".sidebar-role");
    if (roleEl) roleEl.textContent = `Niveau : ${level}`;
}

/* ═══════════════════════════════════════════
   MODAL
═══════════════════════════════════════════ */
function openModal(htmlContent) {
    modalContent.innerHTML = htmlContent;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    // Trigger animations de progressions
    setTimeout(() => {
        modalContent.querySelectorAll("[style*='width:']").forEach(el => {
            const w = el.style.width;
            el.style.width = "0%";
            setTimeout(() => { el.style.width = w; }, 50);
        });
    }, 100);
}

function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});

// Swipe bas pour fermer le modal
(function initModalSwipe() {
    let startY = 0;
    const box  = document.querySelector(".modal-box");
    if (!box) return;
    box.addEventListener("touchstart", e => { startY = e.touches[0].clientY; }, { passive: true });
    box.addEventListener("touchend",   e => {
        if (e.changedTouches[0].clientY - startY > 80) closeModal();
    }, { passive: true });
})();

/* ═══════════════════════════════════════════
   TOAST
═══════════════════════════════════════════ */
function showToast(message, duration = 2500) {
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add("show");
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), duration);
}

/* ═══════════════════════════════════════════
   ACTIONS INLINE (dans les modals)
═══════════════════════════════════════════ */

// Toggle switch notifications
function toggleSwitch(el) {
    el.classList.toggle("on");
    const label = el.closest("[style]")?.querySelector("span")?.textContent ?? "Option";
    const state = el.classList.contains("on") ? "activée" : "désactivée";
    showToast(`🔔 ${label} ${state}`);
}

// Sélection langue
function selectLanguage(el, lang) {
    showToast(`🌐 Langue changée : ${lang}`);
    closeModal();
}

// Sélection thème
function selectTheme(el, theme) {
    showToast(`🎨 Thème "${theme}" appliqué`);
    closeModal();
}

/* ═══════════════════════════════════════════
   BOUTON DÉMARRER
═══════════════════════════════════════════ */
function startCourse() {
    openModal(pageContent.cours.html);
}

/* ═══════════════════════════════════════════
   RECHERCHE
═══════════════════════════════════════════ */
searchBtn.addEventListener("click", () => {
    openModal(`
        <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;margin-bottom:14px;">🔍 Rechercher</h2>
        <div style="position:relative;margin-bottom:16px;">
            <input type="text" id="searchInput" placeholder="Algèbre, Géométrie, π …"
                style="width:100%;padding:12px 14px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:var(--radius-sm);color:var(--text);font-family:var(--font-body);
                       font-size:0.9rem;outline:none;" oninput="liveSearch(this.value)">
        </div>
        <div id="searchResults">
            <p style="color:var(--text3);font-size:0.82rem;text-align:center;padding:20px 0;">
                Commencez à taper pour chercher…
            </p>
        </div>
    `);
    setTimeout(() => document.getElementById("searchInput")?.focus(), 300);
});

function liveSearch(q) {
    const results = document.getElementById("searchResults");
    if (!results) return;
    const items = [
        "Algèbre — Équations du 1er degré",
        "Algèbre — Polynômes",
        "Géométrie — Triangles",
        "Géométrie — Cercles",
        "Calcul — Dérivées",
        "Calcul — Intégrales",
        "Statistiques — Moyenne",
        "Statistiques — Probabilités",
        "Trigonométrie — Sinus & Cosinus",
    ];
    if (q.trim().length < 2) {
        results.innerHTML = `<p style="color:var(--text3);font-size:0.82rem;text-align:center;padding:20px 0;">Commencez à taper…</p>`;
        return;
    }
    const filtered = items.filter(i => i.toLowerCase().includes(q.toLowerCase()));
    if (filtered.length === 0) {
        results.innerHTML = `<p style="color:var(--text3);font-size:0.82rem;text-align:center;padding:20px 0;">Aucun résultat.</p>`;
        return;
    }
    results.innerHTML = filtered.map(item => `
        <div style="padding:10px 12px;background:var(--bg3);border-radius:var(--radius-sm);
             border:1px solid var(--border);margin-bottom:6px;cursor:pointer;font-size:0.85rem;"
             onclick="showToast('📖 Ouverture : ${item.split('—')[0].trim()}')">
            ${item}
        </div>
    `).join("");
}

/* ═══════════════════════════════════════════
   CSS TOGGLE SWITCH (injecté dynamiquement)
═══════════════════════════════════════════ */
(function injectToggleStyle() {
    const style = document.createElement("style");
    style.textContent = `
        .toggle-switch {
            width: 40px; height: 22px;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 11px;
            position: relative;
            cursor: pointer;
            transition: background 0.3s;
            flex-shrink: 0;
        }
        .toggle-switch.on { background: var(--accent); border-color: var(--accent); }
        .toggle-knob {
            position: absolute;
            top: 2px; left: 2px;
            width: 16px; height: 16px;
            background: var(--text2);
            border-radius: 50%;
            transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .toggle-switch.on .toggle-knob {
            left: calc(100% - 18px);
            background: #0a0a0f;
        }
    `;
    document.head.appendChild(style);
})();

/* ═══════════════════════════════════════════
   INIT — animations de progression
═══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    // Animer les barres de progression
    const fills = document.querySelectorAll(".progress-fill");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = el.style.width;
                el.style.width = "0%";
                requestAnimationFrame(() => {
                    setTimeout(() => { el.style.width = target; }, 100);
                });
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    fills.forEach(fill => observer.observe(fill));

    // Message de bienvenue différé
    setTimeout(() => showToast("👋 Bienvenue sur Math Course !"), 1200);
});

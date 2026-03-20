<?php
// Configuration de la page
$page_title = "Math Course";
$current_page = "home";

// Données des niveaux
$niveaux = [
    ["icon" => "🎒", "label" => "Primaire",    "color" => "#4ade80"],
    ["icon" => "📘", "label" => "Collège",     "color" => "#60a5fa"],
    ["icon" => "🎓", "label" => "Lycée",       "color" => "#f472b6"],
    ["icon" => "🏛️",  "label" => "Université", "color" => "#fb923c"],
];

// Données des objectifs
$objectifs = [
    ["icon" => "🎯", "text" => "Maîtriser les fondements mathématiques"],
    ["icon" => "📐", "text" => "Résoudre des problèmes complexes"],
    ["icon" => "🧠", "text" => "Développer la logique et le raisonnement"],
    ["icon" => "🚀", "text" => "Préparer les examens avec confiance"],
];

// Données des chapitres
$chapitres = [
    ["num" => "01", "title" => "Algèbre",      "sub" => "Équations & Polynômes",  "progress" => 75],
    ["num" => "02", "title" => "Géométrie",    "sub" => "Formes & Espaces",       "progress" => 50],
    ["num" => "03", "title" => "Calcul",       "sub" => "Dérivées & Intégrales",  "progress" => 30],
    ["num" => "04", "title" => "Statistiques", "sub" => "Données & Probabilités", "progress" => 60],
];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title><?= htmlspecialchars($page_title) ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- ═══════════════════ OVERLAY ═══════════════════ -->
    <div class="overlay" id="overlay"></div>

    <!-- ═══════════════════ SIDEBAR ═══════════════════ -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-avatar">
                <span>MC</span>
            </div>
            <div class="sidebar-user">
                <p class="sidebar-name">Étudiant</p>
                <p class="sidebar-role">Niveau : Lycée</p>
            </div>
            <button class="sidebar-close" id="sidebarClose">✕</button>
        </div>

        <nav class="sidebar-nav">

            <!-- Choisir le niveau -->
            <div class="nav-section">
                <p class="nav-section-title">NIVEAU</p>
                <div class="nav-levels">
                    <?php foreach ($niveaux as $n): ?>
                    <button class="level-btn" style="--lvl-color: <?= $n['color'] ?>" onclick="selectLevel(this, '<?= $n['label'] ?>')">
                        <span class="level-icon"><?= $n['icon'] ?></span>
                        <span><?= $n['label'] ?></span>
                        <span class="level-check">✓</span>
                    </button>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Navigation principale -->
            <div class="nav-section">
                <p class="nav-section-title">NAVIGATION</p>
                <ul class="nav-list">
                    <li class="nav-item active" data-page="home">
                        <span class="nav-icon">🏠</span>
                        <span>Accueil</span>
                        <span class="nav-badge">Actif</span>
                    </li>
                    <li class="nav-item" data-page="cours">
                        <span class="nav-icon">📚</span>
                        <span>Mes cours</span>
                    </li>
                    <li class="nav-item" data-page="exercices">
                        <span class="nav-icon">✏️</span>
                        <span>Exercices</span>
                        <span class="nav-badge new">3</span>
                    </li>
                    <li class="nav-item" data-page="progression">
                        <span class="nav-icon">📊</span>
                        <span>Ma progression</span>
                    </li>
                    <li class="nav-item" data-page="favoris">
                        <span class="nav-icon">⭐</span>
                        <span>Favoris</span>
                    </li>
                </ul>
            </div>

            <!-- Paramètres & Support -->
            <div class="nav-section">
                <p class="nav-section-title">APPLICATION</p>
                <ul class="nav-list">
                    <li class="nav-item" data-page="parametres">
                        <span class="nav-icon">⚙️</span>
                        <span>Paramètres</span>
                    </li>
                    <li class="nav-item" data-page="notifications">
                        <span class="nav-icon">🔔</span>
                        <span>Notifications</span>
                    </li>
                    <li class="nav-item" data-page="langue">
                        <span class="nav-icon">🌐</span>
                        <span>Langue</span>
                    </li>
                    <li class="nav-item" data-page="theme">
                        <span class="nav-icon">🎨</span>
                        <span>Thème</span>
                    </li>
                </ul>
            </div>

            <!-- Aide & Légal -->
            <div class="nav-section">
                <p class="nav-section-title">AIDE & LÉGAL</p>
                <ul class="nav-list">
                    <li class="nav-item" data-page="support">
                        <span class="nav-icon">💬</span>
                        <span>Contacter le support</span>
                    </li>
                    <li class="nav-item" data-page="confidentialite">
                        <span class="nav-icon">🔒</span>
                        <span>Politique de confidentialité</span>
                    </li>
                    <li class="nav-item" data-page="conditions">
                        <span class="nav-icon">📄</span>
                        <span>Conditions d'utilisation</span>
                    </li>
                    <li class="nav-item" data-page="about">
                        <span class="nav-icon">ℹ️</span>
                        <span>À propos</span>
                    </li>
                </ul>
            </div>

        </nav>

        <div class="sidebar-footer">
            <button class="logout-btn">
                <span>⇠</span> Se déconnecter
            </button>
        </div>
    </aside>

    <!-- ═══════════════════ MAIN APP ═══════════════════ -->
    <div class="app-wrapper">

        <!-- TOP BAR -->
        <header class="topbar">
            <button class="burger-btn" id="burgerBtn">
                <span></span><span></span><span></span>
            </button>
            <div class="topbar-title">
                <span class="title-math">MATH</span>
                <span class="title-course">COURSE</span>
            </div>
            <button class="topbar-search" id="searchBtn">🔍</button>
        </header>

        <!-- MAIN CONTENT -->
        <main class="main-content" id="mainContent">

            <!-- ── HERO SECTION ── -->
            <section class="hero-section">
                <div class="hero-image-wrap">
                    <div class="hero-image">
                        <div class="math-canvas">
                            <!-- Symboles mathématiques animés -->
                            <div class="math-symbol" style="top:10%;left:8%;font-size:2.2rem;animation-delay:0s">∑</div>
                            <div class="math-symbol" style="top:20%;right:10%;font-size:1.8rem;animation-delay:0.4s">π</div>
                            <div class="math-symbol" style="top:55%;left:12%;font-size:1.5rem;animation-delay:0.8s">∞</div>
                            <div class="math-symbol" style="top:65%;right:8%;font-size:2rem;animation-delay:1.2s">∫</div>
                            <div class="math-symbol" style="top:38%;left:50%;font-size:1.3rem;animation-delay:0.6s">Δ</div>
                            <div class="math-symbol" style="top:78%;left:35%;font-size:1.6rem;animation-delay:1s">√</div>

                            <!-- Formule centrale -->
                            <div class="hero-formula">
                                <div class="formula-line">E = mc²</div>
                                <div class="formula-sub">ax² + bx + c = 0</div>
                            </div>

                            <!-- Grille de fond -->
                            <div class="grid-overlay"></div>
                        </div>
                    </div>
                </div>

                <div class="hero-text">
                    <div class="hero-tag">✦ BIENVENUE</div>
                    <h1 class="hero-title">
                        Maîtrisez les<br>
                        <span class="hero-accent">Mathématiques</span><br>
                        à votre rythme
                    </h1>
                    <p class="hero-desc">
                        Une plateforme interactive conçue pour rendre les mathématiques
                        accessibles, engageantes et efficaces pour chaque apprenant.
                    </p>
                    <div class="hero-stats">
                        <div class="stat">
                            <span class="stat-num">240+</span>
                            <span class="stat-label">Leçons</span>
                        </div>
                        <div class="stat-divider"></div>
                        <div class="stat">
                            <span class="stat-num">18K</span>
                            <span class="stat-label">Étudiants</span>
                        </div>
                        <div class="stat-divider"></div>
                        <div class="stat">
                            <span class="stat-num">4.9★</span>
                            <span class="stat-label">Note</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ── OBJECTIFS ── -->
            <section class="section objectives-section">
                <div class="section-header">
                    <h2 class="section-title">Objectifs du cours</h2>
                    <span class="section-tag">PROGRAMME</span>
                </div>
                <div class="objectives-grid">
                    <?php foreach ($objectifs as $i => $obj): ?>
                    <div class="objective-card" style="animation-delay: <?= $i * 0.1 ?>s">
                        <span class="obj-icon"><?= $obj['icon'] ?></span>
                        <p class="obj-text"><?= htmlspecialchars($obj['text']) ?></p>
                    </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- ── CHAPITRES ── -->
            <section class="section chapters-section">
                <div class="section-header">
                    <h2 class="section-title">Chapitres</h2>
                    <button class="see-all-btn">Voir tout →</button>
                </div>
                <div class="chapters-list">
                    <?php foreach ($chapitres as $ch): ?>
                    <div class="chapter-card">
                        <div class="chapter-num"><?= $ch['num'] ?></div>
                        <div class="chapter-info">
                            <p class="chapter-title"><?= htmlspecialchars($ch['title']) ?></p>
                            <p class="chapter-sub"><?= htmlspecialchars($ch['sub']) ?></p>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: <?= $ch['progress'] ?>%"></div>
                            </div>
                        </div>
                        <span class="chapter-pct"><?= $ch['progress'] ?>%</span>
                    </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- ── CTA ── -->
            <section class="cta-section">
                <div class="cta-inner">
                    <p class="cta-label">PRÊT À COMMENCER ?</p>
                    <h3 class="cta-title">Lance-toi dans<br>l'aventure mathématique !</h3>
                    <button class="cta-btn" onclick="startCourse()">
                        Commencer maintenant →
                    </button>
                </div>
            </section>

        </main>

        <!-- BOTTOM NAV -->
        <nav class="bottom-nav">
            <button class="bn-item active" data-page="home">
                <span class="bn-icon">🏠</span>
                <span class="bn-label">Accueil</span>
            </button>
            <button class="bn-item" data-page="cours">
                <span class="bn-icon">📚</span>
                <span class="bn-label">Cours</span>
            </button>
            <button class="bn-item bn-center" data-page="exercices">
                <span class="bn-icon">✏️</span>
            </button>
            <button class="bn-item" data-page="progression">
                <span class="bn-icon">📊</span>
                <span class="bn-label">Progrès</span>
            </button>
            <button class="bn-item" data-page="profil">
                <span class="bn-icon">👤</span>
                <span class="bn-label">Profil</span>
            </button>
        </nav>

    </div>

    <!-- MODAL -->
    <div class="modal" id="modal">
        <div class="modal-box">
            <button class="modal-close" id="modalClose">✕</button>
            <div class="modal-content" id="modalContent"></div>
        </div>
    </div>

    <!-- TOAST -->
    <div class="toast" id="toast"></div>

    <script src="script.js"></script>
</body>
</html>

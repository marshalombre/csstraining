export const translations = {
    fr: {
        header: {
            title: "Expériences Web"
        },
        menu: {
            math: "🧮 Expériences Maths",
            games: "🎮 Jeux"
        },
        tabs: {
            prime: "Nombres Premiers",
            fibonacci: "Fibonacci",
            palette: "Palette de Couleurs",
            pascal: "Triangle de Pascal",
            mandelbrot: "Mandelbrot",
            ulam: "Spirale d'Ulam",
            weierstrass: "Fonction de Weierstrass",
            surface: "Surface 3D",
            tetris: "Tetris",
            pong: "Pong",
            snake: "Snake",
            breakout: "Casse-Briques",
            memory: "Mémoire",
            2048: "2048",
            flappy: "Flappy Bird",
            invaders: "Space Invaders"
        },
        math: {
            prime: {
                title: "Nombres Premiers - Escalier de Gauss",
                desc1: "Le <strong>Théorème des Nombres Premiers</strong> décrit la distribution asymptotique des nombres premiers. La fonction de compte des nombres premiers, notée <strong>π(x)</strong>, donne le nombre de premiers inférieurs ou égaux à x.",
                desc2: "Cette visualisation compare la fonction en escalier réelle π(x) (en bleu) avec l'approximation de l'intégrale logarithmique Li(x) (en rouge), illustrant la célèbre Hypothèse de Riemann concernant la distribution des zéros de la fonction zêta.",
                input: "Entrez une valeur",
                button: "Tracer"
            },
            fibonacci: {
                title: "Suite de Fibonacci - Visualisation",
                desc1: "La <strong>suite de Fibonacci</strong> est définie par la récurrence : F(n) = F(n-1) + F(n-2), avec F(0)=0 et F(1)=1.",
                desc2: "Cette suite est intimement liée au <strong>Nombre d'Or (φ ≈ 1,618)</strong>. La visualisation montre la spirale logarithmique (spirale d'or) construite à partir de carrés dont les côtés suivent la suite de Fibonacci, un motif souvent observé dans la nature (coquillages, tournesols).",
                input: "Nombre de termes :",
                button: "Générer"
            },
            palette: {
                title: "Générateur de Palette de Couleurs",
                desc1: "Ce générateur utilise la théorie des couleurs pour créer des palettes harmonieuses basées sur une couleur primaire.",
                desc2: "Il calcule des variations de Teinte, Saturation et Luminosité dans l'espace colorimétrique <strong>HSL</strong>. Les algorithmes incluent des schémas analogues, complémentaires, triadiques et monochromatiques pour assurer un équilibre visuel parfait.",
                input: "Couleur de base :",
                button: "Générer Palette"
            },
            pascal: {
                title: "Triangle de Pascal",
                desc1: "Le <strong>Triangle de Pascal</strong> est une présentation géométrique des coefficients binomiaux. Chaque nombre est la somme des deux nombres directement au-dessus.",
                desc2: "En coloriant les nombres impairs et en laissant les pairs en blanc, une structure fractale connue sous le nom de <strong>Triangle de Sierpinski</strong> apparaît. Cette propriété lie l'arithmétique combinatoire à la géométrie fractale.",
                input: "Nombre de lignes :",
                button: "Générer"
            },
            mandelbrot: {
                title: "Ensemble de Mandelbrot",
                desc1: "L'<strong>Ensemble de Mandelbrot</strong> est l'ensemble des points c du plan complexe pour lesquels la suite définie par z₀=0 et z(n+1) = z(n)² + c reste bornée.",
                desc2: "C'est l'archétype des fractales : une structure infiniment complexe présentant une auto-similarité à différentes échelles. La frontière de l'ensemble est infiniment complexe, révélant des motifs 'hippocampes' et des copies miniatures de l'ensemble principal.",
                input: "Itérations max :",
                button: "Générer"
            },
            ulam: {
                title: "Spirale d'Ulam",
                desc1: "La <strong>Spirale d'Ulam</strong> (ou spirale des nombres premiers) est une méthode simple de représentation des nombres premiers qui révèle des motifs inattendus.",
                desc2: "En écrivant les entiers positifs dans une spirale carrée et en marquant les nombres premiers, on observe qu'ils tendent à s'aligner sur des diagonales. Ce phénomène suggère des propriétés non aléatoires dans la distribution des nombres premiers.",
                input: "Taille :",
                button: "Générer"
            },
            weierstrass: {
                title: "Fonction de Weierstrass",
                desc1: "La <strong>Fonction de Weierstrass</strong> est un célèbre contre-exemple en analyse mathématique : c'est une fonction continue partout mais dérivable nulle part.",
                desc2: "Définie comme une série trigonométrique infinie, elle présente une structure fractale : peu importe le niveau de zoom, la courbe reste 'rugueuse' et ne se lisse jamais en une ligne droite, défiant l'intuition classique du calcul différentiel.",
                input: "Termes :",
                button: "Générer"
            },
            surface: {
                title: "Surface 3D Paramétrique",
                desc1: "Cette visualisation représente une <strong>surface 3D paramétrique</strong> définie par des équations mathématiques complexes (x(u,v), y(u,v), z(u,v)).",
                desc2: "Le graphique interactif permet d'explorer la topologie de la surface, montrant comment des fonctions trigonométriques simples peuvent se combiner pour créer des formes organiques et des ondulations complexes dans l'espace tridimensionnel.",
                input: "Résolution :",
                button: "Générer"
            }
        },
        games: {
            tetris: {
                title: "🧱 Tetris",
                desc1: "Inventé par Alexey Pajitnov en 1984, Tetris est le jeu de puzzle ultime. Le but est d'arranger les **tétrominos** (formes géométriques composées de 4 carrés) pour former des lignes horizontales complètes.",
                desc2: "Chaque ligne complétée disparaît, libérant de l'espace. Le jeu accélère progressivement, testant vos réflexes et votre planification spatiale jusqu'à ce que la tour atteigne le sommet.",
                controls: "<strong>Contrôles :</strong> ← → Déplacer | ↓ Accélérer | ↑ Rotation | Espace Chute Rapide"
            },
            pong: {
                title: "🏓 Pong",
                desc1: "Sorti en 1972 par Atari, Pong est l'un des premiers jeux vidéo d'arcade à succès. Il simule un match de tennis de table minimaliste.",
                desc2: "La physique est simple mais exigeante : l'angle de rebond de la balle dépend de l'endroit où elle touche la raquette. Gagnez l'échange en prenant votre adversaire (ou l'IA) à contre-pied !",
                controls: "<strong>Contrôles :</strong> ↑ ↓ ou Souris pour bouger la raquette"
            },
            snake: {
                title: "🐍 Snake",
                desc1: "Un classique des téléphones mobiles des années 90. Vous contrôlez un serpent qui doit manger des pommes pour grandir.",
                desc2: "La difficulté est purement géométrique : plus le serpent grandit, moins il reste d'espace libre, augmentant le risque de collision avec sa propre queue.",
                controls: "<strong>Contrôles :</strong> ← → ↑ ↓ pour diriger le serpent"
            },
            breakout: {
                title: "🧱 Casse-Briques",
                desc1: "Inspiré de Pong, l'objectif est de détruire un mur de briques à l'aide d'une balle et d'une raquette.",
                desc2: "La balle accélère avec le temps et certaines briques peuvent nécessiter plusieurs coups. L'angle de rebond est crucial pour atteindre les briques les plus inaccessibles.",
                controls: "<strong>Contrôles :</strong> ← → ou Souris pour bouger la raquette"
            },
            memory: {
                title: "🎴 Mémoire",
                desc1: "Aussi connu sous le nom de 'Pelmanisme', ce jeu exerce la mémoire visuelle et spatiale à court terme.",
                desc2: "Le principe est simple mais redoutable : retournez deux cartes à la fois pour trouver des paires. La clé est de mémoriser l'emplacement des cartes non appariées pour les retrouver plus tard.",
                controls: "<strong>But :</strong> Trouver toutes les paires de cartes identiques"
            },
            2048: {
                title: "🔢 2048",
                desc1: "Créé en 2014, ce jeu de puzzle mathématique est basé sur les puissances de 2.",
                desc2: "En faisant glisser les tuiles, vous fusionnez les nombres identiques : 2+2=4, 4+4=8, etc. La complexité augmente exponentiellement car l'espace sur la grille 4x4 se remplit vite.",
                controls: "<strong>Contrôles :</strong> ← → ↑ ↓ pour fusionner les tuiles"
            },
            flappy: {
                title: "🐦 Flappy Bird",
                desc1: "Devenu viral en 2013 grâce à sa difficulté punitive, ce jeu repose sur une mécanique simple : tapoter pour contrer la gravité.",
                desc2: "Le défi réside dans la précision du rythme. Chaque passage entre les tuyaux exige un timing parfait.",
                controls: "<strong>Contrôles :</strong> Espace ou Clic pour voler"
            },
            invaders: {
                title: "👾 Space Invaders",
                desc1: "L'icône de l'âge d'or de l'arcade (1978). Vous pilotez un canon laser mobile défendant la Terre contre des vagues d'aliens.",
                desc2: "Plus vous détruisez d'ennemis, plus le jeu devient rapide. Utilisez les bunkers pour vous protéger et visez juste.",
                controls: "<strong>Contrôles :</strong> ← → Déplacer | Espace Tirer"
            }
        },
        controls: {
            start: "Démarrer",
            pause: "Pause",
            restart: "Recommencer",
            newGame: "Nouveau Jeu",
            score: "Score :",
            level: "Niveau :",
            best: "Meilleur :",
            moves: "Coups :",
            time: "Temps :",
            lives: "Vies :",
            showDesc: "Afficher / Masquer Description"
        }
    },
    en: {
        header: {
            title: "Web Experiments"
        },
        menu: {
            math: "🧮 Math Experiments",
            games: "🎮 Games"
        },
        tabs: {
            prime: "Prime Numbers",
            fibonacci: "Fibonacci",
            palette: "Color Palette",
            pascal: "Pascal's Triangle",
            mandelbrot: "Mandelbrot",
            ulam: "Ulam Spiral",
            weierstrass: "Weierstrass Function",
            surface: "3D Surface",
            tetris: "Tetris",
            pong: "Pong",
            snake: "Snake",
            breakout: "Breakout",
            memory: "Memory",
            2048: "2048",
            flappy: "Flappy Bird",
            invaders: "Space Invaders"
        },
        math: {
            prime: {
                title: "Prime Numbers - Gauss Staircase",
                desc1: "The <strong>Prime Number Theorem</strong> describes the asymptotic distribution of prime numbers. The prime-counting function, denoted <strong>π(x)</strong>, gives the number of primes less than or equal to x.",
                desc2: "This visualization compares the actual step function π(x) (in blue) with the logarithmic integral approximation Li(x) (in red), illustrating the famous Riemann Hypothesis regarding the distribution of zeros of the zeta function.",
                input: "Enter a value",
                button: "Draw"
            },
            fibonacci: {
                title: "Fibonacci Sequence - Visualization",
                desc1: "The <strong>Fibonacci sequence</strong> is defined by the recurrence: F(n) = F(n-1) + F(n-2), with F(0)=0 and F(1)=1.",
                desc2: "This sequence is intimately linked to the <strong>Golden Ratio (φ ≈ 1.618)</strong>. The visualization shows the logarithmic spiral (golden spiral) built from squares whose sides follow the Fibonacci sequence, a pattern often observed in nature (shells, sunflowers).",
                input: "Number of terms:",
                button: "Generate"
            },
            palette: {
                title: "Color Palette Generator",
                desc1: "This generator uses color theory to create harmonious palettes based on a primary color.",
                desc2: "It calculates variations in Hue, Saturation, and Lightness in the <strong>HSL</strong> color space. Algorithms include analogous, complementary, triadic, and monochromatic schemes to ensure perfect visual balance.",
                input: "Base color:",
                button: "Generate Palette"
            },
            pascal: {
                title: "Pascal's Triangle",
                desc1: "<strong>Pascal's Triangle</strong> is a geometric presentation of binomial coefficients. Each number is the sum of the two numbers directly above it.",
                desc2: "By coloring odd numbers and leaving even ones white, a fractal structure known as <strong>Sierpinski's Triangle</strong> appears. This property links combinatorial arithmetic to fractal geometry.",
                input: "Number of rows:",
                button: "Generate"
            },
            mandelbrot: {
                title: "Mandelbrot Set",
                desc1: "The <strong>Mandelbrot Set</strong> is the set of points c in the complex plane for which the sequence defined by z₀=0 and z(n+1) = z(n)² + c remains bounded.",
                desc2: "It is the archetype of fractals: an infinitely complex structure exhibiting self-similarity at different scales. The boundary of the set is infinitely complex, revealing 'seahorse' patterns and miniature copies of the main set.",
                input: "Max iterations:",
                button: "Generate"
            },
            ulam: {
                title: "Ulam Spiral",
                desc1: "The <strong>Ulam Spiral</strong> (or prime spiral) is a simple method of representing prime numbers that reveals unexpected patterns.",
                desc2: "By writing positive integers in a square spiral and marking prime numbers, one observes that they tend to align on diagonals. This phenomenon suggests non-random properties in the distribution of prime numbers.",
                input: "Size:",
                button: "Generate"
            },
            weierstrass: {
                title: "Weierstrass Function",
                desc1: "The <strong>Weierstrass Function</strong> is a famous counter-example in mathematical analysis: it is a function that is continuous everywhere but differentiable nowhere.",
                desc2: "Defined as an infinite trigonometric series, it presents a fractal structure: no matter the zoom level, the curve remains 'rough' and never smooths out into a straight line, defying classical intuition of differential calculus.",
                input: "Terms:",
                button: "Generate"
            },
            surface: {
                title: "Parametric 3D Surface",
                desc1: "This visualization represents a <strong>parametric 3D surface</strong> defined by complex mathematical equations (x(u,v), y(u,v), z(u,v)).",
                desc2: "The interactive graph allows exploring the topology of the surface, showing how simple trigonometric functions can combine to create organic shapes and complex undulations in three-dimensional space.",
                input: "Resolution:",
                button: "Generate"
            }
        },
        games: {
            tetris: {
                title: "🧱 Tetris",
                desc1: "Invented by Alexey Pajitnov in 1984, Tetris is the ultimate puzzle game. The goal is to arrange **tetrominoes** (geometric shapes composed of 4 squares) to form complete horizontal lines.",
                desc2: "Each completed line disappears, freeing up space. The game progressively speeds up, testing your reflexes and spatial planning until the tower reaches the top.",
                controls: "<strong>Controls:</strong> ← → Move | ↓ Accelerate | ↑ Rotate | Space Hard Drop"
            },
            pong: {
                title: "🏓 Pong",
                desc1: "Released in 1972 by Atari, Pong is one of the first successful arcade video games. It simulates a minimalist table tennis match.",
                desc2: "The physics are simple but demanding: the ball's bounce angle depends on where it hits the paddle. Win the rally by catching your opponent (or the AI) off guard!",
                controls: "<strong>Controls:</strong> ↑ ↓ or Mouse to move the paddle"
            },
            snake: {
                title: "🐍 Snake",
                desc1: "A classic of 90s mobile phones. You control a snake that must eat apples to grow.",
                desc2: "The challenge is purely geometric: the more the snake grows, the less free space remains, increasing the risk of collision with its own tail.",
                controls: "<strong>Controls:</strong> ← → ↑ ↓ to steer the snake"
            },
            breakout: {
                title: "🧱 Breakout",
                desc1: "Inspired by Pong, the objective is to destroy a wall of bricks using a ball and paddle.",
                desc2: "The bounce angle is crucial to reach the most inaccessible bricks.",
                controls: "<strong>Controls:</strong> ← → or Mouse to move the paddle"
            },
            memory: {
                title: "🎴 Memory",
                desc1: "Also known as 'Pelmanism', this game exercises visual and spatial short-term memory.",
                desc2: "Flip two cards at a time to find pairs. Memorize the location of unmatched cards to find them later.",
                controls: "<strong>Goal:</strong> Find all pairs of identical cards"
            },
            2048: {
                title: "🔢 2048",
                desc1: "Created in 2014, this mathematical puzzle game is based on powers of 2.",
                desc2: "Slide tiles to merge identical numbers: 2+2=4, 4+4=8, etc. The goal is to create the 2048 tile.",
                controls: "<strong>Controls:</strong> ← → ↑ ↓ to merge tiles"
            },
            flappy: {
                title: "🐦 Flappy Bird",
                desc1: "Viral in 2013, this game relies on a simple mechanic: tap to counter gravity.",
                desc2: "The challenge lies in the precision of the rhythm. Each passage between pipes demands perfect timing.",
                controls: "<strong>Controls:</strong> Space or Click to fly"
            },
            invaders: {
                title: "👾 Space Invaders",
                desc1: "The arcade icon (1978). Pilot a laser cannon defending Earth against alien waves.",
                desc2: "The more enemies you destroy, the faster the game becomes.",
                controls: "<strong>Controls:</strong> ← → Move | Space Fire"
            }
        },
        controls: {
            start: "Start",
            pause: "Pause",
            restart: "Restart",
            newGame: "New Game",
            score: "Score:",
            level: "Level:",
            best: "Best:",
            moves: "Moves:",
            time: "Time:",
            lives: "Lives:",
            showDesc: "Show / Hide Description"
        }
    },
    de: {
        header: {
            title: "Web-Experimente"
        },
        menu: {
            math: "🧮 Mathe-Experimente",
            games: "🎮 Spiele"
        },
        tabs: {
            prime: "Primzahlen",
            fibonacci: "Fibonacci",
            palette: "Farbpalette",
            pascal: "Pascalsches Dreieck",
            mandelbrot: "Mandelbrot",
            ulam: "Ulam-Spirale",
            weierstrass: "Weierstrass-Funktion",
            surface: "3D-Oberfläche",
            tetris: "Tetris",
            pong: "Pong",
            snake: "Snake",
            breakout: "Breakout",
            memory: "Memory",
            2048: "2048",
            flappy: "Flappy Bird",
            invaders: "Space Invaders"
        },
        math: {
            prime: {
                title: "Primzahlen - Gaußsche Treppe",
                desc1: "Der <strong>Primzahlsatz</strong> beschreibt die asymptotische Verteilung der Primzahlen. Die Primzahlzählfunktion <strong>π(x)</strong> gibt die Anzahl der Primzahlen kleiner oder gleich x an.",
                desc2: "Diese Visualisierung vergleicht die tatsächliche Treppenfunktion π(x) (blau) mit der Approximation durch das logarithmische Integral Li(x) (rot) und illustriert die berühmte Riemannsche Vermutung.",
                input: "Wert eingeben",
                button: "Zeichnen"
            },
            fibonacci: {
                title: "Fibonacci-Folge - Visualisierung",
                desc1: "Die <strong>Fibonacci-Folge</strong> ist definiert durch: F(n) = F(n-1) + F(n-2), mit F(0)=0 und F(1)=1.",
                desc2: "Diese Folge ist eng mit dem <strong>Goldenen Schnitt (φ ≈ 1,618)</strong> verbunden. Die Visualisierung zeigt die logarithmische Spirale (Goldene Spirale), die aus Quadraten besteht, deren Seiten der Fibonacci-Folge folgen.",
                input: "Anzahl der Terme:",
                button: "Generieren"
            },
            palette: {
                title: "Farbpaletten-Generator",
                desc1: "Dieser Generator nutzt die Farbtheorie, um harmonische Paletten basierend auf einer Primärfarbe zu erstellen.",
                desc2: "Er berechnet Variationen in Farbton, Sättigung und Helligkeit im <strong>HSL</strong>-Farbraum.",
                input: "Grundfarbe:",
                button: "Palette generieren"
            },
            pascal: {
                title: "Pascalsches Dreieck",
                desc1: "Das <strong>Pascalsche Dreieck</strong> ist eine geometrische Darstellung der Binomialkoeffizienten.",
                desc2: "Durch Färben ungerader Zahlen entsteht eine fraktale Struktur, das <strong>Sierpinski-Dreieck</strong>.",
                input: "Anzahl der Zeilen:",
                button: "Generieren"
            },
            mandelbrot: {
                title: "Mandelbrot-Menge",
                desc1: "Die <strong>Mandelbrot-Menge</strong> ist die Menge der Punkte c in der komplexen Ebene, für die die Folge z(n+1) = z(n)² + c beschränkt bleibt.",
                desc2: "Sie ist der Archetyp der Fraktale: eine unendlich komplexe Struktur mit Selbstähnlichkeit.",
                input: "Max Iterationen:",
                button: "Generieren"
            },
            ulam: {
                title: "Ulam-Spirale",
                desc1: "Die <strong>Ulam-Spirale</strong> ist eine Methode zur Darstellung von Primzahlen, die unerwartete Muster enthüllt.",
                desc2: "Primzahlen tendieren dazu, sich auf Diagonalen auszurichten.",
                input: "Größe:",
                button: "Generieren"
            },
            weierstrass: {
                title: "Weierstrass-Funktion",
                desc1: "Die <strong>Weierstrass-Funktion</strong> ist überall stetig, aber nirgends differenzierbar.",
                desc2: "Sie zeigt eine fraktale Struktur und trotzt der klassischen Intuition der Differentialrechnung.",
                input: "Terme:",
                button: "Generieren"
            },
            surface: {
                title: "Parametrische 3D-Oberfläche",
                desc1: "Diese Visualisierung stellt eine <strong>parametrische 3D-Oberfläche</strong> dar.",
                desc2: "Erkunden Sie die Topologie komplexer mathematischer Formen im dreidimensionalen Raum.",
                input: "Auflösung:",
                button: "Generieren"
            }
        },
        games: {
            tetris: {
                title: "🧱 Tetris",
                desc1: "Erfunden 1984, ist Tetris das ultimative Puzzlespiel. Ordnen Sie Tetrominos an, um Linien zu vervollständigen.",
                desc2: "Jede volle Linie verschwindet. Das Spiel wird schneller und testet Ihre Reflexe.",
                controls: "<strong>Steuerung:</strong> ← → Bewegen | ↓ Schnell | ↑ Drehen | Leertaste Fall"
            },
            pong: {
                title: "🏓 Pong",
                desc1: "Eines der ersten Arcade-Spiele (1972). Simuliert Tischtennis.",
                desc2: "Gewinnen Sie den Ballwechsel, indem Sie den Gegner überraschen.",
                controls: "<strong>Steuerung:</strong> ↑ ↓ oder Maus"
            },
            snake: {
                title: "🐍 Snake",
                desc1: "Ein Klassiker. Steuern Sie eine Schlange, die Äpfel frisst.",
                desc2: "Vermeiden Sie Kollisionen mit Ihrem eigenen Schwanz.",
                controls: "<strong>Steuerung:</strong> ← → ↑ ↓ Lenken"
            },
            breakout: {
                title: "🧱 Breakout",
                desc1: "Zerstören Sie eine Mauer aus Ziegelsteinen mit Ball und Schläger.",
                desc2: "Der Abprallwinkel ist entscheidend.",
                controls: "<strong>Steuerung:</strong> ← → oder Maus"
            },
            memory: {
                title: "🎴 Memory",
                desc1: "Trainiert das visuelle Gedächtnis. Finden Sie Paare.",
                desc2: "Merken Sie sich die Positionen der Karten.",
                controls: "<strong>Ziel:</strong> Alle Paare finden"
            },
            2048: {
                title: "🔢 2048",
                desc1: "Ein Puzzle basierend auf Zweierpotenzen.",
                desc2: "Verschmelzen Sie gleiche Zahlen, um 2048 zu erreichen.",
                controls: "<strong>Steuerung:</strong> ← → ↑ ↓"
            },
            flappy: {
                title: "🐦 Flappy Bird",
                desc1: "Tippen Sie, um der Schwerkraft entgegenzuwirken.",
                desc2: "Jeder Durchgang erfordert perfektes Timing.",
                controls: "<strong>Steuerung:</strong> Leertaste oder Klick"
            },
            invaders: {
                title: "👾 Space Invaders",
                desc1: "Verteidigen Sie die Erde gegen Aliens.",
                desc2: "Je mehr Sie zerstören, desto schneller wird das Spiel.",
                controls: "<strong>Steuerung:</strong> ← → Bewegen | Leertaste Feuern"
            }
        },
        controls: {
            start: "Start",
            pause: "Pause",
            restart: "Neustart",
            newGame: "Neues Spiel",
            score: "Punktzahl:",
            level: "Level:",
            best: "Best:",
            moves: "Züge:",
            time: "Zeit:",
            lives: "Leben:",
            showDesc: "Beschreibung anzeigen / ausblenden"
        }
    },
    es: {
        header: {
            title: "Experimentos Web"
        },
        menu: {
            math: "🧮 Experimentos Matemáticos",
            games: "🎮 Juegos"
        },
        tabs: {
            prime: "Números Primos",
            fibonacci: "Fibonacci",
            palette: "Paleta de Colores",
            pascal: "Triángulo de Pascal",
            mandelbrot: "Mandelbrot",
            ulam: "Espiral de Ulam",
            weierstrass: "Función de Weierstrass",
            surface: "Superficie 3D",
            tetris: "Tetris",
            pong: "Pong",
            snake: "Snake",
            breakout: "Breakout",
            memory: "Memoria",
            2048: "2048",
            flappy: "Flappy Bird",
            invaders: "Space Invaders"
        },
        math: {
            prime: {
                title: "Números Primos - Escalera de Gauss",
                desc1: "El <strong>Teorema de los Números Primos</strong> describe la distribución asintótica de los primos.",
                desc2: "Esta visualización compara la función escalonada real π(x) con la integral logarítmica Li(x), ilustrando la Hipótesis de Riemann.",
                input: "Ingrese un valor",
                button: "Dibujar"
            },
            fibonacci: {
                title: "Secuencia de Fibonacci",
                desc1: "La secuencia se define por: F(n) = F(n-1) + F(n-2).",
                desc2: "Vinculada a la <strong>Proporción Áurea</strong>. Muestra la espiral logarítmica observada en la naturaleza.",
                input: "Número de términos:",
                button: "Generar"
            },
            palette: {
                title: "Generador de Paletas",
                desc1: "Crea paletas armoniosas basadas en teoría del color.",
                desc2: "Calcula variaciones en Matiz, Saturación y Luminosidad (HSL).",
                input: "Color base:",
                button: "Generar Paleta"
            },
            pascal: {
                title: "Triángulo de Pascal",
                desc1: "Presentación geométrica de coeficientes binomiales.",
                desc2: "Revela la estructura fractal del <strong>Triángulo de Sierpinski</strong>.",
                input: "Número de filas:",
                button: "Generar"
            },
            mandelbrot: {
                title: "Conjunto de Mandelbrot",
                desc1: "El conjunto de puntos c para los cuales la secuencia z(n+1) = z(n)² + c está acotada.",
                desc2: "El arquetipo de los fractales con autosemejanza infinita.",
                input: "Max iteraciones:",
                button: "Generar"
            },
            ulam: {
                title: "Espiral de Ulam",
                desc1: "Representación de números primos que revela patrones inesperados.",
                desc2: "Los primos tienden a alinearse en diagonales.",
                input: "Tamaño:",
                button: "Generar"
            },
            weierstrass: {
                title: "Función de Weierstrass",
                desc1: "Continua en todas partes pero diferenciable en ninguna.",
                desc2: "Desafía la intuición clásica del cálculo.",
                input: "Términos:",
                button: "Generar"
            },
            surface: {
                title: "Superficie 3D Paramétrica",
                desc1: "Representa ecuaciones matemáticas complejas en 3D.",
                desc2: "Explore la topología de formas orgánicas.",
                input: "Resolución:",
                button: "Generar"
            }
        },
        games: {
            tetris: {
                title: "🧱 Tetris",
                desc1: "El juego de rompecabezas definitivo (1984). Organiza tetrominos para completar líneas.",
                desc2: "El juego se acelera progresivamente.",
                controls: "<strong>Controles:</strong> ← → Mover | ↓ Acelerar | ↑ Rotar | Espacio Caída"
            },
            pong: {
                title: "🏓 Pong",
                desc1: "Simulador de tenis de mesa minimalista (1972).",
                desc2: "Gana el intercambio sorprendiendo a tu oponente.",
                controls: "<strong>Controles:</strong> ↑ ↓ o Ratón"
            },
            snake: {
                title: "🐍 Snake",
                desc1: "Controla una serpiente que come manzanas para crecer.",
                desc2: "Evita chocar con tu propia cola.",
                controls: "<strong>Controles:</strong> ← → ↑ ↓ Dirigir"
            },
            breakout: {
                title: "🧱 Breakout",
                desc1: "Destruye un muro de ladrillos con bola y paleta.",
                desc2: "El ángulo de rebote es crucial.",
                controls: "<strong>Controles:</strong> ← → o Ratón"
            },
            memory: {
                title: "🎴 Memoria",
                desc1: "Ejercita la memoria visual. Encuentra pares.",
                desc2: "Memoriza la ubicación de las cartas.",
                controls: "<strong>Objetivo:</strong> Encontrar todos los pares"
            },
            2048: {
                title: "🔢 2048",
                desc1: "Fusiona números idénticos para llegar a 2048.",
                desc2: "La complejidad aumenta exponencialmente.",
                controls: "<strong>Controles:</strong> ← → ↑ ↓"
            },
            flappy: {
                title: "🐦 Flappy Bird",
                desc1: "Toca para contrarrestar la gravedad.",
                desc2: "Requiere un ritmo perfecto.",
                controls: "<strong>Controles:</strong> Espacio o Clic"
            },
            invaders: {
                title: "👾 Space Invaders",
                desc1: "Defiende la Tierra contra alienígenas.",
                desc2: "Cuantos más destruyes, más rápido se vuelve.",
                controls: "<strong>Controles:</strong> ← → Mover | Espacio Disparar"
            }
        },
        controls: {
            start: "Iniciar",
            pause: "Pausa",
            restart: "Reiniciar",
            newGame: "Nuevo Juego",
            score: "Puntuación:",
            level: "Nivel:",
            best: "Mejor:",
            moves: "Movimientos:",
            time: "Tiempo:",
            lives: "Vidas:",
            showDesc: "Mostrar / Ocultar Descripción"
        }
    },
    it: {
        header: {
            title: "Esperimenti Web"
        },
        menu: {
            math: "🧮 Esperimenti Matematici",
            games: "🎮 Giochi"
        },
        tabs: {
            prime: "Numeri Primi",
            fibonacci: "Fibonacci",
            palette: "Tavolozza Colori",
            pascal: "Triangolo di Pascal",
            mandelbrot: "Mandelbrot",
            ulam: "Spirale di Ulam",
            weierstrass: "Funzione di Weierstrass",
            surface: "Superficie 3D",
            tetris: "Tetris",
            pong: "Pong",
            snake: "Snake",
            breakout: "Breakout",
            memory: "Memoria",
            2048: "2048",
            flappy: "Flappy Bird",
            invaders: "Space Invaders"
        },
        math: {
            prime: {
                title: "Numeri Primi - Scala di Gauss",
                desc1: "Il <strong>Teorema dei Numeri Primi</strong> descrive la distribuzione asintotica dei primi.",
                desc2: "Questa visualizzazione confronta la funzione a gradini reale π(x) con l'integrale logaritmico Li(x), illustrando l'Ipotesi di Riemann.",
                input: "Inserisci valore",
                button: "Disegna"
            },
            fibonacci: {
                title: "Sequenza di Fibonacci",
                desc1: "La sequenza è definita da: F(n) = F(n-1) + F(n-2).",
                desc2: "Legata alla <strong>Sezione Aurea</strong>. Mostra la spirale logaritmica osservata in natura.",
                input: "Numero di termini:",
                button: "Generare"
            },
            palette: {
                title: "Generatore di Palette",
                desc1: "Crea palette armoniose basate sulla teoria del colore.",
                desc2: "Calcola variazioni in Tonalità, Saturazione e Luminosità (HSL).",
                input: "Colore base:",
                button: "Generare Palette"
            },
            pascal: {
                title: "Triangolo di Pascal",
                desc1: "Presentazione geometrica dei coefficienti binomiali.",
                desc2: "Rivela la struttura frattale del <strong>Triangolo di Sierpinski</strong>.",
                input: "Numero di righe:",
                button: "Generare"
            },
            mandelbrot: {
                title: "Insieme di Mandelbrot",
                desc1: "L'insieme dei punti c per i quali la sequenza z(n+1) = z(n)² + c rimane limitata.",
                desc2: "L'archetipo dei frattali con auto-similarità infinita.",
                input: "Max iterazioni:",
                button: "Generare"
            },
            ulam: {
                title: "Spirale di Ulam",
                desc1: "Rappresentazione dei numeri primi che rivela schemi inaspettati.",
                desc2: "I primi tendono ad allinearsi sulle diagonali.",
                input: "Dimensione:",
                button: "Generare"
            },
            weierstrass: {
                title: "Funzione di Weierstrass",
                desc1: "Continua ovunque ma differenziabile da nessuna parte.",
                desc2: "Sfida l'intuizione classica del calcolo.",
                input: "Termini:",
                button: "Generare"
            },
            surface: {
                title: "Superficie 3D Parametrica",
                desc1: "Rappresenta equazioni matematiche complesse in 3D.",
                desc2: "Esplora la topologia di forme organiche.",
                input: "Risoluzione:",
                button: "Generare"
            }
        },
        games: {
            tetris: {
                title: "🧱 Tetris",
                desc1: "Il gioco di puzzle definitivo (1984). Disponi i tetramini per completare le linee.",
                desc2: "Il gioco accelera progressivamente.",
                controls: "<strong>Controlli:</strong> ← → Muovi | ↓ Accelera | ↑ Ruota | Spazio Caduta"
            },
            pong: {
                title: "🏓 Pong",
                desc1: "Simulatore di ping pong minimalista (1972).",
                desc2: "Vinci lo scambio sorprendendo il tuo avversario.",
                controls: "<strong>Controlli:</strong> ↑ ↓ o Mouse"
            },
            snake: {
                title: "🐍 Snake",
                desc1: "Controlla un serpente che mangia mele per crescere.",
                desc2: "Evita di scontrarti con la tua coda.",
                controls: "<strong>Controlli:</strong> ← → ↑ ↓ Direziona"
            },
            breakout: {
                title: "🧱 Breakout",
                desc1: "Distruggi un muro di mattoni con palla e racchetta.",
                desc2: "L'angolo di rimbalzo è cruciale.",
                controls: "<strong>Controlli:</strong> ← → o Mouse"
            },
            memory: {
                title: "🎴 Memoria",
                desc1: "Esercita la memoria visiva. Trova le coppie.",
                desc2: "Memorizza la posizione delle carte.",
                controls: "<strong>Obiettivo:</strong> Trovare tutte le coppie"
            },
            2048: {
                title: "🔢 2048",
                desc1: "Unisci numeri identici per arrivare a 2048.",
                desc2: "La complessità aumenta esponenzialmente.",
                controls: "<strong>Controlli:</strong> ← → ↑ ↓"
            },
            flappy: {
                title: "🐦 Flappy Bird",
                desc1: "Tocca per contrastare la gravità.",
                desc2: "Richiede un ritmo perfetto.",
                controls: "<strong>Controlli:</strong> Spazio o Clic"
            },
            invaders: {
                title: "👾 Space Invaders",
                desc1: "Difendi la Terra dagli alieni.",
                desc2: "Più ne distruggi, più veloce diventa il gioco.",
                controls: "<strong>Controlli:</strong> ← → Muovi | Spazio Spara"
            }
        },
        controls: {
            start: "Avvia",
            pause: "Pausa",
            restart: "Riavvia",
            newGame: "Nuovo Gioco",
            score: "Punteggio:",
            level: "Livello:",
            best: "Migliore:",
            moves: "Mosse:",
            time: "Tempo:",
            lives: "Vite:",
            showDesc: "Mostra / Nascondi Descrizione"
        }
    }
};

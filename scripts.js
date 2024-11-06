document.addEventListener('DOMContentLoaded', () => {
    const workButton = document.getElementById('work-button');
    const artButton = document.getElementById('art-button');
    const homeLink = document.getElementById('home-link');
    const infoLink = document.getElementById('info-link');
    const article = document.querySelector('#home-article');
    const workSection = document.querySelector('#work-section');
    const artSection = document.querySelector('#art-section');
    const infoContainer = document.getElementById('info-container');
    const collapsibles = document.querySelectorAll('.collapsible');
    const navLinks = document.querySelectorAll('nav a');
    const subtitleTextElement = document.getElementById('subtitle-text');

    let workVisible = false;
    let artVisible = false;

    article.classList.add('article-visible');
    updateNavColor(false); 

    function updateNavColor(isDark) {
        navLinks.forEach(link => {
            link.style.color = isDark ? '#000' : '#fff';
        });
    }

    function toggleWorkSection() {
        closeAllSectionsExcept('work');
        workVisible = !workVisible;
        workSection.style.display = workVisible ? 'block' : 'none';
        updateNavColor(workVisible);
        workButton.querySelector('p').textContent = workVisible ? "close" : "work";
        if (!workVisible) {
            homeLink.click();
        }
    }

    function toggleArtSection() {
        closeAllSectionsExcept('art');
        artVisible = !artVisible;
        artSection.style.display = artVisible ? 'block' : 'none';
        updateNavColor(artVisible);
        artButton.querySelector('p').textContent = artVisible ? "close" : "art";
        if (!artVisible) {
            homeLink.click();
        }
    }

    function closeAllSectionsExcept(section) {
        if (section !== 'work') {
            workSection.style.display = 'none';
            workVisible = false;
            workButton.querySelector('p').textContent = "work";
        }
        if (section !== 'art') {
            artSection.style.display = 'none';
            artVisible = false;
            artButton.querySelector('p').textContent = "art";
        }
        if (section !== 'info') {
            infoContainer.style.display = 'none';
        }
        if (section !== 'article') {
            article.classList.remove('article-visible');
        }
    }

    workButton.addEventListener('click', toggleWorkSection);
    artButton.addEventListener('click', toggleArtSection);

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllSectionsExcept('article');
        article.classList.add('article-visible');
        updateNavColor(false); 
    });

    infoLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllSectionsExcept('info');
        infoContainer.style.display = 'block';
        updateNavColor(true); 
    });

    collapsibles.forEach(h2 => {
        h2.addEventListener('click', () => {
            const content = h2.nextElementSibling;
            if (!content) {
                console.error("No content found after the clicked H2.");
                return;
            }
            if (content.classList.contains('open')) {
                content.classList.remove('open');
                content.style.maxHeight = null;
                content.style.opacity = 0;
            } else {
                content.classList.add('open');
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = 1;
            }
        });
    });

    if (subtitleTextElement) {
        const sentences = subtitleTextElement.textContent.split('.');
        let currentSentenceIndex = 0;

        function updateSubtitle() {
            if (sentences[currentSentenceIndex].trim() !== "") {
                subtitleTextElement.textContent = sentences[currentSentenceIndex].trim() + '.';
            }
            currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
            setTimeout(updateSubtitle, 3000);
        }

        updateSubtitle();
    }
});

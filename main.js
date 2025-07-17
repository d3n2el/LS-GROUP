lucide.createIcons();

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('#mobile-menu a');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// lang switcing logic
const langButtons = document.querySelectorAll('.lang-button');
const langButtonsMobile = document.querySelectorAll('.language-switcher-mobile .lang-button');

const translatableElements = document.querySelectorAll('[data-en], [data-it], [data-ru]');
const inputPlaceholders = document.querySelectorAll('input[data-en-placeholder], textarea[data-en-placeholder]');

function setLanguage(lang) {
    // upd act class for desktop btn
    langButtons.forEach(button => {
        if (button.id === `lang-${lang}`) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // upd act class for mobile btn
    langButtonsMobile.forEach(button => {
        if (button.id === `lang-${lang}-mobile`) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // trans text content
    translatableElements.forEach(element => {
        if (element.dataset[lang]) {
            element.textContent = element.dataset[lang];
        }
    });

    // trans input placeholders
    inputPlaceholders.forEach(input => {
        if (input.dataset[`${lang}Placeholder`]) {
            input.placeholder = input.dataset[`${lang}Placeholder`];
        }
    });

    // set lang attribute
    document.documentElement.lang = lang;
}

// desktop
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.id.replace('lang-', '');
        setLanguage(lang);
    });
});

// mobile
langButtonsMobile.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.id.replace('lang-', '').replace('-mobile', '');
        setLanguage(lang);
        mobileMenu.classList.remove('active'); // close mobile menu after selection
    });
});

setLanguage('en'); 

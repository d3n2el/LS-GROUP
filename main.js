

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
// looked and tried different methods for these animations but observer is just better straight up.
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else{
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1 // make vis when 10%
});

// sellect all elements and tell whgat to do with each
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach(el => observer.observe(el));
//staggered animations for children
const animatedContainers = document.querySelectorAll('.services-grid, .brands-grid');
animatedContainers.forEach(container => {
    const children = container.querySelectorAll('.service-card, .brand-logo');
    children.forEach((child, index) => {
        child.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });
});

// description will probably be changed for some brands, depends on father
const brandData = {
    "krupps": {
        name: "Krupps",
        description: "Krupps is a leading Italian manufacturer of professional dishwashers, known for its innovation and reliability in the hospitality sector. Their products combine cutting-edge technology with robust design to deliver superior cleaning results.",
        website: "https://www.krupps.it",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Krupps" 
    },
    "coldline": {
        name: "Coldline",
        description: "Coldline specializes in professional refrigeration solutions, offering a wide range of blast chillers, freezers, and cold rooms. They are committed to energy efficiency and innovative technologies for food preservation.",
        website: "https://www.coldline.it",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Coldline"
    },
    "moduline": {
        name: "Moduline",
        description: "Moduline provides advanced cooking and holding solutions for professional kitchens, focusing on precision, safety, and efficiency. Their innovative equipment helps chefs maintain food quality and optimize workflows.",
        website: "https://www.moduline.it",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=moduline"
    },
    "prismafood": {
        name: "Prismafood",
        description: "Prismafood is renowned for producing high-quality pizza ovens, dough mixers, and other catering equipment. They combine traditional Italian craftsmanship with modern technology to deliver durable and reliable products.",
        website: "https://www.prismafood.it",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Prismafood"
    },
    "thenicekitchen": {
        name: "The Nice Kitchen",
        description: "The Nice Kitchen offers a range of innovative and stylish kitchen solutions, blending aesthetic appeal with high functionality. They cater to modern culinary needs with smartly designed appliances.",
        website: "https://www.thenicekitchen.com", 
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=the+nice+kitchen"
    },
    "tecnosteel": {
        name: "Tecnosteel",
        description: "Tecnosteel manufactures stainless steel furniture and equipment for professional kitchens, known for its durability, hygiene, and ergonomic design. They provide custom solutions for various catering environments.",
        website: "https://www.tecnosteel.it", 
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=tecnosteel"
    },
    "barattakitchens": {
        name: "Baratta Kitchens",
        description: "Baratta Kitchens is synonymous with bespoke Italian kitchen design and craftsmanship. They create custom kitchen environments that are both beautiful and highly functional, tailored to individual client needs.",
        website: "https://www.baratta-kitchens.com", 
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Baratta+Kitchens"
    },

};

const brandLogos = document.querySelectorAll('.brand-logo');
const brandDetailsModal = document.getElementById('brand-details-modal');
const brandModalOverlay = document.getElementById('brand-modal-overlay');
const closeBrandModalButton = document.getElementById('close-brand-modal-button');

brandLogos.forEach(logo => {
    logo.addEventListener('click', (event) => {
        // use alt text of image convert to lowercase and remove spaces for key
        const brandId = event.target.alt.toLowerCase().replace(/\s/g, '');
        const brandInfo = brandData[brandId];

        if (brandInfo) {
            document.getElementById('modal-brand-image').src = brandInfo.modalImage;
            document.getElementById('modal-brand-image').alt = brandInfo.name + " Logo"; // add descriptive allt text
            document.getElementById('modal-brand-name').textContent = brandInfo.name;
            document.getElementById('modal-brand-description').textContent = brandInfo.description;
            document.getElementById('modal-brand-website').href = brandInfo.website;

            brandDetailsModal.classList.add('active');
            brandModalOverlay.classList.add('active');
            lucide.createIcons(); // just re-render lucid icons in case
        }
    });
});

function closeBrandModal() {
    brandDetailsModal.classList.remove('active');
    brandModalOverlay.classList.remove('active');
}

closeBrandModalButton.addEventListener('click', closeBrandModal);
brandModalOverlay.addEventListener('click', closeBrandModal); 

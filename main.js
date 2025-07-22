

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
        description: {
            en: "Krupps is a leading Italian manufacturer of professional dishwashers, known for its innovation and reliability in the hospitality sector. Their products combine cutting-edge technology with robust design to deliver superior cleaning results.",
            it: "Krupps è un produttore italiano leader di lavastoviglie professionali, noto per la sua innovazione e affidabilità nel settore dell'ospitalità. I loro prodotti combinano tecnologia all'avanguardia con un design robusto per offrire risultati di pulizia superiori.",
            ru: "Krupps — ведущий итальянский производитель профессиональных посудомоечных машин, известный своими инновациями и надежностью в гостиничном секторе. Их продукция сочетает в себе передовые технологии и прочный дизайн для достижения превосходных результатов очистки."
        },
        website: "https://www.krupps.it",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Krupps" 
    },
    "coldline": {
        name: "Coldline",
        description: {
            en:"Coldline specializes in professional refrigeration solutions, offering a wide range of blast chillers, freezers, and cold rooms. They are committed to energy efficiency and innovative technologies for food preservation.",
            it: "Coldline è specializzata in soluzioni di refrigerazione professionali e offre un'ampia gamma di abbattitori, congelatori e celle frigorifere. L'azienda è impegnata nell'efficienza energetica e nelle tecnologie innovative per la conservazione degli alimenti.",
            ru: "Coldline специализируется на профессиональных решениях в области охлаждения, предлагая широкий ассортимент шоковых охладителей, морозильных камер и холодильных камер. Компания стремится к энергоэффективности и использованию инновационных технологий для хранения продуктов питания.",
        },
        website: "https://www.coldline.it",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Coldline"
    },
    "moduline": {
        name: "Moduline",
        description:{
            en:"Moduline provides advanced cooking and holding solutions for professional kitchens, focusing on precision, safety, and efficiency. Their innovative equipment helps chefs maintain food quality and optimize workflows.",
            it: "Moduline offre soluzioni avanzate per la cottura e la conservazione degli alimenti destinate alle cucine professionali, con particolare attenzione alla precisione, alla sicurezza e all'efficienza. Le loro attrezzature innovative aiutano gli chef a mantenere la qualità degli alimenti e a ottimizzare i flussi di lavoro.",
            ru:"Moduline предлагает передовые решения для приготовления и хранения пищи для профессиональных кухонь, уделяя особое внимание точности, безопасности и эффективности. Их инновационное оборудование помогает поварам поддерживать качество продуктов и оптимизировать рабочие процессы."
        },
            website: "https://www.moduline.it",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=moduline"
    },
    "prismafood": {
        name: "Prismafood",
        description: {
            en:"Prismafood is renowned for producing high-quality pizza ovens, dough mixers, and other catering equipment. They combine traditional Italian craftsmanship with modern technology to deliver durable and reliable products.",
            it:"Prismafood è rinomata per la produzione di forni per pizza, impastatrici e altre attrezzature per la ristorazione di alta qualità. L'azienda combina la tradizionale maestria artigianale italiana con la tecnologia moderna per offrire prodotti durevoli e affidabili.",
            ru: "Prismafood славится производством высококачественных печей для пиццы, тестомесов и другого оборудования для общественного питания. Компания сочетает традиционное итальянское мастерство с современными технологиями, чтобы создавать прочные и надежные продукты."
        },
            website: "https://www.prismafood.com",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Prismafood"
    },
    "thenicekitchen": {
        name: "The Nice Kitchen",
        description:{
            en:"The Nice Kitchen offers a range of innovative and stylish kitchen solutions, blending aesthetic appeal with high functionality. They cater to modern culinary needs with smartly designed appliances.",
            it: "The Nice Kitchen offre una gamma di soluzioni innovative ed eleganti per la cucina, che uniscono estetica e funzionalità. Soddisfano le esigenze culinarie moderne con dispositivi progettati secondo criteri di compatibilità dimensionale, estetica e tecnologica",
            ru: "Nice Kitchen предлагает ряд инновационных и стильных решений для кухни, сочетающих эстетическую привлекательность с высокой функциональностью. Они удовлетворяют современные кулинарные потребности благодаря умно спроектированной бытовой технике.",
        },
        website: "https://www.thenicekitchen.com", 
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=the+nice+kitchen"
    },
    "tecnosteel": {
        name: "Tecnosteel",
        description: { 
            en:"Tecnosteel manufactures stainless steel furniture and equipment for professional kitchens, known for its durability, hygiene, and ergonomic design. They provide custom solutions for various catering environments.",
            it: "Tecnosteel produce mobili e attrezzature in acciaio inossidabile per cucine professionali, rinomati per la loro durata, igiene e design ergonomico. Offrono soluzioni personalizzate per diversi ambienti di ristorazione.",
            ru: "Tecnosteel производит мебель и оборудование из нержавеющей стали для профессиональных кухонь, известное своей прочностью, гигиеничностью и эргономичным дизайном. Компания предлагает индивидуальные решения для различных объектов общественного питания.",

        },
            website: "http://www.tecnosteelsrl.it/", 
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=tecnosteel"
    },
    "barattakitchens": {
        name: "Baratta Kitchens",
        description: {
            en:"Baratta Kitchens is synonymous with bespoke Italian kitchen design and craftsmanship. They create custom kitchen environments that are both beautiful and highly functional, tailored to individual client needs.",
            it: "Baratta Kitchens è sinonimo di design e maestria artigianale italiana nel settore delle cucine su misura. L'azienda crea cucine personalizzate che sono allo stesso tempo belle e altamente funzionali, realizzate su misura in base alle esigenze individuali dei clienti.",
            ru: "Baratta Kitchens — это синоним индивидуального дизайна и мастерства итальянских кухонь. Они создают индивидуальные кухонные интерьеры, которые являются одновременно красивыми и высокофункциональными, адаптированными к индивидуальным потребностям клиентов."
        },
            website: "https://www.baratta-kitchens.com", 
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Baratta+Kitchens"
    },
    "sintesyplast": {
        name: "Sintesyplast",
        description: {
            en: "Sintesyplast S.R.L. is an experienced company specializing in third-party plastic injection molding and processing.Their capabilities include handling diverse needs from small to large volume orders using 24 injection presses (65 to 1600 tons) for a wide range of thermoplastics. Additionally, they provide assembly, packaging, and labeling services upon request and produce technical shelving and outdoor canopies under their UP STAR ITALIA brand.",
            it:"Sintesyplast S.R.L. è un'azienda specializzata nello stampaggio e nella lavorazione di materie plastiche per i propri clienti. Le sue capacità includono la gestione di diverse esigenze, da piccoli a grandi volumi di ordini, utilizzando 24 presse a iniezione (da 65 a 1600 tonnellate) per un'ampia gamma di termoplastici. Inoltre, fornisce servizi di assemblaggio, imballaggio ed etichettatura su richiesta e produce scaffalature tecniche e tettoie per esterni con il proprio marchio UP STAR ITALIA.",
            ru:"Sintesyplast S.R.L. — опытная компания, специализирующаяся на литье и переработке пластмасс для третьих сторон. Ее возможности включают в себя удовлетворение разнообразных потребностей от небольших до крупных заказов с использованием 24 литьевых прессов (от 65 до 1600 тонн) для широкого спектра термопластов. Кроме того, по запросу компания предоставляет услуги по сборке, упаковке и маркировке, а также производит технические стеллажи и навесы для улицы под своим брендом UP STAR ITALIA.Sintesyplast S.R.L. — опытная компания, специализирующаяся на литье и переработке пластмасс для третьих сторон. Ее возможности включают в себя удовлетворение разнообразных потребностей от небольших до крупных заказов с использованием 24 литьевых прессов (от 65 до 1600 тонн) для широкого спектра термопластов. Кроме того, по запросу компания предоставляет услуги по сборке, упаковке и маркировке, а также производит технические стеллажи и навесы для улицы под своим брендом UP STAR ITALIA."
        },
        website: "https://www.sintesyplast.it/", 
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Sintesyplast"
    },
    "rstecnology": {
        name: "RS Tecnology",
        description: {
            en:"RS Tecnology specializes in innovative food processing and thermal treatments, leveraging magnetic induction technology for enhanced energy efficiency and precise cooking. Their 'RS series' offers a range of cooking solutions from 20 to 250 liters. Additionally, they provide sterilizers within their 'ST series'.",
            it:"RS Tecnology è specializzata in processi innovativi di lavorazione degli alimenti e trattamenti termici, sfruttando la tecnologia a induzione magnetica per una maggiore efficienza energetica e una cottura precisa. La loro “serie RS” offre una gamma di soluzioni di cottura da 20 a 250 litri. Inoltre, forniscono sterilizzatori all'interno della loro “serie ST”.",
            ru:"RS Tecnology специализируется на инновационных технологиях пищевой промышленности и термической обработке, используя технологию магнитной индукции для повышения энергоэффективности и точности приготовления пищи. Их «серия RS» предлагает ряд решений для приготовления пищи объемом от 20 до 250 литров. Кроме того, они предлагают стерилизаторы в рамках своей «серии ST».",
        },
            website: "https://rstecnology.it/",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=RS+Tecnology"
    },
    "grandimpianti": {
        name: "Grandimpianti",
        description: {
            en:"Grandimpianti is a company with over 50 years of experience in professional fabric treatment, offering a complete range of equipment for water washing, drying, and ironing, along with innovative solutions like TheMind.Cloud, Wavy, Gentlewash, My Clean Clean, and GiSuite to optimize laundry management across various sectors.",
            it: "Grandimpianti è un'azienda con oltre 50 anni di esperienza nel trattamento professionale dei tessuti che offre una gamma completa di attrezzature per il lavaggio, l'asciugatura e la stiratura, nonché soluzioni innovative come TheMind.Cloud, Wavy, Gentlewash, My Clean Clean e GiSuite per ottimizzare la gestione delle lavanderie in vari settori.",
            ru: "Grandimpianti — компания с более чем 50-летним опытом в области профессиональной обработки тканей, предлагающая полный спектр оборудования для стирки, сушки и глажки, а также инновационные решения, такие как TheMind.Cloud, Wavy, Gentlewash, My Clean Clean и GiSuite, для оптимизации управления прачечными в различных секторах.",
        },
        website: "https://www.grandimpianti.com/",
        modalImage: "https://placehold.co/200x100/e2e8f0/64748b?text=Grandimpianti",
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
        const currentLang = document.documentElement.lang;

        if (brandInfo) {
            document.getElementById('modal-brand-image').src = brandInfo.modalImage;
            document.getElementById('modal-brand-image').alt = brandInfo.name + " Logo"; // add descriptive allt text
            document.getElementById('modal-brand-name').textContent = brandInfo.name;
            document.getElementById('modal-brand-description').textContent = brandInfo.description[currentLang];
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


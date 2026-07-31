"use strict";

/* =========================
   SEARCH FILTER (REUSABLE)
========================= */

function filterList(inputId, listId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toUpperCase();
    const ul = document.getElementById(listId);

    if (!input || !ul) return;

    const li = ul.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
        const a = li[i].getElementsByTagName("a")[0];
        if (!a) continue;

        const txtValue = a.textContent || a.innerText;

        li[i].style.display =
            txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
}


/* =========================
   DROPDOWN MENU
========================= */

function DropFunction() {
    document.getElementById("Dropdown").classList.toggle("show");
}



window.addEventListener("click", function (e) {

    // CLOSE DROPDOWN
    if (!e.target.matches('.dropbutton')) {
        const dropdown = document.getElementById("Dropdown");
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }

    // CLOSE MODAL WHEN CLICK OUTSIDE
    const modal = document.getElementById("ModalWindow");
    if (modal && e.target === modal) {
        modal.style.display = "none";
    }
});


/* =========================
   HERO FULL SCREEN SLIDER (MAINPAGE)
========================= */

const heroSlides = document.querySelectorAll(".hero .slide");
if (heroSlides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
        heroSlides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add("active");
    }, 5000); // Changes image every 5 seconds
}


/* =========================
   MOBILE HAMBURGER MENU TOGGLE
========================= */

const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("navLinks");

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
}


/* =========================
   GLOBAL UNIVERSAL SEARCH & REDIRECT
========================= */

const searchInput = document.getElementById("searchInput");

const searchDestinations = {
    "icct": "projecticct.html",
    "icct colleges": "projecticct.html",
    "madrid": "projectmadrid.html",
    "madrid residence": "projectmadrid.html",
    "217": "project217.html",
    "building 217": "project217.html",
    "217 building": "project217.html",
    "contact": "MainPage.html#contact",
    "contacts": "MainPage.html#contact",
    "contact us": "MainPage.html#contact",
    "about": "MainPage.html#about",
    "about us": "MainPage.html#about",
    "projects": "MainPage.html#projects",
    "home": "MainPage.html#hero",
    "hero": "MainPage.html#hero"
};

if (searchInput) {
    searchInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();

            if (searchDestinations[searchTerm]) {
                window.location.href = searchDestinations[searchTerm];
            } else if (searchTerm !== "") {
                alert("Page or section not found!");
            }
        }
    });
}


/* =========================
   MINI CAROUSEL
========================= */

document.querySelectorAll(".Minicarousel").forEach(carousel => {

    let images = carousel.querySelectorAll("img");
    let index = 0;

    const next = carousel.querySelector(".next");
    const prev = carousel.querySelector(".prev");

    if (!images.length || !next || !prev) return;

    next.addEventListener("click", () => {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
    });

    prev.addEventListener("click", () => {
        images[index].classList.remove("active");
        index = (index - 1 + images.length) % images.length;
        images[index].classList.add("active");
    });
});


/* =========================
   MODAL WINDOW
========================= */

const modal = document.getElementById("ModalWindow");
const btn = document.getElementById("ModalBtn");
const span = document.querySelector(".closer");

if (btn && modal) {
    btn.onclick = function () {
        modal.style.display = "block";
    };
}

if (span && modal) {
    span.onclick = function () {
        modal.style.display = "none";
    };
}


/* =========================
   DRAG & DROP FILE UPLOAD
========================= */

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');

if (dropzone && fileInput) {

    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        updateDropzoneContent(fileInput.files);
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            updateDropzoneContent(e.dataTransfer.files);
        }
    });
}

function updateDropzoneContent(files) {

    if (!dropzone) return;

    if (files.length > 0) {
        const file = files[0];

        dropzone.innerHTML = `
            <div class="file-info">
                <span>${file.name} (${Math.round(file.size / 1024)} KB)</span>
                <button type="button" class="remove-btn">×</button>
            </div>
        `;

        const removeBtn = dropzone.querySelector(".remove-btn");

        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                fileInput.value = '';
                dropzone.innerHTML = '<b>Drag & drop</b> a file here or <b>click here</b> to select a file.';
            });
        }

    } else {
        dropzone.innerHTML = '<b>Drag & drop</b> a file here or <b>click here</b> to select a file.';
    }
}


/* =========================
   SCROLL REVEAL ANIMATIONS (GLOBAL INTERSECTION OBSERVER)
========================= */

const revealElements = document.querySelectorAll(".reveal, .team-zigzag-section");

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}


/* =========================
   CREDITS
========================= */

function Credits() {
    alert(
        "\nCredits:\n\n\n" +
        "Concept and Design:\nArch. John Paul F. Montero\n\n" +
        "Programming, Additional Designs and Concepts,\nTesting and Optimizations:\n" +
        "Eissa Waleed A. Yousuf\nKhalid Waleed A. Yousuf\n\n" +
        "Website Image Contents and Resources:\nMr. Kyle Daniel A. Moneva\n\n\n" +
        "Note:\nThis credits section is for recognition purposes only and may be removed in the future."
    );
}
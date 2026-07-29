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


/* =========================
   GLOBAL CLICK HANDLER (FIXED)
   - fixes dropdown + modal conflict
========================= */

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
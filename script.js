const texts = {
    es: [
        "Texto en Español, sí en Español. En (ES)",
        "Consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex.",
        "Mauris dapibus risus quis suscipit vulputate. Egestas purus viverra accumsan in nisl nisi.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex. Mauris dapibus risus quis suscipit vulputate. Egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.",
    ],
    en: [
        "Párrafo en Inglés, en (EN), si en Inglés.",
        "Hola, texto escrito en Arameo. Na mentira es...",
        "Han escrito, Rexona no te han abandonado.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex.",
        "Sin alcohol etilico, No irritante dermatologiamente probado. Pais de origen: Brasil.",
        "Modo de empleo: Usar en la axilas. supenda si hay irritación, enrojecimiento o alguna molestia.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velitas sahumerios aerosoles ex. Mauris dapibus risus quis suscipit vulputate. Egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.",
    ],
};

const paragraphsInput = document.getElementById("paragraphs");
const langSelect = document.getElementById("lang");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const outputDiv = document.getElementById("output");
const errorDiv = document.getElementById("error");
const statsDiv = document.getElementById("stats");

// Inicialización con fallback
paragraphsInput.value = parseInt(localStorage.getItem("lastParagraphs"), 10) || 1;
langSelect.value = localStorage.getItem("lastLang") || "es";

// Sanitizar input en vivo
paragraphsInput.addEventListener("input", () => {
    if (paragraphsInput.value < 1) {
        paragraphsInput.value = 1;
    }
});

generateBtn.addEventListener("click", () => {
    const count = parseInt(paragraphsInput.value, 10);
    const lang = langSelect.value;
    errorDiv.textContent = "";
    outputDiv.innerHTML = "";
    statsDiv.textContent = "";

    if (isNaN(count) || count < 1 || count > 100) {
        errorDiv.textContent = "¡Por favor! Ingresa un número de entre 1 y 100.";
        return;
    }

    localStorage.setItem("lastParagraphs", count);
    localStorage.setItem("lastLang", lang);

    const arr = texts[lang];
    let totalWords = 0, totalChars = 0;

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const paragraph = arr[randomIndex];

        const article = document.createElement("article");
        const p = document.createElement("p");
        p.textContent = paragraph;
        article.appendChild(p);
        outputDiv.appendChild(article);

        totalWords += paragraph.split(/\s+/).length;
        totalChars += paragraph.length;
    }

    const formatter = new Intl.NumberFormat("es-ES");
    statsDiv.textContent = `Palabras: ${formatter.format(totalWords)} · Caracteres: ${formatter.format(totalChars)}`;
});

copyBtn.addEventListener("click", () => {
    const text = outputDiv.innerText;
    if (text.trim().length === 0) return;
    navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copiado";
    setTimeout(() => {
        copyBtn.textContent = "Copiar";
    }, 2000);
});

// Enter en inputs genera
document.querySelectorAll('input,select').forEach(el => {
    el.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            generateBtn.click();
            e.preventDefault();
        }
    });
});
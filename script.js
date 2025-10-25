const texts = {
    es: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel dui vel lorem placerat fermentum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
        "Aliquam erat volutpat. Donec at lorem at elit tincidunt facilisis in nec mauris.",
        "Cras maximus, sapien ut placerat commodo, justo tortor hendrerit massa, vitae luctus justo odio non augue.",
        "Sed sed nulla vel leo dapibus convallis. Nulla facilisi. Vivamus feugiat ex at purus dictum, id sagittis eros vehicula.",
        "Proin id libero non lorem tincidunt cursus. Donec sed mi sed justo elementum fermentum vel in purus."
    ],

    en: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod nunc ut libero commodo, vitae porta turpis sodales.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        "Curabitur mattis felis quis sapien lacinia, vitae dictum magna euismod.",
        "Aliquam erat volutpat. Integer gravida ipsum et justo hendrerit, ac faucibus felis mattis.",
        "Morbi eget nunc vitae neque sodales iaculis. Nulla non leo sit amet libero posuere iaculis.",
        "Donec nec justo vitae turpis vehicula posuere. Suspendisse potenti.",
        "Cras sagittis, nunc eget tincidunt dictum, justo odio faucibus risus, non viverra eros est vel magna."
    ]
};

const paragraphsInput = document.getElementById("paragraphs");
const langSelect = document.getElementById("lang");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const outputDiv = document.getElementById("output");
const errorDiv = document.getElementById("error");
const statsDiv = document.getElementById("stats");

// Inicialización con fallback
paragraphsInput.value = parseInt(localStorage.getItem("lastParagraphs"), 10) || 0;
langSelect.value = localStorage.getItem("lastLang") || "es";



generateBtn.addEventListener("click", () => {
    const count = parseInt(paragraphsInput.value, 10);
    const lang = langSelect.value;
    errorDiv.textContent = "";
    outputDiv.innerHTML = "";
    statsDiv.textContent = "";

    if (isNaN(count) || count < 0 || count > 1000) {
        errorDiv.textContent = "¡Por favor! Ingresa un número de entre 1 y 1000";
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
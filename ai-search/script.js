const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const recentList = document.getElementById("recentList");
const clearHistory = document.getElementById("clearHistory");
const toast = document.getElementById("toast");
const suggestions = document.querySelectorAll(".suggestion");
const voiceBtn = document.getElementById("voiceBtn");

let searches = JSON.parse(localStorage.getItem("aiSearches")) || [];

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function saveSearch(query) {
    searches = searches.filter(item => item !== query);

    searches.unshift(query);

    searches = searches.slice(0, 6);

    localStorage.setItem(
        "aiSearches",
        JSON.stringify(searches)
    );

    renderSearches();
}

function renderSearches() {

    if (searches.length === 0) {
        recentList.innerHTML = `
            <div class="empty-state">
                <span>⌕</span>
                <p>Your recent searches will appear here.</p>
            </div>
        `;
        return;
    }

    recentList.innerHTML = searches.map((query, index) => `
        <div class="recent-item">
            <div class="recent-query">
                <span>⌕</span>
                <span>${escapeHTML(query)}</span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteSearch(${index})"
                aria-label="Delete search"
            >
                ×
            </button>
        </div>
    `).join("");
}

function deleteSearch(index) {
    searches.splice(index, 1);

    localStorage.setItem(
        "aiSearches",
        JSON.stringify(searches)
    );

    renderSearches();
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        showToast("Please enter a question");
        searchInput.focus();
        return;
    }

    saveSearch(query);

    showToast("Search submitted");

    searchInput.value = "";
});

suggestions.forEach(button => {

    button.addEventListener("click", () => {

        searchInput.value = button.textContent.trim();

        searchInput.focus();
    });

});

clearHistory.addEventListener("click", () => {

    searches = [];

    localStorage.removeItem("aiSearches");

    renderSearches();

    showToast("Search history cleared");
});

voiceBtn.addEventListener("click", () => {

    if (!("webkitSpeechRecognition" in window)) {
        showToast("Voice search is not supported");
        return;
    }

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.start();

    showToast("Listening...");

    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;

        searchInput.value = transcript;
    };
});

renderSearches();


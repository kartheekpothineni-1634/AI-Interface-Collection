const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const queryTitle = document.getElementById("queryTitle");

const copyBtn = document.getElementById("copyBtn");

const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");

const followForm = document.getElementById("followForm");
const followInput = document.getElementById("followInput");

const newSearch = document.getElementById("newSearch");

const toast = document.getElementById("toast");


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


/* Search */

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        showToast("Enter a search question");
        return;
    }

    queryTitle.textContent = query;

    showToast("AI results updated");
});


/* Copy AI Answer */

copyBtn.addEventListener("click", async function() {

    const answerText =
        document.querySelector(".answer-content").innerText;

    try {

        await navigator.clipboard.writeText(answerText);

        showToast("Answer copied");

        copyBtn.textContent = "Copied";

        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1500);

    } catch (error) {

        showToast("Unable to copy answer");

    }
});


/* Feedback */

likeBtn.addEventListener("click", function() {

    likeBtn.textContent = "✓";

    dislikeBtn.textContent = "👎";

    showToast("Thanks for your feedback");

});


dislikeBtn.addEventListener("click", function() {

    dislikeBtn.textContent = "✓";

    likeBtn.textContent = "👍";

    showToast("Thanks for your feedback");

});


/* Follow-up */

followForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const question = followInput.value.trim();

    if (!question) {

        showToast("Enter a follow-up question");

        return;
    }

    showToast("Processing your question...");

    followInput.value = "";

});


/* New Search */

newSearch.addEventListener("click", function() {

    searchInput.value = "";

    queryTitle.textContent = "Start a new AI search";

    searchInput.focus();

    showToast("Ready for a new search");

});


/* Related questions */

const relatedQuestions =
    document.querySelectorAll(".questions button");

relatedQuestions.forEach(button => {

    button.addEventListener("click", function() {

        const question =
            this.textContent.replace("→", "").trim();

        searchInput.value = question;

        queryTitle.textContent = question;

        showToast("Searching with AI...");

    });

});


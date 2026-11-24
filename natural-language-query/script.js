const queryForm = document.getElementById("queryForm");
const queryInput = document.getElementById("queryInput");
const characterCount = document.getElementById("characterCount");

const loading = document.getElementById("loading");
const resultCard = document.getElementById("resultCard");
const followUp = document.getElementById("followUp");

const resultTitle = document.getElementById("resultTitle");
const interpretationText =
    document.getElementById("interpretationText");

const askButton = document.getElementById("askButton");

const suggestions =
    document.querySelectorAll(".suggestion");

const newQueryBtn =
    document.getElementById("newQueryBtn");

const copyResultBtn =
    document.getElementById("copyResultBtn");

const exportBtn =
    document.getElementById("exportBtn");

const followInput =
    document.getElementById("followInput");

const followButton =
    document.getElementById("followButton");

const toast =
    document.getElementById("toast");


/* Toast */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* Character counter */

queryInput.addEventListener("input", () => {

    const length = queryInput.value.length;

    characterCount.textContent =
        `${length} / 300`;

    if (length > 300) {

        queryInput.value =
            queryInput.value.substring(0, 300);

    }

});


/* Suggested questions */

suggestions.forEach(button => {

    button.addEventListener("click", () => {

        queryInput.value =
            button.textContent.trim();

        queryInput.dispatchEvent(
            new Event("input")
        );

        queryInput.focus();

    });

});


/* Main query */

queryForm.addEventListener("submit", event => {

    event.preventDefault();

    const query =
        queryInput.value.trim();

    if (!query) {

        showToast("Please enter a question");

        queryInput.focus();

        return;
    }


    loading.hidden = false;

    resultCard.hidden = true;

    followUp.hidden = true;

    askButton.disabled = true;

    askButton.textContent =
        "Thinking...";


    setTimeout(() => {

        loading.hidden = true;

        resultCard.hidden = false;

        followUp.hidden = false;

        askButton.disabled = false;

        askButton.innerHTML =
            `Ask AI <span>↑</span>`;


        updateResult(query);

        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 1200);

});


/* Update result */

function updateResult(query) {

    const lowerQuery =
        query.toLowerCase();

    if (
        lowerQuery.includes("above 80") ||
        lowerQuery.includes("score")
    ) {

        resultTitle.textContent =
            "Students scoring above 80";

        interpretationText.textContent =
            "I understood your request as finding students whose score is greater than 80.";

        return;
    }


    if (
        lowerQuery.includes("top") ||
        lowerQuery.includes("highest")
    ) {

        resultTitle.textContent =
            "Top performing students";

        interpretationText.textContent =
            "I understood your request as finding students with the highest scores.";

        return;
    }


    if (
        lowerQuery.includes("department") ||
        lowerQuery.includes("average")
    ) {

        resultTitle.textContent =
            "Department performance";

        interpretationText.textContent =
            "I understood your request as comparing average student performance across departments.";

        return;
    }


    resultTitle.textContent =
        "AI-generated result";

    interpretationText.textContent =
        `I analyzed your request: "${query}". Here is the most relevant information based on your question.`;

}


/* Copy result */

copyResultBtn.addEventListener("click", async () => {

    const table =
        document.querySelector("table").innerText;

    try {

        await navigator.clipboard.writeText(table);

        showToast("Result copied");

    } catch {

        showToast("Unable to copy result");

    }

});


/* Export */

exportBtn.addEventListener("click", () => {

    const table =
        document.querySelector("table");

    let csv = [];

    const rows =
        table.querySelectorAll("tr");

    rows.forEach(row => {

        const columns =
            row.querySelectorAll("th, td");

        const values =
            Array.from(columns).map(
                column =>
                    `"${column.innerText.replace(/"/g, '""')}"`
            );

        csv.push(values.join(","));

    });


    const blob =
        new Blob(
            [csv.join("\n")],
            { type: "text/csv" }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "ai-query-result.csv";

    link.click();

    URL.revokeObjectURL(url);

    showToast("CSV exported");

});


/* New question */

newQueryBtn.addEventListener("click", () => {

    queryInput.value = "";

    queryInput.dispatchEvent(
        new Event("input")
    );

    resultCard.hidden = true;

    followUp.hidden = true;

    queryInput.focus();

    showToast("Ready for a new question");

});


/* Follow-up */

followButton.addEventListener("click", () => {

    const question =
        followInput.value.trim();

    if (!question) {

        showToast("Enter a follow-up question");

        return;
    }

    queryInput.value = question;

    queryInput.dispatchEvent(
        new Event("input")
    );

    queryForm.requestSubmit();

    followInput.value = "";

});


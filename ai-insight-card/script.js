const insightGrid = document.getElementById("insightsGrid");
const insightCount = document.getElementById("insightCount");
const toast = document.getElementById("toast");
const refreshBtn = document.getElementById("refreshBtn");


// Dismiss insight
document.addEventListener("click", function (event) {

    if (event.target.classList.contains("dismiss-btn")) {

        const card = event.target.closest(".insight-card");

        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";

        setTimeout(() => {

            card.remove();

            updateCount();

            showToast("Insight dismissed");

        }, 250);
    }

});


// View details
document.addEventListener("click", function (event) {

    if (event.target.classList.contains("details-btn")) {

        const card = event.target.closest(".insight-card");

        const title = card.querySelector("h3").textContent;

        showToast("Opening details for: " + title);
    }

});


// Refresh insights
refreshBtn.addEventListener("click", function () {

    refreshBtn.textContent = "↻ Refreshing...";

    setTimeout(() => {

        refreshBtn.textContent = "✓ Updated";

        showToast("AI insights updated");

        setTimeout(() => {
            refreshBtn.textContent = "↻ Refresh insights";
        }, 1500);

    }, 1000);

});


// Update number of visible insights
function updateCount() {

    const count =
        document.querySelectorAll(".insight-card").length;

    insightCount.textContent =
        count + (count === 1 ? " insight" : " insights");
}


// Toast notification
function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}
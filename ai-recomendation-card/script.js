const recommendationList =
    document.getElementById("recommendationList");

const recommendationCount =
    document.getElementById("recommendationCount");

const toast =
    document.getElementById("toast");

const refreshBtn =
    document.getElementById("refreshBtn");


// Handle buttons

document.addEventListener("click", function (event) {

    const card =
        event.target.closest(".recommendation-card");

    if (!card) {
        return;
    }


    // Accept recommendation

    if (event.target.classList.contains("accept-btn")) {

        const button = event.target;

        button.textContent = "✓ Applied";

        button.disabled = true;

        button.style.opacity = "0.6";

        showToast("Recommendation applied successfully.");

        return;
    }


    // Why button

    if (event.target.classList.contains("why-btn")) {

        const reason =
            card.querySelector(".reason");

        reason.classList.toggle("expanded");

        if (reason.classList.contains("expanded")) {

            showToast(
                "This recommendation is based on recent user activity and performance data."
            );

        } else {

            showToast("Recommendation explanation closed.");

        }

        return;
    }


    // Dismiss button

    if (event.target.classList.contains("dismiss-btn")) {

        card.style.opacity = "0";
        card.style.transform = "translateX(40px)";

        setTimeout(() => {

            card.remove();

            updateCount();

            showToast("Recommendation dismissed.");

        }, 250);

    }

});


// Refresh

refreshBtn.addEventListener("click", function () {

    refreshBtn.textContent = "↻ Analyzing...";
    refreshBtn.disabled = true;

    setTimeout(() => {

        refreshBtn.textContent = "✓ Updated";

        refreshBtn.disabled = false;

        showToast(
            "AI recommendations have been updated."
        );

        setTimeout(() => {

            refreshBtn.textContent = "↻ Refresh";

        }, 1500);

    }, 1200);

});


// Update recommendation count

function updateCount() {

    const count =
        document.querySelectorAll(
            ".recommendation-card"
        ).length;

    recommendationCount.textContent = count;
}


// Toast

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}
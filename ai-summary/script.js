
const copyBtn = document.getElementById("copyBtn");
const regenerateBtn = document.getElementById("regenerateBtn");

const summaryContent =
    document.getElementById("summaryContent");

const lengthButtons =
    document.querySelectorAll(".length-btn");

const expandBtn =
    document.getElementById("expandBtn");

const likeBtn =
    document.getElementById("likeBtn");

const dislikeBtn =
    document.getElementById("dislikeBtn");

const toast =
    document.getElementById("toast");


/* Toast */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


/* Copy */

copyBtn.addEventListener("click", async () => {

    const text =
        summaryContent.innerText;

    try {

        await navigator.clipboard.writeText(text);

        showToast("Summary copied");

        copyBtn.textContent = "Copied";

        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1500);

    } catch {

        showToast("Unable to copy");

    }

});


/* Summary lengths */

const summaries = {

    short: `
        <p>
            AI is transforming how people work, learn, and create
            by providing systems that understand information and
            generate useful content.
        </p>

        <p>
            Organizations are adopting AI while focusing on safety,
            privacy, reliability, and responsible use.
        </p>
    `,

    medium: `
        <p>
            Artificial intelligence is rapidly changing how people
            work, learn, communicate, and create. Modern AI systems
            can understand language, analyze information, and
            generate different types of content.
        </p>

        <p>
            Organizations are increasingly integrating AI into
            everyday workflows to improve productivity and support
            complex tasks.
        </p>

        <p>
            As adoption grows, reliability, privacy, safety, and
            responsible AI practices remain important considerations.
        </p>
    `,

    detailed: `
        <p>
            Artificial intelligence is becoming an important part
            of modern digital experiences. AI systems can understand
            natural language, analyze large amounts of information,
            generate content, and assist users with complex tasks.
        </p>

        <p>
            Generative AI has expanded these capabilities by allowing
            people to create text, images, audio, video, code, and
            other forms of digital content through natural-language
            instructions.
        </p>

        <p>
            Organizations are integrating AI into customer support,
            productivity tools, software development, research,
            education, and creative workflows.
        </p>

        <p>
            However, successful AI adoption also requires attention
            to reliability, privacy, security, transparency, safety,
            and responsible use.
        </p>
    `
};


lengthButtons.forEach(button => {

    button.addEventListener("click", () => {

        lengthButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const length =
            button.dataset.length;

        summaryContent.innerHTML =
            summaries[length];

        showToast(
            `${button.textContent} summary selected`
        );

    });

});


/* Regenerate */

regenerateBtn.addEventListener("click", () => {

    regenerateBtn.textContent = "Generating...";

    setTimeout(() => {

        regenerateBtn.textContent = "↻ Regenerate";

        showToast("Summary regenerated");

    }, 1200);

});


/* Expand */

let expanded = false;

expandBtn.addEventListener("click", () => {

    expanded = !expanded;

    if (expanded) {

        expandBtn.textContent =
            "Show less ↑";

        document.querySelector(".key-points").style.display =
            "block";

        showToast("Full summary displayed");

    } else {

        expandBtn.textContent =
            "Show more ↓";

    }

});


/* Feedback */

likeBtn.addEventListener("click", () => {

    likeBtn.textContent = "✓";

    dislikeBtn.textContent = "👎";

    showToast("Thanks for your feedback");

});


dislikeBtn.addEventListener("click", () => {

    dislikeBtn.textContent = "✓";

    likeBtn.textContent = "👍";

    showToast("Thanks for your feedback");

});


const copilot = document.getElementById("copilot");
const openCopilot = document.getElementById("openCopilot");
const closeCopilot = document.getElementById("closeCopilot");

const chat = document.getElementById("chat");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const promptButtons = document.querySelectorAll("[data-prompt]");


// Open Copilot
openCopilot.addEventListener("click", () => {
    copilot.classList.remove("hidden");
});


// Close Copilot
closeCopilot.addEventListener("click", () => {
    copilot.classList.add("hidden");
});


// Send message
function sendMessage(text) {

    if (!text.trim()) {
        return;
    }

    // User message
    const userMessage = document.createElement("div");

    userMessage.className = "message user-message";

    userMessage.innerHTML = `
        <div class="bubble">
            <p>${escapeHTML(text)}</p>
        </div>
    `;

    chat.appendChild(userMessage);

    messageInput.value = "";

    chat.scrollTop = chat.scrollHeight;


    // Show AI loading state
    const loadingMessage = document.createElement("div");

    loadingMessage.className = "message ai-message";

    loadingMessage.innerHTML = `
        <div class="avatar">✦</div>
        <div class="bubble">
            <p>Thinking...</p>
        </div>
    `;

    chat.appendChild(loadingMessage);

    chat.scrollTop = chat.scrollHeight;


    // Simulated AI response
    setTimeout(() => {

        loadingMessage.remove();

        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai-message";

        aiMessage.innerHTML = `
            <div class="avatar">✦</div>

            <div class="bubble">
                <p>
                    I'd be happy to help with that. This is a demo AI response
                    for your Copilot interface.
                </p>
            </div>
        `;

        chat.appendChild(aiMessage);

        chat.scrollTop = chat.scrollHeight;

    }, 1200);
}


// Send button
sendBtn.addEventListener("click", () => {
    sendMessage(messageInput.value);
});


// Enter to send
messageInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage(messageInput.value);
    }
});


// Suggested prompts
promptButtons.forEach(button => {

    button.addEventListener("click", () => {

        const prompt = button.dataset.prompt;

        copilot.classList.remove("hidden");

        sendMessage(prompt);
    });

});


// Prevent HTML injection
function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
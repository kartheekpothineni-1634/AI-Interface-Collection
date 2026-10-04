const openCommand =
    document.getElementById("openCommand");

const mainTrigger =
    document.getElementById("mainTrigger");

const overlay =
    document.getElementById("overlay");

const commandWrapper =
    document.getElementById("commandWrapper");

const commandInput =
    document.getElementById("commandInput");

const commandItems =
    document.querySelectorAll(".command-item");

const noResults =
    document.getElementById("noResults");

const resultPanel =
    document.getElementById("resultPanel");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const closeResult =
    document.getElementById("closeResult");


let selectedIndex = 0;


/* Open command bar */

function openBar() {

    overlay.classList.remove("hidden");

    commandWrapper.classList.remove("hidden");

    commandInput.value = "";

    selectedIndex = 0;

    updateSelection();

    setTimeout(() => {
        commandInput.focus();
    }, 50);
}


/* Close command bar */

function closeBar() {

    overlay.classList.add("hidden");

    commandWrapper.classList.add("hidden");

    commandInput.blur();
}


/* Open buttons */

openCommand.addEventListener("click", openBar);

mainTrigger.addEventListener("click", openBar);

overlay.addEventListener("click", closeBar);


/* Search/filter commands */

commandInput.addEventListener("input", function () {

    const search =
        commandInput.value.toLowerCase().trim();

    let visibleItems = 0;

    commandItems.forEach((item) => {

        const command =
            item.dataset.command.toLowerCase();

        if (command.includes(search)) {

            item.style.display = "flex";

            visibleItems++;

        } else {

            item.style.display = "none";

        }

    });


    if (visibleItems === 0) {

        noResults.classList.remove("hidden");

    } else {

        noResults.classList.add("hidden");

        selectedIndex = 0;

        updateSelection();

    }

});


/* Keyboard navigation */

commandInput.addEventListener("keydown", function (event) {

    const visibleItems =
        Array.from(commandItems)
            .filter(item => item.style.display !== "none");


    if (event.key === "ArrowDown") {

        event.preventDefault();

        if (visibleItems.length === 0) {
            return;
        }

        selectedIndex++;

        if (selectedIndex >= visibleItems.length) {
            selectedIndex = 0;
        }

        updateSelection(visibleItems);

    }


    if (event.key === "ArrowUp") {

        event.preventDefault();

        if (visibleItems.length === 0) {
            return;
        }

        selectedIndex--;

        if (selectedIndex < 0) {
            selectedIndex = visibleItems.length - 1;
        }

        updateSelection(visibleItems);

    }


    if (event.key === "Enter") {

        event.preventDefault();

        if (visibleItems.length > 0) {

            executeCommand(
                visibleItems[selectedIndex]
            );

        }

    }


    if (event.key === "Escape") {

        closeBar();

    }

});


/* Global Ctrl + K / Cmd + K */

document.addEventListener("keydown", function (event) {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        openBar();

    }

    if (event.key === "Escape") {

        if (!commandWrapper.classList.contains("hidden")) {

            closeBar();

        }

    }

});


/* Mouse selection */

commandItems.forEach((item, index) => {

    item.addEventListener("mouseenter", function () {

        const visibleItems =
            Array.from(commandItems)
                .filter(item => item.style.display !== "none");

        selectedIndex =
            visibleItems.indexOf(item);

        updateSelection(visibleItems);

    });


    item.addEventListener("click", function () {

        executeCommand(item);

    });

});


/* Update selected item */

function updateSelection(items = null) {

    const visibleItems =
        items ||
        Array.from(commandItems)
            .filter(item => item.style.display !== "none");


    commandItems.forEach(item => {

        item.classList.remove("selected");

    });


    if (visibleItems[selectedIndex]) {

        visibleItems[selectedIndex]
            .classList.add("selected");

    }

}


/* Execute command */

function executeCommand(item) {

    const command =
        item.dataset.command;

    closeBar();

    resultTitle.textContent = command;

    resultText.textContent =
        "AI is processing this command. This demo simulates the response.";

    resultPanel.classList.remove("hidden");


    setTimeout(() => {

        resultText.textContent =
            "Command completed successfully. A real AI service can be connected here.";

    }, 1200);

}


/* Close result */

closeResult.addEventListener("click", function () {

    resultPanel.classList.add("hidden");

});
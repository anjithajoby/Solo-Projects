
// Welcome Message//
const myName = "Anjitha Maria Joby";
const welcomeParagraph = document.getElementById("welcomeMessage");
welcomeParagraph.textContent = "Welcome, " + myName + "!";


//Study Counter//

let count = 0;

const studyParagraph = document.getElementById("studyCount");
const addButton = document.getElementById("addBtn");
const resetButton = document.getElementById("resetBtn");

addButton.addEventListener("click", function () {
    count++;
    studyParagraph.textContent = "Study sessions today: " + count;
});

resetButton.addEventListener("click", function () {
    count = 0;
    studyParagraph.textContent = "Study sessions today: " + count;
});



//Weekly Goal Checker //

const goals = [
    "Copy down notes",
    "Finish lab",
    "Go on a walk",
    "Read a book"

];

// Printing goals
for (let i = 0; i < goals.length; i++) {
    console.log(goals[i]);
}

const showGoalsBtn = document.getElementById("showGoalsBtn");
const goalList = document.getElementById("goalList");

showGoalsBtn.addEventListener("click", function () {
    goalList.innerHTML = "";

    for (let i = 0; i < goals.length; i++) {
        const li = document.createElement("li");
        li.textContent = goals[i];
        goalList.appendChild(li);
    }
});



//Hours Studied//
const hoursStudied = 3;

if (hoursStudied >= 3) {
    console.log("Good progress");
} else {
    console.log("You should study more");
}
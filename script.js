
document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("gameSearch");
    const games = document.querySelectorAll(".game-card");

    if (!search) {
        console.log("Search box not found!");
        return;
    }

    search.addEventListener("input", function () {

        const value = search.value.toLowerCase().trim();

        games.forEach(function (game) {

            const title = game.querySelector("h3");

            if (!title) {
                console.log("Game title missing!");
                return;
            }

            const name = title.textContent.toLowerCase();

            if (name.includes(value)) {
                game.style.display = "block";
            } else {
                game.style.display = "none";
            }

        });

    });

});
let games = JSON.parse(localStorage.getItem("games")) || [];

let newGames = document.getElementById("newGames");

games.forEach(function(game) {

    newGames.innerHTML += `
        <div class="game-card">
            <img src="${game.image}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <button onclick="alert('Game selected: ${game.name}')">
    Play Now
</button>
        </div>
    `;

});

const searchInput = document.getElementById("gameSearch");

if (searchInput) {
    searchInput.addEventListener("input", function() {
        const value = this.value.toLowerCase();

        document.querySelectorAll(".game-card").forEach(function(card) {
            const text = card.textContent.toLowerCase();

            card.style.display = text.includes(value) ? "block" : "none";
        });
    });
}
function filterCategory(category) {

    const cards = document.querySelectorAll(".game-card");

    cards.forEach(function(card) {

        if (category === "all") {
            card.style.display = "block";
        } else {
            card.style.display =
                card.textContent.toLowerCase().includes(category.toLowerCase())
                ? "block"
                : "none";
        }

    });

}

const adminForm = document.getElementById("gameForm");
const adminList = document.getElementById("gameList");
const homeGames = document.getElementById("newGames");

function displayAllGames() {
    let savedGames = JSON.parse(localStorage.getItem("games")) || [];

    adminList.innerHTML = "<h2>Manage Games</h2>";
    homeGames.innerHTML = "";

    savedGames.forEach(function(game, index) {

        homeGames.innerHTML += `
            <div class="game-card">
                <img src="${game.image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <p>Category: ${game.category || "Other"}</p>
                <button onclick="alert('Game selected!')">Play Now</button>
            </div>
        `;

        adminList.innerHTML += `
            <div class="game-card">
                <h3>${game.name}</h3>
                <p>${game.category || "Other"}</p>
                <button onclick="removeGame(${index})">Delete</button>
            </div>
        `;
    });
}

adminForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let savedGames = JSON.parse(localStorage.getItem("games")) || [];

    savedGames.push({
        name: document.getElementById("gameName").value,
        image: document.getElementById("gameImage").value,
        description: document.getElementById("gameDescription").value,
        category: document.getElementById("gameCategory").value
    });

    localStorage.setItem("games", JSON.stringify(savedGames));

    adminForm.reset();
    displayAllGames();

    alert("Game Added Successfully!");
});

function removeGame(index) {
    let savedGames = JSON.parse(localStorage.getItem("games")) || [];

    savedGames.splice(index, 1);

    localStorage.setItem("games", JSON.stringify(savedGames));

    displayAllGames();
}


const adminButton = document.getElementById("adminToggle");
const adminPanel = document.getElementById("adminPanel");

adminButton.addEventListener("click", function() {

   if (adminPanel.style.display === "none" || adminPanel.style.display === "") {
        adminPanel.style.display = "block";
    } else {
        adminPanel.style.display = "none";
    }

});
displayAllGames();

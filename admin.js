
const form = document.getElementById("gameForm");
const gameList = document.getElementById("gameList");

function showGames() {
    let games = JSON.parse(localStorage.getItem("games")) || [];

    gameList.innerHTML = "<h2>Saved Games</h2>";

    games.forEach(function(game, index) {
        gameList.innerHTML += `
            <div class="game-card">
                <h3>${game.name}</h3>
                <img src="${game.image}" alt="${game.name}">
                <p>${game.description}</p>
                <button onclick="deleteGame(${index})">
                    Delete Game
                </button>
            </div>
        `;
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let games = JSON.parse(localStorage.getItem("games")) || [];

    games.push({
        name: document.getElementById("gameName").value,
        image: document.getElementById("gameImage").value,
        description: document.getElementById("gameDescription").value,
        category: document.getElementById("gameCategory").value
    });

    localStorage.setItem("games", JSON.stringify(games));

    form.reset();
    showGames();
    alert("Game Saved!");
});

function deleteGame(index) {
    let games = JSON.parse(localStorage.getItem("games")) || [];

    games.splice(index, 1);

    localStorage.setItem("games", JSON.stringify(games));

    showGames();
}

showGames();

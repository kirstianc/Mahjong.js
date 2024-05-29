document.addEventListener('DOMContentLoaded', () => {
    const tileSet = [
        '1ch', '2ch', '3ch', '4ch', '5ch', '6ch', '7ch', '8ch', '9ch',
        '1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b', '9b',
        '1c', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c',
        '1w', '2w', '3w', '4w', '1d', '2d', '3d'
    ];

    let deck = [];
    let players = [[], [], [], []];
    let currentPlayer = 3; // Player is the last in the array

    const playerHands = [
        document.getElementById('player1-hand'),
        document.getElementById('player2-hand'),
        document.getElementById('player3-hand'),
        document.getElementById('player4-hand')
    ];
    
    const drawButton = document.getElementById('draw-button');
    const discardButton = document.getElementById('discard-button');

    function shuffleTiles() {
        deck = tileSet
            .concat(tileSet).concat(tileSet).concat(tileSet) // 4 sets per tile (kinda ugly but its ok)
            .sort(() => Math.random() - 0.5); // shuffle
    }

    function dealTiles() {
        for (let i = 0; i < 13; i++) {
            players.forEach(player => player.push(deck.pop()));
        }
        updateHands();
    }

    function updateHands() {
        players.forEach((player, index) => {
            playerHands[index].innerHTML = '';
            player.forEach(tile => {
                const tileElement = document.createElement('div');
                tileElement.classList.add('tile');
                tileElement.textContent = tile;
                if (index === currentPlayer) {
                    tileElement.addEventListener('click', () => selectTile(tileElement, index));
                }
                playerHands[index].appendChild(tileElement);
            });
        });
    }

    function drawTile() {
        if (deck.length > 0) {
            players[currentPlayer].push(deck.pop());
            updateHands();
        }
    }

    function selectTile(tile, playerIndex) {
        if (playerIndex === currentPlayer) {
            players[playerIndex] = players[playerIndex].filter(t => t !== tile.textContent);
            updateHands();
        }
    }

    function discardTile() {
        currentPlayer = (currentPlayer + 1) % 4;
        updateHands();
    }

    drawButton.addEventListener('click', drawTile);
    discardButton.addEventListener('click', discardTile);

    // Initialize game
    shuffleTiles();
    dealTiles();
});

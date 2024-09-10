// Definirea jucătorilor și a combinațiilor de câștig posibile
const HUMAN_PLAYER = 'X'; // Jucătorul uman
const COMPUTER_PLAYER = 'O'; // Jucătorul calculatorului
const WINNING_COMBINATIONS = [ // Combinațiile posibile de câștig
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Selectarea celulelor și butonului de restart din DOM
const cells = document.querySelectorAll('[data-cell]'); // Selectarea tuturor celulelor
const restartButton = document.getElementById('restartButton'); // Butonul de restart
const status = document.getElementById('status'); // Elementul de stare

// Inițializarea jocului la început și adăugarea unui listener pentru butonul de restart
startGame();

restartButton.addEventListener('click', startGame);

// Funcția care inițializează jocul
function startGame() {
    // Resetează toate celulele și adaugă event listener pentru fiecare celulă
    cells.forEach(cell => {
        cell.innerText = ''; // Șterge textul din celulă
        cell.removeEventListener('click', handleClick); // Elimină event listener-ul precedent pentru clic
        cell.addEventListener('click', handleClick, { once: true }); // Adaugă un event listener pentru clic, care să fie executat o singură dată
    });
    currentPlayer = HUMAN_PLAYER; // Setează jucătorul curent la jucătorul uman
    setStatus(`${currentPlayer}'s turn`); // Afișează mesajul pentru jucătorul curent
}

// Funcția care gestionează clicul pe o celulă
function handleClick(e) {
    const cell = e.target; // Obține celula pe care s-a făcut clic
    if (cell.innerText === '') { // Verifică dacă celula este goală
        placeMark(cell, currentPlayer); // Plasează marca în celula respectivă pentru jucătorul curent
        if (checkWin(currentPlayer)) { // Verifică dacă jucătorul curent a câștigat
            endGame(`${currentPlayer} wins!`); // Dacă da, încheie jocul și afișează mesajul corespunzător
        } else if (isDraw()) { // Verifică dacă este remiză
            endGame("It's a draw!"); // Dacă da, încheie jocul și afișează mesajul corespunzător
        } else { // Dacă jocul continuă
            currentPlayer = currentPlayer === HUMAN_PLAYER ? COMPUTER_PLAYER : HUMAN_PLAYER; // Schimbă jucătorul curent
            if (currentPlayer === COMPUTER_PLAYER) { // Dacă următorul jucător este calculatorul
                computerMove(); // Execută mișcarea calculatorului
            } else { // Dacă următorul jucător este umanul
                setStatus(`${currentPlayer}'s turn`); // Afișează mesajul pentru jucătorul curent
            }
        }
    }
}

// Funcția care reprezintă mișcarea calculatorului
function computerMove() {
    const emptyCells = [...cells].filter(cell => cell.innerText === ''); // Selectează toate celulele goale
    const randomIndex = Math.floor(Math.random() * emptyCells.length); // Generează un index aleatoriu
    const cell = emptyCells[randomIndex]; // Alege o celulă goală aleatorie
    placeMark(cell, currentPlayer); // Plasează marca calculatorului în celula aleasă
    if (checkWin(currentPlayer)) { // Verifică dacă calculatorul a câștigat
        endGame(`${currentPlayer} wins!`); // Dacă da, încheie jocul și afișează mesajul corespunzător
    } else if (isDraw()) { // Verifică dacă este remiză
        endGame("It's a draw!"); // Dacă da, încheie jocul și afișează mesajul corespunzător
    } else { // Dacă jocul continuă
        currentPlayer = currentPlayer === HUMAN_PLAYER ? COMPUTER_PLAYER : HUMAN_PLAYER; // Schimbă jucătorul curent
        setStatus(`${currentPlayer}'s turn`); // Afișează mesajul pentru jucătorul curent
    }
}

// Funcția care încheie jocul și afișează un mesaj final
function endGame(message) {
    setStatus(message); // Afișează mesajul de încheiere a jocului
    cells.forEach(cell => {
    cell.removeEventListener('click', handleClick); // Elimină event listener-ul pentru clic pentru toate celulele
    });
}

// Funcția care setează mesajul de stare
function setStatus(message) {
    status.innerText = message; // Afișează mesajul de stare în elementul status
}
    
// Funcția care verifică dacă jocul este remiză
    function isDraw() {
    return [...cells].every(cell => cell.innerText !== ''); // Verifică dacă toate celulele sunt ocupate
}

// Funcția care plasează marca într-o celulă pentru un jucător dat
function placeMark(cell, player) {
    cell.innerText = player; // Afișează marca jucătorului în celula respectivă
}
    
// Funcția care verifică dacă un jucător dat a câștigat
function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => { // Verifică fiecare combinație posibilă de câștig
    return combination.every(index => {
    return cells[index].innerText === player; // Verifică dacă toate celulele dintr-o combinație sunt ocupate de marca jucătorului respectiv
});
});
}





















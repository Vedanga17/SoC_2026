// Step 1: Grab the HTML elements we want to interact with

const submitButton = document.getElementById('check-btn');
const inputField = document.getElementById('user-answer');
const resultMessage = document.getElementById('quiz-result');

// Step 2: Add a "click" event to the button
submitButton.addEventListener('click', function() {
    
    // Get the value the user typed, and make it lowercase to check it easily
    let answer = inputField.value.toLowerCase().trim();

    // Step 3: Check if the answer is correct
    if (answer === '11' || answer === 'eleven') {
        resultMessage.textContent = 'Correct! A standard cricket team has 11 players.';
        resultMessage.style.color = 'green';
    } else {
        resultMessage.textContent = 'Oops, that is incorrect. Try again!';
        resultMessage.style.color = 'red';
    }
    
    // Clear the input box after checking
    inputField.value = '';
});
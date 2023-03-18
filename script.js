const messageContainer = document.querySelector(".messages");
const messageForm = document.querySelector(".chat-window form");
const messageInput = document.querySelector(".chat-window input[type='text']");

const genreLinks = document.querySelectorAll(".genre a");

// handle clicking on genre links
genreLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const genre = this.dataset.genre;
    const message = `Recommend some ${genre} songs`;
    addMessage("user", message);
    getRecommendations(genre);
  });
});

// handle submitting chat messages
messageForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const message = messageInput.value;
  addMessage("user", message);
  getChatbotResponse(message);
  messageInput.value = "";
});

// add a message to the chat window
function addMessage(sender, text) {
  const messageEl = document.createElement("li");
  messageEl.classList.add(sender);
  messageEl.innerText = text;
  messageContainer.appendChild(messageEl);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// send a request to the server to get song recommendations
function getRecommendations(genre) {
  // make a request to the server and handle the response
}

// send a request to the server to get a response from the chatbot
function getChatbotResponse(message) {
  // make a request to the server and handle the response
}

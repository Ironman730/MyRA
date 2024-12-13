document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');
    const chatContent = document.getElementById('chatContent');
    const chatSessions = document.getElementById('chatSessions');
    const newChatIcon = document.getElementById('newChatIcon');

    let chatHistory = [];

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    newChatIcon.addEventListener('click', () => {
        const newSession = document.createElement('div');
        newSession.classList.add('chat-session');
        newSession.textContent = `Chat ${chatSessions.children.length + 1}`;
        newSession.addEventListener('click', () => loadChatSession(newSession));
        chatSessions.appendChild(newSession);
        chatHistory.push([]);
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        // Create user message element
        const userChat = document.createElement('div');
        userChat.classList.add('chat-message', 'user');
        userChat.textContent = userMessage;
        chatContent.appendChild(userChat);

        // Scroll to the bottom
        chatContent.scrollTop = chatContent.scrollHeight;

        // Clear input field
        userInput.value = "";

        // Add to chat history
        chatHistory[chatSessions.children.length - 1].push({ sender: 'user', message: userMessage });

        // Bot response
        setTimeout(() => {
            const botChat = document.createElement('div');
            botChat.classList.add('chat-message', 'bot');
            if (userMessage.toLowerCase() === "hi mira") {
                botChat.textContent = "Hi! How can I help you today.";
            } else {
                botChat.textContent = "Sorry, I don't understand that.";
            }
            chatContent.appendChild(botChat);

            // Scroll to the bottom
            chatContent.scrollTop = chatContent.scrollHeight;

            // Add to chat history
            chatHistory[chatSessions.children.length - 1].push({ sender: 'bot', message: botChat.textContent });
        }, 500); // Simulate delay for bot response
    }

    function loadChatSession(sessionElement) {
        // Clear the current chat content
        chatContent.innerHTML = '<div class="timeline">Today</div>';
        const sessionIndex = Array.from(chatSessions.children).indexOf(sessionElement);

        // Load chat history
        chatHistory[sessionIndex].forEach(chat => {
            const chatMessage = document.createElement('div');
            chatMessage.classList.add('chat-message', chat.sender);
            chatMessage.textContent = chat.message;
            chatContent.appendChild(chatMessage);
        });
    }
});

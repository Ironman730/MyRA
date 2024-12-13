document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');
    const chatContent = document.getElementById('chatContent');
    const chatSessions = document.getElementById('chatSessions');
    const newChatIcon = document.getElementById('newChatIcon');
    const logo = document.getElementById('logo'); // Get the logo element

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

    logo.addEventListener('click', () => {
        alert("Logo clicked!"); // Add your desired functionality here
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        const userChat = document.createElement('div');
        userChat.classList.add('chat-message', 'user');
        userChat.textContent = userMessage;
        chatContent.appendChild(userChat);
        chatContent.scrollTop = chatContent.scrollHeight;
        userInput.value = "";
        chatHistory[chatSessions.children.length - 1].push({ sender: 'user', message: userMessage });

        setTimeout(() => {
            const botChat = document.createElement('div');
            botChat.classList.add('chat-message', 'bot');
            if (userMessage.toLowerCase() === "hi mira") {
                botChat.textContent = "Hi! How can I help you today.";
            } else {
                botChat.textContent = "Sorry, I don't understand that.";
            }
            chatContent.appendChild(botChat);
            chatContent.scrollTop = chatContent.scrollHeight;
            chatHistory[chatSessions.children.length - 1].push({ sender: 'bot', message: botChat.textContent });
        }, 500);
    }

    function loadChatSession(sessionElement) {
        chatContent.innerHTML = '<div class="timeline">Today</div>';
        const sessionIndex = Array.from(chatSessions.children).indexOf(sessionElement);
        chatHistory[sessionIndex].forEach(chat => {
            const chatMessage = document.createElement('div');
            chatMessage.classList.add('chat-message', chat.sender);
            chatMessage.textContent = chat.message;
            chatContent.appendChild(chatMessage);
        });
    }
});

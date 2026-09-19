# AI Chat Bot

A simple AI chatbot that runs in the browser. It uses the **Google Gemini API** to answer your questions, and you can also upload an image and ask questions about it. Built with HTML, CSS and JavaScript.

## Features

- Chat with AI by typing a message and pressing **Enter** or the send button
- Upload an image and ask questions about it
- Loading animation while the AI is thinking
- Auto retry if the server is busy
- Shows an error message if something goes wrong
- Chat scrolls down automatically
- Works on small screens too

## Built With

- HTML5
- CSS3 (Flexbox)
- JavaScript (Fetch API, async/await)
- Google Gemini API

## Project Structure

```
ai-chatbot/
├── index.html
├── style.css
├── script.js
├── ai.png
├── user.png
├── img.svg
├── submit.svg
├── loading.webp
└── README.md
```

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
   ```
2. Get a free API key from [Google AI Studio](https://aistudio.google.com/).
3. Open `script.js` and replace `GIVE API` with your key:
   ```javascript
   const Api_Key = "YOUR_API_KEY"
   ```
4. Open `index.html` in your browser (or use the **Live Server** extension in VS Code).
5. Type a message and start chatting!

> **Important:** Never upload your real API key to GitHub. Add your key only on your own computer, and remove it before you push your code.

## How It Works

1. You type a message (and optionally choose an image).
2. The message is sent to the Gemini API using `fetch`.
3. The AI reply comes back and is shown in the chat box.

## Future Improvements

- [ ] Remember the previous messages in the chat
- [ ] Add a dark and light theme switch
- [ ] Add a "Clear chat" button
- [ ] Keep the API key safe using a backend server


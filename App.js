import {useState} from 'react'
import './App.css'

const userList = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']

function App() {
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [previousSender, setPreviousSender] = useState(null)

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return

    const randomUser = userList[Math.floor(Math.random() * userList.length)]
    const isSentMessage = randomUser === previousSender
    const newMessage = {
      id: Date.now(),
      username: randomUser,
      message: messageInput,
      likes: 0,
      sent: isSentMessage,
    }

    setMessages([...messages, newMessage])
    setMessageInput('')
    setPreviousSender(randomUser)
  }

  const handleLikeMessage = id => {
    const updatedMessages = messages.map(message => {
      if (message.id === id) {
        return {...message, likes: message.likes + 1}
      }
      return message
    })
    setMessages(updatedMessages)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="App">
      <div className="message-thread">
        {messages.map(message => {
          const isSentMessage = message.sent
          const messageClass = isSentMessage
            ? 'sent-message'
            : 'received-message'
          const messageAlign = isSentMessage ? 'flex-end' : 'flex-start'

          return (
            <div
              key={message.id}
              className={`message ${messageClass}`}
              style={{alignSelf: messageAlign}}
            >
              <span className="username">{message.username}:</span>
              <span className="content">{message.message}</span>
              <button
                className="like-button"
                onClick={() => handleLikeMessage(message.id)}
                type="button"
              >
                Like ({message.likes})
              </button>
            </div>
          )
        })}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage} type="button">
          Send
        </button>
      </div>
    </div>
  )
}

export default App

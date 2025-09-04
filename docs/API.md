# Tanga Ibuki Chat API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. Chat Message
**POST** `/api/chat`

Send a message to Ibuki and get a response.

#### Request Body
```json
{
  "message": "Halo Ibuki!"
}
```

#### Response
```json
{
  "message": "Halo! Senang bertemu dengan kamu! Aku Ibuki, ada yang bisa aku bantu? 😊",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Example Usage
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: 'Halo Ibuki!' }),
});

const data = await response.json();
console.log(data.message);
```

---

### 2. Health Check
**GET** `/api/health`

Check if the API is running properly.

#### Response
```json
{
  "status": "healthy",
  "service": "Tanga Ibuki Chat API",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

### 3. Chat History
**GET** `/api/chat/history`

Get all chat history (for demo purposes).

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "1234567890",
      "messages": [
        {
          "id": "msg1",
          "content": "Halo!",
          "role": "user",
          "timestamp": "2024-01-15T10:30:00.000Z"
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

**POST** `/api/chat/history`

Save a message to chat history.

#### Request Body
```json
{
  "chatId": "1234567890",
  "message": "Halo Ibuki!",
  "role": "user"
}
```

**DELETE** `/api/chat/history?chatId=1234567890`

Delete a chat from history.

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message description"
}
```

### Common HTTP Status Codes
- `200` - Success
- `400` - Bad Request (missing or invalid parameters)
- `500` - Internal Server Error

---

## Integration Example

```javascript
// Send message to Ibuki
async function sendMessage(message) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error:', error);
    return 'Maaf, ada kesalahan teknis. Coba lagi nanti ya! 😅';
  }
}

// Usage
const ibukiResponse = await sendMessage('Halo Ibuki!');
console.log(ibukiResponse);
```

---

## Notes

- API menggunakan simulasi AI response untuk demo
- Dalam production, integrasikan dengan AI service seperti OpenAI, Claude, atau AI lokal
- Chat history disimpan di memory untuk demo (gunakan database untuk production)
- Semua timestamp menggunakan format ISO 8601

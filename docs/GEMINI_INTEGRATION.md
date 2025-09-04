# Google Gemini API Integration

## Overview
Aplikasi Tanga Ibuki sekarang terintegrasi dengan Google Gemini API untuk memberikan respons AI yang lebih cerdas dan kontekstual.

## Setup

### 1. Environment Variables
File `.env.local` sudah dibuat di root project dengan konfigurasi berikut:

```env
# Google Gemini API Configuration
GEMINI_API_KEY=AIzaSyCRCX4BQwxJ-ZHzajXtEHi3i8pfPHNGQ24
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

### 2. API Key Configuration
- ✅ **API Key**: `AIzaSyCRCX4BQwxJ-ZHzajXtEHi3i8pfPHNGQ24` (sudah dikonfigurasi)
- ✅ **Model**: `gemini-2.0-flash`
- ✅ **Endpoint**: Google Generative Language API
- ✅ **Status**: **TERHUBUNG DAN BERFUNGSI**


## Features

### 1. Smart AI Responses
- Menggunakan Google Gemini 2.0 Flash untuk respons yang lebih cerdas
- Personality Ibuki tetap dipertahankan melalui system prompt
- Fallback ke respons lokal jika API tidak tersedia

### 2. Personality System
Ibuki memiliki personality yang konsisten:
- Nama: Tanga Ibuki (panggil aku Ibuki)
- Ramah, ceria, dan selalu siap membantu
- Berbicara dengan bahasa Indonesia yang santai
- Suka menggunakan emoji 😊
- Selalu positif dan memberikan jawaban yang bermanfaat

### 3. Error Handling
- Automatic fallback ke respons lokal jika Gemini API gagal
- Logging error untuk debugging
- Graceful degradation

## API Endpoints

### 1. Chat API (Enhanced)
**POST** `/api/chat`

Sekarang menggunakan Gemini API dengan fallback.

```json
{
  "message": "Halo Ibuki!"
}
```

Response:
```json
{
  "message": "Halo! Senang bertemu dengan kamu! Aku Ibuki, ada yang bisa aku bantu? 😊",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Gemini Test API
**POST** `/api/gemini/test`

Test endpoint untuk menguji koneksi Gemini API.

```json
{
  "message": "Test message"
}
```

Response:
```json
{
  "success": true,
  "message": "Response from Gemini API",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**GET** `/api/gemini/test`

Info tentang test endpoint.

## Testing

### 1. Test Gemini API Connection ✅ BERHASIL
```powershell
$body = '{"message": "Halo Ibuki!"}'
Invoke-RestMethod -Uri "http://localhost:3000/api/gemini/test" -Method POST -ContentType "application/json" -Body $body
```

**Response:**
```json
{
  "success": true,
  "message": "Halo juga! 😊 Ada yang bisa Ibuki bantu hari ini? Dengan senang hati Ibuki akan...",
  "timestamp": "2025-09-04T06:17:22.888Z"
}
```

### 2. Test Chat API ✅ BERHASIL
```powershell
$body = '{"message": "Bagaimana cara belajar programming?"}'
Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method POST -ContentType "application/json" -Body $body
```

**Response:**
```json
{
  "message": "Hai! 😊 Belajar programming itu seru banget, lho! 😊 Ada banyak cara, kok!...",
  "timestamp": "2025-09-04T06:17:22.888Z"
}
```

### 3. Direct Gemini API Test
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AIzaSyCRCX4BQwxJ-ZHzajXtEHi3i8pfPHNGQ24' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'
```

## Architecture

### 1. Service Layer
- `lib/gemini.ts` - Gemini API service
- `lib/api.ts` - API client untuk frontend
- `app/api/chat/route.ts` - Chat API endpoint

### 2. Flow
1. User mengirim pesan via frontend
2. Frontend memanggil `/api/chat`
3. API mencoba menggunakan Gemini API
4. Jika gagal, fallback ke respons lokal
5. Response dikirim kembali ke frontend

### 3. Error Handling
- Network errors → Fallback ke respons lokal
- API key errors → Fallback ke respons lokal
- Rate limiting → Fallback ke respons lokal
- Invalid responses → Fallback ke respons lokal

## Monitoring

### 1. Logs
- Gemini API calls di-log di console
- Error details tersimpan untuk debugging
- Fallback usage di-track

### 2. Health Check
- `/api/health` - General health check
- `/api/gemini/test` - Gemini API specific test

## Security

### 1. API Key Protection
- API key disimpan di environment variables
- Tidak exposed ke frontend
- Server-side only access

### 2. Input Validation
- Message validation di API endpoint
- Sanitization untuk mencegah injection
- Rate limiting (dapat ditambahkan)

## Performance

### 1. Caching
- Dapat ditambahkan caching untuk respons yang sering digunakan
- Redis atau in-memory cache

### 2. Optimization
- Response streaming untuk respons panjang
- Parallel processing untuk multiple requests

## Future Enhancements

1. **Response Streaming** - Real-time response generation
2. **Context Memory** - Remember conversation context
3. **Multi-modal** - Support untuk gambar dan file
4. **Custom Models** - Fine-tuned models untuk Ibuki
5. **Analytics** - Usage tracking dan analytics

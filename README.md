# Bitespeed Identity Resolution API

This is my solution to the Bitespeed backend task for identity resolution.


## 🔗 Live API Endpoint
**POST** `/identify`  
Hosted on Render:  
(https://bitespeed-cutomer-helper.onrender.com/identify)

## 📬 Request Body

Send JSON body:

```json
{
  "email": "doc@hillvalley.edu",
  "phoneNumber": "123456"
}

## 📬 Response
{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["doc@hillvalley.edu", "alt@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [2, 3]
  }
}

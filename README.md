<h1>ABOUT</h1>

- Real-time messaging website with the help of socket.
- Users can create chat rooms.
- Users can chat with each other in these rooms.
- Private room functionality:
- Requires an OTP sent by the room creator via SMTP for access.
- Displays the number of API requests made to the server.


- <h1>STEPS</h1>

- Clone the repository.
  
```sh
https://github.com/iharshyadav/realtime-webapp.git
```

- <h1>INSTALLATION</h1>

```sh
npm install
```

- <h1>.env Frontend</h1>

```sh
NEXT_PUBLIC_UPSTASH_REDIS_REST_URL = ""
NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN=""
NEXT_PUBLIC_BASE_URL= ""
REDIS_CONNECTION_STRING =""
GOOGLE_ID = ""
GOOGLE_SECRET = ""
NEXTAUTH_SECRET = ""
DATABASE_URL = ""

```

- <h1>.env Backend</h1>

```sh
PORT = 5000
REDIS_CONNECTION_STRING = ""
DATABASE_URL = ""
CLIENT_URL = ""
SMTP_EMAIL = ""
SMTP_PASS = ""
JWT_SECRET = ""
```

- <h1>Redis Documentation</h1>
```sh
https://redis.io/docs/latest
```

- <h1>RUN</h1>

```sh
npm run dev
```

- <h1>BUILD</h1>

```sh
npm run build
```

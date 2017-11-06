# Token Based Authentication
> A simple REST API that authenticates users

## Installation

Required Software: [MySQL](https://www.mysql.com/)

Linux & OS X:

1. `git clone https://github.com/AGontcharov/token-based-authentication.git`

2. `cd token-based-authentication`

3. `sudo npm install`

4. `mysql -u root -p < database.sql`

5. `gulp`

Next provide a **config.json** file in the root directory with the necessary crendentials:

```JSON
{
  "mysql": {
    "host": "127.0.0.1",
    "user": "root",
    "password": "",
    "database": "Auth"
  },
  "key": ""
}
```

Windows:

```sh
Not yet available
```

## Running

```
npm start
```

## REST API


### Get API

URL: `api/v1`

Method: GET

URL Params: N/A

Data Params: N/A

Success Response Codes: 200

Success Response Content:
```JSON
{
  "version": "1.0"
}
```

Error Response Codes: N/A

### Create User

URL: `api/v1/users`

Method: POST

URL Params: N/A

Data Params: 
```JSON
{
  "username": "auth",
  "pwd": "test123"
}
```

Success Response Codes: 201

Success Response Content:
```JSON
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJpYXQiOjE1MDk5NTQxNDksImV4cCI6MTUwOTk1NDc0OX0.o5uPFxW6GQWgMi7Sg-eWRFvFVnLZvEp_gmOpGFc6Yvc"
}
```

Error Response Codes: 400, 409

### Authenticate User

URL: `api/v1/login`

Method: POST

URL Params: N/A

Data Params: 
```JSON
{
  "username": "auth",
  "pwd": "test123"
}
```

Success Response Codes: 200

Success Response Content:
```JSON
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJpYXQiOjE1MDk5NTQxNDksImV4cCI6MTUwOTk1NDc0OX0.o5uPFxW6GQWgMi7Sg-eWRFvFVnLZvEp_gmOpGFc6Yvc"
}
```

Error Response Codes: 400, 404

### Get All Users

URL: `api/v1/users`

Method: GET

URL Params: N/A

Data Params: N/A

Success Response Codes: 200

Success Response Content:
```JSON
{
    "success": true,
    "users": [
        {
            "id": 3,
            "username": "alex"
        },
        {
            "id": 4,
            "username": "sam"
        },
        {
            "id": 1,
            "username": "test"
        }
    ]
}
```

Error Response Codes: 404

## Testing

```
npm test
```

## Meta

Alexander Gontcharov – alexander.goncharov@gmail.com

Website - [www.alexgontcharov.com](http://www.alexgontcharov.com)

[https://github.com/AGontcharov/](https://github.com/AGontcharov/)

# Teamwork-demo

[![Build Status](https://travis-ci.org/austainodedon/teamwork-demo.svg?branch=develop)](https://travis-ci.org/austainodedon/teamwork-demo)[![Coverage Status](https://coveralls.io/repos/github/austainodedon/Teamwork-demo/badge.svg?branch=develop)](https://coveralls.io/github/austainodedon/Teamwork-demo?branch=develop)

Teamwork is an internal social network for employees of an organization. The goal of this application is to facilitate interaction between colleagues and promote internal bonding. This is the backend for the application with the various API endpoints

#### users endpoints

| Action | Endpoint                   | Functionality     |
| ------ | -------------------------- | ----------------- |
| POST   | `/api/v1/auth/create-user` | Admin Create user |
| POST   | `/api/v1/auth/signin`      | Login Employee    |

User signup schema:

```json
{
  "firstName": "austine",
  "lastName": "emeka",
  "email": "austine@gmail.com",
  "password": "asdf1234",
  "gender": "male",
  "jobRole": "software Ninja",
  "department": "Backend Developer",
  "address": "South side Abuja",
  "isAdmin": false
}
```

Employee login schema:

```json
{
  "email": "austine@gmail.com",
  "password": "asdf1234"
}
```

#### GIFs endpoints

| Action | Endpoint                      | Functionality                    |
| ------ | ----------------------------- | -------------------------------- |
| POST   | `/api/v1/gifs/`               | Employee Post a GIF              |
| GET    | `/api/v1/gifs/`               | Employee Get GIFs                |
| GET    | `/api/v1/gifs/:gifId`         | Employee Get a single GIF        |
| POST   | `/api/v1/gifs/:gifId/comment` | Employee Post a comment to a GIF |

Gif post schema:

```json
{
  "title": "The fancy GIF",
  "imageUrl": "C:/Users/user/Desktop/austaino/pic1.png"
}
```

Gif comment schema:

```json
{
  "comment": "My comment for this GIF"
}
```

#### categories endpoints

| Action | Endpoint                                  | Functionality                       |
| ------ | ----------------------------------------- | ----------------------------------- |
| GET    | `/api/v1/categories/`                     | Admin get categories                |
| GET    | `/api/v1/categories/:id`                  | Admin get single category           |
| POST   | `/api/v1/categories/`                     | Admin create category               |
| PATCH  | `/api/v1/categories/:id`                  | Admin Edit category                 |
| DELETE | `/api/v1/categories/:id`                  | Admin delete category               |
| GET    | `/api/v1/categories/:categoryId/articles` | Employee Get articles in a category |

Category schema:

```json
{
  "categoryName": "Break into category"
}
```

#### articles endpoints

| Action | Endpoint                             | Functionality                    |
| ------ | ------------------------------------ | -------------------------------- |
| POST   | `/api/v1/articles/`                  | Employee Post an article         |
| GET    | `/api/v1/articles/`                  | Employee Get articles            |
| GET    | `/api/v1/articles/:articleId`        | Employee Get a single article    |
| PATCH  | `/api/v1/articles/:articleId`        | Employee Edit an article         |
| DELETE | `/api/v1/articles/:articleId`        | Employee Delete an article       |
| POST   | `/api/v1/articles/articleId/comment` | Employee Post an article comment |

Article schema:

```json
{
  "title": "article title one",
  "article": "We will be coding till we get there",
  "categoryId": "4444"
}
```

### Prerequisites

- Javascript (A programming language)
- Node.js (A Javascript server side framework)
- Express (Server side framework)
- npm install (dependencies used in the project)
- GitHub project management board (A project management tool) (optional)
- ​PostgreSQL (DataBase)
- Jest (Tool for testing)
- The app is hosted on heroku

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run start:dev` to start the local server

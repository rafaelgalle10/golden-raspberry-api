My official account: https://github.com/rafaelgalle

---

# Golden Raspberry API

This project is an API to manage movies nominated and awarded in the Golden Raspberry Awards. It is built using Node.js, TypeScript, Express, and SQLite (H2). The API follows the Richardson Maturity Model level 2 and adheres to principles like SOLID, clean code, clean architecture, DRY, KISS, and 12-factor app.

## Table of Contents

- [Golden Raspberry API](#golden-raspberry-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Endpoints](#endpoints)
  - [API Documentation](#api-documentation)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)

## Features

- Read and validate a CSV file containing movie data
- Store validated movie data in an SQLite (H2) database
- ~~Provide endpoints to manage movie data (CRUD operations)~~
- Calculate producers with the maximum and minimum intervals between awards
- Detailed API documentation with Swagger

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rafaelgalle10/golden-raspberry-api.git
   cd golden-raspberry-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Ensure you have a CSV file named `movielist.csv` in the directory `./data/`.

4. Create .env:

   ```bash
   cp .env.example .env
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Start the tests:

   ```bash
   npm test
   ```

7. Run the linter:

   ```bash
   npm run lint
   ```
   
## Usage

### Endpoints

~~- **Get all movies**~~
  ~~- `GET /api/movies`~~
  ~~- Response: List of movies~~

~~- **Add a new movie**~~
  ~~- `POST /api/movies`~~
  ~~- Request Body: Movie object~~
  ~~- Response: Created movie object~~

~~- **Update a movie**~~
  ~~- `PUT /api/movies/:id`~~
  ~~- Request Body: Movie object~~
  ~~- Response: Updated movie object~~

~~- **Update a movie partially**~~
  ~~- `PATCH /api/movies/:id`~~
  ~~- Request Body: Partial movie object~~
  ~~- Response: Updated movie object~~

~~- **Delete a movie**~~
  ~~-`DELETE /api/movies/:id`~~
  ~~- Response: Success message~~

- **Get producers with award intervals**
  - `GET /api/producers/award-intervals`
  - Response: Producers with maximum and minimum intervals between awards

## API Documentation

The API documentation is available at `/api-docs` after starting the server. It provides detailed information about each endpoint, request/response formats, and sample data.

## Project Structure

```
golden-raspberry-api/
├── data/
│   ├── movielist.csv
├── src/
│   ├── controllers/
│   │   ├── movieController.ts
│   │   └── producerController.ts
│   ├── database/
│   │   └── connection.ts
│   ├── middlewares/
│   │   └── errorHandler.ts
│   ├── models/
│   │   └── movie.ts
│   ├── routes/
│   │   ├── movieRoutes.ts
│   │   └── producerRoutes.ts
│   ├── services/
│   │   └── movieService.ts
│   │   └── producerService.ts
│   ├── utils/
│   │   ├── csvParser.ts
│   │   ├── result.ts
│   │   └── error.ts
│   └── app.ts
│   ├── swagger.ts
├── tests/
│   ├── integration/
│   │   └── movieRoutes.test.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---
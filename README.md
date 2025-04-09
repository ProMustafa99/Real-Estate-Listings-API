# My Node.js Real Estate API

A simple Node.js backend API to manage real estate listings using Express.js.

##  Features

- RESTful API using Express
- Pagination, filtering (by city, price, type)
- Basic error handling
- Environment-based config with `.env`



## 📦 Installation and Run Server
  - install Node.js and npm 
  - npm install
  - npm run dev


## You may want to download these basic Packages
 - npm install typescript ts-node @types/node --save-dev
 - npx tsc --init
 - npm install sequelize mysql2
 - npm install --save-dev @types/sequelize
 - npm install class-validator class-transformer
 - npm install typedi reflect-metadata
 - npm install --save-dev tsc-alias


## .env file
Include a sample .env setup so users know what variables are required.

- PORT=3000
- DB_HOST=localhost
- DB_USER=root
- DB_PASS=yourpassword


## API Route 
 -  /realestate	        Get all real estate listings (with pagination)
 - /realestate	        Create a new real estate listing
 - /realestate/:id	    Update a real estate listing by ID
 - /realestate/:id	    Soft delete a real estate listing by ID

## Test API Use Postman
- GET       http://localhost:PORT/realestate OR   
- GET       http://localhost:PORT//realestate?cityId=1&typeId=2&minPrice=50000&maxPrice=200000
- POST      http://localhost:PORT/realestate 
- DELETE    http://localhost:PORT/realestate/1
- PATCH     http://localhost:PORT/realestate/1




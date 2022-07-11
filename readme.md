# Clipboard Employee REST API application

Welcome to the Clipboard Employees API, which is a Node.js server application written in Typescript. 

The API is programmed to the schema found in the schema/ directory. The schema was written on swaggerhub.com and 
exported as a yaml file.

The schema serves three main purposes:
1. Define the API and generate documentation (examples are in API Documentation)
2. Generate Typescript interfaces for the request and responses (see src/Api.js)
3. Validation requests and responses using express-openapi-validator

## Docker

To build and run the application in Docker run: 

`docker-compose up`

The docker image is based on the official node docker and is pushed to dockerhub. To build and
push an update:
```
docker build . -t kchapple/clipboard-employees-app
docker push kchapple/clipboard-employees-app
```

## Build
`npm run build`

## Run

*manually start app*

`npm run serve`

*start using nodemon for local development*

`npm run dev`

## Run the tests

The application uses Jest for unit testing and API testing. To run tests:

`npm run test`

## Code Generation

The application uses swagger-typescript-api or 'sta' to generate Api.ts which contains
typescript interfaces based on the open API schema. https://github.com/acacode/swagger-typescript-api

To re-generate the Api.ts file after changing the schema, run:

`npm run gen`

## API Documentation

API documentation and example requests are generated using the Open API schema.

The docs can be accessed on swaggerhub.com
https://app.swaggerhub.com/apis-docs/kchapple/Employees/1.0.0

The application also hosts its own generated documentation:
`http://[base-url]:8000/documentation/`

## Postman Collection

To demo the API, you can load the Postman Collection Clipboard.postman_collection.json
in the root of the project. This collection contains all routes that the API implements including
the authentication routes. You can load this collection and send the Auth request to get your 
token.

## Auth

The application utilizes Auth0 as the authentication provider. All endpoints are secured
by authentication middleware, except for the documentation endpoint. To authorize the API
you can use the below sample credentials:

Sample Auth Request: `https://dev-ekg7j3vm.us.auth0.com/oauth/token`

```
{
    "client_id":"vEzN4hxQMYUZBoOYhAlHP4FV11a5soUq",
    "client_secret":"oNILv23YIEw20LvjqvB53jP6T2j8PxlZf87jIYTzt28GDlhy4hOn37dJFIEtxBUD",
    "audience":"localhost:8000/",
    "grant_type":"password",
    "username": "ken.chapple@gmail.com",
    "password": "tnjp53aFdKeYp8g"
}
```

Sample Auth Response:
```
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJjYTMxZmJlMzhhMTE0ZDAxY2MwOWJhIiwiYXVkIjoibG9jYWxob3N0OjgwMDAvIiwiaWF0IjoxNjU3NDY4MjM5LCJleHAiOjE2NTc1NTQ2MzksImF6cCI6InZFek40aHhRTVlVWkJvT1loQWxIUDRGVjExYTVzb1VxIiwiZ3R5IjoicGFzc3dvcmQiLCJwZXJtaXNzaW9ucyI6W119.oAZOwRm__kRJ3WuMNtaWS7Jymn1oTaQ0INX3K-FdO7neOTYVOp2JCfHWFeu6EjojGiYVOi2931J594vupyFWonaHNnxyQTo6uzYgQfTyVg8QOtmloY0qI8osLiZrWT5IKmgFPtDmaSHztjgtEEq4wgnnfQib4ZYFiBrBsZYQsmH8IFc5wuHizOY9XQGhaM5oSTevFJHxzspi_wOnAvGFxp23-3HZwUWWmr3GtAYoenfqQhgbJtoIWnjHb0x72Gf9_OQrt0qOZlv8kMbrStjNjQpB692xyVUUWAYRnbJRU2FqcMuPn8OqmSz5y3NP27Sv9wV6k--nktIsZY23BfxrVA",
    "expires_in": 86400,
    "token_type": "Bearer"
}
```


# REST API

The REST API to the example app is described below.

## Auth

### Request

`https://dev-ekg7j3vm.us.auth0.com/oauth/token`
    
    curl --location --request POST 'https://dev-ekg7j3vm.us.auth0.com/oauth/token' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "client_id":"vEzN4hxQMYUZBoOYhAlHP4FV11a5soUq",
        "client_secret":"oNILv23YIEw20LvjqvB53jP6T2j8PxlZf87jIYTzt28GDlhy4hOn37dJFIEtxBUD",
        "audience":"localhost:8000/",
        "grant_type":"password",
        "username": "ken.chapple@gmail.com",
        "password": "tnjp53aFdKeYp8g"
    }'

### Response

    HTTP/1.1 200 OK

    {
        "access_token": "my-long-token-string",
        "expires_in": 86400,
        "token_type": "Bearer"
    }

## Get list of Things

### Request

`GET /employees/`

    curl --location --request GET 'localhost:8000/employees' \
    --header 'Authorization: Bearer my-long-token-string'

### Response

    HTTP/1.1 200 OK

    []

## Create a new Employee

### Request

`POST /employee/`

    curl --location --request POST 'localhost:8000/employee' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJjYTMxZmJlMzhhMTE0ZDAxY2MwOWJhIiwiYXVkIjoibG9jYWxob3N0OjgwMDAvIiwiaWF0IjoxNjU3NTAyMzk4LCJleHAiOjE2NTc1ODg3OTgsImF6cCI6InZFek40aHhRTVlVWkJvT1loQWxIUDRGVjExYTVzb1VxIiwiZ3R5IjoicGFzc3dvcmQiLCJwZXJtaXNzaW9ucyI6W119.kyr6nOLXSEk9XZklWVmRjphqBLnyEo3wDVcDeMC_oHiWUFGrK8Pbe95dDsWl5pJkkyyDJEgpHHkvul3EeynAky43WOne9ahUyNZupHtLBSE4PgDQeIYlyoMOSo4In1ehxIbrSIfV9yUiqF1sI4Be5HGalum0JFQbUAZ1dWOaO9I4dZIi3b8Q_Bgvde88JHQkDkSZglOUpnZV5pt1xUlm-vIzz8PRwidLK4AjUvxE6sN2Enk3JQayLsMptssfGbcIz9-BIt-wwLfCJLPg6dznwE28uHN_F_LwVqzZwgY3yrVCLBD2MVxfsOe7EUbt5pfx4Z_pIGe5psLMZ5_Xi-dJSQ' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Abhishek",
        "salary": "145000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
    }'

### Response

    HTTP/1.1 200 OK

    {
        "name":"Abhishek",
        "salary":"145000",
        "currency":"USD",
        "department":"Engineering",
        "sub_department":"Platform",
        "id":"1ed3b289-a7bf-4ecd-8698-e8f267c73ce1"
    }

## Try to create a new Employee with missing required data

### Request

`POST /employee/`

    curl --location --request POST 'localhost:8000/employee' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJjYTMxZmJlMzhhMTE0ZDAxY2MwOWJhIiwiYXVkIjoibG9jYWxob3N0OjgwMDAvIiwiaWF0IjoxNjU3NTAyMzk4LCJleHAiOjE2NTc1ODg3OTgsImF6cCI6InZFek40aHhRTVlVWkJvT1loQWxIUDRGVjExYTVzb1VxIiwiZ3R5IjoicGFzc3dvcmQiLCJwZXJtaXNzaW9ucyI6W119.kyr6nOLXSEk9XZklWVmRjphqBLnyEo3wDVcDeMC_oHiWUFGrK8Pbe95dDsWl5pJkkyyDJEgpHHkvul3EeynAky43WOne9ahUyNZupHtLBSE4PgDQeIYlyoMOSo4In1ehxIbrSIfV9yUiqF1sI4Be5HGalum0JFQbUAZ1dWOaO9I4dZIi3b8Q_Bgvde88JHQkDkSZglOUpnZV5pt1xUlm-vIzz8PRwidLK4AjUvxE6sN2Enk3JQayLsMptssfGbcIz9-BIt-wwLfCJLPg6dznwE28uHN_F_LwVqzZwgY3yrVCLBD2MVxfsOe7EUbt5pfx4Z_pIGe5psLMZ5_Xi-dJSQ' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "salary": "145000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
    }'

### Response

    HTTP/1.1 400 Bad Request

    {
        "status": 400,
        "message": "request.body should have required property 'name'"
    }

## Get a specific employee by ID

### Request

`GET /employee/{employeeId}`

    curl --location --request GET 'localhost:8000/employee/e84dd2ee-4fdb-4133-87f4-ecb63075c297' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiN2x4bFdJeXFPNUN1NG5NVGlTNkhwcmx0aHU1dGxMZmpAY2xpZW50cyIsImF1ZCI6ImxvY2FsaG9zdDo4MDAwLyIsImlhdCI6MTY1NzQxNzYxOCwiZXhwIjoxNjU3NTA0MDE4LCJhenAiOiI3bHhsV0l5cU81Q3U0bk1UaVM2SHBybHRodTV0bExmaiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.EjylCKYDjEzP8U94Jh8RVGreaiFdaHmmrs571PUGb33BQ2W661R43-09QjTiygA0nNBSBwsowJPH6Y5cruXr631T9oNCtAlzGXjhezEqdZxjsY3mm6YL49KYWCjbPVoThGVYotYlKsyJxFqwD1zqoiBKbkYZa8CEcy25jyC4mIc8WyxZTilWKxOLF2xf76BhpLTwqQeMFemJ58BNluXcWCzWyWxSl1RJERzpTGc8LRoL-M_oZxyf8I0h0ZDWwGWX_J68Pq_RDK5IlcKvb_swFmkPibohhw-bTQXSwS6eujD-n2R4uJKWHmmEZtf2gTZP3Fl-txS5UNHXLENpPZRXgg' \
    --header 'Cookie: _auth_verification=%7B%22nonce%22%3A%223CFDFMdyhP0EdIv_lY60BmRcsi1jgJb-arSoEyQnJa0%22%2C%22state%22%3A%22eyJyZXR1cm5UbyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9%22%7D.CI_2R5IAr_I-Djw3XM2-5MP2KboUIASJYnKbo14oNGU'

### Response

    HTTP/1.1 200 OK

    {
        "name": "Abhishek",
        "salary": "145000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform",
        "id": "e84dd2ee-4fdb-4133-87f4-ecb63075c297"
    }

## Get a non-existent employee

### Request

`GET /employee/{employeeId}`

    curl --location --request GET 'localhost:8000/employee/e84dd2ee-4fdb-4133-87f4-ecb63075c299' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiN2x4bFdJeXFPNUN1NG5NVGlTNkhwcmx0aHU1dGxMZmpAY2xpZW50cyIsImF1ZCI6ImxvY2FsaG9zdDo4MDAwLyIsImlhdCI6MTY1NzQxNzYxOCwiZXhwIjoxNjU3NTA0MDE4LCJhenAiOiI3bHhsV0l5cU81Q3U0bk1UaVM2SHBybHRodTV0bExmaiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.EjylCKYDjEzP8U94Jh8RVGreaiFdaHmmrs571PUGb33BQ2W661R43-09QjTiygA0nNBSBwsowJPH6Y5cruXr631T9oNCtAlzGXjhezEqdZxjsY3mm6YL49KYWCjbPVoThGVYotYlKsyJxFqwD1zqoiBKbkYZa8CEcy25jyC4mIc8WyxZTilWKxOLF2xf76BhpLTwqQeMFemJ58BNluXcWCzWyWxSl1RJERzpTGc8LRoL-M_oZxyf8I0h0ZDWwGWX_J68Pq_RDK5IlcKvb_swFmkPibohhw-bTQXSwS6eujD-n2R4uJKWHmmEZtf2gTZP3Fl-txS5UNHXLENpPZRXgg' \
    --header 'Cookie: _auth_verification=%7B%22nonce%22%3A%223CFDFMdyhP0EdIv_lY60BmRcsi1jgJb-arSoEyQnJa0%22%2C%22state%22%3A%22eyJyZXR1cm5UbyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9%22%7D.CI_2R5IAr_I-Djw3XM2-5MP2KboUIASJYnKbo14oNGU'

### Response

    HTTP/1.1 400 Bad Request

    {
        "status": 400,
        "message": "State Error: Employee not found"
    }

## Delete an employee

### Request

`DELETE /employee/{employeeId}`

    curl --location --request DELETE 'localhost:8000/employee/e84dd2ee-4fdb-4133-87f4-ecb63075c297' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiN2x4bFdJeXFPNUN1NG5NVGlTNkhwcmx0aHU1dGxMZmpAY2xpZW50cyIsImF1ZCI6ImxvY2FsaG9zdDo4MDAwLyIsImlhdCI6MTY1NzQxNzYxOCwiZXhwIjoxNjU3NTA0MDE4LCJhenAiOiI3bHhsV0l5cU81Q3U0bk1UaVM2SHBybHRodTV0bExmaiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.EjylCKYDjEzP8U94Jh8RVGreaiFdaHmmrs571PUGb33BQ2W661R43-09QjTiygA0nNBSBwsowJPH6Y5cruXr631T9oNCtAlzGXjhezEqdZxjsY3mm6YL49KYWCjbPVoThGVYotYlKsyJxFqwD1zqoiBKbkYZa8CEcy25jyC4mIc8WyxZTilWKxOLF2xf76BhpLTwqQeMFemJ58BNluXcWCzWyWxSl1RJERzpTGc8LRoL-M_oZxyf8I0h0ZDWwGWX_J68Pq_RDK5IlcKvb_swFmkPibohhw-bTQXSwS6eujD-n2R4uJKWHmmEZtf2gTZP3Fl-txS5UNHXLENpPZRXgg' \
    --header 'Cookie: _auth_verification=%7B%22nonce%22%3A%223CFDFMdyhP0EdIv_lY60BmRcsi1jgJb-arSoEyQnJa0%22%2C%22state%22%3A%22eyJyZXR1cm5UbyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9%22%7D.CI_2R5IAr_I-Djw3XM2-5MP2KboUIASJYnKbo14oNGU' \
    --data-raw ''

### Response

    HTTP/1.1 200 OK

    e84dd2ee-4fdb-4133-87f4-ecb63075c297

## Get summary statistics across all employees

### Request

`GET /statistics/summary/`

    curl --location --request GET 'localhost:8000/statistics/summary' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiN2x4bFdJeXFPNUN1NG5NVGlTNkhwcmx0aHU1dGxMZmpAY2xpZW50cyIsImF1ZCI6ImxvY2FsaG9zdDo4MDAwLyIsImlhdCI6MTY1NzQxNzYxOCwiZXhwIjoxNjU3NTA0MDE4LCJhenAiOiI3bHhsV0l5cU81Q3U0bk1UaVM2SHBybHRodTV0bExmaiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.EjylCKYDjEzP8U94Jh8RVGreaiFdaHmmrs571PUGb33BQ2W661R43-09QjTiygA0nNBSBwsowJPH6Y5cruXr631T9oNCtAlzGXjhezEqdZxjsY3mm6YL49KYWCjbPVoThGVYotYlKsyJxFqwD1zqoiBKbkYZa8CEcy25jyC4mIc8WyxZTilWKxOLF2xf76BhpLTwqQeMFemJ58BNluXcWCzWyWxSl1RJERzpTGc8LRoL-M_oZxyf8I0h0ZDWwGWX_J68Pq_RDK5IlcKvb_swFmkPibohhw-bTQXSwS6eujD-n2R4uJKWHmmEZtf2gTZP3Fl-txS5UNHXLENpPZRXgg' \
    --header 'Cookie: _auth_verification=%7B%22nonce%22%3A%223CFDFMdyhP0EdIv_lY60BmRcsi1jgJb-arSoEyQnJa0%22%2C%22state%22%3A%22eyJyZXR1cm5UbyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9%22%7D.CI_2R5IAr_I-Djw3XM2-5MP2KboUIASJYnKbo14oNGU'

### Response

    HTTP/1.1 200 OK

    {
        "mean": 145000,
        "min": 145000,
        "max": 145000
    }

## Get summary statistics with no employees in system

### Request

`GET /statistics/summary/`

    curl --location --request GET 'localhost:8000/statistics/summary' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiN2x4bFdJeXFPNUN1NG5NVGlTNkhwcmx0aHU1dGxMZmpAY2xpZW50cyIsImF1ZCI6ImxvY2FsaG9zdDo4MDAwLyIsImlhdCI6MTY1NzQxNzYxOCwiZXhwIjoxNjU3NTA0MDE4LCJhenAiOiI3bHhsV0l5cU81Q3U0bk1UaVM2SHBybHRodTV0bExmaiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.EjylCKYDjEzP8U94Jh8RVGreaiFdaHmmrs571PUGb33BQ2W661R43-09QjTiygA0nNBSBwsowJPH6Y5cruXr631T9oNCtAlzGXjhezEqdZxjsY3mm6YL49KYWCjbPVoThGVYotYlKsyJxFqwD1zqoiBKbkYZa8CEcy25jyC4mIc8WyxZTilWKxOLF2xf76BhpLTwqQeMFemJ58BNluXcWCzWyWxSl1RJERzpTGc8LRoL-M_oZxyf8I0h0ZDWwGWX_J68Pq_RDK5IlcKvb_swFmkPibohhw-bTQXSwS6eujD-n2R4uJKWHmmEZtf2gTZP3Fl-txS5UNHXLENpPZRXgg' \
    --header 'Cookie: _auth_verification=%7B%22nonce%22%3A%223CFDFMdyhP0EdIv_lY60BmRcsi1jgJb-arSoEyQnJa0%22%2C%22state%22%3A%22eyJyZXR1cm5UbyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9%22%7D.CI_2R5IAr_I-Djw3XM2-5MP2KboUIASJYnKbo14oNGU'

### Response

    HTTP/1.1 400 Bad Request
````
    {
        "status": 400,
        "message": "Calculator Error: No employees found to calculate summary"
    }

## Get summary statistics for on-contract employees

### Request

`GET /statistics/summaryForOnContract`

    curl --location --request GET 'localhost:8000/statistics/summaryForOnContract' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiN2x4bFdJeXFPNUN1NG5NVGlTNkhwcmx0aHU1dGxMZmpAY2xpZW50cyIsImF1ZCI6ImxvY2FsaG9zdDo4MDAwLyIsImlhdCI6MTY1NzQxNzYxOCwiZXhwIjoxNjU3NTA0MDE4LCJhenAiOiI3bHhsV0l5cU81Q3U0bk1UaVM2SHBybHRodTV0bExmaiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.EjylCKYDjEzP8U94Jh8RVGreaiFdaHmmrs571PUGb33BQ2W661R43-09QjTiygA0nNBSBwsowJPH6Y5cruXr631T9oNCtAlzGXjhezEqdZxjsY3mm6YL49KYWCjbPVoThGVYotYlKsyJxFqwD1zqoiBKbkYZa8CEcy25jyC4mIc8WyxZTilWKxOLF2xf76BhpLTwqQeMFemJ58BNluXcWCzWyWxSl1RJERzpTGc8LRoL-M_oZxyf8I0h0ZDWwGWX_J68Pq_RDK5IlcKvb_swFmkPibohhw-bTQXSwS6eujD-n2R4uJKWHmmEZtf2gTZP3Fl-txS5UNHXLENpPZRXgg' \
    --header 'Cookie: _auth_verification=%7B%22nonce%22%3A%223CFDFMdyhP0EdIv_lY60BmRcsi1jgJb-arSoEyQnJa0%22%2C%22state%22%3A%22eyJyZXR1cm5UbyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9%22%7D.CI_2R5IAr_I-Djw3XM2-5MP2KboUIASJYnKbo14oNGU'

### Response

    HTTP/1.1 200 OK

    {
        "mean": 85000,
        "min": 80000,
        "max": 90000
    }

## Get summary statistics across departments

### Request

`GET /statistics/summaryForDepartments`

    curl --location --request GET 'localhost:8000/statistics/summaryForDepartments' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiN2x4bFdJeXFPNUN1NG5NVGlTNkhwcmx0aHU1dGxMZmpAY2xpZW50cyIsImF1ZCI6ImxvY2FsaG9zdDo4MDAwLyIsImlhdCI6MTY1NzQxNzYxOCwiZXhwIjoxNjU3NTA0MDE4LCJhenAiOiI3bHhsV0l5cU81Q3U0bk1UaVM2SHBybHRodTV0bExmaiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.EjylCKYDjEzP8U94Jh8RVGreaiFdaHmmrs571PUGb33BQ2W661R43-09QjTiygA0nNBSBwsowJPH6Y5cruXr631T9oNCtAlzGXjhezEqdZxjsY3mm6YL49KYWCjbPVoThGVYotYlKsyJxFqwD1zqoiBKbkYZa8CEcy25jyC4mIc8WyxZTilWKxOLF2xf76BhpLTwqQeMFemJ58BNluXcWCzWyWxSl1RJERzpTGc8LRoL-M_oZxyf8I0h0ZDWwGWX_J68Pq_RDK5IlcKvb_swFmkPibohhw-bTQXSwS6eujD-n2R4uJKWHmmEZtf2gTZP3Fl-txS5UNHXLENpPZRXgg' \
    --header 'Cookie: _auth_verification=%7B%22nonce%22%3A%223CFDFMdyhP0EdIv_lY60BmRcsi1jgJb-arSoEyQnJa0%22%2C%22state%22%3A%22eyJyZXR1cm5UbyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9%22%7D.CI_2R5IAr_I-Djw3XM2-5MP2KboUIASJYnKbo14oNGU'

### Response

    HTTP/1.1 200 OK

    {
        "Banking": {
            "mean": 90000,
            "min": 90000,
            "max": 90000
        },
        "Engineering": {
            "mean": 145000,
            "min": 145000,
            "max": 145000
        }
    }

## Get summary statistics across departments and sub-department combinations

### Request

`GET /statistics/summaryForCombinations`

    curl --location --request GET 'localhost:8000/statistics/summaryForCombinations' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFaNlJ2Rmg2Q2hNZlJtSFRxUzJhbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1la2c3ajN2bS51cy5hdXRoMC5jb20vIiwic3ViIjoiN2x4bFdJeXFPNUN1NG5NVGlTNkhwcmx0aHU1dGxMZmpAY2xpZW50cyIsImF1ZCI6ImxvY2FsaG9zdDo4MDAwLyIsImlhdCI6MTY1NzQxNzYxOCwiZXhwIjoxNjU3NTA0MDE4LCJhenAiOiI3bHhsV0l5cU81Q3U0bk1UaVM2SHBybHRodTV0bExmaiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.EjylCKYDjEzP8U94Jh8RVGreaiFdaHmmrs571PUGb33BQ2W661R43-09QjTiygA0nNBSBwsowJPH6Y5cruXr631T9oNCtAlzGXjhezEqdZxjsY3mm6YL49KYWCjbPVoThGVYotYlKsyJxFqwD1zqoiBKbkYZa8CEcy25jyC4mIc8WyxZTilWKxOLF2xf76BhpLTwqQeMFemJ58BNluXcWCzWyWxSl1RJERzpTGc8LRoL-M_oZxyf8I0h0ZDWwGWX_J68Pq_RDK5IlcKvb_swFmkPibohhw-bTQXSwS6eujD-n2R4uJKWHmmEZtf2gTZP3Fl-txS5UNHXLENpPZRXgg' \
    --header 'Cookie: _auth_verification=%7B%22nonce%22%3A%223CFDFMdyhP0EdIv_lY60BmRcsi1jgJb-arSoEyQnJa0%22%2C%22state%22%3A%22eyJyZXR1cm5UbyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9%22%7D.CI_2R5IAr_I-Djw3XM2-5MP2KboUIASJYnKbo14oNGU'
### Response

    HTTP/1.1 200 OK

    {
        "Banking": {
            "Loan": {
                "mean": 90000,
                "min": 90000,
                "max": 90000
            }
        },
        "Engineering": {
            "Platform": {
                "mean": 145000,
                "min": 145000,
                "max": 145000
            },
            "API": {
                "mean": 160000,
                "min": 160000,
                "max": 160000
            }
        }
    }


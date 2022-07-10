Welcome to the Clipboard Employees API, which is a Node.js server application written in Typescript. 

The API is programmed to the schema found in the schema/ directory. The schema was written on swaggerhub.com and 
exported as a yaml file.

The schema serves three main purposes:
1. Define the API and generate documentation (examples are in API Documentation)
2. Generate Typescript interfaces for the request and responses (see src/Api.js)
3. Validation requests and responses using express-openapi-validator

**Installation**

*Docker*

`docker compose up`

*manual start*

`npm run serve`

*nodemon for local development*

`npm run dev`

**API Documentation**

API documentation and example requests are generated using the Open API schema.

The docs can be accessed on swaggerhub.com
https://app.swaggerhub.com/apis-docs/kchapple/Employees/1.0.0

The application also hosts its own generated documentation:
`http://[base-url]:8000/documentation/`

**Postman Collection**

To demo the API, you can load the Postman Collection Clipboard.postman_collection.json
in the root of the project. This collection contains all routes that the API implements including
the authentication routes. You can load this collection and send the Auth request to get your 
token.

**Auth**

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

**Tests**

The application uses Jest for unit testing and API testing. To run tests:

`npm run test`

**Code Generation**

The application uses swagger-typescript-api or 'sta' to generate Api.ts which contains
typescript interfaces based on the open API schema. https://github.com/acacode/swagger-typescript-api

To re-generate the Api.ts file after changing the schema, run:

`npm run gen`

**Docker Image**

The docker image is based on the official node docker and is pushed to dockerhub. To build and
push an update:
```
docker build . -t kchapple/clipboard-employees-app
docker push kchapple/clipboard-employees-app
```

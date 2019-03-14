# 3scale-keycloak
NodeJS app to test integration with 3scale and Keycloak

# API

## /api/public [GET]
Unprotected endpoint.


## /api/protected [GET]
Protected endpoint. Requires valid access token.

If successful you should see in the log

GET /api/protected
Authorization: Bearer eyJhbGciO


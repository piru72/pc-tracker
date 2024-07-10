export const HTTP_STATUS_CODE = {
    // Successful responses
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    // Client error responses

    BAD_REQUEST: 400,       // The server cannot or will not process the request due to an apparent client error 
    UNAUTHORIZED: 401,      // The request has not been applied because it lacks valid authentication credentials for the target resource.
    FORBIDDEN: 403,         // The server understood the request, but is refusing to fulfill it.
    NOT_FOUND: 404,         // The server has not found anything matching the Request-URI.
    VALIDATION_ENITY: 422,  // The request was well-formed but was unable to be followed due to validation errors.
    TOO_MANY_REQUESTS: 429, // The user has sent too many requests in a given amount of time ("rate limiting").

    // Server error responses
    INTERNAL_SERVER_ERROR: 500, // The server encountered an unexpected condition that prevented it from fulfilling the request.
    NOT_IMPLEMENTED: 501,       // The server does not support the functionality required to fulfill the request.
    BAD_GATEWAY: 502,           // The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.
    SERVICE_UNAVAILABLE: 503,   // The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.
    GATEWAY_TIMEOUT: 504,       // The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI.
}

export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
}
const { expressjwt } = require('express-jwt'); // Correct import for v6+

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    if (!secret || !api) {
        throw new Error("Environment variables 'secret' or 'API_URL' are not defined.");
    }

    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    });
}

function isRevoked(req, payload) {
    return new Promise((resolve, reject) => {
        if (!payload.isAdmin) {
            return resolve(true); // Reject token if user is not an admin
        }
        resolve(false); // Accept token if the user is admin
    });
}



module.exports = authJwt;

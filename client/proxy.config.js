  
const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/users",
            "/login",
            "/logout"
        ],
        target: "http://localhost:5000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
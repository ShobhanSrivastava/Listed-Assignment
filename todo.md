- [x] Directory Setup
    - [x] Initialise git
    - [x] Create required folders
        - /config
        - /middlewares
        - /routes
        - /logger
    - [x] Create .env file with PORT and NODE_ENV
- [x] Server setup
    - [x] Create server.js with basic express server setup
    - [x] Enable cors
    - [x] Create envConfig.js in /config to export all the environment variables from single file
    - [x] Implement logger for development environment (only for console)
- [x] Cloud Console
    - [x] Create new project
    - [x] Enable Gmail API
    - [x] Setup Consent Screen
        - [x] Scopes
            - userinfo.email
            - userinfo.profile
            - gmail.labels
            - gmail.modify
    - [x] Create Credential
        - OAuth Client Credential
        - Redirect URL: http://localhost:[PORT]/auth/google/callback
- [x] Create Models
     - [x] User model for token management and persisting the tokens in the DB in case of server crash, we can use the tokens in the DB
- [x] Config
    - [x] env config file to pass env variables into the application
    - [x] passport initialisation file
    - [x] DB connection and configuration file
- [x] Routes
    - [x] /auth router -> '/auth' prefix
         - [x] /login
         - [x] /google
         - [x] /google/callback
         - [x] /logout
         - [x] /success
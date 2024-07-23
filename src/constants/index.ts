export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
export const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

export const AUTH_URL = 'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=9cd36ef6-5d27-40fb-87ba-7a1d8d4e6ac0&response_type=code&redirect_uri=http://localhost:5173&response_mode=query&scope=https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=auth&prompt=login'
export const GRANT_TYPE = 'authorization_code';
export const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
export const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
export const GITHUB_REDIRECT_URI = process.env.REACT_APP_GITHUB_REDIRECT_URI;
export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;

export const JWT_KEY = 'JWT';
export const USERID_KEY = 'userId';

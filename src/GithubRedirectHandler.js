import axios from 'axios';
import { useEffect } from 'react';

export default function GithubRedirectHandler() {
  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get('code');
    const GITHUB_CLIENT_ID = '92cca3b5a2142e0aa021';
    const GITHUB_REDIRECT_URI = 'http://localhost:3000/oauth/callback/github';
    const GITHUB_CLIENT_SECRET = '7aaa4c57d8ccabcf8a4aa75ce63fbe7a5f56cfca';

    console.log(CODE);

    async function loginFetch() {
      const res = await axios.post('http://localhost:4000/user/githublogin');
      console.log(res.data);
      // const location = new URL(window.location.href);
      // const code = location.searchParams.get('code');
      // const ACCESS_TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`;

      // const res = await fetch(ACCESS_TOKEN_URL, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json',
      //   },
      // });

      // const data = await res.json();

      // const tokenResponse = await fetch(
      //   `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${CODE}`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Length': '0',
      //       Host: '<calculated when request is sent>',
      //       'User-Agent': 'PostmanRuntime/7.31.3',
      //       Accept: '*/*',
      //       'Accept-Encoding': 'gzip, deflate, br',
      //       Connection: 'keep-alive',
      //       'Content-type': 'application/json',
      //       Authorization:
      //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpAaiIsInN1YiI6NTY2NywiaWF0IjoxNjgwNDExMDEwLCJleHAiOjE2ODEwMTU4MTB9.8RrqygPhpmk81B-F3PIKR7vILK4oFXtoaeNX1VvT_DU',
      //     },
      //   },
      // );

      // const data = tokenResponse.json();
      // console.log(data);
    }

    loginFetch();
  });
}

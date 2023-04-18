import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading';

export default function GithubRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get('code');

    console.log(CODE);

    const codeObj = {
      code: CODE,
    };

    async function loginFetch() {
      const fetchRes = await axios.post(
        'http://localhost:4000/user/githublogin/fetch',
        codeObj,
      );

      const githubData = fetchRes.data;

      const userLoginInfo = {
        userId: githubData.login,
        password: 'github',
        profileImg: githubData.avatar_url,
        email: githubData.email,
        githubAddress: `https://github.com/${githubData.login}`,
        userName: githubData.name,
      };

      const loginRes = await axios.post(
        'http://localhost:4000/user/githublogin',
        userLoginInfo,
      );

      if (loginRes.status === 201) {
        localStorage.setItem('JWT', loginRes.data.token);
        localStorage.setItem('userId', userLoginInfo.userId);
        navigate('/information');
        window.location.reload();
      } else if (loginRes.status === 200) {
        localStorage.setItem('JWT', loginRes.data.token);
        localStorage.setItem('userId', userLoginInfo.userId);
        navigate('/');
        window.location.reload();
      } else {
        alert('회원 등록 이상');
        navigate('/signin');
      }
    }

    loginFetch();
  });

  return <Loading />;
}

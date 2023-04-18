import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get('code');
    const GRANT_TYPE = 'authorization_code';
    const KAKAO_CLIENT_ID = '8b9d9e6f2ac1ce6697298e70eb30186c';
    const KAKAO_REDIRECT_URI = 'http://3.34.52.131:3000/oauth/callback/kakao';

    async function loginFetch() {
      const tokenResponse = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${CODE}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      if (tokenResponse.status === 200) {
        const tokenData = await tokenResponse.json();
        const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        });

        if (userResponese.status === 200) {
          const userKaKaoInfo = await userResponese.json();

          console.log('2 userKaKaoInfo', userKaKaoInfo);

          const userLoginInfo = {
            userId: userKaKaoInfo.id.toString(),
            password: 'kakao',
            profileImg: userKaKaoInfo.kakao_account.profile.profile_image_url,
          };

          const registerResponse = await axios.post(
            `http://localhost:4000/user/kakaologin`,
            userLoginInfo,
          );

          if (registerResponse.status === 201) {
            localStorage.setItem('JWT', registerResponse.data.token);
            localStorage.setItem('userId', userKaKaoInfo.id);
            navigate('/information');
            window.location.reload();
          } else if (registerResponse.status === 200) {
            localStorage.setItem('JWT', registerResponse.data.token);
            localStorage.setItem('userId', userKaKaoInfo.id);
            navigate('/');
            window.location.reload();
          } else {
            alert('회원 등록 이상');
            navigate('/signin');
          }
        } else {
          alert('카카오 로그인 회원 정보 획득 실패');
          navigate('/signin');
        }
      } else {
        alert('카카오 로그인 토큰 발행 실패');
        navigate('/signin');
      }
    }
    loginFetch();
  }, []);

  return <Loading />;
};

export default KakaoRedirectHandler;

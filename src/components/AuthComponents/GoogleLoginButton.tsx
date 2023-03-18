import { GoogleUser, useGoogleUser } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function GoogleLoginButton() {
  const { setUser } = useGoogleUser();

  function loginHandler(response: any) {
    // console.log(response);
    const userObject: GoogleUser = jwt_decode(response.credential);
    // console.log(userObject);
    setUser(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    console.log(userObject.name, 'Login!');
  }

  return (
    <div className='google-login'>
      <GoogleLogin
        onSuccess={(response) => {
          loginHandler(response);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        size='large'
        auto_select={false}
      />
    </div>
  );
}

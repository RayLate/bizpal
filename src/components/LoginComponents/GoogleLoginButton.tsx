import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

interface GoogleUser {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export default function GoogleLoginButton() {
  function loginHandler(response: any) {
    // console.log(response);
    const userObject: GoogleUser = jwt_decode(response.credential);
    // console.log(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    const { name, sub, picture, email } = userObject;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
      email: email,
    };
    console.log(doc);
  }

  return (
    <>
      <GoogleLogin
        onSuccess={(response) => {
          loginHandler(response);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  );
}

import { useGoogleUser } from '@/context/AuthContext';

export default function GoogleLogoutButton() {
  const { user, setUser } = useGoogleUser();
  function logoutHandler() {
    if (user) {
      console.log(user.name, 'Logged out!');
      setUser(null);
      localStorage.removeItem('user');
    }
  }
  return (
    <>
      <button type='button' onClick={logoutHandler}>
        Logout
      </button>
    </>
  );
}

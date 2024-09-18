
import { logoutUser } from './logout';

const LogoutButton = () => {
  return (
    <button onClick={logoutUser}>Logout</button>
  );
};

export default LogoutButton;

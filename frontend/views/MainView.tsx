import {useAuth} from "Frontend/useAuth.js";
import {Button} from "@hilla/react-components/Button.js";
import {useNavigate} from "react-router-dom";

export function MainView() {
  const {user, logout} = useAuth();


  return (
    <div className="m-m">
      {user && <div>
          <p>You are logged in as {user.name} ({user.email})</p>
          <img src={user.profilePictureUrl} alt={user.name} referrerPolicy="no-referrer"/>
      </div>}
      <p>
        <Button onClick={() => logout()}>Log out</Button>
      </p>
    </div>
  )
}
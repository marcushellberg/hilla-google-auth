import {useEffect, useState} from "react";
import {UserEndpoint} from "Frontend/generated/endpoints";
import UserDetails from "Frontend/generated/com/example/application/security/UserDetails.js";
import {useAuth} from "Frontend/useAuth.js";
import {Button} from "@hilla/react-components/Button.js";
import {useNavigate} from "react-router-dom";

export function MainView() {
  const navigate = useNavigate();
  const {authenticatedUser, logout} = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="m-m">
      <h1>Main view</h1>

      {authenticatedUser && <div>
          <p>You are logged in as {authenticatedUser.name} ({authenticatedUser.email})</p>
          <img src={authenticatedUser.profilePictureUrl} alt={authenticatedUser.name} referrerPolicy="no-referrer"/>
      </div>}
      <p>
        <Button onClick={handleLogout}>Log out</Button>
      </p>
    </div>
  )
}
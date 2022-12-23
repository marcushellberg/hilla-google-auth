package com.example.application.endpoints;

import com.example.application.security.UserDetails;
import com.example.application.security.UserService;
import dev.hilla.Endpoint;

import javax.annotation.security.PermitAll;
import java.util.Optional;

@Endpoint
@PermitAll
public class UserEndpoint {
    private final UserService userService;

    public UserEndpoint(UserService userDetailsService) {
        this.userService = userDetailsService;
    }

    public boolean isAuthenticated() {
        return userService.isAuthenticated();
    }

    public Optional<UserDetails> getAuthenticatedUser() {
        return userService.getCurrentUserDetails();
    }
}

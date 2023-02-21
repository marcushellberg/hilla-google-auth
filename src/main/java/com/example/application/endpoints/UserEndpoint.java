package com.example.application.endpoints;

import com.vaadin.flow.spring.security.AuthenticationContext;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import java.util.Optional;

@Endpoint
@PermitAll
public class UserEndpoint {

    private final AuthenticationContext authContext;

    public UserEndpoint(AuthenticationContext authContext) {
        this.authContext = authContext;
    }

    public Optional<UserDetails> getAuthenticatedUser() {
        return authContext.getAuthenticatedUser(OidcUser.class)
                .map(u -> new UserDetails(
                        u.getEmail(),
                        u.getFullName(),
                        u.getPicture()
                ));
    }
}

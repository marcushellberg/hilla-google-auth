package com.example.application.endpoints;

import com.vaadin.flow.spring.security.AuthenticationContext;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import java.util.Optional;

@Endpoint
@PermitAll
public class UserEndpoint {

    private final AuthenticationContext authenticationContext;

    public UserEndpoint(AuthenticationContext authenticationContext) {
        this.authenticationContext = authenticationContext;
    }

    public Optional<UserDetails> getAuthenticatedUser() {
        return authenticationContext.getAuthenticatedUser(OidcUser.class)
                .map(u -> new UserDetails(
                        u.getEmail(),
                        u.getFullName(),
                        u.getPicture()
                ));
    }
}

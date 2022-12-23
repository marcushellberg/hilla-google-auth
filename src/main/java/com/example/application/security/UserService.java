package com.example.application.security;

import com.vaadin.flow.spring.security.AuthenticationContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final AuthenticationContext authenticationContext;

    public UserService(AuthenticationContext authenticationContext) {
        this.authenticationContext = authenticationContext;
    }

    public boolean isAuthenticated() {
        return authenticationContext.isAuthenticated();
    }


    public Optional<UserDetails> getCurrentUserDetails() {
        return Optional.of(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .map(Authentication::getPrincipal).map(p -> (OidcUser) p)
                .map(u -> new UserDetails(u.getEmail(), u.getFullName(), u.getPicture()));
    }
}

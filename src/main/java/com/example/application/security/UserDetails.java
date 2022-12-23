package com.example.application.security;

public record UserDetails(
        String email,
        String name,
        String profilePictureUrl
) {
}

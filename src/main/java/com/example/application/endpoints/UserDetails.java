package com.example.application.endpoints;

public record UserDetails(
        String email,
        String name,
        String profilePictureUrl
) {
}

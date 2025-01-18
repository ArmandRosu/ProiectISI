package com.example.login_server.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final String secretKey = "oD0okyk23k7n24dhYQvdsc0jFVdYH5rjFG9DDfN0E/E="; // Înlocuiește cu cheia ta secretă din application.properties

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                // Parsează token-ul JWT pentru a obține informațiile
                Claims claims = Jwts.parser()
                        .setSigningKey(secretKey.getBytes()) // Asigură-te că cheia este în format corect
                        .parseClaimsJws(token)
                        .getBody();

                // Adaugă informațiile token-ului în cererea curentă
                request.setAttribute("claims", claims);
            } catch (Exception e) {
                // Token invalid
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                return;
            }
        }

        // Continuă procesarea cererii
        filterChain.doFilter(request, response);
    }
}

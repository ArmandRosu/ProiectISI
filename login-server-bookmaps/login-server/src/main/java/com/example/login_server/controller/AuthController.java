package com.example.login_server.controller;

import com.example.login_server.model.User;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.Base64;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${jwt.secret}")
    private String secretKey;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            // Găsește utilizatorul în Firebase Authentication
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(user.getEmail());

            // Verifică parola (opțional, în funcție de metoda de autentificare configurată)
            if (verifyPassword(user.getEmail(), user.getPassword())) {
                // Creează token-ul JWT
                String jwtToken = generateJwtToken(userRecord.getUid());
                return ResponseEntity.ok(Collections.singletonMap("token", jwtToken));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials: " + e.getMessage());
        }
    }

    private boolean verifyPassword(String email, String password) {
        String firebaseApiKey = "\n" +
                "AIzaSyCzy47Pw9Nw9PlVOz789e1Z6gs17shJ76A"; // Înlocuiește cu cheia ta API Firebase
        String url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + firebaseApiKey;

        RestTemplate restTemplate = new RestTemplate();

        // Creează payload-ul cererii
        Map<String, Object> payload = new HashMap<>();
        payload.put("email", email);
        payload.put("password", password);
        payload.put("returnSecureToken", true);

        try {
            // Trimite cererea POST
            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    new HttpEntity<>(payload),
                    Map.class
            );

            // Dacă cererea este reușită, returnăm true
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            System.err.println("Eroare la verificarea parolei: " + e.getMessage());
            return false; // Returnăm false dacă parola este invalidă sau utilizatorul nu există
        }
    }

    private String generateJwtToken(String userId) {
        // Decodifică cheia secretă în format Base64
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);

        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Valabil 24 ore
                .signWith(SignatureAlgorithm.HS256, decodedKey) // Utilizează cheia decodificată
                .compact();
    }

//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        try {
//            // Creează un utilizator în Firebase Authentication
//            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
//                    .setEmail(user.getEmail())
//                    .setPassword(user.getPassword());
//
//            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
//
//            // Salvează utilizatorul în Realtime Database
//            DatabaseReference database = FirebaseDatabase.getInstance().getReference("users");
//            Map<String, String> userData = new HashMap<>();
//            userData.put("email", user.getEmail());
//            userData.put("uid", userRecord.getUid());
//            database.child(userRecord.getUid()).setValueAsync(userData);
//
//            return ResponseEntity.ok("User registered successfully with UID: " + userRecord.getUid());
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user: " + e.getMessage());
//        }
//    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(user.getEmail())
                    .setPassword(user.getPassword());

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "uid", userRecord.getUid()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error creating user: " + e.getMessage()));
        }
    }
}

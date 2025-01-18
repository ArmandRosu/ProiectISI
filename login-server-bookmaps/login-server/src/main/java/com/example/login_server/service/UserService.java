package com.example.login_server.service;

import com.example.login_server.model.User;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final DatabaseReference databaseReference;

    public UserService() {
        this.databaseReference = FirebaseDatabase.getInstance().getReference();
    }

    public String registerUser(String email, String password) {
        // Creează utilizatorul în Firebase Authentication
        try {
            com.google.firebase.auth.FirebaseAuth.getInstance().createUser(
                    new com.google.firebase.auth.UserRecord.CreateRequest()
                            .setEmail(email)
                            .setPassword(password)
            );
            return "User registered successfully!";
        } catch (com.google.firebase.auth.FirebaseAuthException e) {
            return "Error registering user: " + e.getMessage();
        }
    }

    public void saveUserToDatabase(User user) {
        // Salvează utilizatorul în Realtime Database sub nodul "users"
        String userId = databaseReference.push().getKey();
        if (userId != null) {
            databaseReference.child("users").child(userId).setValueAsync(user);
        }
    }
}

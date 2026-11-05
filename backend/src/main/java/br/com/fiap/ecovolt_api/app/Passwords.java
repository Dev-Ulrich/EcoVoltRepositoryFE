package br.com.fiap.ecovolt_api.app;

import java.security.*;
import java.util.*;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public final class Passwords {
    private static final SecureRandom RANDOM = new SecureRandom();
    private Passwords() {}
    public static String token() {
        byte[] bytes = new byte[32]; RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
    public static String digest(String text) {
        try { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(text.getBytes(java.nio.charset.StandardCharsets.UTF_8))); }
        catch (GeneralSecurityException e) { throw new IllegalStateException(e); }
    }
    public static String hash(String password, String recovery) {
        byte[] salt = new byte[16]; RANDOM.nextBytes(salt);
        return "pbkdf2$600000$" + Base64.getEncoder().encodeToString(salt) + "$" + derive(password, salt, 600000) + "$" + digest(recovery);
    }
    private static String derive(String value, byte[] salt, int iterations) {
        PBEKeySpec spec = new PBEKeySpec(value.toCharArray(), salt, iterations, 256);
        try { return Base64.getEncoder().encodeToString(SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded()); }
        catch (GeneralSecurityException e) { throw new IllegalStateException(e); }
        finally { spec.clearPassword(); }
    }
    public static boolean verify(String value, String encoded) {
        try {
            String[] parts = encoded.split("\\$");
            if (parts.length != 5 || !parts[0].equals("pbkdf2") || !parts[1].equals("600000")) return false;
            return MessageDigest.isEqual(derive(value, Base64.getDecoder().decode(parts[2]), 600000).getBytes(), parts[3].getBytes());
        } catch (RuntimeException e) { return false; }
    }
    public static boolean recover(String key, String encoded) {
        String[] parts = encoded.split("\\$");
        return parts.length == 5 && MessageDigest.isEqual(digest(key).getBytes(), parts[4].getBytes());
    }
}

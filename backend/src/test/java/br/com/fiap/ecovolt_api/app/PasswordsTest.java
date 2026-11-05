package br.com.fiap.ecovolt_api.app;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
class PasswordsTest {
 @Test void verifiesOnlyTheCorrectPasswordAndRecoveryKey() {
  String recovery=Passwords.token();String hash=Passwords.hash("test-passphrase-123",recovery);
  assertTrue(hash.length()<255);assertTrue(Passwords.verify("test-passphrase-123",hash));
  assertFalse(Passwords.verify("wrong",hash));assertFalse(Passwords.verify("x","legacy-password"));
  assertTrue(Passwords.recover(recovery,hash));assertFalse(Passwords.recover("wrong",hash));
  assertNotEquals(hash,Passwords.hash("test-passphrase-123",recovery));
 }
 @Test void validatesMoneyAndMonth() {
  AppService.validateAccount(new AppService.Account("Nome","Empresa","1","2026-11",new java.math.BigDecimal("123.45")));
  assertThrows(Exception.class,()->AppService.validateAccount(new AppService.Account("Nome","Empresa","1","2026-13",java.math.BigDecimal.ONE)));
  assertThrows(Exception.class,()->AppService.validateAccount(new AppService.Account("Nome","Empresa","1","2026-11",new java.math.BigDecimal("-1"))));
  assertThrows(Exception.class,()->AppService.validateAccount(new AppService.Account("Nome","Empresa","1","2026-11",new java.math.BigDecimal("1.234"))));
 }
}

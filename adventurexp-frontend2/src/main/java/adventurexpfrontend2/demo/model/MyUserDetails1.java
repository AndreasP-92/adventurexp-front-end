package adventurexpfrontend2.demo.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetails1 {
//    private String userName;
//    private String firstname;
//    private String lastname;
//    private int phone;
//    private String mail;
//    private String password;
//    private String role;
//    private List<GrantedAuthority> authorities;
//
//    public MyUserDetails(User user) {
//        this.userName = user.getNamess();
//        this.firstname = user.getFirstname();
//        this.lastname = user.getLastname();
//        this.phone = user.getPhone();
//        this.mail = user.getMail();
//        this.password = user.getPassword();
//        this.role = role;
//        this.authorities = Arrays.stream(user.getRole().split(","))
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
//    }
//
//
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return authorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//    @Override
//    public String getUsername() {
//        return userName;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return false;
//    }
}

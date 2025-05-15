package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountEntity extends AbstractAuditingEntity<String> implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String address;

    @Column(nullable = false)
    private boolean inactive = false;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<RoleEntity> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password; // Trả về password thực
    }

    @Override
    public String getUsername() {
        return username; // Trả về username thực
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Có thể thêm logic kiểm tra nếu cần
    }

    @Override
    public boolean isAccountNonLocked() {
        return !inactive; // Tài khoản bị khóa nếu inactive = true
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Có thể thêm logic kiểm tra nếu cần
    }

    @Override
    public boolean isEnabled() {
        return !isDeleted; // Tài khoản không hoạt động nếu đã bị xóa
    }
}
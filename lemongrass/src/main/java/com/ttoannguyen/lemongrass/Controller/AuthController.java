package com.ttoannguyen.lemongrass.Controller;

import com.ttoannguyen.lemongrass.service.JwtResponseRecord;
import com.ttoannguyen.lemongrass.service.dto.request.AccountRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller Đăng ký Tài khoản
 */
@RequestMapping("/api/auth")
public interface AuthController {
    /**
     *
     * @param request {@link AccountRequest} thông tin đăng ký tài khoản
     * @return {{@link ResponseEntity}<{@link JwtResponseRecord}>} đăng ký thành công
     */
    @PostMapping("/register")
    public ResponseEntity<JwtResponseRecord> register(final @Valid @RequestBody AccountRequest request);
}

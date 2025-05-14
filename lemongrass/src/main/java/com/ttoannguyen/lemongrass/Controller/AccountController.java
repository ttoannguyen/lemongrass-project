package com.ttoannguyen.lemongrass.Controller;

import com.ttoannguyen.lemongrass.service.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.service.dto.request.SignInRequestRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller Tài khoản
 */
@RequestMapping("/api/account")
public interface AccountController {
    /**
     * Đăng ký tài khoản
     *
     * @param request {@link AccountRequest} thông tin đăng ký tài khoản
     * @return Message thông báo đăng ký thành công!
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(final @RequestBody AccountRequest request);

    /**
     * Đăng nhập tài khoản
     * @param request {@link SignInRequestRecord}
     * @return Message thông báo đăng nhập thành công!
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(final @RequestBody SignInRequestRecord request);
}

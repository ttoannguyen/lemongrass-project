package com.ttoannguyen.lemongrass.exception.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    USER_EXISTED(1001, "User existed!"),
    INVALID_USERNAME(1002, "Username must be at least 3 characters!"),
    INVALID_PASSWORD(1003, "Username must be at least 8 characters!"),
    USER_NOT_EXISTED(1004, "User not exists!"),
    UNAUTHENTICATED(1005, "Unauthenticated!"),
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception!"),
    INVALID_KEY(1000, "Invalid message key!")
    ;
    private int code;
    private String message;
}

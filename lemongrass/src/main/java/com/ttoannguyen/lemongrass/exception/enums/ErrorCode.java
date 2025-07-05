package com.ttoannguyen.lemongrass.exception.enums;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
  USER_EXISTED(1001, "User existed!", HttpStatus.BAD_REQUEST),
  INVALID_USERNAME(1002, "Username must be at least {min} characters!", HttpStatus.BAD_REQUEST),
  INVALID_PASSWORD(1003, "Password must be at least {min} characters!", HttpStatus.BAD_REQUEST),
  USER_NOT_EXISTED(1004, "User not exists!", HttpStatus.NOT_FOUND),
  UNAUTHENTICATED(1005, "Unauthenticated!", HttpStatus.UNAUTHORIZED),
  INVALID_KEY(1000, "Invalid message key!", HttpStatus.BAD_REQUEST),
  UNAUTHORIZED(1006, "You do not have permission!", HttpStatus.FORBIDDEN),
  UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception!", HttpStatus.INTERNAL_SERVER_ERROR),
  ROLE_NOT_FOUND(1007, "Role not exists!", HttpStatus.NOT_FOUND),
  INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
  GROUP_NOT_EXISTED(1009, "Group not exists!", HttpStatus.NOT_FOUND),
  RECIPE_NOT_EXISTED(1010, "Recipe not exists!", HttpStatus.NOT_FOUND),
  POST_NOT_EXISTED(1011, "Post not exists!", HttpStatus.NOT_FOUND),
  GROUP_EXISTED(1012, "Group exists!", HttpStatus.BAD_REQUEST),

  INGREDIENT_UNIT_EXISTED(1013, "Ingredient unit exists!", HttpStatus.BAD_REQUEST),
  INGREDIENT_TEMPLATE_EXISTED(1014, "Ingredient template exists!", HttpStatus.BAD_REQUEST),
  INGREDIENT_UNIT_NOT_EXISTED(1015, "Ingredient unit not exists!", HttpStatus.NOT_FOUND),

  INGREDIENT_TEMPLATE_NOT_EXISTED(1016, "Ingredient template not exists!", HttpStatus.NOT_FOUND),
  INVALID_TAGS_FORMAT(1017, "Invalid tags format!", HttpStatus.BAD_REQUEST),

  FAILED_UPLOAD(1018, "Upload failed!", HttpStatus.BAD_REQUEST),
  INVALID_FILE(1019, "Invalid file!", HttpStatus.BAD_REQUEST),

  CATEGORY_NOT_EXISTED(1020, "Category not exists!", HttpStatus.NOT_FOUND),
  CATEGORY_EXISTED(1021, "Category exists!", HttpStatus.BAD_REQUEST),
  ;

  private int code;
  private String message;
  private HttpStatusCode httpStatusCode;
}

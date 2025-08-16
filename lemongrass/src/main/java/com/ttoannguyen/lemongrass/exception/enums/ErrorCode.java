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
  CATEGORY_IN_USE(1022, "The category has been used by the recipe!", HttpStatus.BAD_REQUEST),
  INGREDIENT_TEMPLATE_IN_USED(
      1023, "The ingredient template has been used by the recipe!", HttpStatus.BAD_REQUEST),
  INGREDIENT_UNIT_NAME_EXISTED(1024, "Ingredient unit name exists!", HttpStatus.BAD_REQUEST),
  INGREDIENT_UNIT_IN_USED(
      1025, "The unit has been used by the ingredient!", HttpStatus.BAD_REQUEST),
  EMPTY_UNIT_LIST(1026, "List of units must not leave blank!", HttpStatus.BAD_REQUEST),
  COMMENT_NOT_EXISTED(1027, "Comment not exists!", HttpStatus.BAD_REQUEST),
  RECIPE_DOCUMENT_CREATION_FAILED(1028, "Document creation failed!", HttpStatus.BAD_REQUEST),
  PERMISSION_NOT_VALID(1029, "Permission is not valid!", HttpStatus.BAD_REQUEST),
  ROLE_IN_USED(1030, "The unit has already been assigned to someone else!", HttpStatus.BAD_REQUEST),
  SEARCH_KEYWORD_REQUIRED(1031, "Search keyword required!", HttpStatus.BAD_REQUEST),
  INVALID_SEARCH_FIELD(1032, "Invalid search field", HttpStatus.BAD_REQUEST),
  SEARCH_FAILED(1033, "Search failed", HttpStatus.BAD_REQUEST),
  INVALID_GROUP_NAME(1034, "Invalid group name!", HttpStatus.BAD_REQUEST),
  GROUP_NAME_TOO_LONG(1035, "Group name too long", HttpStatus.BAD_REQUEST),
  ALREADY_JOINED_GROUP(1036, "You already joined group!", HttpStatus.BAD_REQUEST),
  NOT_A_MEMBER(1037, "You not a member", HttpStatus.BAD_REQUEST),
  OWNER_CANNOT_LEAVE(1038, "Owner cannot leave", HttpStatus.BAD_REQUEST),
  ALREADY_FOLLOWED(1039, "Already followed", HttpStatus.BAD_REQUEST),
  INVALID_FILE_FORMAT(1040, "Invalid file format", HttpStatus.BAD_REQUEST),
  INVALID_RATING(1041, "Invalid rating", HttpStatus.BAD_REQUEST),
  INVALID_COMMENT(1042, "Invalid comment", HttpStatus.BAD_REQUEST),
  COMMENT_TOO_LONG(1043, "Comment to long", HttpStatus.BAD_REQUEST);

  private int code;
  private String message;
  private HttpStatusCode httpStatusCode;
}

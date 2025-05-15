package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.RoleDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface RoleController {
    @PostMapping("/roles")
    ResponseEntity<RoleDTO> createRole(@RequestBody RoleDTO roleDTO);


}

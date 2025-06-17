package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.group.GroupCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Group;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.GroupMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.GroupRepository;
import com.ttoannguyen.lemongrass.service.GroupService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GroupServiceImpl implements GroupService {
  GroupRepository groupRepository;
  AccountRepository accountRepository;
  GroupMapper groupMapper;

  @Override
  public GroupResponse create(GroupCreateRequest request, String username) {
    if (groupRepository.existsByName(request.getName()))
      throw new AppException(ErrorCode.GROUP_EXISTED);

    final Group group = groupMapper.toGroup(request);
    final Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    group.setAccount(account);
    return groupMapper.toGroupResponse(groupRepository.save(group));
  }

  @Override
  public List<GroupResponse> getGroups() {
    return groupMapper.toListGroupResponse(groupRepository.findAll());
  }

  @Override
  public GroupResponse getGroupByName(String name) {
    return groupMapper.toGroupResponse(
        groupRepository
            .findByName(name)
            .orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED)));
  }

  @Override
  public GroupResponse getGroupById(String groupId) {
    return groupMapper.toGroupResponse(
        groupRepository
            .findById(groupId)
            .orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED)));
  }
}

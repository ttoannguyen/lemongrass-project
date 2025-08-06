package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.group.GroupCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupJoinResponse;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Group;
import com.ttoannguyen.lemongrass.entity.GroupMembership;
import com.ttoannguyen.lemongrass.entity.enums.GroupRole;
import com.ttoannguyen.lemongrass.entity.enums.MembershipStatus;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.GroupMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.GroupMembershipRepository;
import com.ttoannguyen.lemongrass.repository.GroupRepository;
import com.ttoannguyen.lemongrass.service.GroupService;
import jakarta.transaction.Transactional;
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
  GroupMembershipRepository groupMembershipRepository;

  @Override
  @Transactional
  public GroupResponse create(GroupCreateRequest request, String username) {
    if (groupRepository.existsByName(request.getName()))
      throw new AppException(ErrorCode.GROUP_EXISTED);

    if (request.getName() == null || request.getName().trim().isEmpty()) {
      throw new AppException(ErrorCode.INVALID_GROUP_NAME);
    }

    if (request.getName().length() > 100) {
      throw new AppException(ErrorCode.GROUP_NAME_TOO_LONG);
    }

    final Group group = groupMapper.toGroup(request);

    final Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    group.setAccount(account);
    group.setMemberCount(1);
    groupRepository.save(group);
    GroupMembership groupMembership =
        GroupMembership.builder()
            .group(group)
            .account(account)
            .role(GroupRole.OWNER)
            .status(MembershipStatus.APPROVED)
            .build();
    groupMembershipRepository.save(groupMembership);

    return groupMapper.toGroupResponse(group);
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
  public List<GroupResponse> getGroupsByUsername(String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    List<GroupMembership> memberships = groupMembershipRepository.findByAccount(account);

    List<Group> groups = memberships.stream().map(GroupMembership::getGroup).toList();

    return groupMapper.toListGroupResponse(groups);
  }

  @Override
  public GroupResponse getGroupById(String groupId) {
    return groupMapper.toGroupResponse(
        groupRepository
            .findById(groupId)
            .orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED)));
  }

  @Override
  public boolean checkJoin(String groupId, String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    Group group =
        groupRepository
            .findById(groupId)
            .orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED));
    return groupMembershipRepository.existsByGroupAndAccount(group, account);
  }

  @Override
  @Transactional
  public GroupJoinResponse joinGroup(String groupId, String username) {
    Group group =
        groupRepository
            .findById(groupId)
            .orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED));
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    boolean isMember = groupMembershipRepository.existsByGroupAndAccount(group, account);
    if (isMember) throw new AppException(ErrorCode.ALREADY_JOINED_GROUP);

    boolean pendingApproval = group.isRequirePostApproval();
    MembershipStatus status =
        pendingApproval ? MembershipStatus.PENDING : MembershipStatus.APPROVED;

    GroupRole role = GroupRole.MEMBER;

    GroupMembership groupMembership =
        GroupMembership.builder().account(account).role(role).group(group).status(status).build();

    groupMembershipRepository.save(groupMembership);
    if (status == MembershipStatus.APPROVED) {
      groupRepository.incrementMemberCount(group.getGroupId());
    }

    return GroupJoinResponse.builder()
        .groupId(group.getGroupId())
        .groupName(group.getName())
        .groupRole(role)
        .status(status)
        .isJoined(status == MembershipStatus.APPROVED)
        .isPendingApproval(status == MembershipStatus.PENDING)
        .build();
  }

  @Override
  @Transactional
  public void leaveGroup(String groupId, String username) {
    Group group =
        groupRepository
            .findById(groupId)
            .orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED));

    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    GroupMembership membership =
        groupMembershipRepository
            .findByGroupAndAccount(group, account)
            .orElseThrow(() -> new AppException(ErrorCode.NOT_A_MEMBER));

    if (membership.getRole() == GroupRole.OWNER) {
      long otherOwners = groupMembershipRepository.countByGroupAndRole(group, GroupRole.OWNER) - 1;
      if (otherOwners < 0) {
        throw new AppException(ErrorCode.OWNER_CANNOT_LEAVE);
      }
    }

    if (membership.getStatus() == MembershipStatus.APPROVED) {
      groupRepository.decrementMemberCount(group.getGroupId());
    }

    groupMembershipRepository.delete(membership);
  }
}

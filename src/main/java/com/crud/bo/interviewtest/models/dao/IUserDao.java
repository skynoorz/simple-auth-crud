package com.crud.bo.interviewtest.models.dao;

import com.crud.bo.interviewtest.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUserDao extends JpaRepository<User, Long> {
    public User findByUsername(String username);

    public List<User> findByUsernameContaining(String username);
}

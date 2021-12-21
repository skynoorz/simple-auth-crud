package com.crud.bo.interviewtest.models.services;

import com.crud.bo.interviewtest.models.dao.IUserDao;
import com.crud.bo.interviewtest.models.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private IUserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);

        if (user == null){
            logger.error("Error on login: user '" + username + "' doesn't exist on system!");
            throw  new UsernameNotFoundException("Error on login: user '" + username + "' doesn't exist on system!");
        }

        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .peek(authority -> logger.info("Role: "+authority.getAuthority()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), true, true, true, true, authorities);
    }

    public List<User> findAll() {
        return (List<User>) this.userDao.findAll();
    }

    public User findById(Long id) {
        return this.userDao.findById(id).orElse(null);
    }

    public User save(User user) {
        return this.userDao.save(user);
    }

    public void delete(Long id) {
        this.userDao.deleteById(id);
    }


}

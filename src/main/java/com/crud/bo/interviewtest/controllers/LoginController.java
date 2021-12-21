package com.crud.bo.interviewtest.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
public class LoginController {

    private Logger logger = LoggerFactory.getLogger(LoginController.class);

    @GetMapping(path = "/basicauth")
    public ResponseEntity<?> basicauth(@RequestHeader MultiValueMap<String, String> headers) {

        headers.forEach((key, value) -> {
            logger.info(String.format(
                    "Header '%s' = %s", key, value.stream().collect(Collectors.joining("|"))));
        });

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Authenticated");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

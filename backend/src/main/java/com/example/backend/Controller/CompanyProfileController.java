package com.example.backend.Controller;

import com.example.backend.Repository.CompanyRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor

public class CompanyProfileController {
    private final CompanyRepo companyRepo;

    @PreAuthorize("hasAnyRole('ROLE_SUPER_ADMIN')")

    @GetMapping
    public HttpEntity<?> getCompany() {
        return ResponseEntity.ok(companyRepo.findAll());
    }
}

package com.athot.ecommerce_fruits.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.athot.ecommerce_fruits.dto.DashboardResponse;
import com.athot.ecommerce_fruits.service.DashboardService;

@RestController 
@RequestMapping("/api")
public class DashboardController {
    
    @Autowired 
    private DashboardService dashboardService;
    @GetMapping("/dashboard")
    public DashboardResponse getDashboard(){
        return dashboardService.getDashboardResponse();
    }
}

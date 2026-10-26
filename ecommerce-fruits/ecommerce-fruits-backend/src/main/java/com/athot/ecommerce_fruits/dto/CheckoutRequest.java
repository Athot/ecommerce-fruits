
package com.athot.ecommerce_fruits.dto;

import lombok.Data;

@Data
public class CheckoutRequest {
    private String fullName;
    private String phone;
    private String addressLine;
    private String city;
    private String state;
    private String postalCode;
}

package org.example.controller;

import org.example.dao.Dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * 前端控制器
 */
@RestController
public class Controller {
    @Autowired
    private Dao dao;

    @RequestMapping("/hello")
    public String sayHello() {
        return "Hello SpringBoot!";
    }

    //展示每月航班数
    @RequestMapping("/airportsituation")
    public List<Map<String, Object>> airportsituation() {
        return dao.selectairport();
    }

    //展示每月平均价格
    @RequestMapping("/airportavegeprice")
    public List<Map<String, Object>> airportavegeprice() {
        return dao.selectairportavegeprice();
    }

    //展示3月航班情况
    @RequestMapping("/everydayairport")
    public List<Map<String, Object>> everydayairport() {
        return dao.selecteveryday_of_mouths_of_airport();
    }

    //展示4月航班情况
    @RequestMapping("/everyday_of_april")
    public List<Map<String, Object>> everyday_of_april() {
        return dao.selecteveryday_of_mouths_of_april();
    }

    //展示5月航班情况
    @RequestMapping("/everyday_of_may")
    public List<Map<String, Object>> everyday_of_may() {
        return dao.selecteveryday_of_mouths_of_may();
    }

    //展示6月航班情况
    @RequestMapping("/everyday_of_june")
    public List<Map<String, Object>> everyday_of_june() {
        return dao.selecteveryday_of_mouths_of_june();
    }

    //展示每个小时航班情况
    @RequestMapping("/everyhourirport")
    public List<Map<String, Object>> everyhourirport() {
        return dao.selecteveryhours_of_days_of_airport();
    }

    @RequestMapping("/SourcetoDestinations")
    public List<Map<String, Object>> SourcetoDestinations() {
        return dao.selecteverySource_to_Destination_of_airport();
    }

    //周末和工作日的情况
    @RequestMapping("/weekwork")//网址后缀
    public List<Map<String, Object>> weekwork() {
        return dao.select_type_day();
    }

    @RequestMapping("/weekandwork")//网址后缀
    public List<Map<String, Object>> weekandwork() {
        return dao.selectweekandwork();
    }

    @RequestMapping("/the_source")//网址后缀
    public List<Map<String, Object>> the_source() {
        return dao.select_source();
    }

    @RequestMapping("/the_destination")//不同目的地情况
    public List<Map<String, Object>> the_destination() {
        return dao.select_destination();
    }

    //前五的航空公司
    @RequestMapping("/the_Airline")//不同目的地情况
    public List<Map<String, Object>> the_Airline() {
        return dao.select_Airline();
    }
}

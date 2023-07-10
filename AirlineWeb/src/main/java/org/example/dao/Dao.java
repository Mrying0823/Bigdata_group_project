package org.example.dao;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface Dao {
    //展示每个月航班情况
    List<Map<String, Object>> selectairport();

    //展示每个月平均价格情况
    List<Map<String, Object>> selectairportavegeprice();

    //3月的航班情况
    List<Map<String, Object>> selecteveryday_of_mouths_of_airport();
    //4月的航班情况
    List<Map<String, Object>> selecteveryday_of_mouths_of_april();
    //5月的航班情况
    List<Map<String, Object>> selecteveryday_of_mouths_of_may();
    //6月的航班情况
    List<Map<String, Object>> selecteveryday_of_mouths_of_june();
    //每个小时的航班情况
    List<Map<String, Object>> selecteveryhours_of_days_of_airport();
//    <!--不同出发地不同航距的班次数-->
    List<Map<String, Object>> selecteverySource_to_Destination_of_airport();

    //周末和工作日的航班和价格情况
    List<Map<String, Object>> selectweekandwork();
    List<Map<String, Object>> select_type_day();

    //不同出发地地图分布
    List<Map<String, Object>> select_source();
    List<Map<String, Object>> select_destination();
//前五的航空公司
    List<Map<String, Object>> select_Airline();

}

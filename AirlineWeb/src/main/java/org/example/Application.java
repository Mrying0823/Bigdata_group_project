package org.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SpringBootApplication:是SpringBoot的核心启动注解
 *
 */
@SpringBootApplication
@MapperScan("org.example.dao")
public class Application {
    public static void main( String[] args )
    {
        SpringApplication.run(Application.class,args);
    }
}

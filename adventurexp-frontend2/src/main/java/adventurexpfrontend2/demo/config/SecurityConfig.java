package adventurexpfrontend2.demo.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;


@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

//    @Autowired
//    UserDetailsService userDetailsService;


    @Autowired
    DataSource dataSource;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
//                .passwordEncoder(new BCryptPasswordEncoder())
                .usersByUsernameQuery("SELECT mail, password, enabled "
                        + "FROM users "
                        + "WHERE mail = ?")
                .authoritiesByUsernameQuery("SELECT mail, role "
                        + "FROM auth "
                        + "WHERE mail = ?");
    }



//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
//        auth.userDetailsService(userDetailsService);
//    }


    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable().authorizeRequests()
                .antMatchers("/admin").hasRole("ADMIN")
                .antMatchers("/user").hasAnyRole("ADMIN", "USER")
                .antMatchers("/").permitAll()
                .and().formLogin()
                .defaultSuccessUrl("/",true)
                .loginPage("/login")
                .usernameParameter("mail")
                .passwordParameter("password")
                .loginProcessingUrl("/doLogin")
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                        System.out.println("Login Failure!!!....");
                        System.out.println(e);

                        httpServletResponse.sendRedirect("/login");
                    }


                })
                .and()
                .logout()
                .logoutUrl("/logout");
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception{
//        http.csrf().disable().authorizeRequests()
//                .antMatchers("/admin").hasRole("ADMIN")
//                .antMatchers("/createevent").hasRole("ADMIN")
//                .antMatchers("/user").hasAnyRole("ADMIN", "USER")
//                .antMatchers("/").permitAll()
//                .and().formLogin()
//                .permitAll()
//                .loginPage("/login")
//                .loginProcessingUrl("/doLogin")
//                .defaultSuccessUrl("/booking")
//                .failureUrl("/")
//
//        //                    .successForwardUrl("/login_success_handler")
////                    .failureForwardUrl("/login_failure_handler")
//                    .successHandler(new AuthenticationSuccessHandler() {
//            @Override
//            public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
//                String name = authentication.getName();
//                System.out.println("Logged in user: " + name);
//
//            }
//        })
//                .failureHandler(new AuthenticationFailureHandler() {
//                    @Override
//                    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
//
//                        httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
//                        Map<String, Object> data = new HashMap<>();
//                        data.put(
//                                "timestamp",
//                                Calendar.getInstance().getTime());
//                        data.put(
//                                "exception",
//                                e.getMessage());
//
//                        httpServletResponse.getOutputStream()
//                                .println(objectMapper.writeValueAsString(data));
//
//                        System.out.println(e);
//
//                        System.out.println("Login Failure!!!....");
//
//                        httpServletResponse.sendRedirect("/");
//                    }
//                })
//                .and().exceptionHandling().accessDeniedPage("/403");
//
//
//
//    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}









//    @Autowired
//    DataSource dataSource;
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.jdbcAuthentication()
//                .dataSource(dataSource)
//                .usersByUsernameQuery("SELECT user_mail, user_password, user_enabled "
//                        + "FROM app_user "
//                        + "WHERE user_mail = ?")
//                .authoritiesByUsernameQuery("SELECT usermail, authority "
//                        + "FROM authorities "
//                        + "WHERE usermail = ?");
//    }
//
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .antMatchers("/").permitAll();
//    }
//
////    @Bean
////    public PasswordEncoder getPasswordEncoder() {
////        return NoOpPasswordEncoder.getInstance();
////    }
















//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//
//
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//        @Autowired
//        UserDetailsService userDetailsService;
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
//    auth.userDetailsService(userDetailsService)
//    }
//
//    protected void configure(HttpSecurity http) throws Exception{
//        http.authorizeRequests()
//                .antMatchers("/admin").hasRole("ADMIN")
//                .antMatchers("/user").hasAnyRole("ADMIN", "USER")
//                .antMatchers("/").permitAll()
//                .and().formLogin();
//    }

//}

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

// ====== JPA VERSION ========
//    @Autowired
//    UserDetailsService userDetailsService;

// ====== JDBC VERSION ========
    @Autowired
    DataSource dataSource;


// ====== JDBC VERSION ========
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


// ====== JPA VERSION ========

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
//        auth.userDetailsService(userDetailsService);
//    }


    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable().authorizeRequests()
                .antMatchers("/admin/*").hasAnyRole("ADMIN", "BOOKING", "EVENT")
                .antMatchers("/admin/bookings/closed").hasAnyRole("ADMIN", "BOOKING")
                .antMatchers("/admin/register").hasAnyRole("ADMIN")
                .antMatchers("/admin/profiles").hasAnyRole("ADMIN")
                .antMatchers("/admin/bookings").hasAnyRole("ADMIN","BOOKING")
                .antMatchers("/admin/activities").hasAnyRole("ADMIN")
                .antMatchers("/admin/support").hasAnyRole("ADMIN")
                .antMatchers("/admin/asigned/ticket").hasAnyRole("ADMIN")
                .antMatchers("/admin/createevent").hasAnyRole("ADMIN", "EVENT")
                .antMatchers("/admin/bookings").hasAnyRole("ADMIN", "BOOKING")
                .antMatchers("/profile/about/{mail}").hasAnyRole("USER")
                .antMatchers("/profile/history{mail}").hasAnyRole("USER")
                .antMatchers("/").permitAll()
                .antMatchers("/register").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/contact").permitAll()
                .antMatchers("/activity/info/{name}").permitAll()
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

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}

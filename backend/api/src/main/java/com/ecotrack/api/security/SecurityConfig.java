package com.ecotrack.api.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Configuramos CORS usando el Bean de abajo
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // 2. Deshabilitamos CSRF (no lo necesitamos para APIs con JWT)
                .csrf(csrf -> csrf.disable())
                // 3. Por ahora, todas las rutas son públicas para simplificar el MVP
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll()
                )
                // 4. La sesión será Stateless (sin estado) porque usamos JWT
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                // 5. Registramos nuestro filtro JWT (aunque, al ser todo público, ahora mismo es opcional)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // El origen de tu frontend en desarrollo
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://eco-track-api-roan.vercel.app"));

        // Métodos permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Cabeceras permitidas: Authorization es obligatoria para enviar el Token
        configuration.setAllowedHeaders(Arrays.asList("*"));

        // Permitir que el navegador envíe cookies o auth headers
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplicamos esta configuración a todas las rutas del API
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
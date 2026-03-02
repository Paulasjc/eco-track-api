## EcoTrack – Motor de cálculo de huella de carbono
EcoTrack es un microservicio de cálculo ambiental diseñado bajo un enfoque API-First. Permite a empresas de logística y transporte estimar el impacto de CO₂ de sus trayectos basándose en factores de emisión científicos, garantizando que el núcleo del negocio (el cálculo) sea independiente de la interfaz visual.

## 🚀  Visión General
Dominio: Cálculo de emisiones de CO₂ para transporte terrestre y aéreo.

Arquitectura: Microservicio desacoplado (Backend + Frontend).

Estrategia API-First: El contrato de la API (OpenAPI) es la única fuente de verdad.

Stack: Java 21 (Spring Boot 3) + Next.js 16 (React 19) + PostgreSQL.

## 🛠️ Enfoque API-First
EcoTrack sitúa la API en el centro del ecosistema. Gracias a springdoc-openapi, el contrato se autogenera y permite:

Validación Robusta: Control de tipos de vehículos, combustibles y distancias positivas.

Consumo Universal: El backend puede servir datos a la web actual, aplicaciones móviles o integraciones B2B externas.

Documentación Viva: Acceso a Swagger UI para pruebas directas de los endpoints.

## 📂 Estructura del Proyecto
```text
eco-track-api/
├─ backend/
│  └─ api/
│     ├─ pom.xml
│     ├─ Dockerfile
│     └─ src/...
│
├─ frontend/
│  ├─ package.json
│  ├─ Dockerfile
│  └─ app/, components/, lib/...
│
├─ docker-compose.yml
└─ README.md
```
## ⚙️ Tecnologías y Roles
Backend (Java/Spring Boot)
Java 21 & Spring Boot 3: Uso de récords y memoria eficiente.

Spring Data JPA: Gestión de factores de emisión en base de datos.

Swagger/OpenAPI: Documentación interactiva disponible en http://localhost:8080/swagger-ui.html.

Base de Datos: PostgreSQL para persistencia de factores de emisión técnicos (no gestiona usuarios en este MVP).

Frontend (Next.js 16)
React 19 & TypeScript: Tipado estricto para evitar errores en tiempo de ejecución.

Tailwind CSS 4: Diseño moderno con modo oscuro y componentes reactivos.

Smart Filtering: Lógica de validación cruzada entre vehículo y combustible para una mejor UX.

Persistencia Local: Uso de localStorage para mantener el historial de cálculos del usuario sin necesidad de registro.

## 🐳 Despliegue con Docker (Recomendado)
El proyecto está totalmente dockerizado para garantizar que funcione en cualquier entorno.

Clonar el repositorio.

Levantar el entorno:

```Bash

docker-compose up --build
```
Acceso:

Frontend: http://localhost:3000

Backend API: http://localhost:8080

Swagger UI: http://localhost:8080/swagger-ui.html

## 🌳 Flujo de Usuario y UX
Dashboard: KPIs dinámicos calculados en tiempo real sobre el historial.

Calculadora Inteligente: El usuario selecciona el vehículo y el sistema filtra automáticamente los combustibles válidos.

Equivalencia Ecológica: El resultado en kg de CO₂ se traduce visualmente a árboles plantados, humanizando el impacto ambiental.

Historial: Tabla detallada con badges visuales para identificar rápidamente los trayectos.

## 🔮 Futuro del Proyecto
Autenticación JWT: Implementación de seguridad para perfiles de empresa.

Gráficas Avanzadas: Evolución de las métricas con gráficos de tendencias temporales.

Exportación: Generación de informes PDF para cumplimiento de normativas ISO.

Desarrollado por Paula San José



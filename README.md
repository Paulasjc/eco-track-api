¿Qué es exactamente EcoTrack?
Es un Microservicio de Cálculo Ambiental. En el mundo real, las empresas de transporte (como SEUR o Amazon) necesitan saber cuánto contaminan sus repartos para cumplir con normativas ecológicas.

Tu proyecto será el "motor" que hace esos cálculos. No es una web cualquiera, es una herramienta técnica que recibe datos de un paquete y responde con el impacto ambiental.


Arquitectura:
El Contrato (API First): El "manual de instrucciones" escrito en un lenguaje llamado OpenAPI/Swagger. Define que, por ejemplo, para calcular el $CO_2$, siempre hay que enviar un número positivo para la distancia.
El Cerebro (Backend con Java/Spring Boot): Aquí vive la lógica. Recibe la petición, consulta en una Base de Datos (H2 o PostgreSQL) cuánto contamina un "Camión" por kilómetro, hace la multiplicación y guarda el resultado.
El Escaparate (Frontend con Next.js): Una interfaz donde un usuario rellena un formulario (ej: "100km en Avión") y ve una gráfica bonita con el resultado que le devuelve el Backend.
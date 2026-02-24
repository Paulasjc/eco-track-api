-- Limpiar datos previos para evitar duplicados
DELETE FROM emission_factor;

-- COCHES (Media por km)
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('CAR_SMALL', 'GASOLINE', 0.14);
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('CAR_MEDIUM', 'GASOLINE', 0.19);
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('CAR_LARGE', 'DIESEL', 0.24);
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('CAR_ELECTRIC', 'ELECTRIC', 0.05); -- Basado en el mix energético medio

-- CAMIONES (Factor base + impacto por tonelada que calcularemos en el código)
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('TRUCK_LIGHT', 'DIESEL', 0.60);
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('TRUCK_HEAVY', 'DIESEL', 0.95);

-- MOTOS
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('MOTORBIKE', 'GASOLINE', 0.08);

-- TRANSPORTE PÚBLICO / OTROS
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('BUS', 'DIESEL', 0.10); -- Por pasajero/km aprox
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('VAN', 'DIESEL', 0.25);

-- AVIACIÓN (Cálculo simplificado por km)
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('PLANE_SHORT_HAUL', 'JET_FUEL', 0.25);
INSERT INTO emission_factor (vehicle_type, fuel_type, factor) VALUES ('PLANE_LONG_HAUL', 'JET_FUEL', 0.18);
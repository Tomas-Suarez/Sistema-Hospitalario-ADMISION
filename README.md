# Sistema Hospitalario para Internaciones - Proyecto Web II
## Índice 📒
- [Descripción general](#descripción-general)
- [Estado del proyecto](#estado-del-proyecto)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Funcionalidades](#funcionalidades)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Autores](#autores)

## Descripción general 🚀

Este proyecto fue desarrollado durante la cursada de la materia **Programación Web 2**, con el objetivo de construir una aplicación web orientada a la gestión de **internaciones hospitalarias**.

## Estado del proyecto 🔍

![Badge en Desarrollo](https://img.shields.io/badge/STATUS-EN%20DESARROLLO-green)


### Cómo ejecutar el proyecto 🔧

1. Clona este repositorio
```
git clone https://github.com/Tomas-Suarez/Integrador-web-II.git
```
2. Ingresa al directorio del proyecto: 
```
cd Integrador-web-II
```
3. Instala las dependencias:
```
npm install
```
4. Creá un archivo .env en la raíz del proyecto para configurar las variables de entorno de la base de datos. Un ejemplo del contenido sería:
```
# Base de datos
DB_NAME=hospital
DB_USER=root
DB_PASS=iokc
DB_HOST=111.11.1
DB_PORT=3306
DB_DIALECT=mysql
# Seguridad (JWT)
JWT_SECRET=tu_palabra_secreta_super_segura
JWT_EXPIRES_IN=1h
```

5. Sincroniza la base de datos y carga datos de ejemplo (opcional):
```
node seeders/seed.js
```
6. Inicia la aplicación:
```
npm start
```

7. Accedé a la app en tu navegador en http://localhost:3000

## Usuarios de Prueba 🔐

Para probar los diferentes roles y permisos del sistema, utilice las siguientes credenciales (asegúrese de haber ejecutado los seeders):

| Rol | Usuario / Email | Contraseña | Permisos Principales |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin123` | Gestión de usuarios, médicos y enfermeros (RRHH). |
| **Médico** | `medico@gmail.com` | `medico123` | Ver historial, crear evoluciones, indicar tratamientos, dar altas. |
| **Recepcionista** | `recepcion@hospital.com` | `recepcionista123` | Registrar pacientes, admisiones, asignar camas, gestionar habitaciones. |
| **Enfermero** | `enfermero@hospital.com` | `enfermero123` | Tablero de internación, carga de signos vitales, registro de cuidados. |

## Funcionalidades ⚙️

### 🔐 Seguridad y Accesos
* **Autenticación JWT:** Login seguro con generación de Tokens y manejo de sesiones mediante cookies.
* **Control de Roles:** Middleware propio (`checkRole`) que restringe el acceso a rutas específicas según el perfil (Admin, Médico, Enfermero, Recepcionista).
* **Validación de Estado:** Bloqueo de acceso automático a personal dado de baja lógica.

### 🏥 Gestión Administrativa (Recepción)
* **Gestión de Pacientes:** ABM completo, historial clínico y ficha detallada.
* **Admisiones:** Ingreso por Turno, Derivación o Emergencia (Paciente NN).
* **Identificación de Pacientes:** Funcionalidad para asignar identidad real a un paciente ingresado como NN.
* **Gestión de Camas:**
    * Asignación automática validando disponibilidad y género en habitación compartida.
    * Cambio de habitación con validación transaccional (liberación de cama anterior y ocupación de nueva).
    * Higienización de camas (cambio de estado Sucia -> Disponible).

### 🩺 Módulo Médico
* **Evaluación Médica:** Carga de evoluciones clínicas en tiempo real vinculadas a la admisión.
* **Indicaciones:** Asignación de tratamientos y solicitud de estudios complementarios.
* **Alta Hospitalaria:** Proceso de cierre de internación, liberación automática de cama y pase a estado "A higienizar".

### 💉 Módulo de Enfermería
* **Tablero de Control:** Vista exclusiva de pacientes actualmente internados.
* **Historia de Enfermería:** Carga de antecedentes y alergias en la evaluación inicial.
* **Signos Vitales:** Registro histórico y monitoreo de parámetros (Temp, Tensión, FC, etc.).
* **Administración de Cuidados:** Registro de ejecución de tratamientos indicados por el médico (Plan de Cuidados).

### Tecnologías utilizadas 🎨
- **Node.js + Express:** desarrollo del backend y gestión de rutas.
- **Sequelize:** ORM para definir modelos, relaciones y ejecutar consultas a la base de datos.
- **SQL:** comprensión del modelo relacional. Mediante **MySQL**
- **PUG:** motor de plantillas para renderizar vistas (formularios y listados).
- **CSS:** estilización de vistas.
- **Dotenv:** carga de variables de entorno desde archivos `.env`
- **Method-Override:** permite el uso de métodos HTTP como PUT y PATCH desde los formularios.
- **Express-Validator:** permite la validación desde el lado del backend.
- **Nodemon:** herramienta para reiniciar el servidor durante el desarrollo.
- **DataTable:** mostrar informacion paciente, admision, habitacion, etc
- **Seguridad:**
    * `jsonwebtoken` (Manejo de sesiones y tokens).
    * `bcrypt` (Hashing y encriptación de contraseñas).
    * `express-validator` (Validación de datos de entrada).


## EndPoints 📚

El sistema está organizado en rutas modulares. A continuación se detallan los endpoints disponibles agrupados por responsabilidad:

### 🌍 Accesos y Usuarios
| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| **GET/POST** | `/usuarios/login` | Inicio de sesión y generación de Token JWT. | Público |
| **GET** | `/usuarios/logout` | Cierre de sesión (Eliminación de cookie). | Autenticado |
| **GET/POST** | `/usuarios/registro` | Formulario y creación de nuevos usuarios. | Admin |

### 🧍‍♂️ Gestión de Pacientes (Recepción)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/pacientes/GestionPaciente` | Listado general de pacientes. |
| **POST** | `/pacientes/registro` | Registrar un nuevo paciente. |
| **PUT** | `/pacientes/actualizar/:id` | Editar datos personales de un paciente. |
| **PATCH** | `/pacientes/cambiar-estado/:id` | Dar de baja/alta lógica a un paciente. |
| **GET** | `/pacientes/historial/:id` | Ver historial de internaciones pasadas. |
| **GET** | `/pacientes/detalle/:id` | Ver ficha completa (Datos, Contactos, Alergias). |

### 💉 Admisión e Internación
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/pacientes/RegistrarAdmision` | Formulario para nueva admisión. |
| **POST** | `/admisiones/registrar` | Procesar admisión (Turno/Derivación). |
| **POST** | `/admisiones/registrarEmergencia` | Admisión rápida para paciente NN + Asignación de cama. |
| **PATCH** | `/admisiones/cancelarAdmision/:id` | Cancelar una admisión en curso. |
| **POST** | `/admisiones/identificar` | Vincular un paciente NN con un DNI real. |

### 🛏️ Gestión de Camas y Habitaciones
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/asignaciones/GestionInternacion` | Tablero de internaciones activas (Quién está en qué cama). |
| **POST** | `/asignaciones/asignar` | Asignar una cama a un paciente admitido (Pendiente -> Internado). |
| **POST** | `/asignaciones/cambiar` | Cambio de habitación (Cierra asignación anterior, abre nueva). |
| **GET** | `/habitaciones/ListaHabitacion` | Estado de todas las habitaciones (Limpieza/Ocupación). |
| **POST** | `/habitaciones/higienizar/:id` | Marcar una cama sucia como "Disponible". |
| **GET** | `/habitaciones/por-ala` | API interna para filtrar camas disponibles por género. |

### 🛡️ Gestión de Personal (Admin)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/medicos/GestionMedico` | ABM de personal médico. |
| **GET** | `/enfermeros/GestionEnfermero` | ABM de personal de enfermería. |
| **POST/PUT** | `/medicos/*` | Crear o editar médicos. |
| **POST/PUT** | `/enfermeros/*` | Crear o editar enfermeros. |

### 🩺 Módulo Médico (Clínica)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/evaluaciones/pacientes` | Listado de mis pacientes internados. |
| **GET/POST** | `/evaluaciones/crear/:id` | Ver historia clínica y cargar nueva evolución. |
| **GET** | `/evaluaciones/detalle/:id` | Ver detalle de una evolución anterior (PDF). |
| **GET** | `/evaluaciones/alta` | Buscador de pacientes para alta. |
| **POST** | `/evaluaciones/alta/confirmar` | Ejecutar Alta Médica (Cierra internación, libera cama). |

### 💉 Módulo de Enfermería (Operativo)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/enfermeria/pacientes` | Tablero de internados (Vista operativa). |
| **GET/POST** | `/enfermeria/historia` | Carga de antecedentes y alergias (Evaluación inicial). |
| **GET** | `/enfermeria/signos/:id` | Ver historial de signos vitales. |
| **POST** | `/enfermeria/signos/guardar` | Registrar nueva medición (Temp, Presión, etc). |
| **GET** | `/enfermeria/cuidados/activos/:id` | Ver Plan de Cuidados (Tratamientos indicados). |
| **POST** | `/enfermeria/cuidados/guardar` | Registrar administración de medicamento/cuidado. |

## Autores ✒️

* **Tomas Agustin Suarez** - *Desarrollador* - [Tomas-Suarez](https://github.com/Tomas-Suarez) 


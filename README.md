# Seguimiento Proyecto 2.0

## Descripción

Seguimiento Proyecto 2.0 es una aplicación desarrollada para gestionar y realizar seguimiento a proyectos de I+D+i en certificación. La aplicación permite que el Gestor del Proyecto tenga a todos los actores de una certificación, teniendo su información de contacto y pudiendo sacar estadísticas acerca de sus proyectos. Toda la información de los distintos acores se almacena por separado pudiéndose actualizar y mantenerse al día.
## Características

- Interfaz interactiva desarrollada con Angular.
- Integración con Firebase para manejo de bases de datos y autenticación.
- Implementación de Bootstrap para un diseño responsivo.
- Alertas visuales integradas con SweetAlert2.
- Generación y descarga de reportes en Excel utilizando xlsx.

## Tecnologías utilizadas

Este proyecto utiliza las siguientes tecnologías y bibliotecas:

### Frontend

- ![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat&logo=angular&logoColor=white) **Angular** (v18.0.1): Framework para construir interfaces web dinámicas.
- ![RxJS](https://img.shields.io/badge/-RxJS-B7178C?style=flat&logo=reactivex&logoColor=white) **RxJS** (v7.8.0): Biblioteca para programación reactiva y manejo de eventos asincrónicos.
- ![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white) **Bootstrap** (v5.3.2): Framework de diseño para crear interfaces responsivas.
- ![SweetAlert2](https://img.shields.io/badge/-SweetAlert2-4A154B?style=flat&logo=sweetalert&logoColor=white) **SweetAlert2** (v11.6.13): Biblioteca para mostrar alertas modales estilizadas.
- ![FileSaver](https://img.shields.io/badge/-FileSaver.js-008080?style=flat) **FileSaver** (v2.0.5): Para la descarga de archivos generados en el navegador.
- ![XLSX](https://img.shields.io/badge/-XLSX-217346?style=flat&logo=microsoft-excel&logoColor=white) **XLSX** (v0.18.5): Para manipular y generar archivos Excel.
- ![Zone.js](https://img.shields.io/badge/-Zone.js-ffdd57?style=flat) **Zone.js** (v0.14.2): Biblioteca para manejar la detección de cambios en Angular.

### Backend y Servicios

- **Firebase**: Utilizado para la autenticación, la base de datos en tiempo real, y el hosting. No se usa Express en el backend.

### Herramientas de Desarrollo

- **Angular CLI** (v18.0.2): Herramienta de línea de comandos para gestionar proyectos Angular.
- **Typescript** (v5.4.5): Lenguaje de programación para desarrollo con tipado estático.
- **Node.js** (v16.13.0): Entorno de ejecución para JavaScript.
- **NPM** (v8.3.0): Gestor de paquetes para Node.js.
- **Git** (v2.34.1): Sistema de control de versiones.
- **WebStorm** (v2021.3): IDE para desarrollo web.

## Instalación

Para instalar y configurar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/mbr100/SeguimientoProyectos2.0.git
2. Instala las dependencias:
   ```bash
   npm install
3. Inicia el servidor de desarrollo:
   ```bash
    ng serve
4. Abre tu navegador y accede a
   ```url
    http://localhost:4200/

## Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

- Haz un fork del proyecto.
- Crea una rama para tu función (feature/nueva-funcion).
- Realiza un pull request con una descripción clara de tu contribución.

## Licencia

Este proyecto está licenciado bajo la Licencia Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0). Puedes usar, modificar y distribuir el
código para fines no comerciales siempre que otorgues el crédito correspondiente a su autor, Mario Borrego. Para cualquier uso comercial de este software, por
favor, contacta previamente con el autor.

Para más detalles, visita: CC BY-NC 4.0.

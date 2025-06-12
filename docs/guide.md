# Usage Guide

Este documento describe c\u00f3mo utilizar la aplicaci\u00f3n de Escaleras y Toboganes tanto para usuarios normales como para administradores.

## Usuarios registrados
- Deben crear una cuenta con su correo y contrase\u00f1a.
- Al iniciar sesi\u00f3n recibir\u00e1n un token JWT que se almacena en el navegador.
- Con la sesi\u00f3n iniciada pueden acceder a la p\u00e1gina **Ir a partida** y comenzar un nuevo juego.
- Desde el men\u00fa pueden cerrar sesi\u00f3n cuando lo deseen.

## Administradores
- Se registran indicando el rol `admin` directamente en la base de datos o mediante un endpoint protegido.
- Al iniciar sesi\u00f3n tambi\u00e9n reciben un JWT que incluye su rol.
- Algunas rutas de la API, como eliminar partidas, requieren el rol de administrador.
- En el cliente se podr\u00edan habilitar secciones adicionales para gesti\u00f3n.

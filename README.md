Control de scripts
Este proyecto consiste en una aplicación web que permite controlar y ejecutar scripts en un servidor remoto a través de una interfaz gráfica de usuario. La aplicación web está construida con Node.js, Express y SQLite, y utiliza SSH para conectarse y transferir archivos al servidor remoto.

Instalación
Para instalar el proyecto, primero debes clonar el repositorio en tu computadora:

bash
Copy code
git clone https://github.com/IngEdwinM/generador_script.git
Luego, debes instalar las dependencias del proyecto con npm:

bash
Copy code
cd generador_script
npm install
Uso
Para iniciar la aplicación, debes ejecutar el siguiente comando:

bash
Copy code
npm start
La aplicación estará disponible en http://localhost:3000. Desde allí, podrás agregar, editar y eliminar scripts, y ejecutarlos en el servidor remoto.

Para que la aplicación funcione correctamente, debes configurar las credenciales de SSH en el archivo .env del proyecto, como se indica en el archivo .env.example.

Contribución
Si deseas contribuir al proyecto, puedes enviar un pull request con tus cambios. Asegúrate de seguir las pautas de contribución y de ejecutar las pruebas unitarias antes de enviar tu pull request.

Licencia
Este proyecto está bajo la licencia MIT.
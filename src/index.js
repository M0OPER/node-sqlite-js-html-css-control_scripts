require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const multer = require("multer");
const upload = multer({ dest: "archivos/" });
const Client = require("ssh2").Client;

// Importa las rutas
const controlControles = require('./controllers/control_controles');
const controlRutas = require('./controllers/control_rutas');

// Utiliza las rutas que has definido
app.use('/controles', controlControles);
app.use('/rutas', controlRutas);

function transferFileToRemoteServer(localFilePath, remotePath) {
  let conn = new Client();
  conn
    .on("ready", function () {
      console.log("Client :: ready");
      conn.sftp(function (err, sftp) {
        if (err) throw err;
        sftp.fastPut(localFilePath, remotePath, {}, function (err) {
          if (err) console.log("Error, problem starting SFTP: %s", err);
          console.log("SFTP :: Succeed.");

          // Ejecutar el script bash después de copiarlo
          conn.exec(`bash ${remotePath}`, function (err, stream) {
            if (err) throw err;
            stream
              .on("close", function (code, signal) {
                console.log(`Script executed with exit code ${code}`);
                conn.end();
              })
              .on("data", function (data) {
                console.log(`STDOUT: ${data}`);
              })
              .stderr.on("data", function (data) {
                console.log(`STDERR: ${data}`);
              });
          });
        });
      });
    })
    .connect({
      host: process.env.SSH_HOST,
      port: process.env.SSH_PORT,
      username: process.env.SSH_USERNAME,
      password: process.env.SSH_PASSWORD,
    });
}

app.post("/upload-bash", upload.single("bash-script"), (req, res) => {
  const localFilePath = req.file.path; 
  const remotePath = "/ssd/www/lupajuridica/scripts/archivos/script_controles.sh";

  console.log(`LOG: Archivo subido correctamente: ${localFilePath}`);
  transferFileToRemoteServer(localFilePath, remotePath);
  res.status(200).send("LOG: Archivo subido y transferido con éxito.");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
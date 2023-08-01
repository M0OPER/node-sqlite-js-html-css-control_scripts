// Variables y mas
document
  .getElementById("btn-agregar")
  .addEventListener("click", agregarControl);

document
  .getElementById("btn-agregar-ruta")
  .addEventListener("click", agregarRutaDataBase);

document
  .getElementById("seleccionar-todo")
  .addEventListener("click", seleccionarTodos);

// Funcioes servidor
// Controles
async function cargarControles() {
  const response = await fetch("/controles/obtener-controles");
  if (response.ok) {
    const controles = await response.json();
    const listaControles = document.getElementById("lista-controles");
    listaControles.innerHTML = ""; // Limpia el contenido de la lista antes de agregar nuevos controles

    controles.forEach((control) => {
      agregarControlALista(control.id, control.nombre, control.ruta_raiz);
    });

    const totalControlesElement = document.getElementById("totalControles");
    totalControlesElement.textContent = controles.length; // Set the total count
  } else {
    console.error("Error al cargar los controles");
  }
}

function agregarControlALista(idControl, nombreControl, rutaRaiz) {
  const listaControles = document.getElementById("lista-controles");

  const item = document.createElement("div");
  item.classList.add("item");
  item.setAttribute("data-id", idControl);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const strong = document.createElement("strong");
  strong.textContent = `${nombreControl}`;

  const span = document.createElement("span");
  span.textContent = `${rutaRaiz}`;

  const eliminarBtn = document.createElement("button");
  eliminarBtn.classList.add("btn");
  eliminarBtn.classList.add("m-1");

  const trashIcon = document.createElement("i");
  trashIcon.classList.add("bi", "bi-trash");

  eliminarBtn.appendChild(trashIcon);
  eliminarBtn.classList.add("btn", "btn-danger", "btn-sm");

  eliminarBtn.onclick = () => eliminarControl(idControl);

  item.appendChild(eliminarBtn);
  item.appendChild(checkbox);
  item.appendChild(strong);
  item.appendChild(span);

  listaControles.appendChild(item);
}

async function agregarControl() {
  const input = document.getElementById("input-control");
  const rutaRaizInput = document.getElementById("input-ruta-raiz");
  const nombreControl = input.value;
  const rutaRaiz = rutaRaizInput.value;

  const response = await fetch("/controles/agregar-control", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre: nombreControl, rutaRaiz: rutaRaiz }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(`Control agregado con el ID: ${data.id}`);
    input.value = "";
    cargarControles();

    // Muestra una alerta de SweetAlert
    Swal.fire({
      icon: "success",
      title: "Control agregado",
      text: `Control ${nombreControl} agregado con éxito`,
    });
  } else {
    const errorData = await response.json();
    console.error(`Error al agregar el control: ${errorData.error}`);

    // Muestra una alerta de SweetAlert
    Swal.fire({
      icon: "error",
      title: "Error al agregar el control",
      text: errorData.error,
    });
  }
}

async function eliminarControl(idControl) {
  const { isConfirmed } = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!",
    cancelButtonText: "Cancelar",
  });

  if (isConfirmed) {
    const response = await fetch(`/controles/eliminar-control/${idControl}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Control con ID ${idControl} eliminado`);
      cargarControles();

      Swal.fire({
        icon: "success",
        title: "Eliminado!",
        text: "El control ha sido eliminado.",
      });
    } else {
      console.error(`Error al eliminar el control con ID ${idControl}`);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal!",
      });
    }
  }
}

//Rutas
async function agregarRutaDataBase() {
  const inputRuta = document.getElementById("input-ruta");
  const inputIdentificador = document.getElementById("input-identificador");
  const ruta = inputRuta.value;
  const identificador = inputIdentificador.value;

  const response = await fetch("/rutas/agregar-ruta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ruta, identificador }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(`Ruta agregada con el ID: ${data.id}`);
    inputRuta.value = "";
    inputIdentificador.value = "";
    cargarRutas();
  } else {
    const errorData = await response.json();
    console.error(`Error al agregar la ruta: ${errorData.error}`);
  }
}

async function cargarRutas() {
  const response = await fetch("/rutas/obtener-rutas");
  if (response.ok) {
    const rutas = await response.json();
    const listaRutas = document.getElementById("lista-rutas");
    listaRutas.innerHTML = ""; // Limpia el contenido de la lista antes de agregar nuevas rutas

    rutas.forEach((ruta) => {
      agregarRutaALista(ruta.id, ruta.identificador, ruta.ruta);
    });

    const totalRutasElement = document.getElementById("totalRutas");
    totalRutasElement.textContent = rutas.length; // Set the total count
  } else {
    console.error("Error al cargar las rutas");
  }
}

function agregarRutaALista(idRuta, identificador, ruta) {
  const listaRutas = document.getElementById("lista-rutas");

  const item = document.createElement("div");
  item.classList.add("item");
  item.setAttribute("data-id", idRuta);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const id = document.createElement("strong");
  id.textContent = `${identificador}: `;

  const textarea = document.createElement("textarea");
  textarea.rows = 2;
  textarea.classList.add("form-control");
  textarea.value = ruta;
  textarea.disabled = true; // Set the textarea to be disabled

  const eliminarBtn = document.createElement("button");
  eliminarBtn.classList.add("btn");
  eliminarBtn.classList.add("m-1");

  const trashIcon = document.createElement("i");
  trashIcon.classList.add("bi", "bi-trash");

  eliminarBtn.appendChild(trashIcon);
  eliminarBtn.classList.add("btn", "btn-danger", "btn-sm");

  eliminarBtn.onclick = () => eliminarRutaDataBase(idRuta);

  item.appendChild(eliminarBtn);
  item.appendChild(checkbox);
  item.appendChild(id);
  item.appendChild(textarea);

  listaRutas.appendChild(item);
}

async function eliminarRutaDataBase(idRuta) {
  const { isConfirmed } = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!",
    cancelButtonText: "Cancelar",
  });

  if (isConfirmed) {
    const response = await fetch(`/rutas/eliminar-ruta/${idRuta}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Ruta con ID ${idRuta} eliminada`);
      cargarRutas();

      Swal.fire({
        icon: "success",
        title: "Eliminado!",
        text: "La ruta ha sido eliminada.",
      });
    } else {
      console.error(`Error al eliminar la ruta con ID ${idRuta}`);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal!",
      });
    }
  }
}

// Funciones generales
function generarBash() {
  const checkboxes = document.querySelectorAll(
    '#lista-controles input[type="checkbox"]'
  );
  const seleccionados = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const raizControl =
        checkbox.parentElement.querySelector("span").textContent;
      const nombreControl =
        checkbox.parentElement.querySelector("strong").textContent;
      seleccionados.push({ nombreControl, raizControl });
    }
  });

  const bashOutput = document.getElementById("bash-output");

  bashOutput.value = `#!/bin/bash\n\ncontroles=("${seleccionados
    .map((item) => item.nombreControl)
    .join('" "')}")\n`;

  bashOutput.value += `\n# Copiar cada control seleccionado desde las rutas de origen especificadas a un directorio específico\n`;

  const rutasOrigen = document.querySelectorAll(
    '#lista-rutas input[type="checkbox"]:checked'
  );
  seleccionados.forEach((control) => {
    bashOutput.value += `echo "---------------- Copiando a ${control.nombreControl} --------------------->"\n`;
    rutasOrigen.forEach((rutaElement) => {
      const ruta = rutaElement.parentElement.querySelector("span").textContent;
      bashOutput.value += `rsync -azvh /ssd/www/control${ruta} ${control.raizControl}${control.nombreControl}${ruta}\n`;
    });
    bashOutput.value += `echo "---------------- ${control.nombreControl} Copiado con éxito -------------->"\n`;
  });

  bashOutput.value += `echo "Todos los controles seleccionados han sido copiados con éxito."\n`;
}

async function confirmarEnvioBash() {
  const { isConfirmed } = await Swal.fire({
    title: "¿Estás seguro de enviar el Bash?",
    text: "Esta acción ejecutará el script Bash en el servidor remoto.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, enviar",
    cancelButtonText: "Cancelar",
  });

  if (isConfirmed) {
    enviarBash();
  }
}

function enviarBash() {
  const bashOutput = document.getElementById("bash-output").value;
  const blob = new Blob([bashOutput], { type: "text/plain" });
  const formData = new FormData();

  formData.append("bash-script", blob, "script.bash");

  fetch("/upload-bash", {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.ok) {
      Swal.fire({
        title: "Éxito!",
        text: "El archivo bash ha sido enviado al servidor SSH.",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Ha ocurrido un error al enviar el archivo bash al servidor SSH.",
        icon: "error",
      });
    }
  });
}

function seleccionarTodos() {
  const seleccionarTodoCheckbox = document.getElementById("seleccionar-todo");
  const checkboxes = document.querySelectorAll(
    '#lista-controles input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.checked = seleccionarTodoCheckbox.checked;
  });
}

function reemplazarBarrasInclinadas(input) {
  var rutaRelativa = input.value;
  var rutaModificada = rutaRelativa.replace(/\\/g, "/");
  input.value = rutaModificada;
}

document.addEventListener("DOMContentLoaded", () => {
  cargarControles();
  cargarRutas(); // Añadir esta línea
});

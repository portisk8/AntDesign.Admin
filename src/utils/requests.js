import { notification } from "antd";
import axios from "axios";
import { file } from "jszip";
import Emitter from "./emitter";
import CONFIG from "../common/environment";

const codeMessage = {
  200: "El servidor devolvió correctamente los datos solicitados.",
  201: "Los datos nuevos o modificados son exitosos.",
  202: "Una solicitud ha ingresado a la cola de fondo (tarea asíncrona).",
  204: "La información fue eliminada exitosamente",
  400: "La solicitud se realizó con un error y el servidor no realizó ninguna operación de datos nueva o modificada.",
  401: "El usuario no autenticado (el token, el nombre de usuario, la contraseña son incorrectos).",
  403: "El usuario no tiene permiso.",
  404: "La solicitud se realiza para un registro que no existe y el servidor no funciona.",
  406: "El formato de la solicitud no está disponible.",
  410: "El recurso solicitado se elimina permanentemente y no se recuperará.",
  422: "Se produjo un error de validación al crear un objeto.",
  500: "Se produjo un error en el servidor. Compruebe el servidor.",
  502: "Error de puerta de enlace",
  503: "El servicio no está disponible y el servidor está temporalmente sobrecargado o mantenido.",
  504: "La puerta de enlace agotó el tiempo de espera.",
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `Error de solicitud ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

export function axiosRequest(url, option, hideNotification) {
  return axios({
    url: url,
    method: option.method,
    headers: option.headers,
    data: option.body,
  })
    .then(checkStatus)
    .then((response) => {
      return response;
    })
    .catch(function (e) {
      const status = e.response ? e.response.status : null;
      if (status === 401 && !hideNotification) {
        console.log("401");

        Emitter.emit("LOGOUT");
        return;
      }
      if (status === 403 && !hideNotification) {
        notification.error({
          message: "Error en la solicitud",
          description: "No tiene permisos para esa acción",
        });

        return;
      }

      let mensaje = "Ocurrió un error en la solicitud.";

      if (e.response && e.response.data) {
        if (e.response.data.mensaje) {
          mensaje = e.response.data.mensaje;
        }
      } else if (e.message) {
        mensaje = e.message;
      }
      //let mensaje = e.response.data ? e.response.data : e.message;

      if (!hideNotification) {
        notification.error({
          message: `Error de solicitud`,
          description: mensaje,
        });
      }
      return e.response ? e.response.data : null;
    });
}

export function axiosRequestBlob(url, option) {
  return axios({
    url: url,
    method: option.method,
    headers: option.headers,
    data: option.body,
    responseType: option.responseType,
  })
    .then(checkStatus)
    .then((response) => {
      return response; //.json();
    })
    .catch(function (e) {
      const status = e.response ? e.response.status : null;
      if (status === 401) {
        Emitter.emit("LOGOUT");
        return;
      }
      //   if (isDevelop) {
      notification.error({
        message: `Error de solicitud`,
        description: e.message,
      });
      //   }
      return;
    });
}

export function requestWithProgress(url, options, onProgress) {
  if (options && options.body) {
    options.body = JSON.stringify(options.body);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.status + " " + response.statusText);
      }

      // ensure ReadableStream is supported
      if (!response.body) {
        throw Error("ReadableStream not yet supported in this browser.");
      }

      // store the size of the entity-body, in bytes
      const contentLength = response.headers.get("content-length");
      const contentType = response.headers.get("content-type");

      // ensure contentLength is available
      if (!contentLength) {
        throw Error("Content-Length response header unavailable");
      }

      // parse the integer into a base-10 number
      const total = parseInt(contentLength, 10);

      let loaded = 0;

      return new Response(
        // create and return a readable stream
        new ReadableStream({
          start(controller) {
            const reader = response.body.getReader();

            read();
            function read() {
              reader
                .read()
                .then(({ done, value }) => {
                  if (done) {
                    controller.close();
                    return;
                  }
                  loaded += value.byteLength;
                  onProgress({ loaded, total });
                  controller.enqueue(value);
                  read();
                })
                .catch((error) => {
                  console.error(error);
                  controller.error(error);
                });
            }
          },
        }),
        { headers: { "content-type": contentType } }
      );
    })
    .then(async (response) => {
      // construct a blob from the data
      let blob = await response.blob();
      return blob;
    })
    .then((data) => {
      // insert the downloaded image into the page
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

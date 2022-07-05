import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import CONFIG from "../../common/environment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotifications,
  getNotifications,
  incrementTotalNotificationsPending,
  setHub,
  setTotalNotificationsPending,
} from "../../store/slices/notifications";
import { notification } from "antd";

export function useNotifications() {
  const dispatch = useDispatch();
  const { totalNotificationsPending } = useSelector(
    (state) => state.notifications
  );

  const connect = () => {
    let connection = new HubConnectionBuilder()
      .withUrl(`${CONFIG.API_URL}/signalr/notifications`)
      .build();

    connection.on("notif", (notificacion) => {
      console.log(notificacion);
      dispatch(incrementTotalNotificationsPending());
      notification["info"]({
        message: "Notificacion",
        description: notificacion,
      });
    });

    connection
      .start()
      .then(() => {
        //una vez iniciado, nos registramos al canal
        console.log("Se ha conectado con el HUB");

        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser && currentUser.userId) {
          connection
            .invoke("addUser", currentUser.userId.toString())
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => {
        console.log("Error al iniciar la conexión con el hub");
      });
    // dispatch(setHub(connection));
  };

  useEffect(() => {
    console.log("UseNotifications");
    connect();
  }, []); // Empty array ensures that effect is only run on mount

  const get = async () => {
    return dispatch(getNotifications());
  };
  const clear = async () => {
    return dispatch(clearNotifications());
  };
  const setCounter = (counter) => {
    return dispatch(setTotalNotificationsPending(0));
  };
  return { get, clear, setCounter };
}

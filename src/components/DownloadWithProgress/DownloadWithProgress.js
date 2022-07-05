import { Alert, Button, Modal, Progress, Spin } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";

export const DownloadWithProgress = forwardRef((props, ref) => {
  const [downloadingProgress, setDownloadingProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  useImperativeHandle(ref, () => ({
    async download(callFunction, formData) {
      setVisible(true);
      setDownloadingProgress(0);
      setDownloading(true);
      await dispatch(callFunction(formData, onProgress));
      setDownloading(false);
    },
  }));

  const onProgress = ({ loaded, total }) => {
    let progress = Math.round((loaded / total) * 100);
    console.log(
      "Total: ",
      total,
      " | Loaded: ",
      loaded,
      " | Progress:",
      progress
    );
    setDownloadingProgress(progress);
  };

  return (
    <Modal
      title="Estado de la descarga"
      visible={visible}
      closable={false}
      footer={[
        <Button
          key="submit"
          type="primary"
          disabled={downloadingProgress < 100}
          onClick={() => {
            setDownloading(false);
            setVisible(false);
          }}
        >
          Cerrar
        </Button>,
      ]}
    >
      <Spin tip="Preparando el archivo..." spinning={downloadingProgress == 0}>
        <div style={{ textAlign: "center" }}>
          <Progress type="circle" percent={downloadingProgress} />
          <br />
          <br />
          {downloadingProgress > 0 && downloadingProgress < 100 && (
            <Alert message="Descargando..." type="info" />
          )}
          {downloadingProgress == 100 && (
            <Alert message="¡Descarga finalizada!" type="success" />
          )}
        </div>
      </Spin>
    </Modal>
  );
});

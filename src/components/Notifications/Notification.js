import { BellOutlined } from "@ant-design/icons";
import { Popover, Badge, Tabs, Spin, List, Empty, Divider, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "./useNotification";
import NotificationList from "./NotificationList";
import Avatar from "antd/lib/avatar/avatar";
import "./notificationStyle.scss";
import dayjs from "dayjs";
import NotificationIcon from "../../assets/images/petitionIcon.png";
import moment from "moment";
const listData = [
  {
    email: "Email",
    picture:
      "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    name: "Nombre1",
  },
];

function Notification(props) {
  const notifications = useNotifications();
  const dispatch = useDispatch();
  const { loading, totalNotificationsPending, notificationList } = useSelector(
    (state) => state.notifications
  );

  const onPopupVisibleChange = (isVisible) => {
    if (isVisible) {
      notifications.get();
      notifications.setCounter(0);
    }
  };

  const clearNotifications = () => {
    console.log("clearNotifications");
    notifications.clear();
  };

  const notificationBox = () => {
    const tabPaneContent =
      notificationList.length == 0 ? (
        //   listData.length == 0 ? (
        <div>
          <Empty
            description={"No hay notificaciones nuevas"}
            image="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
        </div>
      ) : (
        <List
          dataSource={notificationList}
          renderItem={(item) => (
            <span className="actionNotice">
              <List.Item key={item.mensajeId}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={NotificationIcon}
                      style={{
                        alignItems: "center",
                      }}
                    />
                  }
                  title={
                    <div className={"notification-title"}>
                      {item.asunto}
                      {item.extra && (
                        <div className={"notification-extra"}>{item.extra}</div>
                      )}
                    </div>
                  }
                  //   description=
                  description={
                    <div>
                      {item.description && (
                        <div className={"notification-description"}>
                          {item.description}
                        </div>
                      )}
                      <div className={"notification-datetime"}>
                        {moment(item.fecha).fromNow()}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            </span>
          )}
        />
      );
    return (
      <Spin spinning={loading} delay={0}>
        <Tabs
          centered
          // className={styles.tabs}
          //   onChange={this.onTabChange}
          style={{ minWidth: 22, width: 336, padding: 0 }}
        >
          <Tabs.TabPane
            tab={`Notificaciones (${notificationList.length})`}
            key={1}
          >
            {tabPaneContent}
            {notificationList.length > 0 && (
              <div>
                <Divider style={{ marginTop: 7, marginBottom: 7 }} />
                <Button
                  onClick={clearNotifications}
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  Vaciar notificaciones
                </Button>
              </div>
            )}
          </Tabs.TabPane>
        </Tabs>
      </Spin>
    );
  };
  return (
    <Popover
      id="NotificationPopover"
      placement="bottomRight"
      content={notificationBox}
      // popupClassName={styles.popover}
      trigger="click"
      arrowPointAtCenter
      align={{ offset: [20, -16] }}
      onVisibleChange={onPopupVisibleChange}
      // {...popoverProps}
    >
      <span className={"action"}>
        <Badge count={totalNotificationsPending}>
          <BellOutlined style={{ fontSize: 18 }} />
        </Badge>
      </span>
    </Popover>
  );
}

export default Notification;

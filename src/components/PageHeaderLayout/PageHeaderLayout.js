import { Breadcrumb, Divider, Spin } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMenuData } from "../../common/menu";
import { setBreadcrumb } from "../../store/slices/layout";
import { searchTree } from "../../utils/utils";
import "./PageHeaderLayout.scss";
import { useWindowSize } from "../../utils/Hooks/useWindowSize";
import { useState } from "react";

function PageHeaderLayout({
  children,
  title,
  rightButton,
  top,
  showBreadcrumb = true,
  show = true,
  loading = false,
  ...restProps
}) {
  const { breadCrumb } = useSelector((state) => state.layout);
  const [contentPosition, setContentPosition] = useState(0);
  const items = getMenuData();
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  useEffect(() => {
    var pathNamesplitted = window.location.pathname.split("/");
    var lasPathKey = pathNamesplitted.pop();
    var node = searchTree(items, "key", lasPathKey);
    if (node) {
      dispatch(setBreadcrumb(node.breadcrumb));
    }
  }, []);

  return show ? (
    <div
      style={{
        // margin: "-24px -24px 0"
        minHeight: isNaN(windowSize.height - contentPosition - 31)
          ? 0
          : windowSize.height - contentPosition - 31,
      }}
    >
      {top}
      <PageHeader
        key="pageheader"
        {...restProps}
        title={
          <div>
            {showBreadcrumb && (
              <Breadcrumb>
                {breadCrumb.map((b, index) => (
                  <Breadcrumb.Item key={`breadcrumb-${index}`}>
                    {b.label}
                    {/* {b.isClickeable ? (
                      <Link to={b.path}>{b.label}</Link>
                    ) : (
                      b.label
                    )} */}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            )}
            <span>
              {title} {rightButton}
            </span>
          </div>
        }
        style={{ backgroundColor: "white", ...restProps.style }}
      />
      {children ? (
        <div
          key={"#"}
          className={`content`}
          ref={(el) => {
            // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
            if (!el) return;

            // console.log(el.getBoundingClientRect().top); // prints 200px
            // console.log(el.getBoundingClientRect().y); // prints 200px
            setContentPosition(el.getBoundingClientRect().y);
          }}
        >
          <Divider key={`key-}`} style={{ margin: 0 }} />
          <div
            style={{
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            {loading ? (
              <div style={{ margin: 25, textAlign: "center" }}>
                <Spin size="large" />{" "}
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <div
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        // minHeight: windowSize.height - contentPosition - 21,
      }}
    >
      {loading ? (
        <div style={{ margin: 25, textAlign: "center" }}>
          <Spin size="large" />{" "}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default PageHeaderLayout;

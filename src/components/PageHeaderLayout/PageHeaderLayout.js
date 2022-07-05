import { PageHeader, Breadcrumb, Divider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMenuData } from "../../common/menu";
import { setBreadcrumb } from "../../store/slices/layout";
import { searchTree } from "../../utils/utils";
import "./PageHeaderLayout.scss";

function PageHeaderLayout({
  children,
  title,
  rightButton,
  top,
  showBreadcrumb = true,
  ...restProps
}) {
  const { breadCrumb } = useSelector((state) => state.layout);
  const items = getMenuData();
  const dispatch = useDispatch();
  useEffect(() => {
    var pathNamesplitted = window.location.pathname.split("/");
    var lasPathKey = pathNamesplitted.pop();
    var node = searchTree(items, "key", lasPathKey);
    if (node) {
      dispatch(setBreadcrumb(node.breadcrumb));
    }
  }, []);

  return (
    <div
      style={
        {
          // margin: "-24px -24px 0"
        }
      }
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
        <div className={`content`}>
          <Divider style={{ margin: 0 }} />
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default PageHeaderLayout;

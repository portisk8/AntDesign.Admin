import { isUrl } from "../utils/utils";
import Icon, {
  FontColorsOutlined,
  HomeOutlined,
  LineHeightOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const menuData = [
  {
    key: "inicio",
    label: "Inicio",
    icon: <HomeOutlined />,
    // children,
    // type,
    path: "",
  },
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <FontColorsOutlined />,
    // children: [],
    // type,
    path: "dashboard",
  },
  {
    key: "test",
    label: "Test",
    icon: <LineHeightOutlined />,
    // children: [],
    // type,
    path: "test",
  },
  {
    key: "testParent",
    label: "Test Expansible",
    icon: <ScheduleOutlined />,
    // children: [],
    // type,
    path: "test",
    children: [
      {
        key: "testConId",
        label: "Test con Id 1",
        icon: <SettingOutlined />,
        path: "1",
        // children: [],
      },
    ],
  },
];

function formatter(data, parentPath = "/", parentAuthority, breadcrumbData) {
  return data.map((item, index) => {
    let { path } = item;

    let breadcrumb = breadcrumbData ?? [];
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      index,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      breadcrumb.push({
        label: item.label,
        path: item.path,
        isClickeable: false,
      });
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority,
        breadcrumb
      );
    } else {
      breadcrumb.push({
        label: item.label,
        path: item.path,
        isClickeable: true,
      });
      result.breadcrumb = breadcrumb;
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);

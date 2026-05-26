export const navigation = [
  {
    label: "Tổng quan",
    icon: "dashboard",
    href: "/",
    title: "",
  },

  {
    label: "Bán hàng",
    icon: "point_of_sale",
    href: "/sales",
    title: "",
  },

  {
    label: "Sản phẩm",
    icon: "icecream",
    href: "/products",
    title: "",
  },

  {
    label: "Nhân viên",
    icon: "badge",
    href: "/staff/current-week",
    match: "/staff",
    title: "Nhân viên",

    tabs: [
      {
        label: "Tuần trước",
        href: "/staff/previous-week",
      },
      {
        label: "Tuần này",
        href: "/staff/current-week",
      },
      {
        label: "Tuần sau",
        href: "/staff/next-week",
      },
    ],
  },

  {
    label: "Kho hàng",
    icon: "inventory_2",
    href: "/inventory",
    title: "Kho hàng",
  },

  {
    label: "Báo cáo",
    icon: "analytics",
    href: "/reports",
    title: "Báo cáo",
  },

  {
    label: "Cài đặt",
    icon: "settings",
    href: "/settings",
    title: "",
  },
];

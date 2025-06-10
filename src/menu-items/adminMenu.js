// assets
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const adminMenu = {
  id: 'group-pages-admin',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    },
    {
      id: 'office_admin_tools',
      title: 'Office Admin Tools',
      type: 'item',
      url: '/admin/office_admin_tools',
      icon: icons.UserOutlined,
      breadcrumbs: true
    }
  ]
};

export default adminMenu;

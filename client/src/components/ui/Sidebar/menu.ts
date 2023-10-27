type MenuItem = {
  title: string;
  iconName: string;
  link: string;
  active?: boolean;
};

const menu = (loggedIn: boolean): MenuItem[] => {
  let menuItems: MenuItem[];

  if (loggedIn) {
    menuItems = [
      {
        title: 'Скринер',
        iconName: 'ShowChartIcon',
        link: '/',
      },
      {
        title: 'Портфолио',
        iconName: 'BusinessCenterIcon',
        link: '/portfolios',
      },
      {
        title: 'Выйти',
        iconName: 'BusinessCenterIcon',
        link: '/api/auth/signout',
      },
    ];
  } else {
    menuItems = [
      {
        title: 'Логин',
        iconName: 'BusinessCenterIcon',
        link: '/login',
      },
      {
        title: 'Регистрация',
        iconName: 'BusinessCenterIcon',
        link: '/register',
      },
    ];
  }

  return menuItems;
};

export default menu;

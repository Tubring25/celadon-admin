import React, { useState, useEffect } from 'react';
import { rootRouter } from '@/router/routes';
import type { MenuProps } from 'antd/es/menu';
import { Menu, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as Icons from '@ant-design/icons';
import Logo from './components/Logo';

const LayoutMenu = () => {
  const [loading] = useState<boolean>(false);
  const navigate = useNavigate();
  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    navigate(key);
    console.log(key);
  };

  type MenuItem = Required<MenuProps>['items'][number];
  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem => {
    return {
      key,
      children,
      label,
      icon,
    } as MenuItem;
  };
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    if (!name) return;
    return React.createElement(customIcons[name]);
  };
  const deepLoopFloat = (
    // @ts-ignore
    menuList: Menu.MenuOptions[],
    newArr: MenuItem[] = [],
  ) => {
    // @ts-ignore
    menuList.forEach((item: Menu.MenuOptions) => {
      if (!item?.children?.length)
        return newArr.push(
          getItem(item.meta.label, item.path, addIcon(item.meta?.icon ?? null)),
        );
      if (item.children.length === 1) {
        return newArr.push(
          getItem(
            item.children[0].meta.label,
            item.children[0].path,
            addIcon(item.meta?.icon ?? null),
          ),
        );
      }
      newArr.push(
        getItem(
          item.meta.label,
          item.path ?? item.meta.key,
          addIcon(item.meta?.icon ?? null),
          deepLoopFloat(item.children),
        ),
      );
    });
    return newArr;
  };

  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const getMenuData = async () => {
    try {
      const data = rootRouter.filter(item => item.children?.length);
      if (!data) return;
      setMenuList(deepLoopFloat(data));
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getMenuData();
  }, []);
  return (
    <div className='menu'>
      <Spin spinning={loading} tip='Loading...'>
        <Logo />
        <Menu
          theme='dark'
          mode='inline'
          triggerSubMenuAction='click'
          items={menuList}
          onClick={clickMenu}
        />
      </Spin>
    </div>
  );
};

export default LayoutMenu;

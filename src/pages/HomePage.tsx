import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Card } from 'antd';
import { Button, Space } from 'antd';
import { IProduct } from '../types/products';
import { useEffect, useState } from "react"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Header, Content, Sider } = Layout;
interface IProps {
  products: IProduct[],
  onRemove: (id: number) => void
}
interface DataType {
  key: string | number;
  id: number;
  name: string;
  price: number;
}

//menu slider
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuProps['items'] = [
 
  getItem('Group', 'grp', null, [getItem('Admin', '13'), getItem('Product Page', '14')], 'group'),
];
//

const HomePage = (props: IProps) => {
  const [data, setData] = useState<IProduct[]>([])
  useEffect(() => {
     setData(props.products)
    }, [props])
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
};
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Space className="site-button-ghost-wrapper" wrap>
        <Button ghost>SingUp</Button>
        <Button ghost>SignIn</Button>
        </Space>
       
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
      </Header>
      <Layout>
         <Sider width={300} style={{ background: colorBgContainer }}>
         <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
        </Sider> 
        <Layout style={{ padding: '0 24px 24px' }}>
        <div>
            <h1>Product Page</h1>
            {
             data && data.map(product => {
                    return (
                        <div key={product.id}>
                            <h2>{product.image}</h2>
                            <h2>{product.name}</h2>
                            <h2>{product.desc}</h2>
                            
                        </div>
                    )
                })
            }
        </div>
          
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;
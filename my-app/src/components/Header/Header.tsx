import React from 'react';
import  styles from './Header.module.css';
import {Link} from 'react-router-dom';
import {Avatar, Button, Col, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Layout} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/auth-selectors";
import {LogoutUserThunkCreator} from "../../redux/auth-reducer";


export const AppHeader: React.FC = ()=> {

    const {Header} = Layout;
    const isAuth = useSelector(selectIsAuth)

    const dispatch = useDispatch()
    const logout = () =>{
        dispatch(LogoutUserThunkCreator())
    }

    return <Header className="header">
          <div className="logo"/>
          <Row>
              <Col span={20}>
                  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                      <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
                  </Menu>
              </Col>
              {isAuth
                  ?<>
                      <Col span={1}>
                          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                      </Col>
                  <Col span={3}>
                      <Button onClick={logout}>Logout</Button>
                  </Col>
                  </>
                  : <Col span={4}>
                      <Button>
                          <Link to="/login">Login</Link>
                      </Button>
                  </Col>

              }

          </Row>

      </Header>

}


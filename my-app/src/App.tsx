import React, {Component} from 'react';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer'
import {NavLink, Route, withRouter} from 'react-router-dom';
import {Login} from './components/Login/Login';
import {initializeApp} from './redux/app-reducer';
import {connect} from 'react-redux';
import Preloader from './components/common/Preloader';
import {compose} from 'redux';
import {withSuspense} from './hoc/withSuspense';
import {AppStateType} from "./redux/redux-store";
import {UserPage} from "./components/Users/UsersContainer";
import 'antd/dist/antd.css';

import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import styles from "./components/NavBar/NavBar.module.css";
import {AppHeader} from "./components/Header/Header";


const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const ProfileContainerWithSuspense = withSuspense(ProfileContainer)
const ChatPageWithSuspense = withSuspense(ChatPage)

class App extends Component<MapPropsType & DispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {

            return <Preloader/>
        }
        return (
            <Layout>
               <AppHeader/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                // defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >


                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1"><NavLink to="/profile">Profile</NavLink></Menu.Item>
                                    <Menu.Item key="2"><NavLink to="/dialogs">Messages</NavLink></Menu.Item>
                                </SubMenu>

                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="5"><NavLink to="/developers">Developers</NavLink></Menu.Item>
                                </SubMenu>

                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Chat">
                                    <Menu.Item key="5"><NavLink to="/chat">Chat</NavLink></Menu.Item>
                                </SubMenu>

                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>

                            <div>

                                <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>

                                <Route path='/profile/:userId?' render={() => <ProfileContainerWithSuspense/>}/>

                                <Route path='/developers' render={() => <UserPage/>}/>
                                <Route path='/chat' render={() => <ChatPageWithSuspense/>}/>
                                <Route path='/login' render={() => <Login/>}/>


                            </div>

                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Samurai Social Network created by Farid Aliyev</Footer>
            </Layout>


        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)


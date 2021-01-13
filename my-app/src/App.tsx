import React, {Component} from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import DialogsContainer from './components/Dialogs/DialogsContainer'
import {Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {initializeApp} from './redux/app-reducer';
import {connect} from 'react-redux';
import Preloader from './components/common/Preloader';
import {compose} from 'redux';
import {withSuspense} from './hoc/withSuspense';
import {AppStateType} from "./redux/redux-store";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapPropsType= ReturnType<typeof mapStateToProps>
type DispatchPropsType= {
    initializeApp:()=>void
}

class App extends Component<MapPropsType & DispatchPropsType > {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {

            return <Preloader/>
        }
      return (
          <div className='app-wrapper'>
              <HeaderContainer/>
              <NavBar/>
              <div className="app-wrapper-content">

                  <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>

                  <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>

                  <Route path='/users' render={() => <UsersContainer/>}/>
                  <Route path='/login' render={() => <Login/>}/>


              </div>

          </div>


      )
  }
}

const mapStateToProps=(state: AppStateType)=>({
  initialized:state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})
)(App)


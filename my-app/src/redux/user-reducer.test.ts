
import userReducer, {actions, initialStateType} from "./user-reducer";

let state : initialStateType;

beforeEach(()=>{
    state={
        users: [
            {id:0, name: "Farid 0", status: "status 0", followed:false, photos:{small:null, large: null}},
            {id:1, name: "Farid 1", status: "status 1", followed:false, photos:{small:null, large: null}},
            {id:2, name: "Farid 2", status: "status 2", followed:true, photos:{small:null, large: null}},
            {id:3, name: "Farid 3", status: "status 3", followed:true, photos:{small:null, large: null}}
            ],
        totalUsersCount: 0,
        pageSize: 10,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test("followSuccess", ()=>{
   // state
    const newState = userReducer(state, actions.followSuccess(1))
    //expect
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("unFollowSuccess", ()=>{
    const newState= userReducer(state, actions.unFollowSuccess(2))
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})
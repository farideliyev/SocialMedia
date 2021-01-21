import {actions, followThunkCreator, unfollowThunkCreator} from "./user-reducer";
import {usersAPI} from "../api/users-api";
import {ResponseType, ResultCodesEnum} from "../api/api";

jest.mock("../api/users-api")
const usersApiMock= usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn()
const getState=jest.fn()

beforeEach(()=>{
    dispatchMock.mockClear()
    getState.mockClear()
    usersApiMock.follow.mockClear()
    usersApiMock.unfollow.mockClear()
})


const result : ResponseType = {
    data: {},
    messages: [],
    resultCode:ResultCodesEnum.Success
}

usersApiMock.follow.mockReturnValue(Promise.resolve(result))
usersApiMock.unfollow.mockReturnValue(Promise.resolve(result))

test("follow thunk success", async ()=>{
    const thunk = followThunkCreator(1)


    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollow(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess( 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollow(false, 1))
})

test("unfollow thunk success", async ()=>{
    const thunk = unfollowThunkCreator(1)

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollow(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowSuccess( 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollow(false, 1))
})
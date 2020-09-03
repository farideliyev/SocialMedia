
import profileReducer, { deletePost } from './profile-reducer';

let state={
  postMessageData: [
    { message: "Salam olsun Civic surenlere", id: 1 },
    { message: "Type R xesteleri necesuz???", id: 2 }

  ]
}

test("delete post", ()=>{
  let action=deletePost(2);
  let newState=profileReducer(state, action)
  expect(newState.postMessageData.length).toBe(1)

})
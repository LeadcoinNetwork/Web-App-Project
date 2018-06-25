import UserActions from './users'


var userActions=new  UserActions()

test('create a new user',async()=>{
  userActions.createUser({
    // All details that required by the interface
  })
  var [user,err]=await userActions.insert()

  expect(err).toBeFalsy()
})
z

test('create a user with missing requried parameter',()=>{
  var [user,error]=userActions.createUser({
    // All details that required by the interface
  })
  expect(error).toBeTruthy()
})

test('user.getUserById existing',async ()=>{
    var insertResult=userActions.createUser({
    })
    var getResult=userActions.getUserById(user.id)
    expect(insertResult.user.id).toEqual(getResult.user)
})

test('getUserById not existing',async ()=>{
    var getResult=userActions.getUserById(-10)
    expect(getResult.user).toBeFalsy()
    expect(getResult.error).toBeFalsy()
})

test('get a user that has been created',async ()=>{
    var insertResult=userActions.createUser({
    })
    var getResult=userActions.getUserById(user.id)
    expect(insertResult.user.id).toEqual(getResult.user)
})


test('reset User password for existing user',async ()=>{
    // Create user
    var getResult=userActions.resetPassword(user_id,newPassword)
    expect(getResult.ok).toBeTruthy()
})
test('reset User password for non- existing user',async ()=>{
    var getResult=userActions.resetPassword(-200,newPassword)
    expect(getResult.ok).toBeFalsy)
    expect(getResult.ok).toBeTruthy
})

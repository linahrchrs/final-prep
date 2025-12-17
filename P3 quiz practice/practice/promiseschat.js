let chatRoom = require("chatroom-library");

let creds = {username: 'John_doe', password: 'securePass123'};
let token = null;
let roomName = 'JavaLovers';
let roomId = null;
let roomDesc = 'A room for java lovers and enthusiasts';
let target = 'Jane_doe';
let privateMsg = 'Hey Jane, how are  you?';
let publicMsg = 'Hello everyone!';

let chatRoom$ = new Promise((resolve, reject) => {
    chatRoom.createClient((err, chatroomClient)=> {
        if(err){
            reject(err);
        }else{
            resolve(chatroomClient);
        }
    });
});

chatRoom$
.then(chatroomClient => chatroomClient.createAccount(creds))
.then(result => {
    console.log("Account created successfully", result.return);
})
.catch(er => console.error("Create account error: ", er));

chatRoom$
.then(chatroomClient => chatroomClient.login(creds))
.then(result => {
    token = result.token;
    console.log("Logged in successfully. Your secret Token is: " + token);
})
.catch(er => console.error("Login error: ", er));

chatRoom$
.then(chatroomClient => chatroomClient.createRoom(token, roomName, roomDesc))
.then(result => {
    roomId = result.roomId;
    console.log("New room: " + roomName + "successfully created. The room id is: " + roomId);
})
.catch(er => console.error("Create room error: ", er));


//Orchestration with promise.all

chatRoom$
.then(chatroomClient => {
    return Promise.all([
        chatroomClient.creatAccount(creds),
        chatroomClient.login(creds),
        chatroomClient.createRoom(token, roomName, roomDesc),
        chatroomClient.discoverRooms(token, roomId),
        chatroomClient.listUserInRoom(token, roomId),
        chatroomClient.joinRoom(token, roomId),
        chatroomClient.sendPrivateMsg(token, targetUser, privateMsg),
        chatroomClient.sendPublicMsg(token, roomId, publicMsg),
        chatroomClient.leaveRoom(token, roomId),
        chatroomClient.logout(token)
    ]);
})
.then(result => {
    console.log("Account created: " + results[0].return);
    
    token = results[1].token;
    console.log("Logged in successfully. Token: " + token);

    roomId = results[2].roomId;
    console.log("Room created successfully. Room Id: " + roomId);
    console.log("Available rooms: " + JSON.stringify(results[3].rooms));
})
.catch(er => console.error("Error: ", er));
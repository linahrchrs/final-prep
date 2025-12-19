let soap = require('soap');
let url = 'src/main/resources/chatRoomService.wsdl';

let creds = {username: 'John_doe', password: 'securePass123'};
let token = null;
let roomName = 'JavaLovers';
let roomId = null;
let roomDesc = 'A room for java lovers and enthusiasts';
let target = 'Jane_doe';
let privateMsg = 'Hey Jane, how are  you?';
let publicMsg = 'Hello everyone!';


soap.createClient(url, (err,chatClient) =>{
    if(err){
        console.error('Client creation error: ', err);
        return;
    }

    chatClient.createAccount(creds, (er, result)=> {
        if(er){
            console.error("Create account error:", er);
            return;
        }
        console.log('Account created:' + result.return);
    });

    chatClient.login(creds, (er, result) => {
        if(er){
            console.error("Login error:", er);
            return;
        }
        token = result.token;
        console.log("Logged in successfuclly. You secret Token is: " + token);
    });

    chatClient.createRoom(token, roomName, roomDesc, (er,result)=> {
        if(er){
            console.error("Create room error:", er);
            return;
        }
        roomId = result.roomId;
        console.log('Room created. Your room ID is: ', roomId);
    });

    chatClient.discoverRooms(token, (er, result) => {
        if(er){
            console.error("Discover rooms error:", er);
            return;
        }
        console.log('Available rooms:', JSON.stringify(result.rooms));
    });

    chatClient.listUsersInRoom(token, roomId, (er, result) => {
        if(er){
            console.error("List users in room error:", er);
            return;
        }
        console.log('Users in room with id: ' + roomId + 'are:'+ result.users);
    });

    chatClient.joinRoom(token, roomId, (er, result) => {
        if(er){
            console.error("Join room error:", er);
            return;
        }
        console.log("Joined room with id: " + roomId + "successfully!");
    });

    chatClient.sendPrivateMessage(token, targetUser, privateMsg, (er, result) => {
        if(er){
            console.error("Send private message error: ", err);
            return;
        }
        console.log("Message sent to: " + targetUser + "successfully!");
    });

    chatClient.sendPublicMessage(token, roomId, publicMsg, (er, result) => {
        if(er){
            console.error("Send public message error: ", er);
            return;
        }
        console.log("Public message sent in room with id: " + roomId + "successfully!");
    });

    chatClient.leaveRoom(token, roomId, (er, result) => {
        if(er){
            console.error("Leave room error: ", er);
            return;
        }
        console.log("Left room with id: " + roomId);
    });

    chatClient.logout(token, (er, result) => {
        if(er){
            console.error("Logout error: ", er);
            return;
        }
        console.log("Logged out successfully");
        token = null;
    });

});
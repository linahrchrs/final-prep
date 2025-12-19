let chatRoom = require('chatroom-library');

let creds = {username: 'John_doe', password: 'securePass123'};
let token = null;
let roomName = 'JavaLovers';
let roomId = null;
let roomDesc = 'A room for java lovers and enthusiasts';
let target = 'Jane_doe';
let privateMsg = 'Hey Jane, how are  you?';
let publicMsg = 'Hello everyone!'

let chatRoom$ = new Promise((reject,resolve) => {
    chatRoom.createClient((err, chatClient) => {
        if(err){
            reject(err);
        }else{
            resolve(chatClient);
        }
    });
});

async function chatroomOperations(){
    try{
        const chatClient = await chatRoom$;

        const createAccountResult = await chatClient.createAccount(creds);
        console.log("Account created: ", createAccountResult.return);

        const loginResult = await chatClient.login(creds);
        token = loginResult.token;
        console.log("Login success. Token: " + token);

        const createRoomResult = await chatClient.login(token, roomName, roomDesc);
        roomId = createRoomResult.roomId;
        console.log("Room created. Room ID: " + roomId);

        const discoverRoomsResult = await chatClient.discoverRooms(token);
        console.log("Rooms available: " + JSON.stringify(discoverRoomsResult.rooms));

        const joinRoomResult = await chatClient.joinRoom(token, roomId);
        console.log("Room with id: " + roomId + "Joined successfully");
    } catch(err) {
        console.error("Error: ", err);
    }
}

chatroomOperations();
let soap = require('soap');
let url = 'src/main/resources/ChatroomService.wsdl';

// User credentials and data
let creds = { username: 'john_doe', password: 'securePass123' };
let token = null;
let roomName = 'JavaLovers';
let roomId = null;
let roomDesc = 'A room for Java enthusiasts';
let targetUser = 'jane_doe';
let privateMsg = 'Hey Jane, how are you?';
let publicMsg = 'Hello everyone in the room!';

let chatClientPromise = new Promise((resolve, reject) => {
    soap.createClient(url, (err, chatClient) => {
        if (err) {
            reject(err);
        } else {
            resolve(chatClient);
        }
    });
});

async function runChatroomOperations() {
    try {
        const chatClient = await chatClientPromise;
        
        // 1. Create Account
        const createAccountResult = await chatClient.createAccount(creds);
        console.log('Account created: ' + createAccountResult.return);
        
        // 2. Login (receive token)
        const loginResult = await chatClient.login(creds);
        token = loginResult.token;
        console.log('Logged in successfully. Token: ' + token);
        
        // 3. Create Room
        const createRoomResult = await chatClient.createRoom(token, roomName, roomDesc);
        roomId = createRoomResult.roomId;
        console.log('Room created. Room ID: ' + roomId);
        
        // 4. Discover Rooms
        const discoverRoomsResult = await chatClient.discoverRooms(token);
        console.log('Available rooms: ' + JSON.stringify(discoverRoomsResult.rooms));
        
        // 5. List Users in a Room
        const listUsersResult = await chatClient.listUsersInRoom(token, roomId);
        console.log('Users in ' + roomName + ': ' + listUsersResult.users);
        
        // 6. Join a Room
        const joinRoomResult = await chatClient.joinRoom(token, roomId);
        console.log('Joined room: ' + joinRoomResult.return);
        
        // 7. Send Private Message
        const privateMessageResult = await chatClient.sendPrivateMessage(token, targetUser,privateMsg);
        console.log('Private message sent to ' + targetUser + ': ' + privateMessageResult.return);
        
        // 8. Send Public Broadcast in Room
        const broadcastResult = await chatClient.sendPublicBroadcast(token, roomId, publicMsg);
        console.log('Broadcast sent to ' + roomName + ': ' + broadcastResult.return);
        
        // 9. Leave a Room
        const leaveRoomResult = await chatClient.leaveRoom( token, roomId);
        console.log('Left room: ' + leaveRoomResult.return);
        
        // 10. Logout
        const logoutResult = await chatClient.logout( token);
        console.log('Logged out: ' + logoutResult.return);
        token = null;
        
    } catch (err) {
        console.error('Error:', err);
    }
}

runChatroomOperations();
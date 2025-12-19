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

soap.createClient(url, (err, chatClient) => {
    if (err) {
        console.error('Client creation error:', err);
        return;
    }
    
    // 1. Create Account
    chatClient.createAccount(creds, (er, result) => {
        if (er) {
            console.error('Create account error:', er);
            return;
        }
        console.log('Account created: ' + result.return);
    });
    
    // 2. Login (receive token)
    chatClient.login(creds, (er, result) => {
        if (er) {
            console.error('Login error:', er);
            return;
        }
        token = result.token;
        console.log('Logged in successfully. Token: ' + token);
    });
    
    // 3. Create Room
    chatClient.createRoom(token, roomName, roomDesc, (er, result) => {
        if (er) {
            console.error('Create room error:', er);
            return;
        }
        roomId = result.roomId;
        console.log('Room created: ' + roomId);
    });
    
    // 4. Discover Rooms
    chatClient.discoverRooms(token , (er, result) => {
        if (er) {
            console.error('Discover rooms error:', er);
            return;
        }
        console.log('Available rooms: ' + JSON.stringify(result.rooms));
    });
    
    // 5. List Users in a Room
    chatClient.listUsersInRoom(token, roomName, roomId, (er, result) => {
        if (er) {
            console.error('List users error:', er);
            return;
        }
        console.log('Users in ' + roomName + ': ' + result.users);
    });
    
    // 6. Join a Room
    chatClient.joinRoom( token, roomId, (er, result) => {
        if (er) {
            console.error('Join room error:', er);
            return;
        }
        console.log('Joined room: ' + result.return);
    });
    
    // 7. Send Private Message
    chatClient.sendPrivateMessage( token, targetUser, privateMsg, (er, result) => {
        if (er) {
            console.error('Send private message error:', er);
            return;
        }
        console.log('Private message sent to ' + targetUser + ': ' + result.return);
    });
    
    // 8. Send Public Broadcast in Room
    chatClient.sendPublicBroadcast( token, roomId, publicMsg, (er, result) => {
        if (er) {
            console.error('Send broadcast error:', er);
            return;
        }
        console.log('Broadcast sent to ' + roomName + ': ' + result.return);
    });
    
    // 9. Leave a Room
    chatClient.leaveRoom(token, roomId, (er, result) => {
        if (er) {
            console.error('Leave room error:', er);
            return;
        }
        console.log('Left room: ' + result.return);
    });
    
    // 10. Logout
    chatClient.logout(token, (er, result) => {
        if (er) {
            console.error('Logout error:', er);
            return;
        }
        console.log('Logged out: ' + result.return);
        token = null;
    });
});
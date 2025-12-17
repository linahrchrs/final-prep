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

// 1. Create Account
chatClientPromise
    .then(chatClient => chatClient.createAccount(creds))
    .then(result => {
        console.log('Account created: ' + result.return);
    })
    .catch(err => console.error('Create account error:', err));

// 2. Login (receive token)
chatClientPromise
    .then(chatClient => chatClient.login( creds))
    .then(result => {
        token = result.token;
        console.log('Logged in successfully. Token: ' + token);
    })
    .catch(err => console.error('Login error:', err));

// 3. Create Room
chatClientPromise
    .then(chatClient => chatClient.createRoom( token, roomName, roomDesc ))
    .then(result => {
        roomId = result.roomId;
        console.log('Room created, Room ID: ' + roomId);
    })
    .catch(err => console.error('Create room error:', err));

// 4. Discover Rooms
chatClientPromise
    .then(chatClient => chatClient.discoverRooms(token))
    .then(result => {
        console.log('Available rooms: ' + JSON.stringify(result.rooms));
    })
    .catch(err => console.error('Discover rooms error:', err));

// 5. List Users in a Room
chatClientPromise
    .then(chatClient => chatClient.listUsersInRoom( token, roomId))
    .then(result => {
        console.log('Users in ' + roomName + ': ' + result.users);
    })
    .catch(err => console.error('List users error:', err));

// 6. Join a Room
chatClientPromise
    .then(chatClient => chatClient.joinRoom( token, roomId ))
    .then(result => {
        console.log('Joined room: ' + result.return);
    })
    .catch(err => console.error('Join room error:', err));

// 7. Send Private Message
chatClientPromise
    .then(chatClient => chatClient.sendPrivateMessage(token, targetUser, privateMsg ))
    .then(result => {
        console.log('Private message sent to ' + targetUser + ': ' + result.return);
    })
    .catch(err => console.error('Send private message error:', err));

// 8. Send Public Broadcast in Room
chatClientPromise
    .then(chatClient => chatClient.sendPublicBroadcast( token, roomId, publicMsg ))
    .then(result => {
        console.log('Broadcast sent to ' + roomName + ': ' + result.return);
    })
    .catch(err => console.error('Send broadcast error:', err));

// 9. Leave a Room
chatClientPromise
    .then(chatClient => chatClient.leaveRoom( token, roomId ))
    .then(result => {
        console.log('Left room: ' + result.return);
    })
    .catch(err => console.error('Leave room error:', err));

// 10. Logout
chatClientPromise
    .then(chatClient => chatClient.logout( token ))
    .then(result => {
        console.log('Logged out: ' + result.return);
        token = null;
    })
    .catch(err => console.error('Logout error:', err));


// ============================= Ofrchestration with Promise.all =============================
chatClientPromise
    .then(chatClient => {
        return Promise.all([
            chatClient.createAccount(creds),
            chatClient.login(creds),
            chatClient.createRoom( token, roomName, roomDesc),
            chatClient.discoverRooms( token ),
            chatClient.listUsersInRoom(token, roomId),
            chatClient.joinRoom( token, roomId ),
            chatClient.sendPrivateMessage(token, targetUser, privateMsg ),
            chatClient.sendPublicBroadcast( token, roomId, publicMsg ),
            chatClient.leaveRoom( token, roomId ),
            chatClient.logout( token )
        ]);
    })
    .then(results => {
        console.log('Account created: ' + results[0].return);
        
        token = results[1].token;
        console.log('Logged in successfully. Token: ' + token);
        
        roomId = results[2].roomId
        console.log('Room create. Your room ID is: ' + roomId);
        console.log('Available rooms: ' + JSON.stringify(results[3].rooms));
        console.log('Users in ' + roomName + ': ' + results[4].users);
        console.log('Joined room: ' + results[5].return);
        console.log('Private message sent to ' + targetUser + ': ' + results[6].return);
        console.log('Broadcast sent to ' + roomName + ': ' + results[7].return);
        console.log('Left room: ' + results[8].return);
        console.log('Logged out: ' + results[9].return);
        
        token = null;
    })
    .catch(err => {
        console.error('Error:', err);
    });
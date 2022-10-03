async function sendData(data_){
    var data = null;
    try{
        const formData = new FormData()
        formData.append('search', data_.search);
        formData.append('user_id', data_.id);
        formData.append('username', data_.username);
        var  response = await fetch('http://192.168.64.2/ChatServer/request/friends_request.php', {
            method: 'POST',
            mode:'cors',
            body: formData
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            alert("Connection", message, "Okay", ()=>{
            });
        }
        data = await response.json();
    }catch(error){
        console.log(error);
        alert("Connection", "There was an error connecting", "Okay", ()=>{
        });
    }
    return data;
}

async function addFriend(data_){
    var data = null;
    try{
        const formData = new FormData()
        formData.append('add', data_.id);
        formData.append('username', data_.username);
        var  response = await fetch('http://192.168.64.2/ChatServer/request/friends_request.php', {
            method: 'POST',
            mode:'cors',
            body: formData
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            alert("Connection", message, "Okay", ()=>{
            });
        }
        data = await response.json();
    }catch(error){
        console.log(error);
        alert("Connection", "There was an error connecting", "Okay", ()=>{
        });
    }
    return data;
}

function generateFriend(friend_){
    var friend = document.createElement("div");
    var friendProfile = document.createElement("img");
    var info = document.createElement('div');
    var friendName = document.createElement('h1');
    var friendDescription = document.createElement('h1');
    var button = document.createElement('button');

    friend.className = "friend";
    friendProfile.className = "profile_pic";
    info.className = "info";
    button.id = "add_friend";

    button.innerHTML = "Add";
    button.onclick = function(){
        addFriend(
            {
                id: friend_.id,
                username: user.username
            }
        ).then((data) => {
            if(data.error === false)
            {
                /*var user_store = {
                    id: data.user.id,
                    firstName: data.user.firstName,
                    surname: data.user.surname,
                    phoneNumber: data.user.phoneNumber,
                    dateOfBirth: data.user.dateOfBirth,
                    profileImage: data.user.profileImage,
                    username: (data.user.surname+"_"+data.user.firstName),
                    status: data.user.status,
                }*/
                button.disabled = true;
                button.style.border = "1px solid rgb(200,200,200)";
                button.style.color = "rgb(200,200,200)";
            }else{
                alert("Request", data.message, "Okay", ()=>{
                });
            }
        }).catch((error)=>{
            alert("Connection", "There was an error connecting", "Okay", ()=>{
            });
        });
    }

    friendProfile.src = url+friend_.profilePicture;

    friendName.innerHTML = friend_.firstName+" "+friend_.surname;
    friendDescription.innerHTML = "this is a friend from the database";

    info.appendChild(friendName);
    info.appendChild(friendDescription);

    friend.appendChild(friendProfile);
    friend.appendChild(info);
    friend.appendChild(button);

    return friend;
}

function stopSearch(){
    document.getElementById('search').value = "";
   document.getElementById('search_friends').style.display = "none";
   getAllFriendsFromDatabase();
}

function displaySearch(){
    document.getElementById('search_friends').style.display = "block";
    var friends = document.getElementById('friends');
    for(var i = 3; i < friends.childNodes.length; i++)
    {
        friends.removeChild(friends.childNodes[i]);
    }
}

var search = "";
function searchForFriends(event){
    var k = event.keyCode;
    if (k == 20 /* Caps lock */
     || k == 16 /* Shift */
     || k == 9 /* Tab */
     || k == 27 /* Escape Key */
     || k == 17 /* Control Key */
     || k == 91 /* Windows Command Key */
     || k == 19 /* Pause Break */
     || k == 18 /* Alt Key */
     || k == 93 /* Right Click Point Key */
     || ( k >= 35 && k <= 40 ) /* Home, End, Arrow Keys */
     || k == 45 /* Insert Key */
     || ( k >= 33 && k <= 34 ) /*Page Down, Page Up */
     || (k >= 112 && k <= 123) /* F1 - F12 */
     || (k >= 144 && k <= 145 )) { /* Num Lock, Scroll Lock */
    }
    else {
        search = document.getElementById('search').value;
        if(search !== "")
        {
            sendData(
                {
                    search: search,
                    id: user.id,
                    username: user.username,
                }
            ).then((data) => {
                if(data.error === false)
                {
                    /*var user_store = {
                        id: data.user.id,
                        firstName: data.user.firstName,
                        surname: data.user.surname,
                        phoneNumber: data.user.phoneNumber,
                        dateOfBirth: data.user.dateOfBirth,
                        profileImage: data.user.profileImage,
                        username: (data.user.surname+"_"+data.user.firstName),
                        status: data.user.status,
                    }*/
                    for(var i = 0; i < data.friends.length; i++)
                    {
                        document.getElementById('search_friends').append(generateFriend(data.friends[i]));
                    }
                }else{
                    document.getElementById('search_friends').append(data.message);
                }
                var searched_ = document.getElementById('search_friends');
                for(var i = 2; i < searched_.childNodes.length; i++)
                {
                    searched_.removeChild(searched_.childNodes[i]);
                }
            }).catch((error)=>{
                alert("Connection", "There was an error connecting", "Okay", ()=>{
                });
            });
        }else{
            var searched_ = document.getElementById('search_friends');
                for(var i = 2; i < searched_.childNodes.length; i++)
                {
                    searched_.removeChild(searched_.childNodes[i]);
                }
            document.getElementById('search_friends').append("No users with this info found");
        }
    }
}
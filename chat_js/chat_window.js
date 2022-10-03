const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
async function getFriendsList(data_){
    var data = null;
    try{
        const formData = new FormData()
        formData.append('id', data_.id);
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
var currentlyChatting = null;
async function uploadChatMessage(data_){
    var data = null;
    try{
        const formData = new FormData()
        formData.append('save_message', data_.message);
        formData.append('username', data_.username);
        formData.append('from_user', data_.fromUser);
        formData.append('to_user', data_.toUser);
        formData.append('friend_id', data_.friendId);
        formData.append('message_type', data_.messageType);
        formData.append('day_of_message', data_.dayOfMessage);
        formData.append('date_of_message', data_.dateOfMessage);
        formData.append('mode', data_.mode);
        formData.append('status', data_.status);
        var  response = await fetch('http://192.168.64.2/ChatServer/request/chat_request.php', {
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

function saveChatMessage(username, friendId, message, from, to, day, date, mode, status){
    uploadChatMessage(
        {
            message: message,
            username: username,
            fromUser: from,
            toUser: to,
            friendId: friendId,
            messageType: 'MESSAGE',
            dayOfMessage: day,
            dateOfMessage: date,
            mode: mode,
            status: status
        }
    ).then((data) => {
        if(data.error === false)
        {
            //console.log(data);
        }else{
            alert("Connection", data.message, "Okay", ()=>{
            });
        }
    }).catch((error)=>{
        console.log(error);
        alert("Connection", "There was an error connecting", "Okay", ()=>{
        });
    });
}

async function uploadFileMessage(data_){
    var data = null;
    try{
        const formData = new FormData()
        formData.append('save_file', data_.file);
        formData.append('username', data_.username);
        formData.append('file_name', data_.fileName);
        formData.append('file_size', data_.fileSize);
        formData.append('file_type', data_.fileType);
        formData.append('from_user', data_.fromUser);
        formData.append('media_type', data_.mediaType);
        formData.append('media_name', data_.mediaName);
        formData.append('to_user', data_.toUser);
        formData.append('friend_id', data_.friendId);
        formData.append('message_type', data_.messageType);
        formData.append('day_of_message', data_.dayOfMessage);
        formData.append('date_of_message', data_.dateOfMessage);
        formData.append('mode', data_.mode);
        formData.append('status', data_.status);
        var  response = await fetch('http://192.168.64.2/ChatServer/request/chat_request.php', {
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

function saveChatFileMessage(username, friendId, file, fileName, fileSize, fileType, from, to, day, date, mode, status){
    uploadFileMessage(
        {
            file: file,
            username: username,
            fileName: fileName,
            fileSize: fileSize,
            fileType: fileType,
            mediaType: fileType,
            mediaName: fileName,
            fromUser: from,
            toUser: to,
            friendId: friendId,
            messageType: 'FILE',
            dayOfMessage: day,
            dateOfMessage: date,
            mode: mode,
            status: status
        }
    ).then((data) => {
        if(data.error === false)
        {
        }else{
            alert("Connection", data.message, "Okay", ()=>{
            });
        }
    }).catch((error)=>{
        console.log(error);
        alert("Connection", "There was an error connecting", "Okay", ()=>{
        });
    });
}

async function getFriendsMessageList(data_){
    var data = null;
    try{
        const formData = new FormData()
        formData.append('messages', data_.user);
        formData.append('id_messages', data_.friend);
        var  response = await fetch('http://192.168.64.2/ChatServer/request/chat_request.php', {
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

function getTypeOfFile(file)
{
    var file_type = "";
    if(file === "image")
    {
        file_type = "IMG";
    }else if(file === "video")
    {
        file_type = "VID";
    }else if(file === "docx")
    {
        file_type = "DOCX";
    }else if(file === "zip")
    {
        file_type = "ZIP";
    }else if(file === "pdf")
    {
        file_type = "PDF";
    }else{
        file_type = "APP";
    }
    return file_type;
}

function downloadFile(Arraybuffer, Filetype, fileName){
    let binary = '';
        const bytes = new Uint8Array(Arraybuffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const file = window.btoa(binary);
        const mimType = Filetype === 'pdf' ? 'application/pdf' : Filetype === 'xlsx' ? 'application/xlsx' :
          Filetype === 'pptx' ? 'application/pptx' : Filetype === 'csv' ? 'application/csv' : Filetype === 'docx' ? 'application/docx' :
            Filetype === 'jpg' ? 'application/jpg' : Filetype === 'png' ? 'application/png' : '';
        const url = `data:${mimType};base64,` + file;
    
        // url for the file
        //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    
        // download the file
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
}

function createChatFileBubble(data){
    var bubble = document.createElement('div');
    var fileIcon = document.createElement('div');
    var fileType = document.createElement('h1');
    var fileName = document.createElement('h1');
    var fileSize = document.createElement('h1');

    fileType.innerHTML = getTypeOfFile(data.fileType);
    fileSize.innerHTML = data.fileSize;
    fileName.innerHTML = data.fileName;

    bubble.className = "filecontainer";
    fileIcon.className = "file_icon"
    fileName.className = "file_name";
    fileSize.className = "file_size";

    fileIcon.appendChild(fileType);
    var fileBuffer = new Uint8Array(data.file).buffer;
    fileIcon.onclick = function(){
        downloadFile(fileBuffer, data.fileType, data.fileName);
    }
    bubble.appendChild(fileIcon);
    bubble.appendChild(fileName);
    bubble.appendChild(fileSize);
   // document.getElementById('text').value = "";
    var element = createBubbleFileContainer(bubble, count);
    count++;
    document.getElementById('chat_display').append(element);
    document.getElementById('chat_display').lastChild.scrollIntoView({
        behavior: "smooth",
        block: "end"
    });
}

/*function download(url, filename) {
    fetch(url,
        {
            mode: 'cors'
        })
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    })
    .catch(console.error);
  }*/

  function download(link) {
    var element = document.createElement('a');
    element.setAttribute('href', link);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

function createChatFServerFileBubble(data){
    var bubble = document.createElement('div');
    var fileIcon = document.createElement('div');
    var fileType = document.createElement('h1');
    var fileName = document.createElement('h1');
    var fileSize = document.createElement('h1');

    fileType.innerHTML = getTypeOfFile(data.fileType);
    fileSize.innerHTML = data.fileSize;
    fileName.innerHTML = data.fileName;

    bubble.className = "filecontainer";
    fileIcon.className = "file_icon"
    fileName.className = "file_name";
    fileSize.className = "file_size";

    fileIcon.appendChild(fileType);
    //var fileBuffer = new Uint8Array(data.file).buffer;
    fileIcon.onclick = function(){
        //download(url+data.message, data.fileName)
        download(url+data.message);
    }
    bubble.appendChild(fileIcon);
    bubble.appendChild(fileName);
    bubble.appendChild(fileSize);
   // document.getElementById('text').value = "";
    var element = createBubbleFileContainer(bubble, count);
    count++;
    document.getElementById('chat_display').append(element);
    /*document.getElementById('chat_display').lastChild.scrollIntoView({
        behavior: "smooth",
        block: "end"
    });*/
}

function createChatBubble(){
    var text = document.getElementById('text').value;
    if(text.length > 0){
        var jsonMessage = {
            type: 'MESSAGE',
            to: currentlyChatting.id,
            from: user.id,
            message: text
        };
        var saveChatData = {
            message: text,
            to: currentlyChatting.id,
            from: user.id,
            mode: 0,
            date: new Date().getMonth()+"/"+new Date().getDay()+"/"+new Date().getFullYear(),
            day: days[new Date().getDay()-1],
            friendId: currentlyChatting.id,
        }
        var bubble = document.createElement('div');
        bubble.style.minHeight = '10px';
        bubble.style.maxWidth = '270px';
        bubble.style.minWidth = '40px';
        bubble.style.marginTop = '10px';
        /*if(count % 2 == 0)
        {
            bubble.style.marginLeft='10px';
            bubble.style.backgroundColor = 'white';
            bubble.style.borderTopRightRadius = '20px';
            bubble.style.borderBottomRightRadius = '20px';
            bubble.style.borderTopLeftRadius = '20px';
            bubble.style.color = "rgb(110,110,110)";
            bubble.style.boxShadow = "2px 2px 5px rgba(200,200,200,0.8)";
        }else{
            bubble.style.backgroundColor = 'rgb(109, 188, 109)';
            bubble.style.borderTopLeftRadius = '20px';
            bubble.style.borderBottomLeftRadius = '20px';
            bubble.style.borderTopRightRadius = '20px';
            bubble.style.color = "rgb(255,255,255)";
            bubble.style.boxShadow = "2px 2px 5px rgba(109, 188, 109,0.8)";
        }*/
        bubble.style.backgroundColor = 'rgb(109, 188, 109)';
        bubble.style.borderTopLeftRadius = '20px';
        bubble.style.borderBottomLeftRadius = '20px';
        bubble.style.borderTopRightRadius = '20px';
        bubble.style.color = "rgb(255,255,255)";
        bubble.style.boxShadow = "2px 2px 5px rgba(109, 188, 109,0.8)";
        if(currentlyChatting.status === "online")
        {
            ws.send(JSON.stringify(jsonMessage));
            messageTempStore.push(saveChatData);
        }else{
            var friendUsername = currentlyChatting.surname+"_"+currentlyChatting.firstName;

            saveChatMessage(user.username, saveChatData.friendId, 
                saveChatData.message, saveChatData.from, saveChatData.to, 
                saveChatData.day, saveChatData.date, saveChatData.mode, 0);

            saveChatMessage(friendUsername, user.id, 
                text, user.id, currentlyChatting.id, 
                days[new Date().getDay()-1], new Date().getMonth()+"/"+new Date().getDay()+"/"+new Date().getFullYear(), 1, 0);
        }
        bubble.innerText = text;
        bubble.style.fontWeight = '500';
        bubble.style.overflowWrap = 'break-word';
        bubble.style.wordWrap = 'break-word';
        bubble.style.hyphens = 'auto';
        bubble.style.fontSize = '12px';
        bubble.style.direction = 'ltr';
        bubble.style.padding = '10px';
        bubble.style.marginBottom = "10px";
        document.getElementById('text').value = "";
        var element = createBubbleContainer(bubble, count);
        count++;
        document.getElementById('chat_display').append(element);
        document.getElementById('chat_display').lastChild.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }
}

function createServerChatBubble(message){
    if(message.length > 0){
        /*var jsonMessage = {
            type: 'MESSAGE',
            to: currentlyChatting.id,
            from: user.id,
            message: text
        };*/
        var bubble = document.createElement('div');
        bubble.style.minHeight = '10px';
        bubble.style.maxWidth = '270px';
        bubble.style.minWidth = '40px';
        bubble.style.marginTop = '10px';
        /*if(count % 2 == 0)
        {
            bubble.style.marginLeft='10px';
            bubble.style.backgroundColor = 'white';
            bubble.style.borderTopRightRadius = '20px';
            bubble.style.borderBottomRightRadius = '20px';
            bubble.style.borderTopLeftRadius = '20px';
            bubble.style.color = "rgb(110,110,110)";
            bubble.style.boxShadow = "2px 2px 5px rgba(200,200,200,0.8)";
        }else{
            bubble.style.backgroundColor = 'rgb(109, 188, 109)';
            bubble.style.borderTopLeftRadius = '20px';
            bubble.style.borderBottomLeftRadius = '20px';
            bubble.style.borderTopRightRadius = '20px';
            bubble.style.color = "rgb(255,255,255)";
            bubble.style.boxShadow = "2px 2px 5px rgba(109, 188, 109,0.8)";
        }*/
        bubble.style.backgroundColor = 'rgb(109, 188, 109)';
        bubble.style.borderTopLeftRadius = '20px';
        bubble.style.borderBottomLeftRadius = '20px';
        bubble.style.borderTopRightRadius = '20px';
        bubble.style.color = "rgb(255,255,255)";
        bubble.style.boxShadow = "2px 2px 5px rgba(109, 188, 109,0.8)";
        bubble.innerText = message;
        bubble.style.fontWeight = '500';
        bubble.style.overflowWrap = 'break-word';
        bubble.style.wordWrap = 'break-word';
        bubble.style.hyphens = 'auto';
        bubble.style.fontSize = '12px';
        bubble.style.direction = 'ltr';
        bubble.style.padding = '10px';
        bubble.style.marginBottom = "10px";
        document.getElementById('text').value = "";
        var element = createBubbleContainer(bubble, count);
        count++;
        document.getElementById('chat_display').append(element);
       /* document.getElementById('chat_display').lastChild.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });*/
    }
}

function createServerReceiveFileBubble(data){
    var bubble = document.createElement('div');
    var fileIcon = document.createElement('div');
    var fileType = document.createElement('h1');
    var fileName = document.createElement('h1');
    var fileSize = document.createElement('h1');

    fileType.innerHTML = getTypeOfFile(data.fileType);
    fileSize.innerHTML = data.fileSize;
    fileName.innerHTML = data.fileName;

    bubble.className = "receive_filecontainer";
    fileIcon.className = "file_icon"
    fileName.className = "file_name";
    fileSize.className = "file_size";

    fileIcon.appendChild(fileType);
    //var fileBuffer = new Uint8Array(data.file).buffer;
    fileIcon.onclick = function(){
        download(url+data.message);
    }
    bubble.appendChild(fileIcon);
    bubble.appendChild(fileName);
    bubble.appendChild(fileSize);
   // document.getElementById('text').value = "";
   var element = document.createElement('div');
   var row = document.createElement('div');
   var image = document.createElement('img');
   image.className = "profile_pic";
   image.style.marginBottom = "10px";
   image.src = url+currentlyChatting.profilePicture;
   row.style.width = "400px";
   row.style.display = 'flex';
   row.style.flexDirection = 'row';
   row.style.alignItems = 'end';
   row.append(image);
   row.append(bubble);
   var date = new Date();
   var timeline = document.createElement('h4');
   timeline.style.marginTop = "10px;"
   timeline.style.fontSize = "10px";
   timeline.style.fontWeight = '500';
   timeline.style.color = "rgb(140,140,140)";
   timeline.style.marginLeft = "13%";
   timeline.innerHTML = days[date.getDay()-1]+" at "+
   (date.getHours()+":"+date.getMinutes());

   element.append(row);
   element.append(timeline);

   element.style.marginBottom = "40px";
document.getElementById('chat_display').append(element);
   /*document.getElementById('chat_display').lastChild.scrollIntoView({
       behavior: "smooth",
       block: "end"
   });*/
}

function createReceiveFileBubble(data){
    var bubble = document.createElement('div');
    var fileIcon = document.createElement('div');
    var fileType = document.createElement('h1');
    var fileName = document.createElement('h1');
    var fileSize = document.createElement('h1');

    fileType.innerHTML = getTypeOfFile(data.fileType);
    fileSize.innerHTML = data.fileSize;
    fileName.innerHTML = data.fileName;

    bubble.className = "receive_filecontainer";
    fileIcon.className = "file_icon"
    fileName.className = "file_name";
    fileSize.className = "file_size";

    fileIcon.appendChild(fileType);
    var fileBuffer = new Uint8Array(data.file).buffer;
    fileIcon.onclick = function(){
        downloadFile(fileBuffer, data.fileType, data.fileName);
    }
    bubble.appendChild(fileIcon);
    bubble.appendChild(fileName);
    bubble.appendChild(fileSize);
   // document.getElementById('text').value = "";
   var element = document.createElement('div');
   var row = document.createElement('div');
   var image = document.createElement('img');
   image.className = "profile_pic";
   image.style.marginBottom = "10px";
   image.src = url+currentlyChatting.profilePicture;
   row.style.width = "400px";
   row.style.display = 'flex';
   row.style.flexDirection = 'row';
   row.style.alignItems = 'end';
   row.append(image);
   row.append(bubble);
   var date = new Date();
   var timeline = document.createElement('h4');
   timeline.style.marginTop = "10px;"
   timeline.style.fontSize = "10px";
   timeline.style.fontWeight = '500';
   timeline.style.color = "rgb(140,140,140)";
   timeline.style.marginLeft = "13%";
   timeline.innerHTML = days[date.getDay()-1]+" at "+
   (date.getHours()+":"+date.getMinutes());

   element.append(row);
   element.append(timeline);

   element.style.marginBottom = "40px";
document.getElementById('chat_display').append(element);
   document.getElementById('chat_display').lastChild.scrollIntoView({
       behavior: "smooth",
       block: "end"
   });
}

function createServerReceiver(data)
{
    var bubble = document.createElement('div');
        bubble.style.minHeight = '10px';
        bubble.style.maxWidth = '270px';
        bubble.style.minWidth = '40px';
        bubble.style.marginTop = '20px';
        bubble.style.marginLeft='10px';
        bubble.style.backgroundColor = 'white';
        bubble.style.borderTopRightRadius = '20px';
        bubble.style.borderBottomRightRadius = '20px';
        bubble.style.borderTopLeftRadius = '20px';
        bubble.style.color = "rgb(110,110,110)";
        bubble.style.boxShadow = "2px 2px 5px rgba(200,200,200,0.8)";
        bubble.innerText = data;
        bubble.style.fontWeight = '500';
        bubble.style.overflowWrap = 'break-word';
        bubble.style.wordWrap = 'break-word';
        bubble.style.hyphens = 'auto';
        bubble.style.fontSize = '12px';
        bubble.style.padding = '10px';
        bubble.style.marginBottom = "10px";
        document.getElementById('text').value = "";


        var element = document.createElement('div');
        var row = document.createElement('div');
        var image = document.createElement('img');
        image.className = "profile_pic";
        image.style.marginBottom = "10px";
        image.src = url+currentlyChatting.profilePicture;
        row.style.width = "400px";
        row.style.display = 'flex';
        row.style.flexDirection = 'row';
        row.style.alignItems = 'end';
        row.append(image);
        row.append(bubble);
        var date = new Date();
        var timeline = document.createElement('h4');
        timeline.style.marginTop = "10px;"
        timeline.style.fontSize = "10px";
        timeline.style.fontWeight = '500';
        timeline.style.color = "rgb(140,140,140)";
        timeline.style.marginLeft = "13%";
        timeline.innerHTML = days[date.getDay()-1]+" at "+
        (date.getHours()+":"+date.getMinutes());

        element.append(row);
        element.append(timeline);

        element.style.marginBottom = "40px";
   document.getElementById('chat_display').append(element);
        /*document.getElementById('chat_display').lastChild.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });*/
}

function createReceiver(data)
{
    var bubble = document.createElement('div');
        bubble.style.minHeight = '10px';
        bubble.style.maxWidth = '270px';
        bubble.style.minWidth = '40px';
        bubble.style.marginTop = '20px';
        bubble.style.marginLeft='10px';
        bubble.style.backgroundColor = 'white';
        bubble.style.borderTopRightRadius = '20px';
        bubble.style.borderBottomRightRadius = '20px';
        bubble.style.borderTopLeftRadius = '20px';
        bubble.style.color = "rgb(110,110,110)";
        bubble.style.boxShadow = "2px 2px 5px rgba(200,200,200,0.8)";
        bubble.innerText = data;
        bubble.style.fontWeight = '500';
        bubble.style.overflowWrap = 'break-word';
        bubble.style.wordWrap = 'break-word';
        bubble.style.hyphens = 'auto';
        bubble.style.fontSize = '12px';
        bubble.style.padding = '10px';
        bubble.style.marginBottom = "10px";
        document.getElementById('text').value = "";


        var element = document.createElement('div');
        var row = document.createElement('div');
        var image = document.createElement('img');
        image.className = "profile_pic";
        image.style.marginBottom = "10px";
        image.src = url+currentlyChatting.profilePicture;
        row.style.width = "400px";
        row.style.display = 'flex';
        row.style.flexDirection = 'row';
        row.style.alignItems = 'end';
        row.append(image);
        row.append(bubble);
        var date = new Date();
        var timeline = document.createElement('h4');
        timeline.style.marginTop = "10px;"
        timeline.style.fontSize = "10px";
        timeline.style.fontWeight = '500';
        timeline.style.color = "rgb(140,140,140)";
        timeline.style.marginLeft = "13%";
        timeline.innerHTML = days[date.getDay()-1]+" at "+
        (date.getHours()+":"+date.getMinutes());

        element.append(row);
        element.append(timeline);

        element.style.marginBottom = "40px";
   document.getElementById('chat_display').append(element);
        document.getElementById('chat_display').lastChild.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
}

async function displayBaseMessages(friend)
{
    getFriendsMessageList(
        {
            user: user.username,
            friend: friend
        }
    ).then((data) => {
        if(data.error === false)
        {
            //console.log(data);
            for(var i = 0; i < data.messages.length; i++)
                {
                    var message = data.messages[i];
                    if(message.mode === "0")
                    {
                        if(message.messageType === "MESSAGE")
                        {
                            createServerChatBubble(message.message);
                        }else{
                            var fileName = message.messageType.split(">")[1];
                            var fileSize = message.messageType.split(">")[2];
                            var fileType = message.messageType.split(">")[3];

                            var obj = {
                                fileType: fileType,
                                fileSize: fileSize,
                                fileName: fileName,
                                message: message.message
                            }
                            createChatFServerFileBubble(obj);
                        }
                    }else{
                        //received
                        if(message.messageType === "MESSAGE")
                        {
                            createServerReceiver(message.message);
                        }else{
                            var fileName = message.messageType.split(">")[1];
                            var fileSize = message.messageType.split(">")[2];
                            var fileType = message.messageType.split(">")[3];

                            var obj = {
                                fileType: fileType,
                                fileSize: fileSize,
                                fileName: fileName,
                                message: message.message
                            }
                            createServerReceiveFileBubble(obj);
                        }
                    }
                }
        }else{
            alert("Connection", data.message, "Okay", ()=>{
            });
        }
    }).catch((error)=>{
        console.log(error);
        alert("Connection", "There was an error connecting", "Okay", ()=>{
        });
    });
}


function handleFriendSelected(friend, messagesCount){
    messagesCount.style.display = 'none';
    document.getElementById("currently_chatting").innerHTML = friend.firstName+" "+friend.surname;
    document.getElementById("chat_description").innerHTML = "2h ago";
    document.getElementById("chat_room").style.display = "block";
    if(currentlyChatting === null)
    {
        currentlyChatting = friend;
        displayBaseMessages(currentlyChatting.id).then(()=>{
            var chatDisplay = document.getElementById('chat_display');
            for(var i = 2; i < chatDisplay.childNodes.length; i++)
            {
                chatDisplay.removeChild(chatDisplay.childNodes[i]);
            }
            if(messagesReceived.get(currentlyChatting.id).length > 0)
            {
                var messageList = messagesReceived.get(currentlyChatting.id);
                for(var i = 0; i < messageList.length; i++)
                {
                    var message = messageList[i];
                    if(message.type === "MESSAGE")
                    {
                        createReceiver(message.message);
                    }else if(message.type === "FILE")
                    {
                        createReceiveFileBubble(message);
                    }
                }
            }
        });
        //console.log(messagesReceived);
    }else{
        if(currentlyChatting.id !== friend.id)
        {
            currentlyChatting = friend;
            displayBaseMessages(currentlyChatting.id).then(()=>{
                var chatDisplay = document.getElementById('chat_display');
                for(var i = 2; i < chatDisplay.childNodes.length; i++)
                {
                    chatDisplay.removeChild(chatDisplay.childNodes[i]);
                }
                if(messagesReceived.get(currentlyChatting.id).length > 0)
                {
                    var messageList = messagesReceived.get(currentlyChatting.id);
                    for(var i = 0; i < messageList.length; i++)
                    {
                        var message = messageList[i];
                        if(message.type === "MESSAGE")
                        {
                            createReceiver(message.message);
                        }else if(message.type === "FILE")
                        {
                            createReceiveFileBubble(message);
                        }
                    }
                }
            });
        }
    }
    messagesReceived.set(friend.id, []);
}

function createFriendRow(data, messageCount, displayText){
    var user_profile = document.createElement('div');
    user_profile.className = "user_list_profile";
    var online_border = document.createElement('div');
    online_border.className = "online_list_border";
    var online_background = document.createElement('div');
    online_background.className = "online_list_background";
    var friend = document.createElement('div');
    if(data.status === "online")
    {
        var profile_pic = document.createElement('img');
        var info = document.createElement('div');
        var friendName = document.createElement('h1');
        var friendDescription = document.createElement('h1');
        var timeOfMessage = document.createElement('h1');
        var messagesCount = document.createElement('div');
        messagesCount.innerHTML = messageCount === null ? 0 : messageCount;
        messagesCount.style.width = '15px';
        messagesCount.style.height = '15px';
        messagesCount.style.backgroundColor = 'green';
        messagesCount.style.fontSize = '7px';
        messagesCount.style.display = messageCount === null ? 'none' : 'flex';
        messagesCount.style.justifyContent = 'center';
        messagesCount.style.alignItems = 'center';
        messagesCount.style.marginLeft = '10px';

        messagesCount.style.color = 'white';
        messagesCount.style.borderRadius = '50%';
        friend.className = 'friend';
        profile_pic.src = url+data.profilePicture;
        profile_pic.className = 'profile_pic';
        user_profile.appendChild(profile_pic);
        online_border.appendChild(online_background);
        user_profile.appendChild(online_border);

        friendName.innerHTML = data.firstName+" "+data.surname;
        friendDescription.innerHTML = displayText.length > 25 ? displayText.substring(0, 25)+'...' : displayText;
        timeOfMessage.innerHTML = "2h ago";

        info.className = 'info';
        timeOfMessage.className = "time";
        info.append(friendName);
        info.append(friendDescription);
        friend.append(user_profile);
        friend.append(info);
        friend.append(timeOfMessage);
        friend.append(messagesCount);
    }else{
        var profile_pic = document.createElement('img');
        var info = document.createElement('div');
        var friendName = document.createElement('h1');
        var friendDescription = document.createElement('h1');
        var timeOfMessage = document.createElement('h1');
        var messagesCount = document.createElement('div');
        messagesCount.innerHTML = messageCount === null ? 0 : messageCount;
        messagesCount.style.width = '15px';
        messagesCount.style.height = '15px';
        messagesCount.style.backgroundColor = 'green';
        messagesCount.style.fontSize = '7px';
        messagesCount.style.display = messageCount === null ? 'none' : 'flex';
        messagesCount.style.justifyContent = 'center';
        messagesCount.style.alignItems = 'center';
        messagesCount.style.marginLeft = '10px';

        messagesCount.style.color = 'white';
        messagesCount.style.borderRadius = '50%';
        friend.className = 'friend';
        profile_pic.src = url+data.profilePicture;
        profile_pic.className = 'profile_pic';
        friendName.innerHTML = data.firstName+" "+data.surname;
        friendDescription.innerHTML = displayText.length > 25 ? displayText.substring(0, 25)+'...' : displayText;
        timeOfMessage.innerHTML = "2h ago";

        info.className = 'info';
        timeOfMessage.className = "time";
        info.append(friendName);
        info.append(friendDescription);
        friend.append(profile_pic);
        friend.append(info);
        friend.append(timeOfMessage);
        friend.append(messagesCount);
    }
    friend.onclick = function(){
        handleFriendSelected(data, messagesCount);
    }
    return friend;
}

function getAllFriendsFromDatabase(){
    getFriendsList(
        {
            id: user.id,
        }
    ).then((data) => {
        if(data.error === false)
        {
            var friends = document.getElementById('friends');
            for(var i = 3; i < friends.childNodes.length; i++)
            {
                friends.removeChild(friends.childNodes[i]);
            }
            for(var i = 0; i < data.friends.length; i++)
            {
                if(messagesReceived.get(data.friends[i].id) !== undefined)
                {
                    if(messagesReceived.get(data.friends[i].id).length > 0){
                        document.getElementById('friends').append(createFriendRow(data.friends[i], messagesReceived.get(data.friends[i].id).length, "The message is the message"));
                    }else{
                        document.getElementById('friends').append(createFriendRow(data.friends[i], null, "The message is the message"));
                    }
                }else{
                    document.getElementById('friends').append(createFriendRow(data.friends[i], null, "The message is the message and the value is asas"));
                    messagesReceived.set(data.friends[i].id, []);
                }
            }
        }else{
            alert("Request", data.message, "Okay", ()=>{
            });
        }
    }).catch((error)=>{
        console.log(error);
        alert("Connection", "There was an error connecting", "Okay", ()=>{
        });
    });
}

function displayProfilePicture(){
    chatWithNew();
    getAllFriendsFromDatabase();
    document.getElementById('profile_pic').src = url+user.profileImage;
}

async function sendLogout(data_){
    var data = null;
    try{
        const formData = new FormData()
        formData.append('log_out', data_.id);
        var  response = await fetch('http://192.168.64.2/ChatServer/request/login_request.php', {
            method: 'POST',
            mode:'cors',
            body: formData
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            alert("Connection", message, "Okay", ()=>{
                document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                document.getElementById('create').innerHTML = "Create Account";
            });
        }
        data = await response.json();
    }catch(error){
        console.log(error);
        alert("Connection", "There was an error connecting", "Okay", ()=>{
            document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
            document.getElementById('create').innerHTML = "Create Account";
        });
    }
    return data;
}

function logOut(){
    sendLogout(
        {
            id: user.id
        }
    ).then((data) => {
        if(data.error === false)
        {
            var jsonMessage = {
                type: 'LOGOUT',
                id: user.id
            }
            ws.send(JSON.stringify(jsonMessage));
            sessionStorage.clear();
            location.reload();
        }else{
            alert("Connection", data.message, "Okay", ()=>{
            });
        }
    }).catch((error)=>{
        alert("Connection", "There was an error connecting", "Okay", ()=>{
        });
    });
}
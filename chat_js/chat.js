console.log(loggedIn);

if((loggedIn == false) || (loggedIn == null)) {
    location.href = './login.html';
}

function getFirstInstruction(message)
{
    return message.split(/>(.*)/s);
}

function openSettings() {
    var settings = document.getElementById('settings_container');
    settings.style.width = '75%';
}
function closeSettings() {
    var settings = document.getElementById('settings_container');
    settings.style.width = '0';
}

var count = 0;
function stringtoInt(str) {
    console.log(str);
    return parseInt(str.split('px')[0]);
}
function createBubbleContainer(bubble, count){
    var element = document.createElement('div');
    var date = new Date();
         var row = document.createElement('div');
        var image = document.createElement('div');
        row.style.width = "400px";
        row.style.display = 'flex';
        row.style.flexDirection = 'row';
        row.append(image);
        row.append(bubble);
        var timeline = document.createElement('h4');
        timeline.style.marginTop = "100px;"
        timeline.style.fontSize = "10px";
        timeline.style.fontWeight = '500';
        timeline.style.color = "rgb(140,140,140)";
        timeline.style.marginLeft = "70%";
        timeline.innerHTML = days[date.getDay()-1]+" at "+(date.getHours()+":"+date.getMinutes());
        element.style.direction = 'rtl';
        element.style.marginRight = '5%';
        element.append(row);
        element.append(timeline);
    element.style.marginBottom = "40px";
    return element;
}

function createBubbleFileContainer(bubble, count){
    var element = document.createElement('div');
    var date = new Date();
         var row = document.createElement('div');
        var image = document.createElement('div');
        row.style.width = "400px";
        row.style.display = 'flex';
        row.style.flexDirection = 'row';
        row.append(image);
        row.append(bubble);
        var timeline = document.createElement('h4');
        timeline.style.marginTop = "100px;"
        timeline.style.fontSize = "10px";
        timeline.style.fontWeight = '500';
        timeline.style.color = "rgb(140,140,140)";
        timeline.style.marginLeft = "70%";
        timeline.innerHTML = days[date.getDay()-1]+" at "+(date.getHours()+":"+date.getMinutes());
        element.style.direction = 'rtl';
        element.style.marginRight = '5%';
        element.append(row);
        element.append(timeline);
    element.style.marginBottom = "40px";
    return element;
}

function chatWithNew(){
    var elements = document.getElementsByClassName('friend');
    for(var i = 0; i < elements; i++)
    {
        elements[i].addEventListener('onclick', function(){
            console.log("A");
        });
    }
}


/*
function createReceiveFileBubble(data){
    var bubble = document.createElement('div');
    var fileIcon = document.createElement('div');
    var fileType = document.createElement('h1');
    var fileName = document.createElement('h1');
    var fileSize = document.createElement('h1');

    fileType.innerHTML = data.fileType == 'image'? 'IMG' : 'APP';
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
}*/

const arrayBufferToFile = (buffer, filename) => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    return new File([blob], filename, { type: 'application/octet-stream' });
  };

ws.addEventListener('message', (data)=>{
    var receiveMessage = data.data;
    if(receiveMessage === "RECEIVED")
    {
        var saveTempData = messageTempStore.shift();
        if(saveTempData.type === "FILE")
        {
            saveChatFileMessage(user.username, saveTempData.friendId, saveTempData.file,
                 saveTempData.fileName, saveTempData.fileSize, saveTempData.fileType,
                 saveTempData.from, saveTempData.to, saveTempData.day, saveTempData.date,
                 saveTempData.mode, 0);
        }else{
            saveChatMessage(user.username, saveTempData.friendId, 
                saveTempData.message, saveTempData.from, saveTempData.to, 
                saveTempData.day, saveTempData.date, saveTempData.mode, 0);
        }
    }else{
        var json = JSON.parse(receiveMessage);
        if(json.type === 'MESSAGE')
        {
            if(currentlyChatting !== null)
            {
                if(json.from === currentlyChatting.id){
                    createReceiver(json.message);
                }else{
                    messagesReceived.set(json.from, [...messagesReceived.get(json.from), json]);
                }
            }else{
                messagesReceived.set(json.from, [...messagesReceived.get(json.from), json]);
            }            
            saveChatMessage(user.username, json.from, 
                json.message, json.from, user.id, 
                days[new Date().getDay()-1], new Date().getMonth()+"/"+new Date().getDay()+"/"+new Date().getFullYear(), 1, 0);

        }else if(json.type === 'LOGIN'){
            var friends = document.getElementById('friends');
            for(var i = 3; i < friends.childNodes.length; i++)
            {
                friends.removeChild(friends.childNodes[i]);
            }
        }else if(json.type === 'LOGOUT')
        {
            var friends = document.getElementById('friends');
            for(var i = 3; i < friends.childNodes.length; i++)
            {
                friends.removeChild(friends.childNodes[i]);
            }
        }else if(json.type === 'FILE')
        {
            if(currentlyChatting !== null)
            {
                if(json.from === currentlyChatting.id){
                    createReceiveFileBubble(json);
                }else{
                    messagesReceived.set(json.from, [...messagesReceived.get(json.from), json]);
                }
            }else{
                messagesReceived.set(json.from, [...messagesReceived.get(json.from), json]);
            }
            var fileBuffer = new Uint8Array(json.file).buffer;
            var file = arrayBufferToFile(fileBuffer, json.fileName);
            saveChatFileMessage(user.username, json.from, file,
                json.fileName, json.fileSize, json.fileType,
                json.from, user.id, days[new Date().getDay()-1], new Date().getMonth()+"/"+new Date().getDay()+"/"+new Date().getFullYear(), 1, 0);
        }
    }
    getAllFriendsFromDatabase();
})

function sendFile(event){
    var sendFile = event.target.files[0];
    var reader = new FileReader();

            var rawData = new ArrayBuffer();            

            reader.loadend = function() {

            }

            reader.onload = function(e) {

                rawData = e.target.result;
                var newArray = Array.from(new Uint8Array(rawData));
                if(sendFile.size <= 42048000)
                {
                    var senda  = {
                        type: 'FILE',
                        to: currentlyChatting.id,
                        from: user.id,
                        file: newArray,
                        fileSize: sendFile.size < 1024000 ? ((sendFile.size/1024).toFixed(2)+"KB") : ((sendFile.size/1024000).toFixed(2)+"MB"),
                        fileName: sendFile.name,
                        fileType: sendFile.type.split("/")[0],
                        fileExtension: sendFile.type.split("/")[1]
                    };
                    var saveFileData = {
                        type: 'FILE',
                        to: currentlyChatting.id,
                        from: user.id,
                        friendId: currentlyChatting.id,
                        mode: 0,
                        date: new Date().getMonth()+"/"+new Date().getDay()+"/"+new Date().getFullYear(),
                        day: days[new Date().getDay()-1],
                        file: sendFile,
                        fileSize: sendFile.size < 1024000 ? ((sendFile.size/1024).toFixed(2)+"KB") : ((sendFile.size/1024000).toFixed(2)+"MB"),
                        fileName: sendFile.name,
                        fileType: sendFile.type.split("/")[0],
                    }
                    if(currentlyChatting.status === "online")
                    {
                        createChatFileBubble(senda);
                        ws.send(JSON.stringify(senda));
                        messageTempStore.push(saveFileData);
                    }else{
                        createChatFileBubble(senda);
                        var friendUsername = currentlyChatting.surname+"_"+currentlyChatting.firstName;
    
                        saveChatFileMessage(user.username, saveFileData.friendId, saveFileData.file,
                            saveFileData.fileName, saveFileData.fileSize, saveFileData.fileType,
                            saveFileData.from, saveFileData.to, saveFileData.day, saveFileData.date,
                            saveFileData.mode, 0);
    
                        saveChatFileMessage(friendUsername, user.id, sendFile,
                            sendFile.name, sendFile.size < 1024000 ? ((sendFile.size/1024).toFixed(2)+"KB") : ((sendFile.size/1024000).toFixed(2)+"MB"), sendFile.type.split("/")[0],
                            user.id, currentlyChatting.id, days[new Date().getDay()-1], new Date().getMonth()+"/"+new Date().getDay()+"/"+new Date().getFullYear(), 1, 0);
                    }
                }else{
                    alert("File Transfer", "The file is too large", "Okay", ()=>{
                    });
                }

            }

            reader.readAsArrayBuffer(sendFile);
}

function prepareForDrag(event){
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function sendPreparedFile(event){
    event.stopPropagation();
    event.preventDefault();
    var files = event.dataTransfer.files;// Array of all files

    for (var i=0; i < files.length; i++) {
        var file = files[i];
       var reader = new FileReader();

            var rawData = new ArrayBuffer();            

            reader.loadend = function() {

            }

            reader.onload = function(e) {
                rawData = e.target.result;
                var newArray = Array.from(new Uint8Array(rawData));
                if(file.size <= 42048000){
                    var senda  = {
                        type: 'FILE',
                        to: currentlyChatting.id,
                        from: user.id,
                        file: newArray,
                        fileSize: file.size < 1024000 ? ((file.size/1024).toFixed(2)+"KB") : ((file.size/1024000).toFixed(2)+"MB"),
                        fileName: file.name,
                        fileType: file.type.split("/")[0],
                        fileExtension: file.type.split("/")[1]
                    };
                    var saveFileData = {
                        file: file,
                        to: currentlyChatting.id,
                        from: user.id,
                        friendId: currentlyChatting.id,
                        date: new Date().getMonth()+"/"+new Date().getDay()+"/"+new Date().getFullYear(),
                        day: days[new Date().getDay()-1],
                        mode: 0,
                        type: 'FILE',
                        fileSize: file.size < 1024000 ? ((file.size/1024).toFixed(2)+"KB") : ((file.size/1024000).toFixed(2)+"MB"),
                        fileName: file.name,
                        fileType: file.type.split("/")[0],
                    }
                    if(currentlyChatting.status === "online")
                    {
                        createChatFileBubble(senda);
                        ws.send(JSON.stringify(senda));
                        messageTempStore.push(saveFileData);
                    }else{
                        createChatFileBubble(senda);
                        var friendUsername = currentlyChatting.surname+"_"+currentlyChatting.firstName;

                        saveChatFileMessage(user.username, saveFileData.friendId, saveFileData.file,
                            saveFileData.fileName, saveFileData.fileSize, saveFileData.fileType,
                            saveFileData.from, saveFileData.to, saveFileData.day, saveFileData.date,
                            saveFileData.mode, 0);

                        saveChatFileMessage(friendUsername, user.id, file,
                            file.name, file.size < 1024000 ? ((file.size/1024).toFixed(2)+"KB") : ((file.size/1024000).toFixed(2)+"MB"), file.type.split("/")[0],
                            user.id, currentlyChatting.id, days[new Date().getDay()-1], new Date().getMonth()+"/"+new Date().getDay()+"/"+new Date().getFullYear(), 1, 0);
                    }
                }else{
                    alert("File Transfer", "The file is too large", "Okay", ()=>{
                    });
                }

            }

            reader.readAsArrayBuffer(file);
    }
}

/*function createChatFileBubble(data){
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

function createChatBubble(){
    var text = document.getElementById('text').value;
    if(text.length > 0){
        var jsonMessage = {
            type: 'MESSAGE',
            to: currentlyChatting.id,
            from: user.id,
            message: text
        };
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
        }
        bubble.style.backgroundColor = 'rgb(109, 188, 109)';
        bubble.style.borderTopLeftRadius = '20px';
        bubble.style.borderBottomLeftRadius = '20px';
        bubble.style.borderTopRightRadius = '20px';
        bubble.style.color = "rgb(255,255,255)";
        bubble.style.boxShadow = "2px 2px 5px rgba(109, 188, 109,0.8)";
        ws.send(JSON.stringify(jsonMessage));
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
}*/

function chatMessage(event){
    if(event.key === 'Enter'){
        createChatBubble();
    }
}
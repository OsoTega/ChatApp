var pin = "";
function next(position){
    if(pin.length === 4)
    {
        document.getElementById('background_loader').style.display = 'flex';
        loginUser();
    }else{
        var text = "";
        var input = document.getElementsByClassName('pin')[position];
        input.focus();
        input.onkeyup = function(event){
            if((event.key !== "ArrowRight")
            &&
            (event.key !== "ArrowLeft")
            &&
            (event.key !== "ArrowUp")
            &&
            (event.key !== "ArrowDown")
            &&
            (event.key !== "ENTER")
            &&
            (event.key !== "Backspace")
            ){
                text = input.value;
                console.log(text);
                pin+=text;
                if(input.value.length === 1)
                {
                     next(position+1);
                } 
            }
        }
    }
}

async function sendData(data_){
    var data = null;
    try{
        const formData = new FormData()
        formData.append('pin', data_.pin);

        var  response = await fetch('http://192.168.64.2/ChatServer/request/login_request.php', {
            method: 'POST',
            mode:'cors',
            body: formData
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.error(message);
            alert("Connection", message, "Okay", ()=>{
                var input = document.getElementsByClassName('pin');
                for(var i = 0; i < input.length; i++)
                {
                    input[i].value = "";
                }
                pin = "";
                document.getElementById('background_loader').style.display = 'none';
                next(0);
                //document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                //document.getElementById('create').innerHTML = "Create Account";
            });
        }
        data = await response.json();
    }catch(error){
        alert("Connection", "There was an error connecting", "Okay", ()=>{
            var input = document.getElementsByClassName('pin');
                for(var i = 0; i < input.length; i++)
                {
                    input[i].value = "";
                }
                pin = "";
                document.getElementById('background_loader').style.display = 'none';
                next(0);
            //document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
            //document.getElementById('create').innerHTML = "Create Account";
        });
    }
    return data;
}

function loginUser(){
    sendData(
        {
            pin: pin
        }
    ).then((data) => {
        if(data.error === false)
        {
            var user_store = {
                id: data.user.id,
                firstName: data.user.firstName,
                surname: data.user.surname,
                phoneNumber: data.user.phoneNumber,
                dateOfBirth: data.user.dateOfBirth,
                profileImage: data.user.profilePicture,
                username: (data.user.surname+"_"+data.user.firstName),
                status: data.user.status,
            }
            document.getElementById('background_loader').style.display = 'none';
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("userStore", JSON.stringify(user_store));
            location.href = "./chat.html";
        }else{
            alert("Incorrect Login", data.message, "Retry", ()=>{
                var input = document.getElementsByClassName('pin');
                for(var i = 0; i < input.length; i++)
                {
                    input[i].value = "";
                }
                pin = "";
                document.getElementById('background_loader').style.display = 'none';
                next(0);
            });
        }
    }).catch((error)=>{
        alert("Connection", "There was an error connecting", "Okay", ()=>{
            var input = document.getElementsByClassName('pin');
                for(var i = 0; i < input.length; i++)
                {
                    input[i].value = "";
                }
                pin = "";
                document.getElementById('background_loader').style.display = 'none';
                next(0);
        });
    });
}

/*sessionStorage.setItem("key", "value");
sessionStorage.getItem("key");


jsarray = [];
sessionStorage.setItem("key", JSON.stringify(jsarray));
jsarray = JSON.parse(sessionStorage.getItem("key"));*/

function goToCreateAccount(){
    if(document.referrer == "")
    {
        location.href = './create_account.html';
    }else{
        history.back();
    }
}
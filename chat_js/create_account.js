function goToLogin(){
    if(document.referrer == "")
    {
        location.href = './login.html';
    }else{
        history.back();
    }
}

var pin = "";
function checkLength(event){
    if(pin.length+1 > 4)
    {
        alert("Not Allowed", "The Pin should be 4 Characters", "Okay", ()=>{
            pin = "";
            document.getElementsByClassName('pin')[3].value = "";
        });
    }else{
        pin=document.getElementsByClassName('pin')[3].value;
    }
}

var profileImage = null;
function getProfile(event){
    profileImage = event.target.files[0];
}

async function sendData(data_){
    var data = null;
    try{
        const formData = new FormData()
        formData.append('firstname', data_.firstName);
        formData.append('surname', data_.surname);
        formData.append('phone_number', data_.phoneNumber);
        formData.append('pin', data_.pin);
        formData.append('date_of_birth', data_.date);
        formData.append('profile_image', data_.profileImage);
        //https://jsonplaceholder.typicode.com/todos/1
        //http://192.168.64.2/ChatServer/request/register_request.php
        var  response = await fetch('http://192.168.64.2/ChatServer/request/register_request.php', {
            method: 'POST',
            mode:'cors',
            body: formData
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
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

function createAccount(){
    var firstName = document.getElementsByClassName('pin')[0].value;
    var surname = document.getElementsByClassName('pin')[1].value;
    var phoneNumber = document.getElementsByClassName('pin')[2].value;
    var date = document.getElementsByClassName('pin')[4].value;
    var div = document.createElement('div');
    var center = document.createElement('center');
    var text = document.getElementById('create').innerHTML;
    div.className = "small_loader";
    center.appendChild(div);
    document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
    document.getElementById('create').appendChild(center);
    if((firstName !== "")&&(surname !== "")&&(phoneNumber !== "")&&(date !== "")&&(pin !== ""))
    {
        if(!(pin.length < 4))
        {
            if(profileImage !== null)
            {
                if(profileImage.size <= 2048000)
                {   
                    if(profileImage.type.split('/')[0] === "image")
                    {
                        sendData(
                            {
                                firstName: firstName,
                                surname: surname,
                                phoneNumber: phoneNumber,
                                pin: pin,
                                date: date,
                                profileImage: profileImage
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
                                document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                                document.getElementById('create').innerHTML = "Create Account";
                                sessionStorage.setItem("loggedIn", true);
                                sessionStorage.setItem("userStore", JSON.stringify(user_store));
                                location.href = "./chat.html";
                            }else{
                                alert("Creating Account Alert", data.message, "Okay", ()=>{
                                    document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                                    document.getElementById('create').innerHTML = "Create Account";
                                });
                            }
                        }).catch((error)=>{
                            alert("Connection", "There was an error connecting", "Okay", ()=>{
                                profileImage = null
                                document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                                document.getElementById('create').innerHTML = "Create Account";
                            });
                        });
                    }else{
                        alert("Not Profile Picture", "This file format is not a profile picture", "Okay", ()=>{
                            profileImage = null;
                            document.getElementsByClassName('pin')[3].value = "";
                            document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                            document.getElementById('create').innerHTML = "Create Account";
                        });
                    }
                }else{
                    alert("Large File", "the file size is too large", "Okay", ()=>{
                        profileImage = null
                        document.getElementsByClassName('pin')[3].value = "";
                        document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                        document.getElementById('create').innerHTML = "Create Account";
                    });
                }
            }else{
                alert("Confirm", "You are not uploading a profile picture", "Okay", ()=>{
                    profileImage = document.getElementsByClassName('bo')[0].files[0];
                    sendData(
                        {
                            firstName: firstName,
                            surname: surname,
                            phoneNumber: phoneNumber,
                            pin: pin,
                            date: date,
                            profileImage: profileImage
                        }
                    ).then((data)=>{
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
                                document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                                document.getElementById('create').innerHTML = "Create Account";
                                sessionStorage.setItem("loggedIn", true);
                                sessionStorage.setItem("userStore", user_store);
                                location.href = "./chat.html";
                            }else{
                                alert("Creating Account Alert", data.message, "Okay", ()=>{
                                    document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                                    document.getElementById('create').innerHTML = "Create Account";
                                });
                            }
                    }).catch((error)=>{
                        profileImage = null
                        alert("Connection", "There was an error connecting", "Okay", ()=>{
                            document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                            document.getElementById('create').innerHTML = "Create Account";
                        });
                    });
                });
            }
        }else{
            alert("Not Allowed", "The Pin should be 4 Characters", "Okay", ()=>{
                pin = "";
                document.getElementsByClassName('pin')[3].value = "";
                document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
                document.getElementById('create').innerHTML = "Create Account";
            });
        }
    }else{
        alert("Incomplete Values", "There is a field you haven't entered", "Okay", ()=>{
            profileImage = null
            document.getElementById('create').removeChild(document.getElementById('create').childNodes[0]);
            document.getElementById('create').innerHTML = "Create Account";
        }); 
    }
}
var latestMessage;
var timeoutID;

window.onload = function() {
    getMessages();
}

function sendNewMessage() {
    var newMsg = document.getElementById("newMessage").value;
    if (!newMsg) {
        return;
    }

    var req = new XMLHttpRequest();

    if (!req) {
        alert("Error creating XMLHTTP instance!");
        return;
    }

    req.onreadystatechange = function() {
        handleNewMessage(req);
    }

    var url = "/messages/?room_id="+room_id;

    req.open("POST", url);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

    var data = "text=" + newMsg;
    req.send(data);
}

function handleNewMessage(req) {
    if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
            document.getElementById("newMessage").value = null;
        }
        else {
            alert("There was a problem sending your message.");
        }
    }
}

function getMessages() {
    var req = new XMLHttpRequest();
    
    if (!req) {
        alert("Error creating XMLHTTP instance!");
        return;
    }

    req.onreadystatechange = function() {
        handleMessages(req);
    }

    var url = "/messages/?room_id="+room_id;
    if (!latestMessage) {}
    else {
        url += "&last_accessed="+latestMessage;
    } 

    req.open("GET", url);
    req.send();
}

function handleMessages(req) {
    if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
            var messages = JSON.parse(req.responseText);
            for (var i = 0; i < messages.length; i++) {
                addMessage(messages[i]);
            }
            if (messages.length > 0) {
                latestMessage = messages[i-1].msg_id;
            }
            timeoutID = setTimeout(getMessages, 1000);
        }
        else if (req.status == 404) {
            alert("This room no longer exists.\n\nPlease go back to the room list and refresh.");
        }
        else if (req.status == 403) {
            alert("You cannot be in two rooms at the same time!");
        }
        else {
            alert("There was a problem getting messages. Please refresh the page.");
        }
    }
}

function addMessage(m) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("messageWrapper");

    var message = document.createElement("div");
    message.classList.add("message");
    if (m.username == username) {
        message.classList.add("mine");
    }
    else {
        message.classList.add("others");
    }

    var label = document.createElement("div");
    label.classList.add("messageLabel");
    label.textContent = m.username + ":";
    message.appendChild(label);

    var textNode = document.createTextNode(m.content);
    message.appendChild(textNode);

    wrapper.appendChild(message);

    var content = document.getElementById("chatContent");
    content.appendChild(wrapper);
} 
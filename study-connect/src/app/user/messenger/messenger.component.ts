import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addMessage(m) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("messageWrapper");

    var message = document.createElement("div");
    message.classList.add("message");
    var label = document.createElement("div");
    label.classList.add("messageLabel");

    //TODO: Check if user signed in is the message sender
    if (true) {
        message.classList.add("mine");
        //TODO: Get logged in user's name and add it to label
        //label.textContent = user.first_name + " " + user.last_name + ":";
    }
    else {
        message.classList.add("others");
        //TODO: Get sender name and add it to label
        //label.textContent = m.sender.first_name + " " + m.sender.last_name + ":";
    }
    
    message.appendChild(label);

    var textNode = document.createTextNode(m.content);
    message.appendChild(textNode);

    wrapper.appendChild(message);

    var content = document.getElementById("chatContent");
    content.appendChild(wrapper);
  } 

}

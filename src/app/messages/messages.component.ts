import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../message';
import { MessagePayload } from '../message.payload';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public usernameTo: string;
  public usernameFrom: string;
  public conversation: Message[];
  public messagePayload: MessagePayload;
  public messageForm: FormGroup;
  public conversationLen: number;
  public fullConvo: Boolean;
  public over5: Boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private profileService: ProfileService, private toastr: ToastrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.messagePayload = {
      userNameFrom: '',
      userNameTo: '',
      message: ''
    };
   }

  ngOnInit(): void {
    this.fullConvo = false;
    this.over5 = false;
    this.messageForm = new FormGroup({
      messageInput: new FormControl('', Validators.required)
    })
    if(this.activatedRoute.snapshot.queryParamMap.get('usernameto') != null){
      this.usernameTo = String(this.activatedRoute.snapshot.queryParamMap.get('usernameto'));
    }
    if(this.activatedRoute.snapshot.queryParamMap.get('usernamefrom') != null){
      this.usernameFrom = String(this.activatedRoute.snapshot.queryParamMap.get('usernamefrom'));
    }
    this.getConversation(this.usernameTo, this.usernameFrom);
    


  }

  getConversation(usernameTo: string, usernameFrom: string){
    this.profileService.getConversation(usernameTo, usernameFrom).subscribe(
      (response: Message[]) => {
        this.conversation = response;
        this.sortConversation();
        this.conversationLen = this.conversation.length;
        if(this.conversationLen > 5){
          this.over5 = true;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );

  }

  addMessage(){
    this.messagePayload.message = this.messageForm.get('messageInput')?.value;
    this.messagePayload.userNameTo = this.usernameTo;
    this.messagePayload.userNameFrom = this.usernameFrom;
    this.profileService.addMessage(this.messagePayload).subscribe(data => {
      this.toastr.success('Message Sent');
      this.router.navigate(['/messages'], {queryParams: {usernameto: this.usernameTo, usernamefrom: this.usernameFrom}});
    }, () => {
      this.toastr.error('Failed to send message please refresh and try agian.');
    });
  }

  sortConversation(){
    var len = this.conversation.length;
    var i;
    var j;
    var stop;
    for (i=0; i < len; i++){
      for (j=0, stop=len-i; j < stop; j++){
          if (this.conversation[j]?.timeStamp > this.conversation[j+1]?.timeStamp){
            this.swap(this.conversation, j, j+1);
          };
      };
    }
  }

  swap(sortedConversation: Message[], firstIndex: number, secondIndex: number){
    var temp = sortedConversation[firstIndex];
    sortedConversation[firstIndex] = sortedConversation[secondIndex];
    sortedConversation[secondIndex] = temp;
    }

    getFullConvo(){
      if(this.fullConvo){
        this.fullConvo = false;
      }
      else{
        this.fullConvo = true;
      }
    }

}

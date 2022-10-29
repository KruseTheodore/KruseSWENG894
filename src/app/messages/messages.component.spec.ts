import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Message } from '../message';
import { ProfileService } from '../profile.service';

import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let profileService: ProfileService;
  let routerStub = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ToastrService, useValue: toastrService },
        ProfileService, {provide: Router, useValue: routerStub},
        {provide: ActivatedRoute, useValue: {snapshot: {queryParamMap: convertToParamMap({usernameto: 'test1', usernamefrom: 'test2'})}}}],
      declarations: [ MessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    profileService = TestBed.inject(ProfileService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getConversation', () => {
    let messages: Message[];
    let timeStampTO: BigInt;
    timeStampTO = BigInt("13245");
    messages = [
      {id: 'test', userNameTo: 'testName1', userNameFrom: 'testName2', message: "test message", timeStamp: timeStampTO}
    ]
    let newSpy = spyOn(profileService, 'getConversation').and.returnValues(of(messages));
    component.getConversation(messages[0].userNameTo, messages[0].userNameFrom);
    expect(newSpy).toHaveBeenCalled;
  });

  it('should getLongConversation', () => {
    let messages: Message[];
    let timeStampTO: BigInt;
    timeStampTO = BigInt("13245");
    let timeStamp2: BigInt;
    timeStamp2 = BigInt("132456");
    messages = [
      {id: 'test', userNameTo: 'testName1', userNameFrom: 'testName2', message: "test message", timeStamp: timeStampTO},
      {id: 'test1', userNameTo: 'testName1', userNameFrom: 'testName2', message: "test message1", timeStamp: timeStampTO},
      {id: 'test2', userNameTo: 'testName1', userNameFrom: 'testName2', message: "test message2", timeStamp: timeStampTO},
      {id: 'test3', userNameTo: 'testName1', userNameFrom: 'testName2', message: "test message3", timeStamp: timeStamp2},
      {id: 'test4', userNameTo: 'testName1', userNameFrom: 'testName2', message: "test message4", timeStamp: timeStampTO},
      {id: 'test5', userNameTo: 'testName1', userNameFrom: 'testName2', message: "test message5", timeStamp: timeStampTO},
    ]
    let newSpy = spyOn(profileService, 'getConversation').and.returnValues(of(messages));
    component.getConversation(messages[0].userNameTo, messages[0].userNameFrom);
    expect(newSpy).toHaveBeenCalled;
  });

  it('should getFullConvo', () => {
    component.fullConvo = false;
    component.getFullConvo();
    expect(component.fullConvo).toEqual(true);
    component.getFullConvo();
    expect(component.fullConvo).toEqual(false);
  });

  it('should addMessage', () => {
    component.messageForm.controls['messageInput'].setValue("testMessage");
    component.usernameTo = "testName1";
    component.usernameFrom = "testName2"
    let newSpy = spyOn(profileService, 'addMessage').and.returnValues(of({
      result : {
         httpStatus : 200
      }
    }));;
    component.addMessage();
    expect(newSpy).toHaveBeenCalled;
  });

});

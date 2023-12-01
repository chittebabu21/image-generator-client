import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  isListening = false;

  constructor() { }

  start() {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getResult(callback: (result: any) => void): void {
    if (this.recognition) {
      this.recognition.onresult = (event: any) => {
        console.log(event.results);
        const transcript = event.results[0][0].transcript;
        callback(transcript);
        this.stop();
      }

      this.recognition.onerror = (error: any) => {
        console.error('Speech recognition error: ', error);
        this.stop();
      }

      this.recognition.onend = () => {
        this.isListening = false;
      }
    } 
  }
}

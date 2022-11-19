import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {AvatarUpload} from '../../model/AvatarUpload';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {
  selectedFile: File[];
  ref: AngularFireStorageReference;
  downloadURL: string ;
  checkUploadAvatar = false;
  avatarUpload: AvatarUpload;
  arrUpload = [];
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  onFileChanged($event){
    console.log('$event ===> ', $event);
    this.selectedFile  = $event.target.files;
    console.log('file -->', $event.target.files);

  }
  onUpload(){
    this.checkUploadAvatar = true;

    for (let i = 0; i < this.selectedFile.length; i++) {
      // const id = Math.random().toString(36).substring(2); //Tạo ra 1 name riêng cho mỗi DB firebase;
      // this.ref = this.afStorage.ref(id);
      this.ref = this.afStorage.ref(this.selectedFile[i].name);
      console.log('select[i]', this.selectedFile[i]);
      this.ref.put(this.selectedFile[i]).then(snapshot =>{
        console.log('this.ref URL', snapshot.ref.getDownloadURL());
        return snapshot.ref.getDownloadURL(); //Tra ve 1 chuoi sieu van ban tren FB.
      }).then( downloadURL =>{ //chuyen giao link tu nhung component khac nhau khi su upload
        this.downloadURL = downloadURL;
        this.giveURLtoCreate.emit(this.downloadURL);
        // this.checkUploadAvatar = false;
        return this.downloadURL;
      }).then(()=>{
        this.avatarUpload = new AvatarUpload(this.selectedFile[i].name, this.downloadURL);
        this.arrUpload.push(this.avatarUpload);
        console.log('arrr--->', this.arrUpload);
      })
        .catch(error =>{
          console.log(`Failed to upload avatar and get link ${error}`);
        })
    }
  }
}

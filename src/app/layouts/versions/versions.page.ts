import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.page.html',
  styleUrls: ['./versions.page.scss'],
})
export class VersionsPage implements OnInit {

  appName: string;
  packageName: string;
  versionCode: string;
  versionNumber: string;
  constructor(private appVersion: AppVersion) { }

  ngOnInit() {
    // TODO: Prompt before the version information is obtained
    this.appVersion.getAppName().then(val => {
      this.appName = val;
    });
    this.appVersion.getPackageName().then(val => {
      this.packageName = val;
    });
    this.appVersion.getVersionCode().then(val => {
      this.versionCode = val + '';
    });
    this.appVersion.getVersionNumber().then(val => {
      this.versionNumber = val;
    });
  }

}

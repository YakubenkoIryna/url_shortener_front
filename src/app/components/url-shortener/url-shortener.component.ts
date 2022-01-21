import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UrlShortenerService } from '../../services/url-shortener.service';

@Component({
  selector: 'app-url-shortener',
  templateUrl: './url-shortener.component.html',
  styleUrls: ['./url-shortener.component.scss']
})
export class UrlShortenerComponent implements OnInit {

  isLoading: boolean = false;
  form: FormGroup;
  shortenerUrl: string = '';

  constructor(
    private urlShortenerService: UrlShortenerService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.checkIsRedirectLink();
  }

  checkIsRedirectLink(): void{
    const hash = this.activatedRoute.snapshot.params['hash'];
    if(!hash) return ;
    this.getOriginalLink(hash);
  }

  initForm(): void {
    this.form = new FormGroup({
      urlLink: new FormControl('', [Validators.required])
    })
  }

  getShortenURL(): void {
    this.isLoading = true;
    const url = this.form.value.urlLink;
    this.urlShortenerService.getShortenedURL(url).subscribe(res => {
      if (!res.linkHash) return;
      this.shortenerUrl = window.location.origin + '/' + res.linkHash;
      this.isLoading = false;
      this.form.reset();
    })
  }

  getOriginalLink(hash: string): void{
    this.urlShortenerService.getURL(hash).subscribe(res => {
      if(!res.link) return;
      this.openLink(res.link);
    })
  }

  openLink(originalUrl?: string): void {
    if(originalUrl){
      window.location.href = originalUrl;
      return;
    }
    window.location.href = this.shortenerUrl;
  }
}

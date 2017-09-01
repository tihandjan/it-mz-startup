import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { heartAnimation } from "../../shared/animations/icons-animations";
import { VoteService } from "../../services/vote";
import { UserAuthService } from "../../services/user-auth";

@Component({
    selector: 'comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comments.component.scss', './comment-item.component.scss'],
    animations: [
        heartAnimation
    ]
})
export class CommentItemComponent implements OnInit {
    @Input() comment;
    @Output() reply = new EventEmitter();
    constructor(
        private voteService: VoteService,
        private auth: UserAuthService
    ) { }

    ngOnInit() { }

    replyComment(): void {
        this.reply.emit({commentable: this.comment});
    }

  upVote(): void {
    if(this.auth.userSignedIn())
      this.voteService.vote('comments', this.comment.id).subscribe(
        res => {
          this.comment.likes = res;
          this.comment.liked = true;
        },
        err => console.log(err)
      )
  }

  downVote(): void {
    if(this.auth.userSignedIn())
      this.voteService.vote('comments', this.comment.id).subscribe(
        res => {
          this.comment.likes = res;
          this.comment.liked = false;
        },
        err => console.log(err)
      )
  }
}
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup } from "@angular/forms";
import { UserAuthService } from "../../services/user-auth";
import { Subject } from "rxjs/Rx";

import { CommentService } from "../../services/comment";
import { Comment } from "../../interfaces/comment";

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
    commentable: any = undefined;
    commentForm: FormGroup;
    comments;
    errors: any;
    subCommentErrors: any;
    unSubscribe: Subject<void> = new Subject<void>();
    user_signed_in: boolean;
    @Input() recipeId: number;
    constructor(
        private commentService: CommentService,
        private auth: UserAuthService
    ) { }

    ngOnInit() {
        this.commentForm = new FormGroup({
            'content': new FormControl('', Validators.required)
        });
        this.getComments();
        this.user_signed_in = this.auth.userSignedIn();
    }

    ngOnDestroy() {
        this.unSubscribe.next();
        this.unSubscribe.complete();
    }

    createComment(commentableType, commentableId): void {
        this.commentService.createComment(this.commentForm.value, commentableType, commentableId)
            .subscribe(
                res => {
                    this.errors = undefined;
                    this.commentForm.reset();
                    this.subCommentErrors = undefined;
                    this.commentable = undefined;
                    if(commentableType == 'comments')
                      this.comments.forEach(
                          (comment)=> {
                              if(comment.id == commentableId)
                                comment.comments.unshift(res);
                          }
                      )
                    if(commentableType == 'recipes')
                      this.comments.unshift(res)
                },
                err => {
                    if(commentableType == 'comments')
                      this.subCommentErrors = err.json();
                    if(commentableType == 'recipes')
                      this.errors = err.json();
                }
            )
    }

    replyComment(event): void {
        this.commentable = event.commentable;
        this.commentForm.reset();
        this.subCommentErrors = undefined;
    }

    getComments(): void {
        this.commentService.getComments('recipes', this.recipeId)
            .takeUntil(this.unSubscribe)
            .subscribe(
                res => {
                    this.comments = res;
                }, 
                err => console.log(err)
            )
    }
}
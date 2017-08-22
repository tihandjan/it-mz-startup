import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comments.component.scss', './comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
    @Input() comment;
    @Output() reply = new EventEmitter();
    constructor() { }

    ngOnInit() { }

    replyComment(): void {
        this.reply.emit({commentable: this.comment});
    }
}
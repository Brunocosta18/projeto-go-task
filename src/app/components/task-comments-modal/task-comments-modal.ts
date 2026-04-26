import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IComment } from '../../interfaces/comment.interface';
import { generateUniqueIdWithTimestamp } from '../../utils/ganerate-unique-is-with-timestamp';

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.html',
  styleUrl: './task-comments-modal.css',
})
export class TaskCommentsModal {

  taskCommentsChanged = false;
  commentControl = new FormControl('', [Validators.required]);

  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLElement>;

  readonly _task = inject<ITask>(DIALOG_DATA);
  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef);

  onAddComment() {
    console.log('Comentário adicionado:', this.commentControl.value);

    //Criar um comentário
    const newComment: IComment = {
      id: Number(generateUniqueIdWithTimestamp()) as number,
      description: this.commentControl.value ? this.commentControl.value : '',
    }

    // Adicionar o comentário à lista de comentários da tarefa
    this._task.comments.unshift(newComment);

    // reset no form control
    this.commentControl.reset();

    //atualizar a flag/prop se houver mudanças nos comentários
    this.taskCommentsChanged = true;

    //focando elemento de input após adicionar comentário
    this.commentInputRef.nativeElement.focus();


  }

  onRemoveComment(commentId: String) {
    this._task.comments = this._task.comments.filter(comment => comment.id !== commentId);

    this.taskCommentsChanged = true;

  }

  onCloseModal() {
    this._dialogRef.close(this.taskCommentsChanged);
  }
}

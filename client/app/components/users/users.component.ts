/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */
import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'users',
    templateUrl: './app/components/users/users.component.html'
})

export class UsersComponent implements OnInit {

    users: User[];
    selectedUser: User;
    error: any;

    closeResult: string;

    constructor(
        private router: Router,
        private modalService: NgbModal,
        private userService: UserService) {
        this.users = [];
    }

    open(content: any) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    getUsers() {
        this.userService.getUsers().then(users => {
            this.users = users;
            console.log("front user: === " + JSON.stringify(this.users));
        });
    }
    ngOnInit() {
        this.getUsers();
    }
    onSelect(user: User) { this.selectedUser = user; }

    gotoDetail() {
        this.router.navigate(['/detail', this.selectedUser._id]);
    }

    addUser() {
        this.selectedUser = null;
        this.router.navigate(['/detail', 'new']);
    }

    deleteUser(user: User, event: any) {
        event.stopPropagation();
        this.userService
            .delete(user)
            .then(res => {
                this.users = this.users.filter(h => h !== user);
                if (this.selectedUser === user) { this.selectedUser = null; }
            })
            .catch(error => this.error = error);
    }


}

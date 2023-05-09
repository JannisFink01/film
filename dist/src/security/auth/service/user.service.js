var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserService_1;
import { Injectable } from '@nestjs/common';
import { getLogger } from '../../../logger/logger.js';
import { users } from '../../../config/dev/users.js';
let UserService = UserService_1 = class UserService {
    #users = users;
    #logger = getLogger(UserService_1.name);
    constructor() {
        this.#logger.info('users=%o', users);
    }
    async findOne(username) {
        return this.#users.find((user) => user.username === username);
    }
    async findById(id) {
        return this.#users.find((user) => user.userId === id);
    }
};
UserService = UserService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map
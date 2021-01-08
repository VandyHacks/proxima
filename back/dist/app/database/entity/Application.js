"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
var ClassStanding;
(function (ClassStanding) {
    ClassStanding["FRESHMAN"] = "freshman";
    ClassStanding["SOPHOMORE"] = "sophomore";
    ClassStanding["JUNIOR"] = "junior";
})(ClassStanding = exports.ClassStanding || (exports.ClassStanding = {}));
var AcceptedCommitteeType;
(function (AcceptedCommitteeType) {
    AcceptedCommitteeType["OPERATIONS"] = "operations";
    AcceptedCommitteeType["DEVELOPMENT"] = "development";
    AcceptedCommitteeType["HACKEREXPERIENCE"] = "hacker experience";
    AcceptedCommitteeType["DESIGN"] = "design";
    AcceptedCommitteeType["SPONSORSHIP"] = "sponsorship";
    AcceptedCommitteeType["CONTENT"] = "content";
    AcceptedCommitteeType["MARKETING"] = "marketing";
    AcceptedCommitteeType["UNDECIDED"] = "undecided";
})(AcceptedCommitteeType = exports.AcceptedCommitteeType || (exports.AcceptedCommitteeType = {}));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["APPLIED"] = "applied";
    ApplicationStatus["TOINTERVIEW"] = "to_interview";
    ApplicationStatus["REJECTED"] = "rejected";
    ApplicationStatus["ACCEPTED"] = "accepted";
    ApplicationStatus["INREVIEW"] = "in_review";
})(ApplicationStatus = exports.ApplicationStatus || (exports.ApplicationStatus = {}));
let Application = class Application {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Application.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Application.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Application.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Application.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: ClassStanding,
    }),
    __metadata("design:type", String)
], Application.prototype, "year", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Application.prototype, "director", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: ApplicationStatus,
        default: 'applied',
    }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Application.prototype, "essay1", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Application.prototype, "essay2", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Application.prototype, "essay3", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Application.prototype, "resume_link", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Application.prototype, "commitments", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Application.prototype, "attendedVH", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Application.prototype, "feedback", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Application.prototype, "github_link", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Application.prototype, "linkedin_link", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Application.prototype, "social_link", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Application.prototype, "design_link", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Application.prototype, "source", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: AcceptedCommitteeType,
        default: 'undecided',
    }),
    __metadata("design:type", String)
], Application.prototype, "committee_accepted", void 0);
Application = __decorate([
    typeorm_1.Entity()
], Application);
exports.Application = Application;
//# sourceMappingURL=Application.js.map
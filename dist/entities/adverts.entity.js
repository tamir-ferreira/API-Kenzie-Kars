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
exports.Advert = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const comments_entity_1 = require("./comments.entity");
const images_entity_1 = require("./images.entity");
let Advert = class Advert {
    capitalizeBrandAndModel() {
        if (this.brand) {
            this.brand = this.capitalizeFirstLetter(this.brand);
        }
        if (this.model) {
            this.model = this.capitalizeFirstLetter(this.model);
        }
        if (this.color) {
            this.color = this.capitalizeFirstLetter(this.color);
        }
    }
    capitalizeFirstLetter(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Advert.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40 }),
    __metadata("design:type", String)
], Advert.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40 }),
    __metadata("design:type", String)
], Advert.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Advert.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10 }),
    __metadata("design:type", String)
], Advert.prototype, "fuel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Advert.prototype, "mileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20 }),
    __metadata("design:type", String)
], Advert.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Object)
], Advert.prototype, "fipe_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Object)
], Advert.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Advert.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Advert.prototype, "cover_image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "date" }),
    __metadata("design:type", String)
], Advert.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "date" }),
    __metadata("design:type", String)
], Advert.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: "true" }),
    __metadata("design:type", Boolean)
], Advert.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.adverts, { onDelete: "CASCADE" }),
    __metadata("design:type", users_entity_1.User)
], Advert.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.Comment, (comment) => comment.advert, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Advert.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => images_entity_1.Image, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Advert.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Advert.prototype, "capitalizeBrandAndModel", null);
Advert = __decorate([
    (0, typeorm_1.Entity)("adverts")
], Advert);
exports.Advert = Advert;

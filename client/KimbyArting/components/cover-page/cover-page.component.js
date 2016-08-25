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
var core_1 = require('@angular/core');
require('../../../../public/images/cover/lightBlueBackground.png');
require('../../../../public/images/cover/egyptGirlCover.png');
require('../../../../public/images/cover/artstationIcon.png');
require('../../../../public/images/cover/facebookIcon.png');
require('../../../../public/images/cover/instagramIcon.png');
require('../../../../public/images/cover/tumblrIcon.png');
require('../../../../public/images/cover/twitterIcon.png');
var CoverPageComponent = (function () {
    function CoverPageComponent() {
        this.enter = false;
        this.exit = false;
        this.showSocialLinks = false;
    }
    CoverPageComponent.prototype.ngAfterViewInit = function () {
        this.enter = true;
    };
    CoverPageComponent = __decorate([
        core_1.Component({
            selector: 'cover-page',
            templateUrl: './cover-page.component.html',
            styleUrls: ['./cover-page.component.scss']
        }), 
        __metadata('design:paramtypes', [])
    ], CoverPageComponent);
    return CoverPageComponent;
}());
exports.CoverPageComponent = CoverPageComponent;
//# sourceMappingURL=cover-page.component.js.map
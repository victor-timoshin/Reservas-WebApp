/// <reference path='../../Reference.ts' />
'use strict';
var App;
(function (App) {
    var UI;
    (function (UI) {
        var DropDownScopeDecl = (function () {
            function DropDownScopeDecl() {
            }
            return DropDownScopeDecl;
        })();
        UI.DropDownScopeDecl = DropDownScopeDecl;
        var DropDownDirective = (function () {
            function DropDownDirective() {
                var self = this;
                self.restrict = 'A';
                self.templateUrl = '/Application/UI/DropDown/DropDownTemplate.html';
                self.transclude = true;
                self.replace = true;
                self.scope = new DropDownScopeDecl();
                self.scope.title = '@';
                self.link = function (dropDownScope, instanceElement, instanceAttributes, controller) {
                    instanceElement.bind('mouseenter', function () {
                        instanceElement.addClass('open');
                    });
                    instanceElement.bind('mouseleave', function () {
                        instanceElement.removeClass('open');
                    });
                };
            }
            //#endregion
            DropDownDirective.Factory = function () {
                var directive = function () {
                    return new DropDownDirective();
                };
                return directive;
            };
            return DropDownDirective;
        })();
        UI.DropDownDirective = DropDownDirective;
        Main.App.Directives.directive('uiDropdown', DropDownDirective.Factory());
    })(UI = App.UI || (App.UI = {}));
})(App || (App = {}));
//# sourceMappingURL=DropDownDirective.js.map
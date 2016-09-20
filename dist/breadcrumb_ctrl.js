"use strict";

System.register(["lodash", "app/plugins/sdk", "app/features/dashboard/impression_store", "./breadcrumb.css!"], function (_export, _context) {
    "use strict";

    var _, PanelCtrl, impressions, _createClass, BreadcrumbCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_lodash) {
            _ = _lodash.default;
        }, function (_appPluginsSdk) {
            PanelCtrl = _appPluginsSdk.PanelCtrl;
        }, function (_appFeaturesDashboardImpression_store) {
            impressions = _appFeaturesDashboardImpression_store.impressions;
        }, function (_breadcrumbCss) {}],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("PanelCtrl", _export("BreadcrumbCtrl", BreadcrumbCtrl = function (_PanelCtrl) {
                _inherits(BreadcrumbCtrl, _PanelCtrl);

                /**
                 * Breadcrumb class constructor
                 * @param {IBreadcrumbScope} $scope Angular scope
                 * @param {ng.auto.IInjectorService} $injector Angluar injector service
                 * @param {ng.ILocationService} $location Angular location service
                 * @param {any} backendSrv Grafana backend callback
                 */
                function BreadcrumbCtrl($scope, $injector, $location, backendSrv) {
                    _classCallCheck(this, BreadcrumbCtrl);

                    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BreadcrumbCtrl).call(this, $scope, $injector));

                    // Init variables
                    $scope.navigate = _this.navigate.bind(_this);
                    _this.backendSrv = backendSrv;
                    _this.dashboardList = [];
                    _this.windowLocation = $location;
                    // Check for browser session storage and create one if it doesn't exist
                    if (!sessionStorage.getItem("dashlist")) {
                        sessionStorage.setItem("dashlist", "[]");
                    } else {
                        _this.dashboardList = JSON.parse(sessionStorage.getItem("dashlist"));
                    }
                    _this.updateText();
                    return _this;
                }
                /**
                 * Update Breadcrumb items
                 */


                _createClass(BreadcrumbCtrl, [{
                    key: "updateText",
                    value: function updateText() {
                        var _this2 = this;

                        var dashIds = impressions.getDashboardOpened();
                        // Fetch list of all dashboards from Grafana
                        this.backendSrv.search({ dashboardIds: dashIds, limit: this.panel.limit }).then(function (result) {
                            var uri = "db/" + window.location.pathname.split("/").pop();
                            var obj = _.find(result, { uri: uri });
                            // Add current dashboard to breadcrumb if it doesn't exist
                            if (_.findIndex(_this2.dashboardList, { url: "dashboard/" + uri }) < 0) {
                                _this2.dashboardList.push({ url: "dashboard/" + uri, name: obj.title });
                            }
                            // Update session storage
                            sessionStorage.setItem("dashlist", JSON.stringify(_this2.dashboardList));
                        });
                    }
                }, {
                    key: "navigate",
                    value: function navigate(url) {
                        // Check if user is navigating backwards in breadcrumb and
                        // remove all items that follow the selected item in that case
                        var index = _.findIndex(this.dashboardList, { url: url });
                        if (index > -1 && this.dashboardList.length >= index + 2) {
                            this.dashboardList.splice(index + 1, this.dashboardList.length - index - 1);
                            sessionStorage.setItem("dashlist", JSON.stringify(this.dashboardList));
                        }
                        this.windowLocation.path(url);
                    }
                }]);

                return BreadcrumbCtrl;
            }(PanelCtrl)));

            BreadcrumbCtrl.templateUrl = "module.html";

            _export("BreadcrumbCtrl", BreadcrumbCtrl);

            _export("PanelCtrl", BreadcrumbCtrl);
        }
    };
});
//# sourceMappingURL=breadcrumb_ctrl.js.map

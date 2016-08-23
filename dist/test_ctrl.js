'use strict';

System.register(['lodash', 'app/plugins/sdk', 'app/features/dashboard/impression_store', 'app/core/config', './css/bootstrap.css!'], function (_export, _context) {
    "use strict";

    var _, PanelCtrl, impressions, config, _createClass, TestCtrl;

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
        }, function (_appCoreConfig) {
            config = _appCoreConfig.default;
        }, function (_cssBootstrapCss) {}],
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

            _export('TestCtrl', TestCtrl = function (_PanelCtrl) {
                _inherits(TestCtrl, _PanelCtrl);

                function TestCtrl($scope, $injector, backendSrv) {
                    _classCallCheck(this, TestCtrl);

                    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TestCtrl).call(this, $scope, $injector));

                    _this.backendSrv = backendSrv;
                    _this.test = [];
                    if (!sessionStorage.getItem('dashlist')) {
                        sessionStorage.setItem('dashlist', '[]');
                    } else {
                        _this.test = JSON.parse(sessionStorage.getItem('dashlist'));
                    }
                    _this.updateText();
                    return _this;
                }

                _createClass(TestCtrl, [{
                    key: 'updateText',
                    value: function updateText() {
                        var _this2 = this;

                        var dashIds = impressions.getDashboardOpened();
                        this.backendSrv.search({ dashboardIds: dashIds, limit: this.panel.limit }).then(function (result) {
                            var uri = "db/" + window.location.pathname.split("/").pop();
                            var obj = _.find(result, { uri: uri });
                            _this2.test.push({ url: "dashboard/" + uri + "?hide_top_bar", name: obj.title });
                            sessionStorage.setItem('dashlist', JSON.stringify(_this2.test));
                        });
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem) {
                        this.events.on('render', function () {
                            var $panelContainer = elem.find('.panel-content');
                            $panelContainer.css('padding', '0');
                        });
                    }
                }]);

                return TestCtrl;
            }(PanelCtrl));

            _export('TestCtrl', TestCtrl);

            TestCtrl.templateUrl = 'module.html';
        }
    };
});
//# sourceMappingURL=test_ctrl.js.map

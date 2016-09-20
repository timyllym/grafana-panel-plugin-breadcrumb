// dummy modules
declare module 'app/plugins/sdk' {
  var sdk: any;
  export class PanelCtrl {
      constructor($scope, $injector);
  }
  export default sdk;
}

declare module 'lodash' {
  var lodash: any;
  export default lodash;
}

declare module 'app/features/dashboard/impression_store' {
  var impression_store: any;
  export var impressions: any;
  export default impression_store;
}

declare module 'app/core/config' {
  var config: any;
  export default config;
}

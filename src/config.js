const config = {
  dev:{
    url:'http://h5.test.fxds/fxd-esb/',
    local:'http://192.168.14.71:8000/',
    nUrl: 'http://192.168.12.109:8005/apigw/client/'
  },
  pro:{
    url:'http://192.168.6.134:9191/fxd-esb/',
    local:'locahost/',
  }
};


export default (() => {
  return config.dev;
})();

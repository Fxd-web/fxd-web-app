const config = {
  dev:{
    url:'http://h5.test.fxds/fxd-esb/',
    local:'http://192.168.14.71:8000/',
  },
  pro:{
    url:'https://h5.faxindai.com:8028/fxd-esb/',
    local:'locahost/',
  }
};


export default (() => {
  return config.dev;
})();

const config = {
  dev:{
    url:'http://192.168.7.253:8081/fxd-esb/',
    local:'http://192.168.12.58:7000/',
  },
  pro:{
    url:'https://h5.faxindai.com:8028/fxd-esb/',
    local:'locahost/',
  }
};


export default (() => {
  return config.pro;
})();

const config = {
  dev:{
    url:'http://192.168.6.133:8081/fxd-esb/',
    local:'http://192.168.14.71:8000/',
  },
  pro:{
    url:'https://h5.faxindai.com:8028/fxd-esb/',
    local:'locahost/',
  }
};


export default (() => {
  return config.pro;
})();

export default {
  user: (state) => state.user.user,
  mine: (state) => state.mine.mine,
  dictionary: (state) => state.dictionary,
  addrList: (state) => state.dictionary.addrList,
  bank: (state) => state.mine.bank,
  config: (state) => state.config,
  information: (state) => state.information.information,
  customerBase: (state) => state.information.customerBase,
  customerCarrer: (state) => state.information.customerCarrer,
  customerIDInfo: state => state.information.customerIDInfo,
  deal_verify: state => state.deal_verify,
}

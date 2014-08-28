// Change '1000' as appropriate.
Components.utils.import("resource://services-sync/engines.js");
Components.utils.import("resource://services-sync/engines/prefs.js");
let bme = Weave.Service.engineManager.get("prefs");

let ids = Object.keys(bme._store.getAllIDs());
for each (let id in ids) {
  let record = bme._store.createRecord(id, "prefs");
  let len = record.toString().length;
  if (len > 1000) {
    console.log("ID: " + id + ", len = " + len + ", " + record);
  }
}
// 13:11:43.500 undefined
// 13:11:43.506 "ID: e2VjODAzMGY3LWMyMGEtNDY0Zi05YjBlLTEzYTNhOWU5NzM4NH0=, len = 33602, { id: e2VjODAzMGY3LWMyMGEtNDY0Zi05YjBlLTEzYTNhOWU5NzM4NH0=  index: 0  modified: undefined  ttl: undefined  payload: {"id":"e2VjODAzMGY3LWMyMGEtNDY0Zi05YjBlLTEzYTNhOWU5NzM4NH0=","value":{"security.OCSP.enabled":2,"app.update.mode":1,"pref.downloads.disable_button.edit_actions":false,"browser.urlbar.default.behavior":0,"browser.formfill.enable":true,"browser.startup.homepage":"chrome://branding/locale/browserconfig.properties","permissions.default.image":1,"browser.tabs.warnOnOpen":true,"addons.ignoreUserEnabledChanges":null,"security.OCSP.require":false,"extensions.jid1-HE38Y6vsW9TpHg@jetpack.syncstorage":"[{\"activity\":\"\\\"good morning munich\\\"\",\"start\":\"2014/08/25 00:06:43\",\"end\":\"2014/08/25 00:06:43\"},{\"activity\":\"\\\"kuckuck\\\"\",\"start\":\"2014/08/25 13:27:51\",\"end\":\"2014/08/25 13:27:51\"},{\"activity\":\"\\\"jot!\\\\n# Inbox - adrian.aichner@gmail.com - Gmail\\\\n@ https://mail.google.com"[…]
// 13:14:21.784 "content script $Format:%h%d$ loads in resource://jid1-he38y6vsw9tphg-at-jetpack/jot/data/display.html using "Mozilla/5.0 (Windows NT 5.1; rv:34.0) Gecko/20100101 Firefox/34.0" @resource://gre/modules/addons/XPIProvider.jsm -> jar:file:///C:/Dokumente%20und%20Einstellungen/AichnerAd/Anwendungsdaten/Mozilla/Firefox/Profiles/xwlwa1jh.default-1385301407992/extensions/jid1-HE38Y6vsW9TpHg@jetpack.xpi!/bootstrap.js -> resource://gre/modules/commonjs/toolkit/loader.js -> resource://gre/modules/commonjs/sdk/loader/sandbox.js -> resource://jid1-he38y6vsw9tphg-at-jetpack/jot/data/display.js#L18C10
// @resource://gre/modules/addons/XPIProvider.jsm -> jar:file:///C:/Dokumente%20und%20Einstellungen/AichnerAd/Anwendungsdaten/Mozilla/Firefox/Profiles/xwlwa1jh.default-1385301407992/extensions/jid1-HE38Y6vsW9TpHg@jetpack.xpi!/bootstrap.js -> resource://gre/modules/commonjs/toolkit/loader.js -> resource://gre/modules/commonjs/sdk/loader/sandbox.js -> resource://jid1-he38y6vsw9tphg-at-jetpack/jot/data/display.js#L8C3
// "
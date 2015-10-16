(function () {
  let texta,
      textb;
  let fromRadio = document.querySelector('input[name=from]:checked');
  let fromUrl = fromRadio && fromRadio.parentElement.parentElement.querySelector('.revision-list-date>a').href;
  let toRadio = document.querySelector('input[name=to]:checked');
  let toUrl = toRadio && toRadio.parentElement.parentElement.querySelector('.revision-list-date>a').href;
  window.addEventListener('change', function(event) {
    console.log(event.type, event.target, event.target.value);
    if (event.target.type == 'radio') {
      if (event.target.name == 'from') {
        urla.value = event.target.parentElement.parentElement.querySelector('.revision-list-date>a').href;
        loadText(urla).then(function(val) {
          texta = val;
        });
      }
      if (event.target.name == 'to') {
        urlb.value = event.target.parentElement.parentElement.querySelector('.revision-list-date>a').href;
        loadText(urlb).then(function(val) {
          textb = val;
        });
      }
    }
  });
  let urla = document.createElement('input');
  urla.type = 'url';
  urla.id = 'urla';
  urla.value = fromUrl;
  function loadText(url) {
    url.style.backgroundColor = 'grey';
    return new Promise(function (resolve, reject) {
      getUrlText(url.value.trim()).then(function (val) {
        resolve(val);
        url.style.backgroundColor = 'mintcream';
      });
    });
  }
  let urlb = document.createElement('input');
  urlb.type = 'url';
  urlb.id = 'urlb';
  urlb.value = toUrl;
  fromUrl && loadText(urla).then(function(val) {
    texta = val;
  });
  toUrl && loadText(urlb).then(function(val) {
    textb = val;
  });
  let compare = document.createElement('input');
  let context = document.createElement('input');
  context.type = 'checkbox';
  context.id = 'dmp_context';
  context.name = 'dmp_context';
  let contextLabel = document.createElement('label');
  contextLabel.for = 'dmp_context';
  contextLabel.textContent = 'show context';
  context.addEventListener('change', function(event) {
    event.target.toggle();
  });
  compare.type = 'button';
  compare.value = 'Compare';
  compare.addEventListener('click', function (event) {
    if (texta && texta.length && textb && textb.length) {
      console.log(texta.length, textb.length);
      // console.log(texta.substring(0, 20), textb.substring(0, 20));
      let options = {
        newlineIsToken: true,
      };
      let div = document.createElement('div');
      let divClose = document.createElement('div');
      let close = document.createElement('a');
      close.href = 'close';
      close.innerHTML = '&times;';
      close.addEventListener('click', function(event) {
        event.preventDefault();
        event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);
      });
      let divDiffs = document.createElement('div');
      divDiffs.style = 'position: fixed;  background-color: white; bottom: 2mm; left: 2mm; right: 2mm; top: 2mm; overflow: auto';
      let style = 'position: fixed; ';
      style += ' left: 2mm; top: 2mm; background-color: white';
      div.style = style;
      divClose.style = 'position: fixed;  background-color: white; bottom: 2mm; right: 2mm; font-size: large';
      divClose.appendChild(close);
      div.appendChild(divDiffs);
      div.appendChild(divClose);
      document.body.appendChild(div);
      let dmp = new diff_match_patch;
      // dmp.Patch_Margin = 0;
      let diff = dmp.diff_main(texta, textb);
      dmp.diff_cleanupSemantic(diff);
      // dmp.diff_cleanupMerge(diff);
      console.log('diff unfiltered', diff.length);
      if (!context.checked) {
        diff = diff.filter(function(val, index, arr) {
          if (val[0] != 0) return val; });
      }
      console.log('diff filtered', diff.length);
      dmp.diff_prettyHtml(diff);
      divDiffs.innerHTML = (dmp.diff_prettyHtml(diff));
    } 
    else {
      console.log('load both urls first');
    }
  });
  let div = document.createElement('div');
  div.style = 'position: fixed; bottom: 2mm; right: 2mm; background-color: white';
  // window.alert("Hello" + a.value);
  div.appendChild(urla);
  div.appendChild(urlb);
  div.appendChild(compare);
  div.appendChild(context);
  div.appendChild(contextLabel);
  document.body.appendChild(div);
  let script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/diff_match_patch/20121119/diff_match_patch.js';
  document.head.appendChild(script);
  // TODO: Promisify!
  function getUrlText(url) {
    return new Promise(function (resolve, reject) {
      let reqa = new XMLHttpRequest();
      let reqListener = function () {
        console.log(url + ' loads responseText of length ' + this.responseText.length);
        resolve(this.responseText);
      };
      reqa.addEventListener('load', reqListener);
      reqa.open('GET', url);
      reqa.send();
    });
  }
}) ();

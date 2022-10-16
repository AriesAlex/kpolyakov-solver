fetch(chrome.runtime.getURL('/dict.txt'))
  .then(resp => resp.text())
  .then(dict => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    el.outerHTML = `<div style="display:none" id="dict">${dict}</div>`
  })

injectScript(chrome.runtime.getURL('/script.js'))

function injectScript(file) {
  let th = document.body
  let s = document.createElement('script')
  s.setAttribute('type', 'text/javascript')
  s.setAttribute('src', file)
  th.appendChild(s)
}

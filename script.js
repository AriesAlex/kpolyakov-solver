const dict = {}
const int = setInterval(() => {
  const el = document.getElementById('dict')
  if (!el) return
  const raw = el.innerHTML
  for (const line of raw.split('\n')) {
    const hash = line.split('=')[0]
    const answer = line.split('=')[1]
    dict[hash] = answer
  }
  clearInterval(int)
  el.outerHTML = ''
}, 10)

function solve() {
  for (const el of [...document.getElementsByTagName('input')]) {
    if (el.type == 'text') clearText(el)

    if (el.value) el.selected = el.value
    if (el.value == '1') el.checked = true
    if (el.value == '0') el.checked = false

    const el2 = document.getElementsByName(el.name + '_')[0]
    const corrertHashes = el2?.value
    if (!corrertHashes) continue
    for (const corrertHash of corrertHashes.split('&')) {
      if (dict[corrertHash]) el.value = dict[corrertHash]
    }
  }

  for (const el of [...document.getElementsByClassName('pairs')]) {
    el.selectedIndex = [...el.options].find(option => option.value == '1').index
  }
}

/*
checkbox, radio:
  если value у галочки 1 то должна стоять

int:
  декодирует через checkText и смотрит чтобы value был корректным числом

pairs:
  смотрит чтобы select'ы с name aX_Y были равны индексу своего option'а с value 1

text:
  смотрит чтобы в хеше(aX_) содержался md5 хеш введенного ответа (aX)
*/

function initLoading() {
  const loading = document.createElement('div')
  document.body.appendChild(loading)
  loading.outerHTML = `
<div
  id="ariex-loading"
  style="
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0) rotateZ(30deg);
    width: 128px;
    height:128px;
    border-radius: 100%;
    border: 4px solid rgba(255, 255, 255, .2);
    background-size: cover;
    background-position: center;
    background-image: url(https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/22/22bf13914a6c1be7286022315a77410711463416_full.jpg);
    box-shadow: 0px 0px 29px 0px rgba(34, 60, 80, 0.2);
    pointer-events: none;
    z-index: 100000000;
    transition: .5s all;
    opacity: 0;
  "
></div>
`
}
initLoading()

function showLoading() {
  const loading = document.getElementById('ariex-loading')
  loading.style.transform = 'translate(-50%, -50%) scale(1) rotateZ(0)'
  loading.style.opacity = '1'
  setTimeout(() => {
    loading.style.transform = 'translate(-50%, -50%) scale(0) rotateZ(30deg)'
    loading.style.opacity = '0'
  }, 500)
}

window.onkeydown = e => {
  if (e.code == 'KeyB' && e.ctrlKey) {
    showLoading()
    setTimeout(solve, 50)
  }
}

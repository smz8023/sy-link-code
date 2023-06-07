const getFilePath = (element) => {
  if (!element || !element.getAttribute) return null
  if (element.getAttribute('code-location')) {
    return element.getAttribute('code-location')
  }
  return this.getFilePath(element.parentNode)
}

const uuid = () => {
  let uuid = ''
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const len = chars.length

  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-'
    } else if (i === 14) {
      uuid += '4'
    } else {
      const randomIndex = Math.floor(Math.random() * len)
      uuid += chars[randomIndex]
    }
  }

  return uuid
}


const request = function (filePath){
  console.log('this===', this);
  let xhr = new XMLHttpRequest()
  xhr.open('POST', this.url + '/code-link', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  console.log('this.type', this.type);
  xhr.send(JSON.stringify({
    filePath,
    type: this.type
  }))
}



function CodeLink (options={}) {
  console.log('this====this', this);
  if (process.env.NODE_ENV === 'development') {
    this.url = options.url || 'https://localhost:8083'
    this.type = options.type || 'vsCode'
    let _this = this
    _this.uuid = uuid;
    _this.request = request;
    _this.getFilePath = getFilePath;
    document.oncontextmenu = function () {
      return false
    }
    document.onclick = function (e) {
      console.log('e', e.shiftKey, e.button);
      if (e.shiftKey && e.button === 0) {
        const element = document.createElement('div')
        const elementId = 'clickBall' + _this.uuid()
        element.id = elementId
        element.style.left = (e.clientX - 20) + 'px'
        element.style.top = (e.clientY - 20) + 'px'
        document.body.appendChild(element)
        setTimeout(() => {
          document.getElementById(elementId).remove()
        }, 1000)

        e.preventDefault()
        const filePath = _this.getFilePath(e.target)
        if (filePath) {
          _this.request(filePath)
        }
      }
    }
  }
}


export default CodeLink;
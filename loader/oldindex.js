const {parseComponent} = require('vue-template-compiler')
const fs = require('fs')
// module.exports = function sylinkcodeloader(source) {
//   const {
//     resourcePath
//   } = this
//   return sourceCodeChange(source, resourcePath)
// }
const c = fs.readFileSync('/Users/a123/Downloads/商越/fe-inner/pages/index/src/routes/product-centers/basic-ability/data-weight-dimension-pool/list/index.vue', {encoding: 'utf-8'})
function p (source) {
  const {
    resourcePath
  } = this
  return sourceCodeChange(source, resourcePath)
}
const  b  = p(c)
 function sourceCodeChange (source, resourcePath) {
  return codeLineTrack(source, resourcePath)
}
console.log('b', b);
function codeLineTrack (str, resourcePath) {
  const s = parseComponent(str)
  console.log('s', Object.keys(s));
  let lineList = []
  let newList = []
  // //template标识，用于判断代码是否在template内，限制只处理tempalte下的代码
  let templateIndex = {
    index: 0
  }
  console.log(s?.script);
  if (s?.template) {
    lineList = s.template.content.split('\n')
  }
  // if (s?.script) {
  //   const content = s.script.content 
  //   const reRender = /render\s*\(\)\s*{([\s\S]+)}/m
  //   const renderStr = reRender.exec(content)[1]
  //   const reDOM = /return\s*(['"])([\s\S]+)\1;/m 
  //   const dom = reDOM.exec(renderStr)[2]
  //   lineList = dom.split('\n')
  // }
  lineList.forEach((item, index) => {
    newList.push(addLineAttr(item, index + 1, resourcePath, templateIndex)) // 添加位置属性，index+1为具体的代码行号
  })
  return newList.join('\n') + '\n' + s?.script?.content  + '\n' +( s?.style?.content || '')
  // let lineList = str.split('\n')
  // let newList = []
  //template标识，用于判断代码是否在template内，限制只处理tempalte下的代码
  // let templateIndex = {
  //   index: 0
  // }
  // lineList.forEach((item, index) => {
  //   newList.push(addLineAttr(item, index + 1, resourcePath, templateIndex)) // 添加位置属性，index+1为具体的代码行号
  // })
  // return newList.join('\n')
}

function addLineAttr (lineStr, line, resourcePath, templateIndex) {
  let reg = /(<[\w-]+)|(<\/template)/g
  let leftTagList = lineStr.match(reg)
  // console.log('leftTagList',leftTagList);
  // debugger
  if (leftTagList) {
    leftTagList = Array.from(new Set(leftTagList))
    leftTagList = leftTagList.filter(item => {
      let status = false
      leftTagList.forEach(childItem => {
        if (childItem !== item && childItem.indexOf(item) >= 0) {
          status = true
        }
      })
      if (status) {
        return false
      } else {
        return true
      }
    })
    leftTagList.forEach((item) => {
      if (item && item.indexOf('<template') !== -1) {
        templateIndex.index += 1
      }
      if (item && item.indexOf('</template') !== -1) {
        templateIndex.index -= 1
      }
      if (templateIndex.index > 0 && item && item.indexOf('template') === -1) {
        let regx = new RegExp(`${item}`, 'g')
        let location = ` ${item} code-location="${resourcePath}:${line}" `
        lineStr = lineStr.replace(regx, location)
      }
    })
  }
  return lineStr
}

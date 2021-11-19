import JSZip from 'jszip'
import fs from 'fs'
import path from 'path'
import moment from 'moment'

function readDir(zip: JSZip | any, dirPath: fs.PathLike) {
  // 读取dist下的根文件目录
  const files = fs.readdirSync(dirPath)
  files.forEach((fileName) => {
    const fillPath = `${dirPath}/${fileName}`
    const file = fs.statSync(fillPath)
    // 如果是文件夹的话需要递归遍历下面的子文件
    if (file.isDirectory()) {
      const dirZip = zip.folder(fileName)
      readDir(dirZip, fillPath)
    } else {
      // 读取每个文件为buffer存到zip中
      zip.file(fileName, fs.readFileSync(fillPath))
    }
  })
}

export default function generateZip(VITE_APP_PORT: String) {
  const now = moment().format('YYYYMMDDHHmm')
  const zip = new JSZip()
  const sourceDir = path.join(__dirname, '../../dist')
  console.log(sourceDir)

  readDir(zip, sourceDir)
  zip
    .generateAsync({
      type: 'nodebuffer', // 压缩类型
      compression: 'DEFLATE', // 压缩算法
      compressionOptions: {
        // 压缩级别
        level: 9
      }
    })
    .then((content) => {
      const dest = path.join(__dirname, '../../zip')
      console.log(dest)
      // 删除旧包目录
      // zip.remove(dest)
      // 创建新包目录
      fs.mkdirSync(dest, {
        recursive: true
      })
      // 把zip包写到硬盘中，这个content现在是一段buffer
      fs.writeFileSync(`zip/${VITE_APP_PORT}${now}.zip`, content)
    })
}

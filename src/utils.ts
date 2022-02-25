import fs from 'fs'
import path from 'path'
import tmp from 'tmp'
tmp.setGracefulCleanup()

export function folderIsInsensitive(): boolean {
  const aFolder = '.'
  const t = tmp.fileSync({template: path.join(aFolder, '_tmp-XXXXXXXXX')})
  const result = fs.existsSync(t.name.toUpperCase())
  t.removeCallback()
  return result
}

import {expect} from 'chai'
import {checkExistence} from '../src/main'
import {folderIsInsensitive} from '../src/utils'

function setEnv(name: string, value: string): void {
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value
}

describe('Case sensitivity', function () {
  it('should return true for existing file', async function () {
    setEnv('ignore_case', 'false')
    const res = await checkExistence('test/resource/test.txt')
    expect(res).to.equal(true)
  })

  it('should return false for uppercase file', async function () {
    setEnv('ignore_case', 'false')
    const res = await checkExistence('test/resource/TEST.txt')
    if (folderIsInsensitive()) {
      expect(res).to.equal(true)
    } else {
      expect(res).to.equal(false)
    }
  })

  it('should return true for uppercase file with ignore_case true', async function () {
    setEnv('ignore_case', 'true')
    const res = await checkExistence('test/resource/TEST.txt')
    expect(res).to.equal(true)
  })

  it('should return true for mIxEd case file with ignore_case true', async function () {
    setEnv('ignore_case', 'true')
    const res = await checkExistence('test/resource/TeSt.txt')
    expect(res).to.equal(true)
  })
})

describe('Glob patterns', function () {
  it('should return true for **/test.txt', async function () {
    setEnv('ignore_case', 'false')
    const res = await checkExistence('test/**/test.txt')
    expect(res).to.equal(true)
  })

  it('should return false for *.txt', async function () {
    setEnv('ignore_case', 'false')
    const res = await checkExistence('test/*.txt')
    expect(res).to.equal(false)
  })

  it('should return true for **/*.txt', async function () {
    setEnv('ignore_case', 'false')
    const res = await checkExistence('test/**/*.txt')
    expect(res).to.equal(true)
  })
})

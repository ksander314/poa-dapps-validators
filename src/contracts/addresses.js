import { constants } from '../constants'
import helpers from './helpers'
import helpersGlobal from '../helpers'
import messages from '../messages'
const local = {
  METADATA_ADDRESS: '0x811803d2afb9b634ee8e2beb257302c6f5b603cc',
  KEYS_MANAGER_ADDRESS: '0xf23b0069dc0c97491a72d199cf82ada46ebdaa28',
  POA_ADDRESS: '0x8bf38d4764929064f2d4d3a56520a76ab3df415b',
  MOC: '0x00dcd1bc751772581544b7c237d2738db9fb4d9b'
}

export default web3Config => {
  let branch

  switch (web3Config.netId) {
    case constants.NETID_SOKOL:
      branch = 'sokol'
      break
    case constants.NETID_DAI_TEST:
      branch = 'dai-test'
      break
    case constants.NETID_CORE:
      branch = 'core'
      break
    case constants.NETID_DAI:
      branch = 'dai'
      break
    default:
      branch = 'core'
      break
  }
  return new Promise((resolve, reject) => {
    fetch(helpers.addressesURL(branch))
      .then(response => {
        response.json().then(json => {
          resolve({ addresses: local, web3Config })
        })
      })
      .catch(function(err) {
        let addr = helpers.addressesURL(branch)
        let msg = `
                Something went wrong!<br/><br/>
                ${messages.wrongRepo(addr)}
            `
        helpersGlobal.generateAlert('error', 'Error!', msg)
        reject(err)
      })
  })
}

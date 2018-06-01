import helpers from './helpers'
import helpersGlobal from '../helpers'
import messages from '../messages'
const local = {
  METADATA_ADDRESS: '0x3f7de87620847472114992f2a229328ff94299dc',
  KEYS_MANAGER_ADDRESS: '0x1a735dc5cbbd2d7c2e270dd375d4fa0e9921a195',
  POA_ADDRESS: '0x8bf38d4764929064f2d4d3a56520a76ab3df415b',
  MOC: '0x5a7a374920fdfd64c3c9fbc48aeff9cf1f6cc970'
}

export default (web3Config) => {
    let branch;
    
    switch (web3Config.netId) {
        case '77':
            branch = 'sokol'
            break;
        case '99':
            branch = 'core'
            break;
        default:
            branch = 'core'
            break;
    }
    return new Promise((resolve, reject) => {
        fetch(helpers.addressesURL(branch)).then((response) => { 
            response.json().then((json) => {
                resolve({addresses: local, web3Config});
            })
        }).catch(function(err) {
            let addr = helpers.addressesURL(branch);
            let msg = `
                Something went wrong!<br/><br/>
                ${messages.wrongRepo(addr)}
            `
            helpersGlobal.generateAlert("error", "Error!", msg);
            reject(err);
        });
    })
}

const r = require('ripple-address-codec');                                                                           
const ed = require('elliptic').eddsa;                                                                                  
const ec = new ed('ed25519');                                                                                          
                                   
const dicerolls = [

// enter your dice rolls here (up to 76)
    1,2,3

];

let i = 0n;
for (let x in dicerolls)
{
    i += BigInt(dicerolls[x]);
    i *= 10n;
}

let s = i.toString(16).toUpperCase();
if (s.length < 64) s = '0'.repeat(64-s.length) + s;
const kp = ec.keyFromSecret(s);

const pk = 'ED' + Buffer.from(kp.getPublic()).toString('hex').toUpperCase();
const sk = Buffer.from(kp.secret()).toString('hex').toUpperCase();

let toEncodeSK = Buffer.from('20' + sk, 'hex');
let cksum = r.codec.sha256(r.codec.sha256(toEncodeSK)).slice(0,4);
cksum = cksum.toString('hex').toUpperCase();
if (cksum.length < 8)
    chksum = '0'.repeat(8-cksum.length) + cksum;

toEncodeSK = Buffer.from('20' + sk + cksum, 'hex');

const encodedSK = r.codec.codec.encode(toEncodeSK);
const encodedPK = r.encodeNodePublic(Buffer.from(pk, 'hex'));

console.log(`
{
   "key_type" : "ed25519",
   "public_key" : "` + encodedPK + `",
   "revoked" : false,
   "secret_key" : "` + encodedSK + `",
   "token_sequence" : 0
}
`);

import 'frida-il2cpp-bridge'

async function main() {
  console.log(`--------------------------------------
  █▄▄ █▀█ ▄▀█ ▀█▀ █▀▀ █▀█ █ █▀▄ ▄▀█ █▄█
  █▄█ █▄█ █▀█ ░█░ █▀░ █▀▄ █ █▄▀ █▀█ ░█░
--------------------------------------`)

  await Il2Cpp.perform(() => {
    console.log('[+] Il2Cpp bridge Loaded!')
    console.log(`    Unity version: ${Il2Cpp.unityVersion}`)

    patchVerifySignMd5Rsa()
    patchCertVerifier()
  })
}

function patchCertVerifier() {
  console.log('[+] Removing certificate pin ...')
  const assembly = Il2Cpp.Domain.assembly('Assembly-CSharp.dll').image

  assembly
    .class('Torappu.Network.Certificate.TorappuInlandCertValidator')
    .method<boolean>('CheckIfCertValid').implementation = () => {
    return true
  }
  console.log(`    CheckIfCertValid has been patched.`)

  assembly
    .class('Torappu.Network.Certificate.CertificateHandlerFactory')
    .method<boolean>('CheckIfToUseCustomCertVerifyer').implementation = () => {
    return false
  }
  console.log(`    CheckIfToUseCustomCertVerifyer has been patched.`)
}

function patchVerifySignMd5Rsa() {
  console.log('[+] Finding Torappu.CryptUtils.VerifySignMD5RSA ...')
  const assembly = Il2Cpp.Domain.assembly('Assembly-CSharp.dll').image
  const verifySignMd5Rsa = assembly.class('Torappu.CryptUtils').method<boolean>('VerifySignMD5RSA')

  console.log(`    Found at ${verifySignMd5Rsa.handle}`)

  verifySignMd5Rsa.implementation = () => {
    return true
  }

  console.log(`    VerifySignMD5RSA has been patched.`)
}

main().catch(console.error)

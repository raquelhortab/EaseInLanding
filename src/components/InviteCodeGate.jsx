import { useState } from 'react'
import CryptoJS from 'crypto-js'

// Mock data: hashed codes mapped to encrypted URLs
// In reality, you'd generate these by:
// 1. Hash each invite code with SHA-256
// 2. Encrypt each URL pair using the original code as the key
const INVITE_DATA = {
    '89694a49ad4ae7e37cf1ba21de76cf4af9289294684777fc1ebc29ee8f3a83ff': {
        androidUrl: 'U2FsdGVkX19FBTudIjZBSdun84Dhaq70toV1xPVoq6bUyTLEcd85+iUz4qmRvvqP',
        iosUrl: 'U2FsdGVkX19W6T2eo/7Y8R+kLXosXi927arx7XU/AdUsafHePaBHkjo5RHtTrHU7'
    },
    'e0fcfbc472101cd95c2e5fab94693221424762a54149bf251ad2431a5bcdd8cc': {
        androidUrl: 'U2FsdGVkX1+ZyP9l+V7s/SDq88ZGygf6ImtGKG3+iYiGBgm8PjG+aV6SKoy+B1iN',
        iosUrl: 'U2FsdGVkX1826ioHBqbB7wcfzn8V+Lc9BbFlH+o1o6wm59Xy/+ztMHu/qaIHgRq5'
    },
    'd2d8569998fd8bfb7301356d4d01d32f01ef2710e2b2a4908400d5e67f3237a6': {
        androidUrl: 'U2FsdGVkX18OppVgCFFaZVl39858+dbVcnZnE78dxijS3ReX7c8GbVpGINJBvSNP',
        iosUrl: 'U2FsdGVkX1/9We/m9LZDgLpN69NxbuSIWi0MNpAgN2z4YdZRAzGms45yXq/0CpYw'
    },
    'da0b8d5a77f9161c3a04929fa9c135b644f9b8b4bcced40ba842e3aea7e26afc': {
        androidUrl: 'U2FsdGVkX1+axywAkFdQpOoaKOK3dNfBalGX2wgO1vHRKgMmDLwuKd/LeP76Rcb4',
        iosUrl: 'U2FsdGVkX1+Udx4/b9P+CrCqTlP3SN1cmuDnJO6XcwEfgHaFY1aTBfEywepsLZKu'
    },
    '6dfdda8c27363343406135cfe1f93d966a98159ee12b40ff00cd6789b6d03c1b': {
        androidUrl: 'U2FsdGVkX19dpL3U98yPq6kuyVsKRLLHAWezR+qDrkZbt6Gii+Ca0EMgOz9uMBhL',
        iosUrl: 'U2FsdGVkX19Ik/4Cy1NM4bF474SwSJnhyrmrn5oy2MfLf87Pb+ilDAhls7Xs5a/m'
    },
    'f57cd41446b289d2fab0ec976bfb7ba480280f102caf89f964e7633504b8b81f': {
        androidUrl: 'U2FsdGVkX18qll3SXmz289rFIKzPDlFH4Feyg59cIB3MNHcWP+7YtXkY5qauu0fK',
        iosUrl: 'U2FsdGVkX1+vL7EFI3aOtTDvEiB2jhk1Hi1O8i+iCVuYUmDC7UPXhcZN1nqmZSfs'
    },
    'c5b0569d0136e1792bd9301e1075cf93ee561f16e1f830023b82bdcba0155302': {
        androidUrl: 'U2FsdGVkX197EL5w5Pl0WMaWZH9eK10Nxg1dajuUE03Rnmgnwv9Xsu75Mdhs/bUg',
        iosUrl: 'U2FsdGVkX19EZOAgqXSJ98ruRFATqg0MaWkKKVmVeY+dyogyNjZ+Y4/us2M1Hztt'
    },
    'd1ee027d409b3097e7ae4cbe3a38ff666d6501f7c5627ee42e231281e205c7ec': {
        androidUrl: 'U2FsdGVkX1/uzIyCJwzdPqb47JcMjdztBfHUeXgFdwJnJ0d0FubsQgYvvasptOOV',
        iosUrl: 'U2FsdGVkX1801xQmI7tI4Rjw8vkOrNrRNtO7LdsDqyhndw9tZld7viVXQRLUTywF'
    },
    '1d759af2182fff97d83313a0040bc5cc60410db52568152ba61b96a51e227250': {
        androidUrl: 'U2FsdGVkX19mSkzcaS6p66tcRbt6CD+f7ZqLF/KsHFAVv5/Q0OVa4T5qOyktJyv1',
        iosUrl: 'U2FsdGVkX1+hWhNTHsuLVnfZ/ptCMBiEYlE5ONdYUrFKmqWcaCh0HRqKxBIW4j/s'
    },
    'bc502ee7e16e6f92b75d204c9f75156298e4c6d1af31b6990ecc34484a1327f8': {
        androidUrl: 'U2FsdGVkX1+DxWEHabay8M7XRdEhTJdmoX8DwVikHRZMmeB49flD6ayDWlpeGDWx',
        iosUrl: 'U2FsdGVkX1/D1RPuIDjL8ISF38S3ei2/L/OvKR54E/99TrkhpqdNOSvAkOM8covm'
    },
    'c03ec61a884e017f9b3c146c5785982c52d742963b54289658abc741792897ed': {
        androidUrl: 'U2FsdGVkX1+be+GeVqFJjrC4v8mNNw6ozXfiBG9fNWVwJuS4r4fLnseHT8R59YKK',
        iosUrl: 'U2FsdGVkX1+x2W1CL6k1+nasJ2GhZzhHdeMbXMqxixr2drnNDUa3WPCD7qeW3bSV'
    },
    'c7528dcbd2bde48a14fa1dfa4891d68f19d890c81edf1664672727969e344bf0': {
        androidUrl: 'U2FsdGVkX19ZI9OjWAowe8IhGFN5GfP4TSc6GR1Ia0G1FQuv0WrKUP6vrkssew4r',
        iosUrl: 'U2FsdGVkX19fCKp/WECqcEgs9ECfoAJtLfvz7SGnWq2Idh9fdP3RnlAGql4KJZKX'
    },
    '7ae299295d4bea92efbd5ab66e068d686554166fad8e44de8479ee013868d3e6': {
        androidUrl: 'U2FsdGVkX19o41MThDtVyQrr7Rq1LuxoefL5HJ5pOUohQbWJ2Dy/3IC51PGrN94m',
        iosUrl: 'U2FsdGVkX1/VFKfsTlSBVisxFkzp3VgRbUzQ0t7NF4RQ1PPxRtIv+xWlfxqNWcNy'
    }
}

function InviteCodeGate() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [urls, setUrls] = useState(null)

  const hashCode = (inputCode) => {
    return CryptoJS.SHA256(inputCode).toString()
  }

  const decryptUrl = (encryptedUrl, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedUrl, key)
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch (e) {
      return null
    }
  }

  const handleSubmit = () => {
    setError('')
    setUrls(null)

    if (!code.trim()) {
      setError('Si us plau, introdueix un codi d\'invitació')
      return
    }

    // Hash the entered code
    const hashedCode = hashCode(code.trim())

    // Check if this hash exists in our data
    const inviteData = INVITE_DATA[hashedCode]

    if (!inviteData) {
      setError('Codi d\'invitació no vàlid. Si us plau, comprova-ho i torna-ho a provar.')
      return
    }

    // Decrypt URLs using the original code as the key
    const androidUrl = decryptUrl(inviteData.androidUrl, code.trim())
    const iosUrl = decryptUrl(inviteData.iosUrl, code.trim())

    if (!androidUrl || !iosUrl) {
      setError('Error en desxifrar les URLs. Si us plau, torna-ho a provar.')
      return
    }

    setUrls({ androidUrl, iosUrl })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="invite-code-gate">
      {!urls ? (
        <div className="invite-input-section">
          <p className="invite-prompt">Introdueix el teu codi d'invitació per accedir a les descàrregues</p>

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Introdueix el codi d'invitació"
            className="invite-input"
          />

          <button onClick={handleSubmit} className="invite-verify-button">
            Verificar codi
          </button>

          {error && (
            <div className="invite-error">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="invite-success-section">
          <div className="invite-success-message">
            ✓ Codi verificat! Descarrega l'aplicació:
          </div>

          <div className="verified-download-buttons">
            <button
              onClick={() => window.open(urls.androidUrl, '_blank')}
              className="verified-download-button android"
            >
              <div className="download-icon-small">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
              </div>
              <div className="button-text">
                <div className="button-platform">Android</div>
                <div className="button-action">Descarrega ara</div>
              </div>
            </button>

            <button
              onClick={() => window.open(urls.iosUrl, '_blank')}
              className="verified-download-button ios"
            >
              <div className="download-icon-small">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
              </div>
              <div className="button-text">
                <div className="button-platform">iOS</div>
                <div className="button-action">Descarrega ara</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InviteCodeGate

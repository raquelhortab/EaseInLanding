import { useState } from 'react'
import CryptoJS from 'crypto-js'

// Mock data: hashed codes mapped to encrypted URLs
// In reality, you'd generate these by:
// 1. Hash each invite code with SHA-256
// 2. Encrypt each URL pair using the original code as the key
const INVITE_DATA = {
    'dd9cc41e5b44611717ac1bfe15771fef75bc2fd1fd033ad14dcae4e80b58327f': {
        androidUrl: 'U2FsdGVkX1+3YYkDnKuZJlvJzlNZzpvNyZr2k0bcSFbNOEIg5Hq5yjDfrOmmsvtA8AKuXoNgivUWodoF6hDvyBu2z4rcYroQ7p77mUeFKnnldOmUouZG4OhkHMaoS5t/TBBb9/Lh8X8oAMamgRJu1Q==',
        iosUrl: 'U2FsdGVkX19+LSm88VScou1KOS/aYS7H68gZmCVourOglRklxqY4Mjdya0FeuHagmZse6tez+WEKRKKxU2iisYqUXOFuBXQUNNWDGrNRyJ3Y1ZcnCozdLksOtjpp1Xxd4dHOHpIJdQCMw8b5H90nFg=='
    },
    'f7e0448f90bb98656f4de9f6e3861f09bccd99bfd8355f0522f8c117dc2d6023': {
        androidUrl: 'U2FsdGVkX18nUhLIH4si9D4a9bEmPP7tjUWLufRPH8W4uOeyO/HN92jcL9BRFxDs+lr9VYnUZ9jRUUydN6fHC9o4QGWu5CFb7mRY2oh3A7UdeCOTVprvx+zqylz13p9d+3CsR+y+6Drex0PKLt/Y9w==',
        iosUrl: 'U2FsdGVkX1+/YvoBsJ+Ila5XNbgMStlh5bv78LG1zMAOuFLtT08NXX6f9oKm+SpNq2UHmI8cPFzWCR1/S/k8mUeNPTf+G50FWunmxFUrr8fBvguZwvrdTzgdO5/I/A/o2kbn1Suaz3P4AGhjbXw7Ug=='
    },
    '38d8d1e543c3673d854d6546c384cbc316279571bd20b0fb24fafbf91e551391': {
        androidUrl: 'U2FsdGVkX184V7IGIJyJj1yp11GIzi16qZhxSD6ZAAP7wDThCDBrBjS+gdM7LKX1LFw0X/yY42kdhBMv5epgz5nGexwyzw1cPDm8obfDvXcn+99Lc1/a7ojnIn4YH9PpSueoBDC8WZ6grWIuzbxSTA==',
        iosUrl: 'U2FsdGVkX1+EOTgXzhI9gW9jrDAtGzQQVU8JS2t/+Mw6ELfHP8XcFroHm9oYhobS56vBwoJwLYLRQuIX8/0uWRkT4E9haW2csTbf4HeyHv8vGKpAtCDQFytE+fEZ2S3uCtPaMfC6y6MWvWDu/ZRCuA=='
    },
    '9c356b5bfdd0c948ec4cc5b06154b74b1b9a6bfe1bb2b3c8ae37415c8c0378c7': {
        androidUrl: 'U2FsdGVkX1/r2gaiiXqa7PRGYtKjR9JvBglRUMSCPae58NB4+WGCmyrMoarDxrWBBVZzWqHd92LdRqFsiaBOINCiLtzrQnexfiTyPYeKFxbfUU5EYuYo0fxhiFUkfPR11Fqikcs7PcBsypAgAx5VGg==',
        iosUrl: 'U2FsdGVkX1/TC4kx4P7KOdo8eCQiOFqwNTi/CXz3aCSSDKTd67WYqZn9rZWpmksX1TjJihPk+3xYAS09WXa/Kt+FR5m9oTdMU5xO33qE7YgT1MJe4nzDUV+e0BUrlfFVSFDADHIKMDWAW3qwq7NfVQ=='
    },
    '89694a49ad4ae7e37cf1ba21de76cf4af9289294684777fc1ebc29ee8f3a83ff': {
        androidUrl: 'U2FsdGVkX182SaCvbYLlF/OJKu/KFaFAKmX9sjzjvmuZMgRJZHTeLXDDYt/KT9QPxly7baTM/Rh/3KuB2AtjsZiJBU+GIH63JsDjq8t389KUn2WE+loVmjw+mlKcbKB19EdE/oMWWi9N/JY1G7R2Kg==',
        iosUrl: 'U2FsdGVkX19J+B7lEEtP7+2b4SV5qRWHaGouzoVmZqItmDo5GWNQZdOjXiEFN6LxgNfE2nYrLVkjHVuMk+wz6/kl8dyzL5zALXr23J9NQhNHGiiZtv0GQ+Kr91xamDXCwn/jAjvJlg/VoQ3rm+hs7Q=='
    },
    'e0fcfbc472101cd95c2e5fab94693221424762a54149bf251ad2431a5bcdd8cc': {
        androidUrl: 'U2FsdGVkX182pQu4BNYZJj7H+WbzHKFRqFOU7EMW0a6PsYJ1yCrvR3ePuAiPc1gjX8v8qIeapyjmz7L5ZueuR1jKTi0RhcK4of9DfO4I0LY0CVDNVT11VlewIahZPbDrBIu9rv/GBei1jDEQcUviPA==',
        iosUrl: 'U2FsdGVkX1+QRUaY4IULVUslaRniACzMQBFokwnL6EjWTB4HC+pJeEQHkz+8MUfg10J1nhxVSXoI7J41hpuaLUcci9A1NUsqrMjCI8kkXJ1cuc5FPyWC18qlMB2RBjAuTTIctCBjv1zWzJfCR1Hq+g=='
    },
    'd2d8569998fd8bfb7301356d4d01d32f01ef2710e2b2a4908400d5e67f3237a6': {
        androidUrl: 'U2FsdGVkX18/weelEJr4+RtFIV8zLte02w93zS1fA+vaDKGhSvvlvLASgQe+TNiUnVFnPY2HRWlqGx1plXtXHDVnGZlae+/rFlcby0UdnbR3C5Bu3A37zrnY7OicmwEviWinzlgmNMrq8H4si/gUkA==',
        iosUrl: 'U2FsdGVkX18j++L0x+RqTarT02KVTGL0GXFoRpbfcQolckGoReXOzJtJ2a8oJUOzWnK4hckvWCKo1pMBnhEdWV05FPE4WAi+p16f53CkhL+KUZo2oZbVe2ApAakt5lmIFOaoPTPD0wzF2F4pFlCLXg=='
    },
    'da0b8d5a77f9161c3a04929fa9c135b644f9b8b4bcced40ba842e3aea7e26afc': {
        androidUrl: 'U2FsdGVkX19eTUKhLSOfRIELSH1AMIaiHl/tki/kBa97PnLRDPmVPcipglmCLvM6MZzAmlDh6Xn++rhF2O5LJ0c9KlqVm/G7Gp1kqUUQeSTsLKckbb2Y7eqVJTB5mcTPiyGs37Im+ZMgitKBdh14jg==',
        iosUrl: 'U2FsdGVkX19+rFuht/aT22SywBiN85JFQLjJ5EFdUQuJK0ZMHHEcf+CfuiuIzMP0IpJY2qd5lB5Enhtdio1Mh2M5yjD2RI2dnSEjxkL4X9r4SllunzWlPR9OzGcsfosk+/ekVVSg4W5O29rJnSTvLg=='
    },
    '6dfdda8c27363343406135cfe1f93d966a98159ee12b40ff00cd6789b6d03c1b': {
        androidUrl: 'U2FsdGVkX1/wfF5uE2JEg4Vwnoz1FvQdfI36Dc95joVb47HmfWibpdT3J7Bxps/H2uRhFJFl9jtELEBeoFSqyK0wyuSMDh6HkYSzJo10L/Nd+IXZuRWU6DkiFNiKTKCymkq2c5QskW/liQKlQE+69w==',
        iosUrl: 'U2FsdGVkX1/A9j9FVMjm4b0NrOEKbY2XWp6VjYoMcSAaorMOJLSiy5zJb1mfhrTFFaf2un71uKxXf0tql7Bu9t64svkd/OpzdbVhlG3V3Xs2vNa5qNHH/4N/4KKrIGip76RkPaB6qX4uPYC9Wc5J6w=='
    },
    'f57cd41446b289d2fab0ec976bfb7ba480280f102caf89f964e7633504b8b81f': {
        androidUrl: 'U2FsdGVkX1+TG+YKSkG6t8Wx/uhxIjPKoX+P8hWfGo0/fG8wUofJ1Q3+LLFvmp7WNxqA4gewigHLpEXXr2HVheca5+CQAWXMslhHN1DiGUOw81aFldf1+xxAQdOw4o9JjC7J4FuswEZCbVMbo/BwsQ==',
        iosUrl: 'U2FsdGVkX1/BR40FXO5wWoWAauh7gYbnRyQwuLs+YLd1OZD+GH1HJhoX+7oNvuJZn+Jq0mbDNf4asr5qCqdDmcrHOvvt4CR2BmwiwfsWF3Ftdr3KqmlEyHp3stlmJb6UPkwaAu89TSY1Gq2+cL+Yag=='
    },
    'c5b0569d0136e1792bd9301e1075cf93ee561f16e1f830023b82bdcba0155302': {
        androidUrl: 'U2FsdGVkX18jX7jD8Mqcu+TCOzPHAwTHcdsBJsPKe2uH8uJDzmDeM23IXbva1XvEE9+ga2Su3Fh4aq9ORDLsfFzQiV9p5Ah5cxKhp/OOA8lZBGm6ylBmkKk2vNACqW2s+eQyBPvkin+Z6Y+aIGgycA==',
        iosUrl: 'U2FsdGVkX1+ugBk1j5TQZbIQCV1h7l/j+0SSGFscG6CK4nH3lWA88yMgcBrW8/PhurcLrZiGa8+q9Gr5UVPXWNx2iHxbLz1xtNemZgxEoiDtKtM4PIqiKCEQ6u1QjWDLbILMo3usT1Ah49c5AeVBqQ=='
    },
    'd1ee027d409b3097e7ae4cbe3a38ff666d6501f7c5627ee42e231281e205c7ec': {
        androidUrl: 'U2FsdGVkX19msXMgzSE4xnsx5vXDiovh1HPdUt1u3idAFEg9xDhefPv95QVc78RPe4eRSR4qYx9vxYV7djaMM0YQ4DCyqoF1BbTyitiv/NL9Dzme1Rz0iYQsDMuXdpgCxYs0p5f1wpRxr79mxB96gA==',
        iosUrl: 'U2FsdGVkX1997PjQ75lactY/MfUPQSysmeXwNGuuUedXqAhW90iit5oqnLV61BJKIrbG0ipiABvnN6OLqkfF1KQm7r0B7tEBTMMex7FXmWs9Oauk60e/9THM5+tX3AWhAeoq2rdU0Yw7HKqhYegVIA=='
    },
    '1d759af2182fff97d83313a0040bc5cc60410db52568152ba61b96a51e227250': {
        androidUrl: 'U2FsdGVkX1/4KQcwLr+WwNQ+2Bisn3Kl5FIZFxMTy2Gw30hfGSYbOZ1aJ7m5Bh/E+jTPv3lFHJumCczmxWLv7PGJ6u9wvJvcHqmcFvNzJjseqjNvrzNryXZX0bX6UHBuXh251WIC/OPf+S6YBY/Ldw==',
        iosUrl: 'U2FsdGVkX182YmTj0AL7Y+dz/qiIdCOTejcAsTAlxrQLfaEe2h00n5DTJFn0mdUDlijlkyf2c0wnG+Snv8+Qwnjpq0+y2J+mm7J8glwcnsXKYEF3pbkD78+UdH+tYnHGHyJyLeHR8EWLOqyCk4Rz3A=='
    },
    'bc502ee7e16e6f92b75d204c9f75156298e4c6d1af31b6990ecc34484a1327f8': {
        androidUrl: 'U2FsdGVkX18crpdsgGgeuf8AJpAnxC9ChF+KAJSa4Wv0aHcuufJxIoYeN3DFqXr2W8p7bdzS9ulobm47n/Y/V+hq46aYhHKJ3oCfdqiaIeqLqBqOqOEzCCQqmsbL0aoYWBbFFCBVy8Jh7fu9lM8B+A==',
        iosUrl: 'U2FsdGVkX189sHC/w7SSUUX3sm7urC6RRxjH8ARlRqniNeHEEPv5HsyLpaaMlKzyAdUe/lqdRq3Rd0Wy8uuh3lX1BrppauR7OZK1lpKJco5h2QyFv3gr07RlIrD7fuq6YGZfoLAxy2lxxV6rELoc6w=='
    },
    'c03ec61a884e017f9b3c146c5785982c52d742963b54289658abc741792897ed': {
        androidUrl: 'U2FsdGVkX194e1UvgvAyKEegX6h/4XbSrKV91GuYBEkKXb1Jt7dgmp9py1ANF3T41BPWZ3wd0Rl/BxKn8fL2FGrlJaP5mR0RLQ3uMtM0hv11d5bZ78+ohXR+HLqJF8cnf9hzp8m23/t33gjTZi6new==',
        iosUrl: 'U2FsdGVkX19K/cA6i0afqqg3vXb84tfpcbjz36sE0N4YsyF0UCM77Tzo3ge0ql0YOl5UOo/xNBIPmkJEiQQ2B3xemrtOwZUSqhJlNZ9drAfhRuz93Lj3kw15yFDfbXaYXWeK6wW47JiyPE+MsYOeVg=='
    },
    'c7528dcbd2bde48a14fa1dfa4891d68f19d890c81edf1664672727969e344bf0': {
        androidUrl: 'U2FsdGVkX1+RGbG6ib7H0xh2AXQFXS5daWnMOlE00XmJw6eB67I4+t0LklBKMj8XRB4i+csj2Fg0DciGW2RCU1g4z+g8XOAwVXTRXl4k1V7B6qSzlxdlN03KTimpXFgR3SfZLHL32M/t1uLUCcr/pg==',
        iosUrl: 'U2FsdGVkX18P/k54QQJuPLrFb2zAr3RbUwGPUC5dFMWccUqr68YPopXYNNQbY2XfH96ZvyQkdWn2BoH1Jm2z10r9tPhvf4MHOqKh8oxhZyPrSWq/bsKRlDTrGEPsj8XYk4tKKdNiPBGGLIs+K4Ja/w=='
    },
    '7ae299295d4bea92efbd5ab66e068d686554166fad8e44de8479ee013868d3e6': {
        androidUrl: 'U2FsdGVkX1+wJnyc5Q6Mah5hhpaQihw+2uuhR5LHTj17xW67E1gMKZYRxMXjsjvmR5LGk5rWNXYPtiGUjaTw6+jyy65bWEOWwE0O0qu0cCyZ8IMoseeJK1wusC3KHMC2HuAnxCb18rx2eMBt45m18g==',
        iosUrl: 'U2FsdGVkX19udZLN5E5lLQO0RL5uRGlcVu8U1qcfSDcXj+xhazKZNt0FioQESOWX1/cet2pl6HI4MDzFLs3JDzLYzanyb4TKXr7MnNhVyAHEfzrjvu1M6bHawdsAoq/IERPTIZwC7Ut+Cw4P2FSWHA=='
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

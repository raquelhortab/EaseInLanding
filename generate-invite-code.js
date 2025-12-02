// Helper script to generate invite codes from environment variables
// Usage: node generate-invite-code.js
//
// Set these environment variables in your .env file:
// - IOS_URL: Your iOS app download URL
// - ANDROID_URL: Your Android app download URL
// - CODES: Comma-separated list of invite codes (e.g., "CODE1,CODE2,CODE3")

import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const androidUrl = process.env.ANDROID_URL
const iosUrl = process.env.IOS_URL
const codesString = process.env.CODES

// Validate environment variables
if (!androidUrl || !iosUrl || !codesString) {
  console.log('❌ Error: Missing required environment variables\n')
  console.log('Please set the following in your .env file:')
  console.log('  - ANDROID_URL: Your Android app download URL')
  console.log('  - IOS_URL: Your iOS app download URL')
  console.log('  - CODES: Comma-separated invite codes (e.g., "CODE1,CODE2,CODE3")')
  console.log('\nExample .env:')
  console.log('  ANDROID_URL=https://play.google.com/store/apps/details?id=com.easein')
  console.log('  IOS_URL=https://apps.apple.com/app/easein/id123456789')
  console.log('  CODES=LAUNCH_PARTY_RIKI,VIP_ACCESS_2024,BETA_TESTER_2024')
  process.exit(1)
}

// Parse comma-separated codes and trim whitespace
const codes = codesString.split(',').map(code => code.trim()).filter(code => code.length > 0)

if (codes.length === 0) {
  console.log('❌ Error: No valid codes found in CODES environment variable')
  process.exit(1)
}

console.log('\n✅ Generating Invite Codes...\n')
console.log(`📱 Android URL: ${androidUrl}`)
console.log(`🍎 iOS URL: ${iosUrl}`)
console.log(`🔑 Codes to generate: ${codes.length}\n`)

console.log('Copy and paste this into your INVITE_DATA object in src/components/InviteCodeGate.jsx:\n')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

// Generate data for each code
codes.forEach((inviteCode, index) => {
  // Hash the invite code
  const hashedCode = CryptoJS.SHA256(inviteCode).toString()

  // Encrypt the URLs using the invite code as the key
  const encryptedAndroidUrl = CryptoJS.AES.encrypt(androidUrl, inviteCode).toString()
  const encryptedIosUrl = CryptoJS.AES.encrypt(iosUrl, inviteCode).toString()

  //console.log(`  // Hash of '${inviteCode}'`)
  console.log(`  '${hashedCode}': {`)
  console.log(`    androidUrl: '${encryptedAndroidUrl}',`)
  console.log(`    iosUrl: '${encryptedIosUrl}'`)
  console.log(`  }${index < codes.length - 1 ? ',' : ''}`)
})

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
console.log('📝 Notes:')
console.log('  - All codes are case-sensitive')
console.log('  - Only hashes are stored in your code (safe to commit)')
console.log('  - Only users with the original invite codes can decrypt the URLs')
console.log('  - Share these invite codes with your users:\n')
codes.forEach(code => console.log(`    • ${code}`))
console.log('')

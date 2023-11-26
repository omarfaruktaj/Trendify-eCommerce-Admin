import { Button } from '@/components/ui/button'
import { MailOpen } from 'lucide-react'
import { useParams } from 'react-router-dom'

const CheckEmail = () => {
  const { email } = useParams()

  const handleClick = () => {
    const emailProviderRegex = /@([a-zA-Z0-9.-]+)\./

    if (!email) return
    const match = email.match(emailProviderRegex)

    if (match) {
      const emailProvider = match[1]

      const encodedSearchQuery = encodeURIComponent('Password reset token')

      let emailSearchURL = ''

      switch (emailProvider) {
        case 'gmail':
          emailSearchURL = `https://mail.google.com/mail/u/0/#search/${encodedSearchQuery}`
          break
        case 'yahoo':
          emailSearchURL = `https://mail.yahoo.com/search?query=${encodedSearchQuery}`
          break
        case 'outlook':
          emailSearchURL = `https://outlook.live.com/mail/0/search/all?search={${encodedSearchQuery}}`
          break
        case 'aol':
          emailSearchURL = `https://mail.aol.com/webmail-std/en-us/suite#/search/all/${encodedSearchQuery}`
          break
        case 'protonmail':
          emailSearchURL = `https://mail.protonmail.com/inbox/search?keyword=${encodedSearchQuery}`
          break
        default:
          window.open(`mailto:?subject=${encodedSearchQuery}`, '_blank')
          return
      }

      window.open(emailSearchURL, '_blank')

      // window.location.href = emailSearchURL
    }
  }

  return (
    <div>
      <Button
        variant='outline'
        onClick={handleClick}
      >
        {' '}
        <MailOpen
          className='m-2'
          color='black'
          size='15'
        />{' '}
        Check Email
      </Button>
    </div>
  )
}

export default CheckEmail

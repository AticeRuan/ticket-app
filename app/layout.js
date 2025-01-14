import Nav from './(components)/Nav'
import './globals.css'
import { Lexend } from 'next/font/google'
import { TicketProvider } from './(context)/TicketContext'
import { Providers } from './(context)/CombinedContext'
import localFont from 'next/font/local'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import CustomHearder from './(components)/CustomHeader'
import { AuthGuard } from './(auth)/AuthGuard'

config.autoAddCss = false

const aeonik = localFont({ src: './(assets)/fonts/Aeonik_Pro_TRIAL.ttf' })

const lexend = Lexend({ subsets: ['latin'] })
export const metadata = {
  title: 'Ticket Axis ',
  description:
    'Ticket Axis empowers teams to seamlessly track, manage, and prioritize tasks and tickets in a collaborative workspace. Start improving your workflow today.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={`text-black ${lexend.className} `}>
        <Providers>
          <AuthGuard>
            <div className="flex  h-screen w-screen relative">{children}</div>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  )
}

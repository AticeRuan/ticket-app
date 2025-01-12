import Nav from './(components)/Nav'
import './globals.css'
import { Lexend } from 'next/font/google'
import { TicketProvider } from './(context)/TicketContext'
import { Providers } from './(context)/CombinedContext'
import localFont from 'next/font/local'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const aeonik = localFont({ src: './(assets)/fonts/Aeonik_Pro_TRIAL.ttf' })

const lexend = Lexend({ subsets: ['latin'] })
export const metadata = {
  title: 'Ticket APP',
  description: 'Learning Next.js using mongodb',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={`text-black ${lexend.className}`}>
        <Providers>
          <div className="flex  h-screen max-h-screen w-screen ">
            <Nav />
            <div className="flex-grow overflow-y-auto bg-chill-light-orange  ">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

import Nav from './(components)/Nav'
import './globals.css'
import { Lexend } from 'next/font/google'
import { TicketProvider } from './(context)/TicketContext'
import { Providers } from './(context)/CombinedContext'
import localFont from 'next/font/local'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import CustomHearder from './(components)/CustomHeader'

config.autoAddCss = false

const aeonik = localFont({ src: './(assets)/fonts/Aeonik_Pro_TRIAL.ttf' })

const lexend = Lexend({ subsets: ['latin'] })
export const metadata = {
  title: 'Ticket Axis ',
  description:
    'Ticket Axis  is a ticket management app developed by Chill Otters',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={`text-black ${lexend.className} `}>
        <Providers>
          <div className="flex  h-screen max-h-screen w-screen relative">
            <Nav />
            <div className="flex-grow flex flex-col overflow-y-auto bg-chill-light-orange  ">
              <CustomHearder text="Ticket App" name="John Doe" />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

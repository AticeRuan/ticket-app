import './globals.css'
import { Lexend } from 'next/font/google'
import { Providers } from './(context)/CombinedContext'
import localFont from 'next/font/local'

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
          <div className="flex  h-screen w-screen relative">{children}</div>
        </Providers>
      </body>
    </html>
  )
}

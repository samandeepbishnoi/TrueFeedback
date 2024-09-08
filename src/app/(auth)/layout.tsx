import { Toaster } from "@/components/ui/toaster"
export const metadata = {
  title: 'TrueFeedback',
  description: 'A website for feedback',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main lang="en">
      <main>{children}
        <Toaster />
      </main>
    </main>
  )
}

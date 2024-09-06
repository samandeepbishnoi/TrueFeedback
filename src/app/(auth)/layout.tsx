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
      <main>{children}</main>
    </main>
  )
}

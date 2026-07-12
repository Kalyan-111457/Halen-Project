import Providers from "@/src/redux/provider";

interface ChildrenProps {
  children: React.ReactNode
}




export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" className="h-full antialiased">


      <body className="min-h-full flex flex-col">

        <Providers>

          {children}



        </Providers>


      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, Chat } from './components/shell';
export const metadata:Metadata={title:{default:'Ofoten Rør | Rørlegger og baderom i Narvik',template:'%s | Ofoten Rør'},description:'Rørlegger i Narvik siden 1983. Utforsk baderom, møt fagfolkene og planlegg ditt neste bad med Ofoten Rør.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="nb"><body><a href="#main" className="skip">Hopp til innhold</a><Header/><main id="main">{children}</main><Footer/><Chat/></body></html>}

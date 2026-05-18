import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
    title: '책방 | 도서 관리 시스템',
    description: '소규모 서점 온라인 도서 관리',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body>
        <header className="site-header">
            <div className="header-inner">
                <Link href="/" className="logo">
                    📚 책방
                </Link>
                <nav>
                    <Link href="/">도서 목록</Link>
                    <Link href="/register">도서 등록</Link>
                </nav>
            </div>
        </header>
        <main className="main-content">
            {children}
        </main>
        <footer className="site-footer">
            <p>책방에 오신 것을 환영합니다 🌿</p>
        </footer>
        </body>
        </html>
    )
}

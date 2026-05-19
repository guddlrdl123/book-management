import { notFound } from 'next/navigation'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'

// 도서 상세 페이지 컴포넌트

const API_URL = ''

interface Book {
    id: number
    title: string
    author: string
    price: number
    available: boolean
    purchasable: boolean
    coverUrl?: string
}

async function getBook(id: string): Promise<Book | null> {
    const res = await fetch(`${API_URL}/api/books/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
}

export default async function BookDetailPage({
                                                 params,
                                             }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const book = await getBook(id)
    if (!book) notFound()

    return (
        <div>
            <Link href="/" className="btn btn-ghost" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
                ← 목록으로
            </Link>

            <div className="detail-wrap">
                {/* 표지 이미지 */}
                <div className="detail-cover">
                    {book.coverUrl ? (
                        <img src={book.coverUrl} alt={`${book.title} 표지`} />
                    ) : (
                        <div className="detail-cover-placeholder">
                            📖
                        </div>
                    )}
                </div>

                {/* 도서 정보 */}
                <div className="detail-info">
                    <div>
                        <h1 className="detail-title">{book.title}</h1>
                        <p className="detail-author">{book.author}</p>
                    </div>

                    {book.price && (
                        <p className="detail-price">{book.price.toLocaleString()}원</p>
                    )}

                    <div className="detail-badges">
            <span className={`badge ${book.available ? 'badge-available' : 'badge-unavailable'}`} style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
              {book.available ? '✓ 대출 가능' : '✗ 대출 중'}
            </span>
                        <span className={`badge ${book.purchasable ? 'badge-purchasable' : 'badge-not-purchasable'}`} style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
              {book.purchasable ? '✓ 구매 가능' : '✗ 구매 불가'}
            </span>
                    </div>

                    <div className="detail-actions">
                        <Link href={`/books/${book.id}/edit`} className="btn btn-ghost">✏️ 수정</Link>
                        <DeleteButton bookId={book.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

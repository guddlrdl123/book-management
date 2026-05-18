import Link from 'next/link'

// 도서 카드 컴포넌트, 도서 목록에서 각 도서를 대표하는 카드 형태로 정보를 보여줌
interface BookCardProps {
    id: number
    title: string
    author: string
    price?: number
    available: boolean
    purchasable: boolean
    coverUrl?: string
}

export default function BookCard({ id, title, author, price, available, purchasable, coverUrl }: BookCardProps) {
    return (
        <Link href={`/books/${id}`} style={{ display: 'block' }}>
            <div className="book-card">
                <div className="book-cover-wrap">
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={`${title} 표지`}
                            className="book-cover-img"
                            loading="lazy"
                        />
                    ) : (
                        <div className="book-cover-placeholder">
                            📖
                            <span>{title}</span>
                        </div>
                    )}
                </div>
                <div className="book-card-body">
                    <h2 className="book-card-title">{title}</h2>
                    <p className="book-card-author">{author}</p>
                    {price && <p className="book-card-price">{price.toLocaleString()}원</p>}
                    <div className="book-card-badges">
            <span className={`badge ${available ? 'badge-available' : 'badge-unavailable'}`}>
              {available ? '대출 가능' : '대출 중'}
            </span>
                        <span className={`badge ${purchasable ? 'badge-purchasable' : 'badge-not-purchasable'}`}>
              {purchasable ? '구매 가능' : '구매 불가'}
            </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

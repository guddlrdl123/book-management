import BookCard from './BookCard'

const API_URL = process.env.BACKEND_URL  // 빈 문자열 대신 BACKEND_URL로 직접 사용

interface Book {
    id: number
    title: string
    author: string
    price: number
    available: boolean
    purchasable: boolean
    coverUrl?: string
}

async function getBooks(searchTitle?: string): Promise<Book[]> {
    const url = searchTitle
        ? `${API_URL}/api/books?title=${encodeURIComponent(searchTitle)}`
        : `${API_URL}/api/books`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
}

export default async function BookList({ searchTitle }: { searchTitle?: string }) {
    const books = await getBooks(searchTitle)

    if (books.length === 0) {
        return (
            <div className="empty-state">
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>📚</div>
                <h3>도서가 없습니다</h3>
                <p>{searchTitle ? `'${searchTitle}' 검색 결과가 없습니다` : '아직 등록된 도서가 없습니다'}</p>
            </div>
        )
    }

    return (
        <div className="book-grid">
            {books.map(book => (
                <BookCard key={book.id} {...book} />
            ))}
        </div>
    )
}
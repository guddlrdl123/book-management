import BookCard from './BookCard'
// 도서 목록 컴포넌트, 도서 데이터를 받아서 BookCard 컴포넌트를 이용해 목록 형태로 보여줌
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

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

// 책 목록이 로딩되는 동안 보여줄 스켈레톤 컴포넌트
export default function BookListSkeleton() {
    return (
        <div className="book-grid">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="book-card">
                    <div className="skeleton skeleton-cover" />
                    <div className="book-card-body">
                        <div className="skeleton skeleton-heading" />
                        <div className="skeleton skeleton-text" style={{ width: '60%' }} />
                        <div className="skeleton skeleton-text" style={{ width: '40%', marginTop: 'auto' }} />
                    </div>
                </div>
            ))}
        </div>
    )
}

import Link from 'next/link'
export default function NotFoundPage() {
    return (
        <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🔍</div>
            <h3>도서를 찾을 수 없습니다</h3>
            <p>존재하지 않거나 삭제된 도서입니다</p>
            <Link href="/" className="btn btn-primary">목록으로 돌아가기</Link>
        </div>
    )
}

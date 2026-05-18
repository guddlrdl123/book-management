'use client'
// 오류 발생시 보여줄 컴포넌트
export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>⚠️</div>
            <h3>오류가 발생했습니다</h3>
            <p>{error.message}</p>
            <button className="btn btn-primary" onClick={reset}>다시 시도</button>
        </div>
    )
}

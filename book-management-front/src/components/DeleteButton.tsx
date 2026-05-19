'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const API_URL = ''

export default function DeleteButton({ bookId }: { bookId: number }) {
    const router = useRouter()
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        if (!confirm('이 도서를 삭제하시겠습니까?')) return
        setDeleting(true)
        await fetch(`${API_URL}/api/books/${bookId}`, { method: 'DELETE' })
        router.push('/')
        router.refresh()
    }

    return (
        <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? '삭제 중...' : '🗑️ 삭제'}
        </button>
    )
}

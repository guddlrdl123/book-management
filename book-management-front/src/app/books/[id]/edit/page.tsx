'use client'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// 도서 수정 페이지 컴포넌트

const API_URL = ''

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [form, setForm] = useState({
        title: '', author: '', price: '',
        available: 'true', purchasable: 'true', coverUrl: ''
    })
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetch(`${API_URL}/api/books/${id}`)
            .then(r => r.json())
            .then(data => {
                setForm({
                    title: data.title,
                    author: data.author,
                    price: String(data.price ?? ''),
                    available: String(data.available),
                    purchasable: String(data.purchasable),
                    coverUrl: data.coverUrl ?? '',
                })
                setLoading(false)
            })
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        await fetch(`${API_URL}/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: form.title,
                author: form.author,
                price: form.price ? Number(form.price) : null,
                available: form.available === 'true',
                purchasable: form.purchasable === 'true',
                coverUrl: form.coverUrl || null,
            }),
        })
        router.push(`/books/${id}`)
    }

    if (loading) return <div style={{ padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>불러오는 중...</div>

    return (
        <div>
            <h1 className="page-title">도서 수정</h1>
            <p className="page-subtitle">도서 정보를 수정하세요</p>

            <form className="form-card" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">도서 제목 *</label>
                    <input id="title" name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="author">저자명 *</label>
                    <input id="author" name="author" value={form.author} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">가격 (원)</label>
                    <input id="price" name="price" type="number" value={form.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="coverUrl">표지 이미지 URL</label>
                    <input id="coverUrl" name="coverUrl" type="url" value={form.coverUrl}
                           onChange={handleChange} placeholder="https://..." />
                    {form.coverUrl && (
                        <div className="cover-preview-wrap">
                            <div className="cover-preview">
                                <img src={form.coverUrl} alt="표지 미리보기"
                                     onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="available">대출 가능 여부</label>
                        <select id="available" name="available" value={form.available} onChange={handleChange}>
                            <option value="true">대출 가능</option>
                            <option value="false">대출 중</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="purchasable">구매 가능 여부</label>
                        <select id="purchasable" name="purchasable" value={form.purchasable} onChange={handleChange}>
                            <option value="true">구매 가능</option>
                            <option value="false">구매 불가</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={submitting}>
                        {submitting ? '저장 중...' : '✅ 수정 완료'}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => router.back()}>취소</button>
                </div>
            </form>
        </div>
    )
}

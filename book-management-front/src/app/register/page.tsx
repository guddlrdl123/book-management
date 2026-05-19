'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 도서 등록 페이지 컴포넌트

const API_URL = ''

export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        title: '', author: '', price: '',
        available: 'true', purchasable: 'true', coverUrl: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [submitting, setSubmitting] = useState(false)

    const validate = () => {
        const errs: Record<string, string> = {}
        if (!form.title.trim()) errs.title = '제목을 입력해주세요'
        if (!form.author.trim()) errs.author = '저자명을 입력해주세요'
        return errs
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) { setErrors(errs); return }
        setSubmitting(true)
        try {
            const res = await fetch(`${API_URL}/api/books`, {
                method: 'POST',
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
            if (!res.ok) throw new Error('등록 실패')
            router.push('/')
            router.refresh()
        } catch {
            alert('도서 등록에 실패했습니다')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <h1 className="page-title">도서 등록</h1>
            <p className="page-subtitle">새로운 도서를 등록하세요</p>

            <form className="form-card" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="title">도서 제목 *</label>
                    <input id="title" name="title" type="text" value={form.title}
                           onChange={handleChange} placeholder="예: 클린 코드" required />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="author">저자명 *</label>
                    <input id="author" name="author" type="text" value={form.author}
                           onChange={handleChange} placeholder="예: 로버트 C. 마틴" required />
                    {errors.author && <span className="form-error">{errors.author}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">가격 (원)</label>
                    <input id="price" name="price" type="number" value={form.price}
                           onChange={handleChange} placeholder="예: 28000" />
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
                        {submitting ? '등록 중...' : '✅ 등록하기'}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => router.back()}>취소</button>
                </div>
            </form>
        </div>
    )
}

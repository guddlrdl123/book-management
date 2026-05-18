'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [value, setValue] = useState(searchParams.get('title') ?? '')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (value.trim()) {
            router.push(`/?title=${encodeURIComponent(value.trim())}`)
        } else {
            router.push('/')
        }
    }

    const handleClear = () => {
        setValue('')
        router.push('/')
    }

    return (
        <form className="search-bar-wrap" onSubmit={handleSearch}>
            <input
                className="search-input"
                type="text"
                placeholder="도서 제목으로 검색..."
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0 var(--space-8)', fontSize: 'var(--text-base)', minHeight: '52px' }}
            >
                검색
            </button>
            {value && (
                <button type="button" className="btn btn-ghost" onClick={handleClear}>초기화</button>
            )}
        </form>
    )
}

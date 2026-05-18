import { Suspense } from 'react'
import BookList from '@/components/BookList'
import BookListSkeleton from '@/components/BookListSkeleton'
import SearchBar from '@/components/SearchBar'

export default async function Home({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ title?: string }>
}) {
    const { title } = await searchParams

    return (
        <div>
            <h1 className="page-title">도서 목록</h1>
            <p className="page-subtitle">책방의 도서를 검색하고 관리하세요 🌿</p>
            <SearchBar />
            <Suspense fallback={<BookListSkeleton />}>
                <BookList searchTitle={title} />
            </Suspense>
        </div>
    )
}

import { Skeleton } from "@mui/material"

export const SkeletonPage = () => {
    return (
        <>
            <Skeleton className="title-area" height={60}/>
            <Skeleton className="tags-area"/>
            <div className="description-area">
                {Array.from({length: 15}).map((_, i) => <Skeleton key={i} height={10}/>)}
            </div>
            <Skeleton className="meta-area"/>
            <Skeleton height={300} className="image-area"/>
            <div className="flex justify-between actions-area">
                {Array.from({length: 2}).map((_, i) => <Skeleton key={i} width={50} height={50}/>)}
            </div>            
        </>
    )
}
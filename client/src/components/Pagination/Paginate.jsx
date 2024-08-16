import { Pagination } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default ({totalPosts, pageSize}) => {
    const pageCount = Math.ceil(totalPosts / pageSize)
    const navigate = useNavigate()

    const handleChange = (e, val) => {
        navigate(`/page/${val}`)
    }

    return (
        <Pagination count={pageCount} color="primary" onChange={handleChange}/>
    )
}
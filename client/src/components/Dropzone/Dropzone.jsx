import { useDropzone } from "react-dropzone";
import { styled } from "styled-components";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const DropZone = styled.div`
    border: 1px dashed black;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export default ({file = "", onDrop}) => {    
    const { getRootProps, getInputProps } = useDropzone({maxFiles: 1, onDrop}) 
    
    return (
        <DropZone className="rounded hover:cursor-pointer flex items-center text-center" {...getRootProps()}>
            <input {...getInputProps()} />
            {!file && <div><FileDownloadIcon/> <br /> Upload an image.</div>}
            {file && <img src={file}/>}
        </DropZone>
    )
}
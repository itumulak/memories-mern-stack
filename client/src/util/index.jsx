import { styled } from "styled-components";

export const formatDate = (dateString) => {
    // Parse the date
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    const now = new Date();
    const diffInTime = now.getTime() - date.getTime();
    const diffInHours = diffInTime / (1000 * 3600);
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    // Format options
    const monthDayOptions = { month: 'long', day: 'numeric' };

    // Intl.DateTimeFormat for internationalization
    const monthDayFormatter = new Intl.DateTimeFormat('default', monthDayOptions);

    if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInDays <= 3) {
        return `${Math.floor(diffInDays)} days ago`;
    } else {
        return monthDayFormatter.format(date);
    }
}

export const handleObjectDataChange = (val, type, object) => {
    let newObj = new Object()
    newObj[type] = val

    return {...object, ...newObj}
}

export const useQuery = (url) => new URLSearchParams(url.search)

export const getBase64 = async (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

export const loadingDiv = (message = 'Loading') => {
    const StyledLoading = styled.div`
        display: inline-block;
        font-family: monospace;
        font-size: inherit;
        clip-path: inset(0 3ch 0 0);
        animation: l 1s steps(4) infinite;

        @keyframes l {
            to {
                clip-path: inset(0 -1ch 0 0)
            }
        }
    `

    return (
        <StyledLoading>
            {message}...
        </StyledLoading>
    )
}
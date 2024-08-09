import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";

export default ({tags, suggestions = []}) => {
    return (
        <ReactTags
            tags={tags}
            suggestions={suggestions}
        />
    )
}
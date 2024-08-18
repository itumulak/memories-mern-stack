import { styled } from 'styled-components';

export const DivParent = styled.div`
    width: 100%;
    z-index: 1;
    display: grid;
    grid-template-areas: 
        "title"
        "tags"
        "description"
        "image"
        "meta"
        "actions";
    
    .title-area {
        grid-area: title;
    }

    .description-area {
        grid-area: description;
    }

    .image-area {
        grid-area: image;
    }

    .actions-area {
        grid-area: actions;
    }

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 
            "title image"
            "tags image"
            "description image"
            "meta image"
            "actions image";
    }
`


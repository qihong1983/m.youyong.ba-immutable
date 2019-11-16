import styled from "styled-components";

const Wrapper = styled.main`




.am-navbar {
    background-color:#4d4d4d;
}

.am-search {
    background-color:#f2f2f2;
}

.am-search-cancel {
    color:#e56045;
}

.am-pagination {
    background-color:#f2f2f2;
}

.am-pagination-wrap .active {
    color:#e56045;
}

.am-button-primary {
    background: #e56045;
}

@media (-webkit-min-device-pixel-ratio: 2),(min-resolution:2dppx) {
    :not([data-scale]) .am-button-primary {
        position:relative;
        border: none
    }

    :not([data-scale]) .am-button-primary:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        border: 1px solid #e56045;
        border-radius: 10px;
        -webkit-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(.5);
        -ms-transform: scale(.5);
        transform: scale(.5);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        pointer-events: none
    }
}

`



export default Wrapper;
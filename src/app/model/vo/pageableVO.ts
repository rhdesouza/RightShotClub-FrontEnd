export interface PageableVO {
    content?: any;

    pageable: {
        sort: {
            unsorted: boolean,
            sorted: boolean,
            empty: boolean
        },
        offset: 0,
        pageSize: 20,
        pageNumber: 0,
        unpaged: false,
        paged: true
    }

    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number

    sort: {
        unsorted: boolean,
        sorted: boolean,
        empty: boolean
    }

    first: boolean,
    numberOfElements: number,
    empty: boolean
}
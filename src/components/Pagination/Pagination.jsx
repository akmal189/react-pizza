import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

export default function Pagination({totalItems, setActivePage, activePage}) {
    return (
        <div>
            <ReactPaginate
                className="flex items-center justify-center gap-2 mt-8"
                pageLinkClassName="inline-block px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                previousLinkClassName="inline-block px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                nextLinkClassName="inline-block px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                breakLinkClassName="inline-block px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                activeLinkClassName="bg-primary-500 text-white border-primary-500"
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => {setActivePage(event.selected + 1)}}
                pageRangeDisplayed={totalItems}
                pageCount={Math.ceil(totalItems / 4)}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={activePage - 1}
            />
        </div>
    )
}
const currentPage = location.pathname;
const links = document.querySelectorAll('header .menu a');

for (const link of links) {
    if(currentPage.includes(link.getAttribute('href'))){
        link.classList.add('active');
    }
}
function paginate(selectedPage, totalPages){
    let pages = [],
        oldPage;

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){
        const firstsAndLastsPage = currentPage == 1 || currentPage == 2 || currentPage == totalPages - 1 || currentPage == totalPages;
        const pagesAfterSelectedPage = currentPage <= selectedPage + 1;
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 1;

        if(firstsAndLastsPage || pagesAfterSelectedPage && pagesBeforeSelectedPage){
            if(oldPage && currentPage - oldPage > 2){
                pages.push("...");
            }

            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1);
            }

            pages.push(currentPage);

            oldPage = currentPage;
        }    
    }
    return pages;
}

function createPagination(pagination){
    const filter = pagination.dataset.filter;
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(page, total);

    let elements = "";

    for(let page of pages){
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`;
        }else{
            if(filter){
                elements += `<a href="?pages${page}&filter=${filter}">${page}</a>`;
            }else{
                elements += `<a href="?pages${page}">${page}</a>`;
            }
        }
    }

    pagination.innerHTML = elements;
}

const pagination = document.querySelector(".pagination");

if(pagination){
    createPagination(pagination);
}
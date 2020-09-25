const currentPage = location.pathname;
const links = document.querySelectorAll('header .menu a');

for (const link of links) {
    if(currentPage.includes(link.getAttribute('href'))){
        link.classList.add('active');
    }
}
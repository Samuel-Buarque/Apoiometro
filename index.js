document.addEventListener('DOMContentLoaded', () => {
    const partnersContainer = document.querySelector('.partners');
    const partners = partnersContainer.children;


    const partnersArray = Array.from(partners);
    partnersArray.forEach(partner => {
        const clone = partner.cloneNode(true);
        partnersContainer.appendChild(clone);
    });
});

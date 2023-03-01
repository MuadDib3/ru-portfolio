//show menu

function toggleNav () {

   const scrollLockPadding = window.innerWidth - document.body.offsetWidth + 'px';
   document.body.style.paddingRight = scrollLockPadding;

   const navModal = document.getElementById('modal-nav');
   navModal.classList.toggle('modal-nav_active');
   document.documentElement.classList.toggle("no-scroll");
}

// css style gap from .content
   const content = document.querySelector('.content');
   const contentStyles = window.getComputedStyle(content, null);
   const contentGap = Number(contentStyles.getPropertyValue('row-gap').replace(/[^0-9]/g, ''));


//scroll to section from nav

const navLinks = document.querySelectorAll('.links__item[data-goto]');
if (navLinks.length > 0) {
   navLinks.forEach (navLink => {
      navLink.addEventListener("click", clickOnNavLink);
   });

   function clickOnNavLink(e) {
      const navLink = e.target;
      if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
         const gotoBlock = document.querySelector(navLink.dataset.goto);

         if (document.documentElement.clientWidth <= 650 ) {
            const navModal = document.getElementById('modal-nav');
            navModal.classList.remove('modal-nav_active');
            document.documentElement.classList.remove("no-scroll");
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - contentGap/2 - document.querySelector('.nav__button').offsetHeight;
            window.scrollTo({
               top: gotoBlockValue,
               behavior: "smooth",
            });
         }
         else {
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - contentGap/2;
            window.scrollTo({
               top: gotoBlockValue,
               behavior: "smooth",
            });
         };
         e.preventDefault();
      }
   }
}



// throttle function for optimization
function throttle(callee, timeout) {

   let timer = null

   return function perform(...args) {
     if (timer) return
 
     timer = setTimeout(() => {
       callee(...args)
       clearTimeout(timer)
       timer = null
     }, timeout)
   }
}

// highlight current section on nav

function highlightSection() {
   let scrollDistance = window.scrollY; 

   if (window.innerWidth > 650) {
      document.querySelectorAll('.section').forEach((el, i) => {
         if (el.offsetTop - contentGap <= scrollDistance) {
            console.log(el.offsetTop - contentGap);
            document.querySelectorAll('.nav a').forEach((el) => {
               if (el.classList.contains('links__item_active')) {
                  el.classList.remove('links__item_active');
               }
            });
   
            document.querySelectorAll('.nav li')[i].querySelector('a').classList.add('links__item_active');
         }
         let pageHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          );
         if (pageHeight <= scrollDistance + document.documentElement.clientHeight + 1) {
            document.querySelectorAll('.nav a').forEach((el) => {
               if (el.classList.contains('links__item_active')) {
                  el.classList.remove('links__item_active');
               }
            });
            document.querySelectorAll('.nav li')[4].querySelector('a').classList.add('links__item_active');
         }
      });
   }
}

const optomazedHighlightSection = throttle(highlightSection, 250);
window.addEventListener('scroll', optomazedHighlightSection);


//slider with Swiper

const swiper = new Swiper('.swiper', {
   // Optional parameters
   direction: 'horizontal',
   loop: true,

   spaceBetween: 5,
 
   // Navigation arrows
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
 });
 
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active')); 
    const activeSection = document.getElementById(sectionId);
    if (activeSection) { 
        activeSection.classList.add('active'); 
        window.scrollTo(0, 0); 
    }
}
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};
scrollToTopBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
};
window.onload = () => showSection('home');
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    if (!slides.length || !dots.length) return; 
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

//創建雪花效果
function createSnowflakes() {
    const snowflakesContainer = document.getElementById('snowflakes');
    const numSnowflakes = 100; // 雪花數量

    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerText = '❄'; // 雪花字符
        snowflakesContainer.appendChild(snowflake);

        // 隨機位置和動畫時間
        const randomX = Math.random() * 100;
        const randomDuration = Math.random() * 3 + 2; // 隨機下落時間
        const randomDelay = Math.random() * 5; // 隨機延遲

        snowflake.style.left = `${randomX}vw`;
        snowflake.style.animationDuration = `${randomDuration}s`;
        snowflake.style.animationDelay = `${randomDelay}s`;
        snowflake.style.fontSize = `${Math.random() * 10 + 15}px`; // 隨機雪花大小
    }
}

// 初始化雪花效果
createSnowflakes(); 

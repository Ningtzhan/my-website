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

// ================== YouTube 連結功能 ==================
// 點擊歌曲後直接開啟 YouTube MV

function openYouTube(videoId, songName) {
    // 構建 YouTube URL
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // 在新分頁開啟 YouTube
    window.open(youtubeUrl, '_blank');
    
    console.log('開啟 YouTube:', songName, youtubeUrl);
}

// 為所有歌曲項目添加點擊事件
document.addEventListener('DOMContentLoaded', function() {
    const songItems = document.querySelectorAll('.song-item');
    
    songItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 如果點擊的是曲目,不執行專輯點擊
            if (e.target.closest('.track-item')) {
                return;
            }
            
            const videoId = this.getAttribute('data-video-id');
            const songName = this.getAttribute('data-song-name');
            
            if (videoId && videoId !== 'YOUTUBE_ID') {
                openYouTube(videoId, songName);
                // 高亮選中的項目
                document.querySelectorAll('.song-item').forEach(s => s.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // 為所有曲目項目添加點擊事件
    const trackItems = document.querySelectorAll('.track-item');
    
    trackItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止觸發父元素的點擊事件
            
            const videoId = this.getAttribute('data-video-id');
            const songName = this.getAttribute('data-song-name');
            
            if (videoId && videoId !== 'YOUTUBE_ID') {
                openYouTube(videoId, songName);
                // 高亮選中的項目
                document.querySelectorAll('.track-item').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});

let slideIndex = 1;
let autoSlideTimer; // 自動輪播計時器

showSlides(slideIndex);
startAutoSlide(); // 啟動自動輪播

function plusSlides(n) {
    clearInterval(autoSlideTimer); // 手動切換時清除自動輪播
    showSlides(slideIndex += n);
    startAutoSlide(); // 重新啟動自動輪播
}

function currentSlide(n) {
    clearInterval(autoSlideTimer); // 手動切換時清除自動輪播
    showSlides(slideIndex = n);
    startAutoSlide(); // 重新啟動自動輪播
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

// 自動輪播功能
function startAutoSlide() {
    autoSlideTimer = setInterval(function() {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000); // 每 5 秒自動切換一次 (可調整)
}

// ================== 創建優化的雪花效果 ==================
function createSnowflakes() {
    const snowflakesContainer = document.getElementById('snowflakes');
    const numSnowflakes = 50; // 優化雪花數量,避免效能問題
    const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❉']; // 多種雪花樣式

    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // 隨機選擇雪花圖案
        snowflake.innerText = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        snowflakesContainer.appendChild(snowflake);

        // 隨機參數設定
        const randomX = Math.random() * 100; // 隨機水平位置 0-100vw
        const randomSize = Math.random() * 15 + 10; // 隨機大小 10-25px
        const randomDuration = Math.random() * 8 + 5; // 隨機下落時間 5-13秒
        const randomDelay = Math.random() * 8; // 隨機延遲 0-8秒
        const randomOpacity = Math.random() * 0.6 + 0.4; // 隨機透明度 0.4-1.0
        const randomSwing = Math.random() * 80 - 40; // 隨機擺動幅度 -40 到 40px
        const randomRotation = Math.random() * 360; // 隨機初始旋轉角度

        // 應用樣式
        snowflake.style.left = `${randomX}vw`;
        snowflake.style.fontSize = `${randomSize}px`;
        snowflake.style.opacity = randomOpacity;
        snowflake.style.setProperty('--swing-distance', `${randomSwing}px`);
        snowflake.style.setProperty('--rotation', `${randomRotation}deg`);
        snowflake.style.animationDuration = `${randomDuration}s, ${randomDuration * 0.8}s, ${randomDuration * 1.2}s`;
        snowflake.style.animationDelay = `${randomDelay}s`;
        
        // 根據大小添加模糊效果(遠近景深)
        if (randomSize < 15) {
            snowflake.style.filter = 'blur(1px)';
        }
    }
    
    // 更新雪花容器高度以涵蓋整個頁面
    updateSnowflakesHeight();
}

// 更新雪花容器高度,確保覆蓋整個頁面
function updateSnowflakesHeight() {
    const snowflakesContainer = document.getElementById('snowflakes');
    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    snowflakesContainer.style.height = `${documentHeight}px`;
}

// 初始化雪花效果
createSnowflakes();

// 監聽視窗大小變化和內容變化,重新計算高度
window.addEventListener('resize', updateSnowflakesHeight);
window.addEventListener('load', updateSnowflakesHeight); 

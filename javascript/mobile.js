


    function adjustButtonText() {
        const desktopText = document.querySelector('.desktop-text');
        const mobileText = document.querySelector('.mobile-text');
        if (window.innerWidth <= 768) {
        desktopText.style.display = 'none';
        mobileText.style.display = 'inline-block';
        } else {
        desktopText.style.display = 'inline-block';
        mobileText.style.display = 'none';
        }
    }
    
    document.addEventListener('DOMContentLoaded', adjustButtonText);
    window.addEventListener('resize', adjustButtonText);
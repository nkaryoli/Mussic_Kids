const backBtn = document.querySelector('.btn-back');

if (backBtn) {
    backBtn.addEventListener('click', goBack);
}

function goBack() {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = '../../index.html';
    }
}
const button = document.getElementById("btn");

const distantbetween = (p1x, p1y, p2x, p2y) =>{
    const dx = p1x - p2x;
    const dy = p1y - p2y;
    return Math.sqrt(dx * dx + dy * dy);
}

let bx, by

function updateButtonPosition() {
    const buttonRect = button.getBoundingClientRect();

    bx = buttonRect.left + buttonRect.width / 2;
    by = buttonRect.top + buttonRect.height / 2;
}

updateButtonPosition();

window.addEventListener('resize', updateButtonPosition);

document.addEventListener('mousemove', (event) =>{
    const radius = Math.max(
        button.offsetHeight * 0.75, 
        button.offsetWidth * 0.75, 
        100);

    const dist = distantbetween(event.clientX, event.clientY, bx, by);
    const angle = Math.atan2(event.clientY - by, event.clientX - bx);

    const ox = -1 * Math.cos(angle) * Math.max(radius - dist, 0);
    const oy = -1 * Math.sin(angle) * Math.max(radius - dist, 0);

    const rx = oy / 2;
    const ry = -ox / 2;

    button.style.transform = `translate(${ox}px, ${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`
    //button.style.transition = `all 0.1s ease`
    button.style.boxShadow = `0px ${Math.abs(oy)}px ${Math.abs(oy) / radius * 40}px rgba(0,0,0,.15)`
})

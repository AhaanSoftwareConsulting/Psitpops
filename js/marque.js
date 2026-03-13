const marquee = document.getElementById("marquee-track");
const content = marquee.innerHTML;
 
function fillMarquee() {
    while (marquee.scrollWidth < window.innerWidth * 2) {
        marquee.innerHTML += content;
    }
}
 
fillMarquee();
 
window.addEventListener("resize", () => {
    marquee.innerHTML = content;
    fillMarquee();
});
let breakPoint = false;

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);

window.addEventListener("load", () => {
    document.querySelector("body").innerHTML += `<div class = 'wraped_nav_controls'>
    <a href = "/"> <div class = "nav_tile home header">Home</div> </a>
    <a href = "/blog"> <div class = "nav_tile blog header">Blog</div> </a>
    <a href = "/contact"> <div class = "nav_tile contact header">Contact</div> </a>
    </div>`;
    document.querySelector(".wraped_nav_controls").style.display = "none";

    const navTile = document.querySelector(".nav_tile.new");
    if (navTile) {
        navTile.addEventListener("click", () => {
            const wrapedNav = document.querySelector(".wraped_nav_controls");
            if (wrapedNav.style.display === "none" || wrapedNav.style.display === "") {
                wrapedNav.style.display = "block";
            } else {
                wrapedNav.style.display = "none";
            }
        });
    }
});

function handleResize() {
    let screenWidth = window.innerWidth;
    if(screenWidth <= 800 && !breakPoint){
        breakPoint = true;
        navWrap("wrap");
    }else if(screenWidth > 800){
        breakPoint = false;
        navWrap("unwrap");
    }
}

function navWrap(action){
    if(action == "wrap"){
        document.querySelector(".nav_controls.header").innerHTML = "<div class = 'nav_tile new'>=</div>";
    }else{
        document.querySelector(".nav_controls.header").innerHTML = 
        `<a href = "/"> <div class = "nav_tile home header">Home</div> </a>
        <a href = "/blog"> <div class = "nav_tile blog header">Blog</div> </a>
        <a href = "/contact"> <div class = "nav_tile contact header">Contact</div> </a>`;
    }
}
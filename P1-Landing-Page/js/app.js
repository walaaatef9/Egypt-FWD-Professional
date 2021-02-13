/* Define Global Variables */
const scrollBtn = document.getElementsByClassName("backTop")[0];
const navBarList = document.getElementById("navbar__list");
const [...sections] = document.getElementsByTagName("section");
const	navItems = document.getElementsByClassName("navbar__item");

const sectionsIDs = sections.map(sec => sec.id);
const navItemsData = sections.map(sec => sec.getAttribute("data-nav"));

/* Helper Functions Walaa Atef Egypt FWD 2021 */
const scrollTo = (e) => {
	e.preventDefault();
	const target = e.target.getAttribute("data-scroll-to");
	const element = document.querySelector(target);

	element.scrollIntoView({ behavior: "smooth" });
};

const isInViewport = (elem) => {
    const { top, bottom } = elem.getBoundingClientRect();
		const winHeight = window.innerHeight || document.documentElement.clientHeight;

  	return bottom >= 0 && top <= winHeight
};

const showbackTop = () =>	window.addEventListener("scroll", () => scrollBtn.classList.toggle("backTop--active", window.scrollY > 500));

const scrollToTop = () => window.scrollTo({ top: 0,	behavior: "smooth" });

/* Begin Main Functions Walaa Atef Egypt FWD 2021 */
const buildNav = (nav, items, secIDs) => {
	const fragment = document.createDocumentFragment();

	items.map((item, i) => {
	const listItem = document.createElement("li");

  listItem.textContent = item;
	listItem.classList.add("navbar__item");
	listItem.addEventListener("click", scrollTo);
	listItem.setAttribute("data-scroll-to", `#${secIDs[i]}`);

    fragment.appendChild(listItem);
  });

	nav.appendChild(fragment);
};

const activateSection = () => {
  sections.map((sec) => {
    window.addEventListener("scroll", (event) => {
      isInViewport(sec)
        ? sec.classList.add("section--active")
        : sec.classList.remove("section--active");
    });
  });
};


/* Call Functions */
// Build the nav Walaa Atef Egypt FWD 2021
buildNav(navBarList, navItemsData, sectionsIDs);

// Active the section in the viewport Walaa Atef Egypt FWD 2021
activateSection()

// Show backTopBtn Walaa Atef Egypt FWD 2021
showbackTop()

// Scroll to top onClick Walaa Atef Egypt FWD 2021
scrollToTop()

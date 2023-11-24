class App {
  header: HTMLElement | null;
  burger: HTMLDivElement | null;
  navLinks: NodeListOf<HTMLAnchorElement> | null;
  x1: number;
  x2: number;
  xDiff: number;
  constructor() {
    this.header = document.getElementById('header');
    this.burger = document.querySelector('.burger');
    this.navLinks = document.querySelectorAll('.nav__link');
    this.x1 = 0;
    this.x2 = 0;
    this.xDiff = 0;
  }

  closeMobileMenu() {
    this.burger?.classList.remove('burger--open');
    this.header?.classList.remove('header--open');
  }

  toggleMobileMenu() {
    this.burger?.classList.toggle('burger--open');
    this.header?.classList.toggle('header--open');
  }

  onTouchStart(e: TouchEvent) {
    this.x1 = e.touches[0].clientX;
  }

  onTouchMove(e: TouchEvent) {
    this.x2 = e.touches[0].clientX;
    this.xDiff = this.x1 - this.x2;
    if (this.xDiff > 0) {
      this.header?.setAttribute('style', `transform: translateX(${-this.xDiff}px)`);
    }
  }

  onTouchEnd() {
    if (this.xDiff > 80) {
      this.closeMobileMenu();
    }
    this.x1 = 0;
    this.x2 = 0;
    this.xDiff = 0;
    this.header?.removeAttribute('style');
  }

  init() {
    window.addEventListener('scroll', this.closeMobileMenu.bind(this));
    this.burger?.addEventListener('click', this.toggleMobileMenu.bind(this));
    this.navLinks?.forEach((navLink: HTMLAnchorElement) => {
      navLink.addEventListener('click', this.closeMobileMenu.bind(this));
    });
    this.header?.addEventListener('touchstart', (e: TouchEvent) => this.onTouchStart(e));
    this.header?.addEventListener('touchmove', (e: TouchEvent) => this.onTouchMove(e));
    this.header?.addEventListener('touchend', () => this.onTouchEnd());
  }
}

export default App;

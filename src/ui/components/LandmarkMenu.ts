import { LANDMARKS, type LandmarkPOI } from '@/config/coordinates';

interface LandmarkMenuProps {
  onSelect: (landmark: LandmarkPOI) => void;
}

/**
 * Horizontal bottom drawer / quick access menu to fly to prominent Da Nang landmarks
 */
export class LandmarkMenu {
  public element: HTMLElement;
  private currentActiveId: string = 'dragon-bridge';

  constructor(props: LandmarkMenuProps) {
    this.element = document.createElement('nav');
    this.element.className = 'dn-landmark-menu';

    const landmarkList = Object.values(LANDMARKS);

    const itemsHtml = landmarkList
      .map(
        (lm) => `
        <button class="dn-landmark-card ${lm.id === this.currentActiveId ? 'active' : ''}" data-id="${lm.id}">
          <div class="dn-landmark-tag">${lm.category.toUpperCase()}</div>
          <div class="dn-landmark-name">${lm.name}</div>
          <div class="dn-landmark-en">${lm.nameEn}</div>
        </button>
      `
      )
      .join('');

    this.element.innerHTML = `
      <div class="dn-menu-title-wrap">
        <span class="dn-menu-pulse"></span>
        <span class="dn-menu-title">ĐIỂM ĐẾN NỔI BẬT ĐÀ NẴNG</span>
      </div>
      <div class="dn-landmark-scroll">
        ${itemsHtml}
      </div>
    `;

    // Event listeners
    const cards = this.element.querySelectorAll<HTMLButtonElement>('.dn-landmark-card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const target = landmarkList.find((l) => l.id === id);
        if (target) {
          cards.forEach((c) => c.classList.remove('active'));
          card.classList.add('active');
          this.currentActiveId = target.id;
          props.onSelect(target);
        }
      });
    });
  }

  public setActive(id: string): void {
    this.currentActiveId = id;
    const cards = this.element.querySelectorAll<HTMLButtonElement>('.dn-landmark-card');
    cards.forEach((card) => {
      card.classList.toggle('active', card.dataset.id === id);
    });
  }
}

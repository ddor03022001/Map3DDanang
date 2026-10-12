import type { TimeOfDay } from '@/config/constants';

interface NavigationBarProps {
  onTimeChange: (time: TimeOfDay) => void;
  onFireToggle: (active: boolean) => void;
}

/**
 * Top navigation bar with branding, Day/Sunset/Night presets, and weekend Dragon Fire toggle
 */
export class NavigationBar {
  public element: HTMLElement;
  private isFireActive = false;

  constructor(props: NavigationBarProps) {
    this.element = document.createElement('header');
    this.element.className = 'dn-navbar';

    this.element.innerHTML = `
      <div class="dn-brand">
        <div class="dn-brand-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </div>
        <div class="dn-brand-text">
          <div class="dn-brand-title">ĐÀ NẴNG 3D</div>
          <div class="dn-brand-subtitle">Smart City Digital Twin</div>
        </div>
      </div>

      <div class="dn-nav-controls">
        <!-- Day / Sunset / Night Controller -->
        <div class="dn-time-switcher">
          <button class="dn-time-btn active" data-time="day" title="Chế độ ban ngày">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <span>Ngày</span>
          </button>
          <button class="dn-time-btn" data-time="sunset" title="Chế độ hoàng hôn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 18a5 5 0 0 0-10 0"></path>
              <line x1="12" y1="2" x2="12" y2="9"></line>
              <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
              <line x1="1" y1="18" x2="3" y2="18"></line>
              <line x1="21" y1="18" x2="23" y2="18"></line>
              <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line>
              <line x1="23" y1="22" x2="1" y2="22"></line>
            </svg>
            <span>Hoàng hôn</span>
          </button>
          <button class="dn-time-btn" data-time="night" title="Chế độ đêm & đèn LED">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <span>Đêm</span>
          </button>
        </div>

        <!-- Weekend Fire Feature Button -->
        <button class="dn-action-btn" id="dn-fire-btn" title="Kích hoạt hiệu ứng Cầu Rồng phun lửa">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
          </svg>
          <span>Phun Lửa Cầu Rồng</span>
        </button>
      </div>
    `;

    // Time Switcher Events
    const timeButtons = this.element.querySelectorAll<HTMLButtonElement>('.dn-time-btn');
    timeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        timeButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const selected = btn.dataset.time as TimeOfDay;
        props.onTimeChange(selected);
      });
    });

    // Fire Toggle Event
    const fireBtn = this.element.querySelector<HTMLButtonElement>('#dn-fire-btn')!;
    fireBtn.addEventListener('click', () => {
      this.isFireActive = !this.isFireActive;
      fireBtn.classList.toggle('active', this.isFireActive);
      props.onFireToggle(this.isFireActive);
    });
  }
}

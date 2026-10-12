interface GuideToastProps {
  onControlsClick?: () => void;
  onDismiss?: () => void;
}

/**
 * Bottom-Right Guide Toast matching duancuulong.com
 * Card with "Khám phá Đà Nẵng & Núi Thành" and action buttons
 */
export class GuideToast {
  public element: HTMLElement;

  constructor(props: GuideToastProps) {
    this.element = document.createElement('div');
    this.element.className = 'dcl-guide-toast';

    this.element.innerHTML = `
      <h3 class="dcl-guide-title">Khám phá Đà Nẵng & Núi Thành</h3>
      <p class="dcl-guide-text">
        Kéo để di chuyển, cuộn để phóng to. Bấm ? để xem hướng dẫn.
      </p>
      <div class="dcl-guide-actions">
        <button class="dcl-guide-btn dcl-guide-btn-outline" id="dcl-guide-controls">Điều khiển</button>
        <button class="dcl-guide-btn dcl-guide-btn-primary" id="dcl-guide-dismiss">Đã hiểu</button>
      </div>
    `;

    this.bindEvents(props);
  }

  private bindEvents(props: GuideToastProps): void {
    const controlsBtn = this.element.querySelector('#dcl-guide-controls');
    controlsBtn?.addEventListener('click', () => {
      props.onControlsClick?.();
    });

    const dismissBtn = this.element.querySelector('#dcl-guide-dismiss');
    dismissBtn?.addEventListener('click', () => {
      this.element.style.opacity = '0';
      this.element.style.pointerEvents = 'none';
      setTimeout(() => {
        this.element.style.display = 'none';
      }, 300);
      props.onDismiss?.();
    });
  }

  public show(): void {
    this.element.style.display = 'block';
    this.element.style.opacity = '1';
    this.element.style.pointerEvents = 'auto';
  }
}

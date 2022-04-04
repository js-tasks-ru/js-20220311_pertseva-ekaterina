export default class NotificationMessage {

  static activeNotification;
  static header = "Notification";
  static value = "20s";
  timerId;

  constructor(
    message = "",
    {type, duration} = {},
  ) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
    <div class="notification ${this.type}" style="--value:${this.value}">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.header}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  remove() {
    clearTimeout(this.timerId)
    if (this.element) {
      this.element.remove();
    }
  }

  show(parent = document.body) {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activenotification.remove();
    }
    parent.append(this.element);
    this.timerId = setTimeout(()=>{this.remove();}, this.duration);
    NotificationMessage.activenotification = this;
  }

  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.activenotification = null;

  }


}

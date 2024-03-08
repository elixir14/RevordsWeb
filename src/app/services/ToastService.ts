import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: any[] = [];

	public show(textOrTpl: string | TemplateRef<any>, options: any = {}) {

		this.toasts.push({ textOrTpl, ...options });
	}

	public remove(toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	public clear() {
		this.toasts.splice(0, this.toasts.length);
	}
	showStandard() {
		this.show('I am a standard toast');
	}

	showSuccess(message) {
		this.show(message, { classname: 'bg-success text-light', delay: 15000, positionClass: 'toast-bottom-right' });
	}

	showDanger(message) {
		this.show(message, { classname: 'bg-danger text-light', delay: 15000 });
	}
}
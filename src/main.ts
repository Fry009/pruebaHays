import { registerSW } from 'virtual:pwa-register';
import './presentation/app-root';

document.querySelector('#app')!.innerHTML = '<app-root></app-root>';

registerSW({ immediate: true });

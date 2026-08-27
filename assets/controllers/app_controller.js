// assets/controllers/react_controller.js
import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../react/App';

export default class extends Controller {
    static values = { props: Object };

    connect() {
        const root = createRoot(this.element);
        root.render(<App {...this.propsValue} />);
        this.root = root;
    }

    disconnect() {
        this.root?.unmount();
    }
}
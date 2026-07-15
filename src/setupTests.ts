import '@testing-library/jest-dom';

class ResizeObserverStub {
	observe() {}
	unobserve() {}
	disconnect() {}
}

globalThis.ResizeObserver ??= ResizeObserverStub;
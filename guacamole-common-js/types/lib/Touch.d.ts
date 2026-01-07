export {};

export namespace Touch {
    export type TouchType = 'touchstart' | 'touchmove' | 'touchend';

    /**
     * The current state of a touch contact.
     */
    export class State {
        constructor(template?: Partial<State>);

        /**
         * Unique identifier of the active contact.
         */
        id: number;

        /**
         * Y radius of the touch contact area, in pixels.
         */
        radiusX: number;

        /**
         * X radius of the touch contact area, in pixels.
         */
        radiusY: number;

        /**
         * Clockwise rotation of the touch contact area, in degrees.
         */
        angle: number;

        /**
         * Relative force of the touch contact where 0 is lifted and 1 is max.
         */
        force: number;

        /**
         * Current X position, in pixels.
         */
        x: number;

        /**
         * Current Y position, in pixels.
         */
        y: number;

        /**
         * Updates the position relative to the provided element.
         * @param element Target element.
         * @param clientX Viewport-relative X coordinate.
         * @param clientY Viewport-relative Y coordinate.
         */
        fromClientPosition(element: HTMLElement, clientX: number, clientY: number): void;
    }

    /**
     * Represents a change in state for a single touch contact.
     */
    export class Event {
        constructor(type: TouchType, event: TouchEvent, state: State);

        type: TouchType;
        timestamp: number;
        state: State;

        /**
         * Milliseconds elapsed since creation.
         */
        getAge(): number;

        /**
         * Prevent default behavior of related DOM events.
         */
        preventDefault(): void;

        /**
         * Stop propagation of related DOM events.
         */
        stopPropagation(): void;
    }
}

/**
 * Provides cross-browser multi-touch events for a given element.
 */
export class Touch {
    constructor(element: HTMLElement);

    /**
     * Active touches keyed by identifier.
     */
    touches: Record<number, Touch.State>;

    /**
     * Number of active touches currently tracked.
     */
    activeTouches: number;

    /**
     * Register an event listener for a touch event type.
     */
    on(type: Touch.TouchType, listener: (event: Touch.Event, target: Touch) => void): void;

    /**
     * Register an event listener for multiple touch event types.
     */
    onEach(types: Touch.TouchType[], listener: (event: Touch.Event, target: Touch) => void): void;

    /**
     * Dispatch a touch event to registered listeners.
     */
    dispatch(event: Touch.Event): void;

    /**
     * Unregister a listener for a touch event type.
     */
    off(type: Touch.TouchType, listener: (event: Touch.Event, target: Touch) => void): boolean;

    /**
     * Unregister a listener for multiple touch event types.
     */
    offEach(types: Touch.TouchType[], listener: (event: Touch.Event, target: Touch) => void): boolean;
}


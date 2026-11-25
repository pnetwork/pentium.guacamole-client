export namespace KeyEventInterpreter {
    /**
     * A definition for a key involved in a key event, such as its keysym,
     * its display name, and the text it produces, if any.
     */
    export class KeyDefinition {
        constructor(template?: Partial<KeyDefinition>);

        /**
         * The X11 keysym of the key.
         */
        keysym: number;

        /**
         * The name of the key.
         */
        name: string;

        /**
         * If the key represents a character, the character it produces.
         */
        value?: string;
    }

    /**
     * A single key event fired on the remote connection.
     */
    export class KeyEvent {
        constructor(template?: Partial<KeyEvent>);

        /**
         * The definition of the key that was pressed or released.
         */
        definition: KeyDefinition;

        /**
         * True if the key was pressed, false if it was released.
         */
        pressed: boolean;

        /**
         * The timestamp of the key event relative to the start of the
         * recording, in milliseconds.
         */
        timestamp: number;
    }
}

/**
 * A reader for Guacamole "key" instructions, extracting richer information
 * about each key event so that it can be displayed, searched and navigated.
 */
export class KeyEventInterpreter {
    /**
     * @param startTimestamp
     * The timestamp of the start of the recording, in milliseconds. Defaults
     * to 0, which keeps the raw timestamps.
     */
    constructor(startTimestamp?: number);

    /**
     * Handles a raw key event, appending a new key event object for every
     * handled raw event.
     *
     * @param args The arguments of the key event.
     */
    handleKeyEvent(args: string[]): void;

    /**
     * Return the current batch of typed text. Note that the batch may be
     * incomplete, as more key events might be processed before the next
     * batch starts.
     *
     * @return The current batch of text.
     */
    getEvents(): KeyEventInterpreter.KeyEvent[];
}

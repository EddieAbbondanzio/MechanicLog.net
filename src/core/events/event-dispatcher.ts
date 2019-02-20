import { EventHandler } from './event-handler';
import { Event } from './event';

/**
 * Dispatcher that can propogate events to subscribers.
 */
export class EventDispatcher<E> implements Event<E> {
    /**
     * The handlers that want to be notified when an event occurs.
     */
    private _handlers: EventHandler<E>[];

    /**
     * Create a new event dispatcher.
     */
    constructor() {
        this._handlers = [];
    }

    /**
     * Register a new handler with the dispatcher. Any time the event is
     * dispatched, the handler will be notified.
     * @param handler The handler to register.
     */
    public register(handler: EventHandler<E>): void {
        this._handlers.push(handler);
    }

    /**
     * Desubscribe a handler from the dispatcher.
     * @param handler The handler to remove.
     */
    public unregister(handler: EventHandler<E>): void {
        for (let i = 0; i < this._handlers.length; i++) {
            if (this._handlers[i] === handler) {
                this._handlers.splice(i, 1);
            }
        }
    }

    /**
     * Dispatch an event to all the subscribers.
     * @param event The data of the event that occured.
     */
    public dispatch(event: E): void {
        for (const handler of this._handlers) {
            handler(event);
        }
    }
}

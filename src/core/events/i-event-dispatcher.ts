import { EventHandler } from './event-handler';

export interface IEventDispatcher<E> {
    /**
     * Register a new handler with the dispatcher. Any time the event is
     * dispatched, the handler will be notified.
     * @param handler The handler to register.
     */
    register(handler: EventHandler<E>): void;

    /**
     * Desubscribe a handler from the dispatcher.
     * @param handler The handler to remove.
     */
    unregister(handler: EventHandler<E>): void;
}


/**
 * An entity that can be validated.
 */
export interface Validatable {
    /**
     * Validate the entity to see if it meet's all criteria.
     */
    validate: Promise<boolean>;
}

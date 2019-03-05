import { Nullable } from './nullable';

/**
 * Data type to represent a union type of two possible
 * values. Useful for when a function either returns a value,
 * or an error indicating failure.
 *
 * Stolen from our brothers of FP.
 * Source: https://github.com/mikhailshilkov/mikhailio-samples/blob/master/Either%7BTL%2CTR%7D.cs
 */
export class Either<TLeft, TRight> {
    /**
     * The left value of the union.
     */
    private readonly left: Nullable<TLeft>;

    /**
     * The right value of the union.
     */
    private readonly right: Nullable<TRight>;

    /**
     * Needed for when the left value can be a undefined, or null
     * value.
     */
    private _isLeft!: boolean;

    /**
     * Create a new Either monad.
     * @param left The left value.
     * @param right The right value.
     */
    private constructor(left: Nullable<TLeft>, right: Nullable<TRight>) {
        if (left != null && right != null) {
            throw new Error('Only left or right may be defined.');
        }

        this.left = left;
        this.right = right;
    }

    /**
     * Do either of two actions depending on which side of the monad is populated.
     * @param leftAction The action to perform if the left value is populated.
     * @param rightAction The action to perform if the right value is populated.
     */
    public async do<TResult>(leftAction: (val: TLeft) => Promise<TResult>, rightAction: (val: TRight) => Promise<TResult>): Promise<TResult> {
        if (this._isLeft) {
            return await leftAction(this.left!);
        } else {
            return await rightAction(this.right!);
        }
    }

    /**
     * Check if the left value of the Either is populated.
     * @returns True if the left side is not null.
     */
    public isLeft(): boolean {
        return this.left != null;
    }

    /**
     * Check if the right value of the Either is populated.
     * @returns True if the irght side is not null.
     */
    public isRight(): boolean {
        return this.right != null;
    }

    /**
     * Retrieve the left side value. If it's null an error will be thrown.
     */
    public getLeft(): TLeft {
        if (this.left == null) {
            throw new Error('Left side is null');
        }

        return this.left;
    }

    /**
     * Retrieve the right side value. If it's null an error will be thrwn.
     */
    public getRight(): TRight {
        if (this.right == null) {
            throw new Error('Right side is null');
        }

        return this.right;
    }

    /**
     * Retrieve the left value, or if no value is found then return
     * the default value passed.
     * @param defaultValue The default value to return.
     */
    public getLeftOrDefault(defaultValue: TLeft): TLeft {
        return this.left != null ? this.left : defaultValue;
    }

    /**
     * Retrieve the right value, or if no value is found then return
     * the default value passed.
     * @param defaultValue THe default value to return.
     */
    public getRightOrDefault(defaultValue: TRight): TRight {
        return this.right != null ? this.right : defaultValue;
    }

    /**
     * Create a new either monad with the left side value populated.
     * @param value The left side value of the monad.
     */
    public static left<TL, TR>(value: TL): Either<TL, TR> {
        const e = new Either<TL, TR>(value, null);
        e._isLeft = true;
        return e;
    }

    /**
     * Create a new either monad with the right value populated.
     * @param value The right side value of the monad.
     */
    public static right<TL, TR>(value: TR): Either<TL, TR> {
        return new Either<TL, TR>(null, value);
    }
}

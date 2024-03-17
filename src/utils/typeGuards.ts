export function isString(unknownType: unknown): unknownType is string {
    return typeof unknownType === "string" || unknownType instanceof String;
}

export function isNumber(unknownType: unknown): unknownType is number {
    return typeof unknownType === "number" || unknownType instanceof Number;
}

export function isArray(unknownType: unknown): unknownType is Array<unknown> {
    return unknownType instanceof Array && Array.isArray(unknownType);
}

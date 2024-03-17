function delay<T extends (...args: Parameters<T>) => ReturnType<T>>(
    this: ThisParameterType<T>,
    fn: T,
    ms = 1000
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    return (...args: Parameters<T>) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(fn.apply(this, args));
                } catch (error) {
                    reject(error);
                }
            }, ms);
        });
}

export default delay;

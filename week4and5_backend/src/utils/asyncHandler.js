const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            if (typeof next === 'function') {
                next(err);
                return;
            }

            throw err;
        })
    }
}

export {asyncHandler};
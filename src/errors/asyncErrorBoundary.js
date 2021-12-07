// Wrap around the function exports in the controller.js files to eliminate need for try catch block


function asyncErrorBoundary(delegate, defaultStatus) {
    return (req, res, next) => {
        Promise.resolve()
        .then(() => delegate(req, res, next))
        .catch((error = {}) => {
            const { status = defaultStatus, message = error} = error;
            next ({
                status,
                message,
            });
        });
    };
}


module.exports = asyncErrorBoundary;
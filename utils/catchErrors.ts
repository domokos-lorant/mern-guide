export default function catchErrors(error: any, displayError: (errorMsg: string) => void): void {
    let errorMsg;

    if (error.response) {
        // The request was made and the server responded with a status code
        // that is not 2xx.
        errorMsg = error.response.data;
        console.error("Error response", errorMsg);

        // For Coudinary image uploads
        if (error.response.data.error) {
            errorMsg = error.response.data.error.message;
        }
    } else if (error.request) {
        // The request was made, but no response was received.
        errorMsg = error.request;
        console.error("Error request", errorMsg);
    } else {
        // Something else happened in making the request that triggered an error.
        errorMsg = error.message;
        console.error("Error message", errorMsg);
    }

    displayError(errorMsg);
}
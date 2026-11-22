const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('domoMessage').classList.remove('hidden');
};
  
const hideError = () => {
    document.getElementById('domoMessage').classList.add('hidden');
};
  
const sendPost = async (url, data, handler) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (result.error) {
            handleError(result.error);
            return;
        }
  
        if (result.redirect) {
            window.location = result.redirect;
            return;
        }
  
        hideError();
  
        if (handler) {
            handler(result);
        }
    } catch (err) {
        handleError('Something went wrong!');
    }
};
  
module.exports = {
    handleError,
    hideError,
    sendPost,
};
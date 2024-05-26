document.addEventListener('DOMContentLoaded', function() {
    // URL of the PDF file
    const fileUrl = 'https://raw.githubusercontent.com/Prafull37/resume/file-download/backend/Prafull_React_Developer_Resume.pdf';
    // Name to save the downloaded file
    const fileName = 'Prafull_React_Developer_Resume.pdf';

    // Function to download the file
    async function downloadFile(url, name) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const blob = await response.blob();
            const contentType = response.headers.get('Content-Type');
            if (contentType !== 'application/pdf' && contentType !== 'application/octet-stream') {
                throw new Error(`Unexpected content type: ${contentType}`);
            }

            console.log("response",response)
            console.log("blob",blob)


            // Create a Blob URL
            const blobUrl = window.URL.createObjectURL(blob);
            // Create a link element
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = name;
            // Append the link to the body
            document.body.appendChild(a);
            // Programmatically click the link to trigger the download
            a.click();
            // Remove the link after download
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
        }
    }

    // Trigger the download when the page loads
    downloadFile(fileUrl, fileName);
});
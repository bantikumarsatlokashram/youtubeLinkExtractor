document.getElementById('extractButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const youtubeLinks = extractYouTubeLinks(inputText);
    const outputDiv = document.getElementById('output');
    const downloadButton = document.getElementById('downloadButton');

    if (youtubeLinks.length > 0) {
        outputDiv.innerHTML = '<strong class="text-gray-800">Extracted YouTube Links:</strong><br>' + youtubeLinks.join('<br>');
        downloadButton.classList.remove('hidden');
        downloadButton.classList.add('fade-in');
        downloadButton.onclick = function() {
            downloadLinksAsTxt(youtubeLinks);
        };
    } else {
        outputDiv.innerHTML = '<p class="text-red-500">No YouTube links found.</p>';
        downloadButton.classList.add('hidden');
    }
});

function extractYouTubeLinks(text) {
    const youtubeRegex = /https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+|https?:\/\/youtu\.be\/[\w-]+/g;
    return text.match(youtubeRegex) || [];
}

function downloadLinksAsTxt(links) {
    const blob = new Blob([links.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'youtube_links.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
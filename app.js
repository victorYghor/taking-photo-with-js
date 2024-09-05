function startCamera(videoElement, constraints) {
    if (navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                videoElement.srcObject = stream;
            })
            .catch(error => {
                console.log('An error occurred while accessing the webcam.', error);
            });
    } else {
        console.log('getUserMedia not supported on this browser.');
    }
}

function captureImage(videoElement, canvasElement, downloadButton) {
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;

    const context = canvasElement.getContext('2d');
    canvasElement.width = width;
    canvasElement.height = height;

    // Desenha o quadro atual do vídeo no canvas
    context.drawImage(videoElement, 0, 0, width, height);

    // Converte o conteúdo do canvas em uma URL de imagem
    const imgURL = canvasElement.toDataURL('image/png');

    // Atualiza o botão de download com o link da imagem e dispara o download
    downloadButton.href = imgURL;
    downloadButton.download = 'captured_image.png';
    downloadButton.click();
}

// Exemplo de uso:
const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const btn = document.querySelector('#btn');
const downloadButton = document.querySelector('#dl-btn');

const constraints = {
    video: {
        width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
        },
        height: {
            min: 720,
            ideal: 1080,
            max: 1440
        },
        facingMode: 'environment'
    }
};

// Iniciar a câmera
startCamera(video, constraints);

// Tirar foto ao clicar no botão
btn.addEventListener('click', () => {
    captureImage(video, canvas, downloadButton);
});


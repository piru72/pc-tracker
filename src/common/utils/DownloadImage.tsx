import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';

const handleCaptureClick = async (imageTitle: string, divName: string) => {
    const dessiredElement =
        document.querySelector<HTMLElement>('.'+divName);
    if (!dessiredElement) return;

    const copiedElement = dessiredElement.cloneNode(
        true
    ) as HTMLElement;
    copiedElement.style.position = 'fixed';
    copiedElement.style.right = '100%';
    copiedElement.style.height = 'auto';

    document.body.append(copiedElement);

    const canvas = await html2canvas(copiedElement);

    copiedElement.remove();

    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, imageTitle+'.png', 'image/png');
};

export { handleCaptureClick };
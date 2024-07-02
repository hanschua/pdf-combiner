
import { PDFDocument, StandardFonts, rgb } from '@cantoo/pdf-lib';

async function blobToArrayBuffer(blob: Blob) {
  return await new Response(blob).arrayBuffer();
}

async function createPdf(inputDatum: Array) : string {
  const pdfDoc = await PDFDocument.create();

  const pdfCache = {};
  const loadPdfInCache = async function(file) {
    if (file.id in pdfCache) {
      return pdfCache[file.id];
    }

    const opts = {};
    if (file.isEncrypted && file.password) {
      opts.password = file.password;
    }
    const buffer = await blobToArrayBuffer(file.blob);
    const donorPdf = await PDFDocument.load(buffer, opts);

    pdfCache[file.id] = donorPdf;

    return donorPdf;
  };

  for (let i = 0; i < inputDatum.length; i++) {
    const inputData = inputDatum[i];
    const file = inputData.file;
    const pages = inputData.pages;
    const donorPdf = await loadPdfInCache(file);
    const donorPages = await pdfDoc.copyPages(donorPdf, pages);
    donorPages.forEach((donorPage) => {
      pdfDoc.addPage(donorPage);
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

async function createBlobCopy(file: File) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (event) {
      const arrayBuffer = event.target.result;
      const blob = new Blob([arrayBuffer], {
        type: file.type
      }); // Create copy Blob
      resolve(blob);
    };
    reader.onerror = reject;
  });
}

async function loadPdf(blob: Blob, opts: Object = { ignoreEncryption: true }) {
  const buffer = await blobToArrayBuffer(blob);
  const pdf = await PDFDocument.load(buffer, opts);
  return pdf;
}

export default {
  blobToArrayBuffer,
  createBlobCopy,
  createPdf,
  loadPdf,
};

import jsPDF from 'jspdf';

export const generateInvoice = (rowData) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('Invoice', 14, 22);

  // Customer Information
  doc.setFontSize(12);
  const customerDetails = [
    ['Customer Name:', rowData.fname + ' ' + rowData.family_name],
    ['Email:', rowData.email],
    ['Phone:', rowData.phone],
    ['Address:', rowData.address || 'N/A']
  ];

  customerDetails.forEach(([label, value], i) => {
    doc.text(`${label} ${value}`, 14, 35 + i * 7);
  });

  // Footer
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, doc.internal.pageSize.height - 10);

  // Save PDF
  doc.save(`invoice_${rowData.student_id || 'unknown'}.pdf`);
};

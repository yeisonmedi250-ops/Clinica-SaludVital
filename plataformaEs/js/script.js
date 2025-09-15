const { jsPDF } = window.jspdf;

document.getElementById('btnDownload').addEventListener('click', () => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // Marca de agua (logo)
  const img = new Image();
  img.src = "Logo.jpg"; // asegúrate que el nombre coincide
  img.onload = () => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Marca de agua transparente
    doc.setGState(new doc.GState({ opacity: 0.20 }));
    doc.addImage(img, "PNG", pageWidth / 4, pageHeight / 3, 100, 60, "", "FAST");

    // Restaurar opacidad normal
    doc.setGState(new doc.GState({ opacity: 1 }));

    // Título principal centrado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("PLATAFORMA ESTRATEGICA SALUDVIDA INTEGRAL EPS", pageWidth / 2, 20, { align: "center" });

    let y = 35;

    // Función para añadir secciones con títulos y contenido centrados
    function addSection(title, content) {
      const lineHeight = 8;

      // Título centrado
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, pageWidth / 2, y, { align: "center" });
      y += lineHeight;

      // Texto centrado
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const margin = 15;
      const maxWidth = pageWidth - margin * 2;
      const splitText = doc.splitTextToSize(content, maxWidth);

      splitText.forEach((line) => {
        doc.text(line, pageWidth / 2, y, { align: "center" });
        y += 7; // espacio normal entre líneas
      });

      y += 6; // espacio extra entre secciones
    }

    // Secciones
    addSection("Misión", "Brindar servicios de salud integrales, accesibles y de calidad a toda la población afiliada, garantizando la promoción, prevención, diagnóstico, tratamiento y rehabilitación, con un enfoque humano, seguro y oportuno.");
    addSection("Visión", "Para el año 2030, ser reconocidos como la EPS líder en la región por la innovación, el trato humanizado y la excelencia en la gestión de la Red Integral de Prestadores de Servicios de Salud, contribuyendo al bienestar y la calidad de vida de nuestros afiliados.");
    addSection("Valores corporativos", "Respeto: trato digno e inclusivo hacia los afiliados y colaboradores.\nHumanización: atención centrada en la persona y su familia.\nCalidad: servicios seguros, efectivos y oportunos.\nEquidad: acceso justo para todos los grupos poblacionales.\nInnovación: uso de nuevas tecnologías y estrategias en salud.\nResponsabilidad social: compromiso con la comunidad y el medio ambiente.");
    addSection("Principios institucionales", "- Atención integral en salud.\n- Enfoque en promoción y prevención.\n- Trabajo en red y articulación entre niveles de atención.\n- Transparencia y eficiencia en la gestión.\n- Continuidad y oportunidad en el cuidado del paciente.");

    // --- Pie de página ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.text("SaludVida Integral EPS - 2025", pageWidth / 2, pageHeight - 10, { align: "center" });
    }

    // Guardar PDF
    doc.save("Plataforma estrategica - SaludVida Integral EPS.pdf");
  };
});
